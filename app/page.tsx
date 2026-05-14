"use client";

import BabylonScene from "@/components/babylon-renderer";
import { setup, updateTextures } from "./viewport";
import { useState, useEffect } from "react";
import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import EnvironmentSelector from "@/components/environment-selector";
import { ENVIRONMENTS } from "@/app/environments";

export default function Home() {
  const [scene, setScene] = useState<Scene | null>(null);
  const [selectedEnv, setSelectedEnv] = useState(ENVIRONMENTS[0]);

  const handleSceneReady = async (s: Scene, e: Engine) => {
    await setup(s, e, selectedEnv.color, selectedEnv.depth);
    setScene(s);
  };

  useEffect(() => {
    if (scene) {
      updateTextures(scene, selectedEnv.color, selectedEnv.depth);
    }
  }, [selectedEnv, scene]);

  return (
    <div className="w-full h-full relative">
      <BabylonScene
        className="w-full h-full"
        onSceneReady={handleSceneReady}
        debug={true}
      />
      <EnvironmentSelector
        selectedEnv={selectedEnv}
        onSelect={setSelectedEnv}
      />
    </div>
  );
}
