import React, { useState, useRef, useEffect } from "react";

import { Environment, ENVIRONMENTS } from "@/app/viewer/environments";

interface EnvironmentSelectorProps {
  selectedEnv: Environment;
  onSelect: (env: Environment) => void;
  maxDepth: number;
  onMaxDepthChange: (val: number) => void;
  isStereoscopic: boolean;
  onStereoscopicChange: (val: boolean) => void;
}

export default function EnvironmentSelector({
  selectedEnv,
  onSelect,
  maxDepth,
  onMaxDepthChange,
  isStereoscopic,
  onStereoscopicChange,
}: EnvironmentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [depthInput, setDepthInput] = useState(maxDepth.toFixed(1));

  useEffect(() => {
    setDepthInput(maxDepth.toFixed(1));
  }, [maxDepth]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute top-4 left-4 z-10" ref={dropdownRef}>
      <div className="bg-black p-3 rounded-lg border border-white/20 shadow-xl flex flex-col gap-1 w-52 text-white">
        <div>
          <label className="block text-[10px] font-bold text-neutral-400 mb-1.5 uppercase tracking-wider px-1">
            Environment
          </label>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between bg-black hover:bg-neutral-900 text-white px-3 py-2 rounded-md border border-white/20 focus:outline-none transition-colors text-[10px] font-semibold"
          >
            <span className="truncate tracking-wide">{selectedEnv.name}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 text-neutral-300 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute left-full top-0 ml-2 w-52 bg-black border border-white/20 rounded-lg shadow-2xl overflow-hidden z-20">
              <div className="py-1 max-h-[60vh] overflow-y-auto">
                <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-3 py-2 border-b border-white/10">
                  Available Spaces
                </div>
                {ENVIRONMENTS.map((env) => (
                  <button
                    key={env.name}
                    onClick={() => {
                      onSelect(env);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-[10px] transition-colors truncate ${
                      selectedEnv.name === env.name
                        ? "bg-white/10 text-white font-bold"
                        : "text-neutral-300 hover:bg-neutral-900"
                    }`}
                  >
                    <span className="truncate">{env.name}</span>
                    {selectedEnv.name === env.name && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Max Depth Slider */}
        <div className="mt-2.5 pt-2.5 border-t border-white/10 w-full text-white">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">
              Max Depth
            </span>
            <div className="flex items-center gap-0.5 bg-white/10 px-1.5 py-0.5 rounded border border-white/20">
              <input
                type="text"
                value={depthInput}
                onChange={(e) => {
                  const str = e.target.value;
                  setDepthInput(str);
                  const parsed = parseFloat(str);
                  if (!isNaN(parsed) && parsed >= 1.0 && parsed <= 30.0) {
                    onMaxDepthChange(parsed);
                  }
                }}
                onBlur={() => {
                  let parsed = parseFloat(depthInput);
                  if (isNaN(parsed)) parsed = 8.0;
                  if (parsed < 1.0) parsed = 1.0;
                  if (parsed > 30.0) parsed = 30.0;
                  onMaxDepthChange(parsed);
                  setDepthInput(parsed.toFixed(1));
                }}
                className="w-10 bg-transparent text-white font-bold font-mono text-[10px] text-right focus:outline-none focus:ring-0 p-0 border-0 outline-none"
              />
              <span className="text-[10px] font-bold font-mono text-neutral-400 select-none">
                m
              </span>
            </div>
          </div>
          <div className="px-1">
            <input
              type="range"
              min="1.0"
              max="30.0"
              step="0.5"
              value={maxDepth}
              onChange={(e) => onMaxDepthChange(parseFloat(e.target.value))}
              className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-white transition-all focus:outline-none"
            />
          </div>
        </div>

        {/* Stereoscopic Toggle */}
        <div className="mt-2.5 pt-2.5 border-t border-white/10 px-1 w-full">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-[10px] font-semibold tracking-wide text-neutral-400 uppercase">
              Stereo Mode
            </span>
            <div className="relative w-8 h-4.5">
              <input
                type="checkbox"
                checked={isStereoscopic}
                onChange={(e) => onStereoscopicChange(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-8 h-4.5 rounded-full transition-colors ${
                  isStereoscopic ? "bg-white" : "bg-neutral-800"
                } border border-white/20`}
              ></div>
              <div
                className={`absolute top-[2px] left-[2px] rounded-full h-3.5 w-3.5 transition-all ${
                  isStereoscopic
                    ? "translate-x-3.5 bg-black"
                    : "translate-x-0 bg-neutral-400"
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
