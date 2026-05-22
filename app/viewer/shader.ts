import { Effect } from "@babylonjs/core/Materials/effect";

export const SHADER_NAME = "equirect";

const VERTEX_SHADER = /*glsl*/ `
  precision highp float;

  // Attributes
  attribute vec3 position;

  // Uniforms
  uniform mat4 worldViewProjection;
  uniform mat4 world;
  uniform mat4 view;
  uniform float isStereoscopic;

  // Varyings
  varying vec3 vWorldPosition;
  varying vec3 vCameraPosition;

  void main() {
    vec4 worldPos = world * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;

    // Extract the camera world-space position from the view matrix.
    // view = [R | t], where camera position = -R^T * t.
    // This is automatically correct per-eye during WebXR stereo rendering.
    mat3 rotT = transpose(mat3(view));
    vCameraPosition = (-rotT * view[3].xyz) * isStereoscopic;

    gl_Position = worldViewProjection * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /*glsl*/ `
  precision highp float;

  // Varyings
  varying vec3 vWorldPosition;
  varying vec3 vCameraPosition;

  // Uniforms
  uniform samplerCube colorTexture;
  uniform samplerCube depthTexture;
  uniform float     maxDepth;         // world-space distance that white (1.0) maps to
  uniform float     u_time;           // Time for random jitter

  #define PI        3.141592653589793
  #define TAU       6.283185307179586
  #define NUM_STEPS 32
  #define REFINE    8

  // Hash without Sine
  // https://www.shadertoy.com/view/4djSRW
  float hash12(vec2 p) {
    vec3 p3  = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // ── helpers ────────────────────────────────────────────────────────────────

  // Sample the packed 16-bit depth surface distance
  float sampleDepth(vec3 d) {
    vec4 packedDepth = textureCube(depthTexture, d);
    float decodedDepth = packedDepth.r + (packedDepth.g / 255.0);
    return decodedDepth * maxDepth;
  }

  // ── main ───────────────────────────────────────────────────────────────────
  void main() {
    vec3 camPos = vCameraPosition;

    // View ray: from camera through this fragment's world position
    vec3 rayDir = normalize(vWorldPosition - camPos); 

    // March along the ray, starting from the camera.
    // We march from t = 0 up to t = maxDepth * 2 (enough to cross the scene).
    float tMax  = maxDepth * 2.0;
    float dt    = tMax / float(NUM_STEPS);

    float jitter = hash12(gl_FragCoord.xy + u_time * 50.0);
    float tStart = jitter * dt;

    float tPrev = tStart;
    float tCur  = tStart;
    bool  hit   = false;

    for (int i = 0; i < NUM_STEPS; i++) {
      tCur += dt;
      vec3  p      = camPos + rayDir * tCur;
      float dist   = length(p);                       // distance of sample from origin
      vec3  dir    = p / dist;                        // normalised direction from origin
      float surfD  = sampleDepth(dir);                // depth surface distance

      // The ray crosses the depth surface when the point's distance from the
      // origin exceeds the stored depth at that direction.
      if (dist >= surfD) {
        hit = true;
        break;
      }
      tPrev = tCur;
    }

    // Binary-search refinement between tPrev and tCur for a sharper result
    if (hit) {
      float lo = tPrev;
      float hi = tCur;
      for (int j = 0; j < REFINE; j++) {
        float mid   = (lo + hi) * 0.5;
        vec3  p     = camPos + rayDir * mid;
        float dist  = length(p);
        vec3  dir   = p / dist;
        float surfD = sampleDepth(dir);
        if (dist >= surfD) {
          hi = mid;
        } else {
          lo = mid;
        }
      }
      float tHit = (lo + hi) * 0.5;
      vec3  pHit = camPos + rayDir * tHit;
      vec3  dir  = normalize(pHit);
      gl_FragColor = textureCube(colorTexture, dir);
    } else {
      // No intersection — fall back to the basic lookup
      vec3 dir = normalize(vWorldPosition);
      gl_FragColor = textureCube(colorTexture, dir);
    }
  }
`;

// Register the shaders so Babylon can resolve them by name
Effect.ShadersStore[`${SHADER_NAME}VertexShader`] = VERTEX_SHADER;
Effect.ShadersStore[`${SHADER_NAME}FragmentShader`] = FRAGMENT_SHADER;
