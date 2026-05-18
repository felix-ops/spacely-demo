import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { CubeTexture } from "@babylonjs/core/Materials/Textures/cubeTexture";
import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/core/Helpers/sceneHelpers";
import { WebXRState } from "@babylonjs/core/XR/webXRTypes";
import { SHADER_NAME } from "./shader";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";

export const setup = async (
  scene: Scene,
  engine: Engine,
  urlPrefix = "/cubemaps/classroom_3k/",
  maxDepth?: number,
) => {
  currentMaxDepth = maxDepth !== undefined ? maxDepth : 13;

  const canvas = engine.getRenderingCanvas();

  // Dark background
  scene.clearColor = Color4.FromHexString("#000000ff");

  // Camera
  const camera = new FreeCamera("camera", Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  camera.minZ = 0.01;
  camera.speed = 0.05;

  // Add this inside your setup() function
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 1.0;

  // Sphere (large, inverted so texture faces inward)
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 100, segments: 64 },
    scene,
  );
  sphere.scaling.y = -1; // flip faces inward

  // Textures
  const colorUrls = [
    `${urlPrefix}color_px.png`,
    `${urlPrefix}color_py.png`,
    `${urlPrefix}color_pz.png`,
    `${urlPrefix}color_nx.png`,
    `${urlPrefix}color_ny.png`,
    `${urlPrefix}color_nz.png`,
  ];

  const depthUrls = [
    `${urlPrefix}depth_packed_px.png`,
    `${urlPrefix}depth_packed_py.png`,
    `${urlPrefix}depth_packed_pz.png`,
    `${urlPrefix}depth_packed_nx.png`,
    `${urlPrefix}depth_packed_ny.png`,
    `${urlPrefix}depth_packed_nz.png`,
  ];

  activeColorTexture = CubeTexture.CreateFromImages(colorUrls, scene, true);
  activeDepthTexture = CubeTexture.CreateFromImages(depthUrls, scene, true);
  activeDepthTexture.updateSamplingMode(Texture.NEAREST_SAMPLINGMODE);
  activeDepthTexture.gammaSpace = false;

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
      "isStereoscopic",
    ],
    samplers: ["colorTexture", "depthTexture"],
  });

  sphereMat.setTexture("colorTexture", activeColorTexture);
  sphereMat.setTexture("depthTexture", activeDepthTexture);

  sphereMat.setFloat("maxDepth", currentMaxDepth);
  sphereMat.setFloat("isStereoscopic", isStereo ? 1.0 : 0.0);

  sphereMat.backFaceCulling = false;
  sphere.material = sphereMat;
  // sphereMat.setMatrix("viewProjection", scene.getTransformMatrix());

  // Update time uniform every frame for jitter
  let elapsedTime = 0;
  scene.registerBeforeRender(() => {
    elapsedTime += engine.getDeltaTime() / 1000;
    sphereMat.setFloat("u_time", elapsedTime);

    // const amplitude = 0.032;
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

    if (xrExperience.baseExperience) {
      xrExperience.baseExperience.onStateChangedObservable.add((state) => {
        if (state === WebXRState.NOT_IN_XR) {
          camera.position.setAll(0);
        }
      });

      scene.onBeforeRenderObservable.add(() => {
        if (xrExperience.baseExperience.state === WebXRState.IN_XR) {
          xrExperience.baseExperience.camera.position.setAll(0);
        }
      });
    } else {
      console.warn("WebXR not supported in this browser");
    }
  } catch (e) {
    console.warn("WebXR initialization failed:", e);
  }
};

let activeColorTexture: CubeTexture | null = null;
let activeDepthTexture: CubeTexture | null = null;
let currentMaxDepth = 8;
let isStereo = true;

export const updateTextures = (
  scene: Scene,
  urlPrefix: string,
  maxDepth?: number,
) => {
  currentMaxDepth = maxDepth !== undefined ? maxDepth : 8;
  const sphere = scene.getMeshByName("sphere");
  if (!sphere || !sphere.material) return;

  const sphereMat = sphere.material as ShaderMaterial;

  if (activeColorTexture) activeColorTexture.dispose();
  if (activeDepthTexture) activeDepthTexture.dispose();

  const colorUrls = [
    `${urlPrefix}color_px.png`,
    `${urlPrefix}color_py.png`,
    `${urlPrefix}color_pz.png`,
    `${urlPrefix}color_nx.png`,
    `${urlPrefix}color_ny.png`,
    `${urlPrefix}color_nz.png`,
  ];

  const depthUrls = [
    `${urlPrefix}depth_packed_px.png`,
    `${urlPrefix}depth_packed_py.png`,
    `${urlPrefix}depth_packed_pz.png`,
    `${urlPrefix}depth_packed_nx.png`,
    `${urlPrefix}depth_packed_ny.png`,
    `${urlPrefix}depth_packed_nz.png`,
  ];

  activeColorTexture = CubeTexture.CreateFromImages(colorUrls, scene, true);
  activeDepthTexture = CubeTexture.CreateFromImages(depthUrls, scene, true);
  activeDepthTexture.updateSamplingMode(Texture.NEAREST_SAMPLINGMODE);
  activeDepthTexture.gammaSpace = false;

  sphereMat.setTexture("colorTexture", activeColorTexture);
  sphereMat.setTexture("depthTexture", activeDepthTexture);

  sphereMat.setFloat("maxDepth", currentMaxDepth);
};

export const setMaxDepth = (scene: Scene, maxDepth: number) => {
  currentMaxDepth = maxDepth;
  const sphere = scene.getMeshByName("sphere");
  if (!sphere || !sphere.material) return;
  (sphere.material as ShaderMaterial).setFloat("maxDepth", currentMaxDepth);
};

export const setStereoscopic = (scene: Scene, isStereoscopic: boolean) => {
  isStereo = isStereoscopic;
  const sphere = scene.getMeshByName("sphere");
  if (!sphere || !sphere.material) return;
  (sphere.material as ShaderMaterial).setFloat(
    "isStereoscopic",
    isStereo ? 1.0 : 0.0,
  );
};
