import React, { useState, useRef, useEffect } from "react";

import { Environment, ENVIRONMENTS } from "@/app/environments";

interface EnvironmentSelectorProps {
  selectedEnv: Environment;
  onSelect: (env: Environment) => void;
}

export default function EnvironmentSelector({
  selectedEnv,
  onSelect,
}: EnvironmentSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <div className="bg-black/40 p-2 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
        <label className="block text-[10px] font-bold text-neutral-400 mb-1.5 uppercase tracking-wider px-1">
          Environment
        </label>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-48 flex items-center justify-between bg-neutral-800/90 hover:bg-neutral-700 text-neutral-200 px-3 py-2 rounded-md border border-neutral-600/50 focus:outline-none transition-colors text-xs"
        >
          <span className="truncate tracking-wide">{selectedEnv.name}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 text-neutral-400 ${isOpen ? "rotate-180" : ""}`}
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
          <div className="absolute top-full left-0 mt-2 w-full bg-neutral-800 border border-neutral-700 rounded-md shadow-xl overflow-hidden z-20">
            <div className="py-1 max-h-[60vh] overflow-y-auto">
              <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-3 py-2">
                Available Spaces
              </div>
              {ENVIRONMENTS.map((env) => (
                <button
                  key={env.name}
                  onClick={() => {
                    onSelect(env);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 text-xs transition-colors truncate ${
                    selectedEnv.name === env.name
                      ? "bg-blue-600/20 text-blue-400"
                      : "text-neutral-300 hover:bg-neutral-600"
                  }`}
                >
                  <span className="truncate">{env.name}</span>
                  {selectedEnv.name === env.name && (
                    <svg
                      className="w-3.5 h-3.5"
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
    </div>
  );
}
