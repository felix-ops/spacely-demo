import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/core/Helpers/sceneHelpers";
import { SHADER_NAME } from "./shader";

export const setup = async (scene: Scene, engine: Engine) => {
  // Dark background
  scene.clearColor = Color4.FromHexString("#000000ff");

  const canvas = engine.getRenderingCanvas();

  // Camera
  const camera = new FreeCamera("camera", Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  camera.minZ = 0.01;
  camera.speed = 0.05;

  // Sphere (large, inverted so texture faces inward)
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 100, segments: 64 },
    scene,
  );
  sphere.scaling.y = -1; // flip faces inward

  // Textures
  const classroomColorTexture = new Texture("/studio-color-2K.jpg", scene);
  const classroomDepthTexture = new Texture(
    "/studio-depth-fp-2K.png",
    scene,
    false,
    true,
    Texture.NEAREST_SAMPLINGMODE,
  );
  // const classroomColorTexture = new Texture(
  //   "/360-classroom-color-3k.jpg",
  //   scene,
  // );
  // const classroomDepthTexture = new Texture(
  //   "/360-classroom-depth-3k-floatpacked.png",
  //   scene,
  //   false,
  //   true,
  //   Texture.NEAREST_SAMPLINGMODE,
  // );

  classroomDepthTexture.gammaSpace = false;

  // Custom shader material for equirectangular projection + depth parallax
  const sphereMat = new ShaderMaterial("equirectMat", scene, SHADER_NAME, {
    attributes: ["position"],
    uniforms: [
      "worldViewProjection",
      "world",
      "view",
      "maxDepth",
      "u_time",
      "viewProjection",
    ],
    samplers: ["colorTexture", "depthTexture"],
  });

  sphereMat.setTexture("colorTexture", classroomColorTexture);
  sphereMat.setTexture("depthTexture", classroomDepthTexture);
  sphereMat.setFloat("maxDepth", 3); // white (1.0) in depth map = 8.05 world units
  sphereMat.backFaceCulling = false;
  sphere.material = sphereMat;
  // sphereMat.setMatrix("viewProjection", scene.getTransformMatrix());

  // Update time uniform every frame for jitter
  let elapsedTime = 0;
  scene.registerBeforeRender(() => {
    elapsedTime += engine.getDeltaTime() / 1000;
    sphereMat.setFloat("u_time", elapsedTime);

    const amplitude = 0.032;

    // camera.position.x = Math.sin(elapsedTime * 10) * amplitude;
    // camera.position.y = Math.cos(elapsedTime * 10) * amplitude;
  });

  // WebXR VR support
  try {
    const xrExperience = await scene.createDefaultXRExperienceAsync({
      floorMeshes: [],
      disableTeleportation: true, // no floor meshes needed
      disableNearInteraction: true, // avoids NodeMaterial build error
      disableHandTracking: true, // avoids "xr-hand-tracking failed" warning
      uiOptions: {
        // "local" keeps the XR origin at the headset (= panorama center).
        // "local-floor" (default) would offset Y by ~1.6 m, shifting the view.
        referenceSpaceType: "local",
      },
    });

    if (!xrExperience.baseExperience) {
      console.warn("WebXR not supported in this browser");
    }
  } catch (e) {
    console.warn("WebXR initialization failed:", e);
  }
};
