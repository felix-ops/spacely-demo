"use client";

import { useEffect, useRef, useState } from "react";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/loaders/glTF";
import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";

type BabylonSceneProps = {
  className?: string;
  onSceneReady: (scene: Scene, engine: Engine) => void;
  debug?: boolean;
  resolutionScale?: number;
  onResolutionChange?: (width: number, height: number) => void;
};

export default function BabylonScene({
  className,
  onSceneReady,
  debug = false,
  resolutionScale = 1.0,
  onResolutionChange,
}: BabylonSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onSceneReadyRef = useRef(onSceneReady);
  const debugRef = useRef(debug);
  const onResolutionChangeRef = useRef(onResolutionChange);

  // Keep refs up to date without triggering effect re-runs
  onSceneReadyRef.current = onSceneReady;
  debugRef.current = debug;
  onResolutionChangeRef.current = onResolutionChange;

  const [engine, setEngine] = useState<Engine | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    // initialize babylon scene and engine
    const mainEngine = new Engine(canvas, true, {
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: false,
      premultipliedAlpha: false,
    });
    setEngine(mainEngine);
    const scene = new Scene(mainEngine);

    // Execute the custom 3D code
    onSceneReadyRef.current(scene, mainEngine);

    // hide/show the Inspector
    const handleKeyDown = (ev: KeyboardEvent) => {
      // Shift+Ctrl+Alt+I
      if (
        debugRef.current &&
        ev.shiftKey &&
        ev.ctrlKey &&
        ev.altKey &&
        (ev.key === "I" || ev.key === "i")
      ) {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
      }
    };
    import("@babylonjs/inspector").then(() => {
      window.addEventListener("keydown", handleKeyDown);
    });

    // run the main render loop
    mainEngine.runRenderLoop(() => {
      scene.render();
    });

    // Handle window resize
    const handleResize = () => {
      mainEngine.resize();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      mainEngine.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Separate effect for resolution scaling
  useEffect(() => {
    if (!engine) return;

    const fixResolution = () => {
      const isPortrait = window.innerWidth < window.innerHeight;

      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent,
      );

      let maxWidth = 1920;
      let maxHeight = 1080;

      const mobileScaleFactor = 0.5;

      if (isMobile) {
        maxHeight *= mobileScaleFactor;
        maxWidth *= mobileScaleFactor;
      }

      const baseLevel = isPortrait
        ? window.innerWidth / maxHeight
        : window.innerWidth / maxWidth;

      // Adjust using our scale prop (higher scale means lower hardware scaling level, i.e., higher quality)
      engine.setHardwareScalingLevel(baseLevel / resolutionScale);

      // Report initial/updated resolution
      if (onResolutionChangeRef.current) {
        onResolutionChangeRef.current(engine.getRenderWidth(), engine.getRenderHeight());
      }
    };

    fixResolution();

    window.addEventListener("resize", fixResolution);
    window.addEventListener("orientationchange", fixResolution);

    return () => {
      window.removeEventListener("resize", fixResolution);
      window.removeEventListener("orientationchange", fixResolution);
    };
  }, [engine, resolutionScale]);

  return (
    <div className={className} style={{ background: "transparent" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          outline: "none",
          background: "transparent",
          display: "block",
        }}
        id="3DCanvas"
      />
    </div>
  );
}
