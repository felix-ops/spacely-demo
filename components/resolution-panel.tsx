import React from "react";

interface ResolutionPanelProps {
  resolutionScale: number;
  onResolutionScaleChange: (val: number) => void;
  renderDetails: { width: number; height: number } | null;
}

export default function ResolutionPanel({
  resolutionScale,
  onResolutionScaleChange,
  renderDetails,
}: ResolutionPanelProps) {
  const totalPixels = renderDetails
    ? renderDetails.width * renderDetails.height
    : 0;
  const megapixels = renderDetails
    ? (totalPixels / 1000000).toFixed(2)
    : "0.00";
  const formattedPixels = renderDetails
    ? new Intl.NumberFormat().format(totalPixels)
    : "0";

  return (
    <div className="absolute bottom-4 left-4 z-10 bg-black p-3 rounded-lg border border-white/20 shadow-xl w-64 text-white">
      <label className="block text-[10px] font-bold text-neutral-400 mb-1.5 uppercase tracking-wider px-1">
        Render Resolution
      </label>

      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-xs font-semibold tracking-wide text-neutral-300">
          Scale
        </span>
        <span className="text-xs font-bold font-mono text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">
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
          onChange={(e) => onResolutionScaleChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white transition-all focus:outline-none"
        />
      </div>

      <div className="border-t border-white/10 pt-3 mt-1 space-y-2 px-1">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400 font-medium">Dimensions</span>
          <span className="font-mono text-neutral-200 font-semibold">
            {renderDetails
              ? `${renderDetails.width} × ${renderDetails.height} px`
              : "--- × ---"}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400 font-medium">Total Pixels</span>
          <span className="font-mono text-neutral-200 font-semibold">
            {renderDetails ? `${formattedPixels} px` : "---"}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-neutral-400 font-medium">Megapixels</span>
          <span className="font-mono text-white font-bold bg-white/10 px-1.5 py-0.5 rounded border border-white/20 text-[10px]">
            {renderDetails ? `${megapixels} MP` : "0.00 MP"}
          </span>
        </div>
      </div>
    </div>
  );
}
