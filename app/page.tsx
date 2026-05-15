"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-black/10">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200" : "bg-transparent border-b border-transparent"}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center bg-black text-white font-bold text-xs">
              S
            </div>
            <span className="font-semibold tracking-tight text-sm">
              Spacely Demo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#pipeline"
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 bg-black/5 text-black font-medium text-xs rounded-md border border-black/10 hover:bg-black/10 hover:border-black/20 transition-all"
            >
              <span>Architecture</span>
            </a>
            <Link
              href="/viewer"
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white font-semibold text-xs rounded-md transition-all hover:bg-gray-800"
            >
              <span>Launch Viewer</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gray-50 border-b border-black/5">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div
              className="flex flex-wrap gap-2 mb-6 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-black/10 rounded-md text-[10px] font-mono font-medium text-gray-600 uppercase tracking-wider">
                WebXR
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-black/10 rounded-md text-[10px] font-mono font-medium text-gray-600 uppercase tracking-wider">
                Depth Estimation
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-black/10 rounded-md text-[10px] font-mono font-medium text-gray-600 uppercase tracking-wider">
                Ray Marching
              </span>
              <span className="inline-flex items-center px-2.5 py-1 bg-white border border-black/10 rounded-md text-[10px] font-mono font-medium text-gray-600 uppercase tracking-wider">
                Babylon.js
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 opacity-0 animate-slide-up text-black"
              style={{ animationDelay: "0.2s" }}
            >
              From a Single Photo to Immersive VR
            </h1>

            <p
              className="text-base text-gray-600 leading-relaxed mb-8 opacity-0 animate-slide-up max-w-2xl"
              style={{ animationDelay: "0.3s" }}
            >
              A depth-parallax viewer that transforms standard panoramas into
              WebXR-ready experiences. Currently powered by the DA² depth AI
              model for 360 degree depth conversion and real-time GPU rendering.
              The architecture readily supports future advancements, where
              integrating metric models can provide highly realistic size
              estimations.
            </p>

            <div
              className="opacity-0 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                href="/viewer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium text-sm rounded-lg transition-all hover:bg-gray-800"
              >
                <span>Experience Demo</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-black/10 opacity-0 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { value: "12+", label: "Environment Scenes" },
              { value: "3DoF", label: "Degrees of Freedom" },
              { value: "GLSL", label: "Efficient Ray Marching" },
              { value: "16-bit", label: "Depth Precision" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-black font-mono">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section
        id="pipeline"
        className="py-16 bg-white"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-black">
              System Architecture
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Six stages transform a regular capture into a fully immersive,
              depth-correct VR representation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col bg-gray-50 border border-black/10 rounded-xl p-5"
              >
                <div className="text-xs font-mono font-bold text-black mb-3">
                  STAGE {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-sm font-semibold mb-2 text-black">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4 flex-1">
                  {step.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2 py-0.5 bg-black/5 border border-black/5 rounded text-[9px] font-mono text-gray-500 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-gray-50 border-t border-black/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-3 text-black">
            Ready to See It in Action?
          </h2>
          <p className="text-sm text-gray-600 max-w-[500px] mx-auto mb-6">
            Explore 12+ environments with real-time depth parallax. Put on a VR
            headset for the full stereoscopic layout.
          </p>
          <Link
            href="/viewer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium text-sm rounded-lg transition-all hover:bg-gray-800"
          >
            <span>Launch Viewer</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-6 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-xs">
            Built by Bhuvaneshwaran M - Spacely R&amp;D Engineer Application
            Demo
          </div>
          <div className="flex gap-4 text-xs">
            <a
              href="https://corp.spacely.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              Spacely Corporate
            </a>
            <a
              href="https://corp.spacely.co.jp/recruit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              Careers
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Data ──────────────────────────────── */

const pipelineSteps = [
  {
    title: "360° Panoramic Capture",
    description:
      "Start with a standard 360° camera (Ricoh Theta, Insta360), the exact same cameras Spacely customers already use. No LiDAR, no depth sensor, just a single equirectangular photo.",
    tags: ["Equirectangular", "Single Image", "No Hardware"],
  },
  {
    title: "AI Depth Estimation",
    description:
      "Feed the imagery through the DA² depth AI model. The model predicts per-pixel distance from the camera, generating a complete spatial map from a 2D photograph.",
    tags: ["DA²", "Monocular", "AI / ML"],
  },
  {
    title: "16-bit Depth Packing",
    description:
      "Encode the resultant map as a 16-bit precision PNG using R + G/255 channel packing. This preserves fine detail while keeping the format web-compatible.",
    tags: ["16-bit", "R+G/255 Encoding", "PNG"],
  },
  {
    title: "GPU Ray Marching",
    description:
      "A custom GLSL fragment shader traverses through the field in real-time. By utilizing an optimized distance thresholding algorithm, it efficiently locates the proper surface geometry.",
    tags: [
      "GLSL",
      "Ray Marching",
      "Binary Search",
    ],
  },
  {
    title: "Stereoscopic Rendering",
    description:
      "Stereoscopy provides offset perspectives for each eye. WebXR provides per-eye view matrices automatically, producing correct parallax natively.",
    tags: ["WebXR", "Stereoscopy", "IPD"],
  },
  {
    title: "Immersive 3DoF",
    description:
      "The result is a fully browser-native VR layout with authentic perception. Since only rotation is allowed from the user's fixed point, we support a comfortable 3DoF system.",
    tags: ["Browser Native", "3DoF", "Real-time"],
  },
];
