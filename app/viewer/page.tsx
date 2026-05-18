"use client";

import BabylonScene from "@/components/babylon-renderer";
import {
  setup,
  updateTextures,
  setMaxDepth,
  setStereoscopic,
} from "../viewport";
import { useState, useEffect } from "react";
import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import EnvironmentSelector from "@/components/environment-selector";
import ResolutionPanel from "@/components/resolution-panel";
import LoadingProgress from "@/components/loading-progress";
import { ENVIRONMENTS } from "@/app/environments";

export default function ViewerPage() {
  const [scene, setScene] = useState<Scene | null>(null);
  const [selectedEnv, setSelectedEnv] = useState(ENVIRONMENTS[0]);
  const [resolutionScale, setResolutionScale] = useState(1.0);
  const [renderDetails, setRenderDetails] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [maxDepth, setMaxDepthState] = useState(ENVIRONMENTS[0].maxDepth || 8);
  const [isStereoscopic, setIsStereoscopicState] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);

  const handleSceneReady = async (s: Scene, e: Engine) => {
    setLoadingProgress(0);
    await setup(s, e, selectedEnv.urlPrefix, maxDepth, (p) => {
      setLoadingProgress(p);
    });
    setScene(s);
    setTimeout(() => setLoadingProgress(null), 500);
  };

  useEffect(() => {
    if (selectedEnv.maxDepth !== undefined) {
      setMaxDepthState(selectedEnv.maxDepth);
    }
  }, [selectedEnv]);

  useEffect(() => {
    if (scene) {
      const load = async () => {
        setLoadingProgress(0);
        await updateTextures(
          scene,
          selectedEnv.urlPrefix,
          selectedEnv.maxDepth,
          (p) => {
            setLoadingProgress(p);
          },
        );
        setTimeout(() => setLoadingProgress(null), 500);
      };
      load();
    }
  }, [selectedEnv, scene]);

  useEffect(() => {
    if (scene) {
      setMaxDepth(scene, maxDepth);
    }
  }, [maxDepth, scene]);

  useEffect(() => {
    if (scene) {
      setStereoscopic(scene, isStereoscopic);
    }
  }, [isStereoscopic, scene]);

  return (
    <div className="w-full h-full relative">
      <BabylonScene
        className="w-full h-full"
        onSceneReady={handleSceneReady}
        debug={true}
        resolutionScale={resolutionScale}
        onResolutionChange={(w, h) => setRenderDetails({ width: w, height: h })}
      />
      <EnvironmentSelector
        selectedEnv={selectedEnv}
        onSelect={setSelectedEnv}
        maxDepth={maxDepth}
        onMaxDepthChange={setMaxDepthState}
        isStereoscopic={isStereoscopic}
        onStereoscopicChange={setIsStereoscopicState}
      />
      {loadingProgress !== null && (
        <LoadingProgress progress={loadingProgress} />
      )}
      {/* <ResolutionPanel
        resolutionScale={resolutionScale}
        onResolutionScaleChange={setResolutionScale}
        renderDetails={renderDetails}
      /> */}
    </div>
  );
}
