"use client";

import { useCallback } from "react";
import BabylonScene from "@/components/babylon-renderer";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import "@babylonjs/core/Helpers/sceneHelpers";

export const setup = async (scene: Scene, engine: Engine) => {
  // Dark background
  scene.clearColor = new Color4(0.05, 0.05, 0.08, 1);

  const canvas = engine.getRenderingCanvas();

  // Camera
  const camera = new ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    5,
    Vector3.Zero(),
    scene,
  );
  camera.attachControl(canvas, true);
  camera.wheelDeltaPercentage = 0.01;
  camera.minZ = 0.1;

  // Lights
  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;
  light.diffuse = new Color3(0.95, 0.9, 1);
  light.groundColor = new Color3(0.1, 0.1, 0.2);

  // Ground
  const ground = MeshBuilder.CreateGround(
    "ground",
    { width: 10, height: 10 },
    scene,
  );

  const groundMat = new StandardMaterial("groundMat", scene);
  groundMat.diffuseColor = new Color3(0.15, 0.15, 0.2);
  groundMat.specularColor = new Color3(0.05, 0.05, 0.05);
  ground.material = groundMat;

  // Sphere
  const sphere = MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1.5, segments: 32 },
    scene,
  );

  sphere.position.y = 1;
  const sphereMat = new StandardMaterial("sphereMat", scene);
  sphereMat.diffuseColor = new Color3(0.3, 0.6, 1);
  sphereMat.specularColor = new Color3(1, 1, 1);
  sphereMat.specularPower = 64;
  sphere.material = sphereMat;

  // Box
  const box = MeshBuilder.CreateBox("box", { size: 0.8 }, scene);
  box.position = new Vector3(-2, 0.4, 0);
  const boxMat = new StandardMaterial("boxMat", scene);
  boxMat.diffuseColor = new Color3(1, 0.4, 0.3);
  boxMat.specularColor = new Color3(1, 1, 1);
  boxMat.specularPower = 32;
  box.material = boxMat;

  // Torus
  const torus = MeshBuilder.CreateTorus(
    "torus",
    { diameter: 1, thickness: 0.3, tessellation: 32 },
    scene,
  );
  torus.position = new Vector3(2, 0.5, 0);
  const torusMat = new StandardMaterial("torusMat", scene);
  torusMat.diffuseColor = new Color3(0.4, 1, 0.5);
  torusMat.specularColor = new Color3(1, 1, 1);
  torusMat.specularPower = 48;
  torus.material = torusMat;

  // Animate the objects
  let t = 0;
  scene.registerBeforeRender(() => {
    t += engine.getDeltaTime() / 1000;
    sphere.position.y = 1 + Math.sin(t * 1.5) * 0.2;
    box.rotation.y += 0.01;
    box.rotation.x += 0.005;
    torus.rotation.x += 0.02;
    torus.rotation.z += 0.01;
  });

  // WebXR VR support
  try {
    const xrExperience = await scene.createDefaultXRExperienceAsync({
      floorMeshes: [ground],
    });

    if (!xrExperience.baseExperience) {
      console.warn("WebXR not supported in this browser");
    }
  } catch (e) {
    console.warn("WebXR initialization failed:", e);
  }
};
