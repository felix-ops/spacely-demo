"use client";

import BabylonScene from "@/components/babylon-renderer";
import { setup } from "./viewport";

export default function Home() {
  return (
    <BabylonScene className="w-full h-full" onSceneReady={setup} debug={true} />
  );
}
