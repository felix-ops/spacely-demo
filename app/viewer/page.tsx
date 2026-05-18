"use client";

import BabylonScene from "@/components/babylon-renderer";
import { setup, updateTextures } from "../viewport";
import { useState, useEffect } from "react";
import type { Scene } from "@babylonjs/core/scene";
import type { Engine } from "@babylonjs/core/Engines/engine";
import EnvironmentSelector from "@/components/environment-selector";
import { ENVIRONMENTS } from "@/app/environments";

export default function ViewerPage() {
  const [scene, setScene] = useState<Scene | null>(null);
  const [selectedEnv, setSelectedEnv] = useState(ENVIRONMENTS[0]);
  const [resolutionScale, setResolutionScale] = useState(1.0);
  const [renderDetails, setRenderDetails] = useState<{ width: number; height: number } | null>(null);

  const handleSceneReady = async (s: Scene, e: Engine) => {
    await setup(s, e, selectedEnv.color, selectedEnv.depth, selectedEnv.maxDepth);
    setScene(s);
  };

  useEffect(() => {
    if (scene) {
      updateTextures(scene, selectedEnv.color, selectedEnv.depth, selectedEnv.maxDepth);
    }
  }, [selectedEnv, scene]);

  const totalPixels = renderDetails ? renderDetails.width * renderDetails.height : 0;
  const megapixels = renderDetails ? (totalPixels / 1000000).toFixed(2) : "0.00";
  const formattedPixels = renderDetails ? new Intl.NumberFormat().format(totalPixels) : "0";

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
      />

      {/* Render Resolution Settings Panel */}
      <div className="absolute bottom-4 left-4 z-10 bg-black/40 p-3 rounded-lg backdrop-blur-md border border-white/10 shadow-lg w-64 text-neutral-200">
        <label className="block text-[10px] font-bold text-neutral-400 mb-1.5 uppercase tracking-wider px-1">
          Render Resolution
        </label>
        
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold tracking-wide text-neutral-300">Scale</span>
          <span className="text-xs font-bold font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            {Math.round(resolutionScale * 100)}%
          </span>
        </div>

        <div className="px-1 mb-4">
          <input
            type="range"
            min="0.25"
            max="8.0"
            step="0.05"
            value={resolutionScale}
            onChange={(e) => setResolutionScale(parseFloat(e.target.value))}
            className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all focus:outline-none"
          />
        </div>

        <div className="border-t border-neutral-800/60 pt-3 mt-1 space-y-2 px-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-neutral-500 font-medium">Dimensions</span>
            <span className="font-mono text-neutral-300 font-semibold">
              {renderDetails ? `${renderDetails.width} × ${renderDetails.height} px` : "--- × ---"}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-neutral-500 font-medium">Total Pixels</span>
            <span className="font-mono text-neutral-300 font-semibold">
              {renderDetails ? `${formattedPixels} px` : "---"}
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-neutral-500 font-medium">Megapixels</span>
            <span className="font-mono text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded text-[10px]">
              {renderDetails ? `${megapixels} MP` : "0.00 MP"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
