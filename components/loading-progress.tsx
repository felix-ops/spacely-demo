import React from "react";

interface LoadingProgressProps {
  progress: number;
}

export default function LoadingProgress({ progress }: LoadingProgressProps) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-black p-3 rounded-lg border border-white/20 shadow-xl flex flex-col gap-2 w-52 text-white">
        {/* Sleek header */}
        <div className="flex items-center gap-2 px-1">
          <svg
            className="animate-spin h-3.5 w-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-[10px] font-bold font-sans tracking-wider uppercase text-neutral-400">
            Loading Images
          </span>
        </div>

        {/* Progress bar and text */}
        <div className="flex flex-col gap-1.5 px-1 mt-1">
          <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-white/5">
            <div
              className="bg-white h-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
            <span>Progress</span>
            <span className="font-bold text-white">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
