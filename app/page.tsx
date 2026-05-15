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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-b border-gray-200" : "bg-transparent border-b border-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black text-white font-bold text-sm">
              S
            </div>
            <span className="font-semibold tracking-tight text-[1.05rem]">
              Spacely Demo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#pipeline"
              className="hidden md:inline-flex items-center gap-3 px-4 py-2 bg-black/5 text-black font-medium text-[0.8125rem] rounded-xl border border-black/10 hover:bg-black/10 hover:border-black/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>How it Works</span>
            </a>
            <Link
              href="/viewer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white font-semibold text-[0.8125rem] rounded-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] group"
            >
              <span className="relative z-10">Launch Viewer</span>
              <svg
                className="relative z-10 group-hover:translate-x-0.5 transition-transform"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[400px] h-[400px] bg-black/5 rounded-full blur-[80px] top-[10%] left-[-5%] animate-orb-float"></div>
          <div
            className="absolute w-[350px] h-[350px] bg-gray-500/10 rounded-full blur-[80px] top-[40%] right-[-5%] animate-orb-float"
            style={{ animationDelay: "-4s" }}
          ></div>
          <div
            className="absolute w-[300px] h-[300px] bg-black/5 rounded-full blur-[80px] bottom-[10%] left-[30%] animate-orb-float"
            style={{ animationDelay: "-8s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div
              className="flex flex-wrap gap-2 mb-6 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-gray-600">
                WebXR
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-gray-600">
                Depth Estimation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-gray-600">
                Ray Marching
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-gray-600">
                Babylon.js
              </span>
            </div>

            <h1
              className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-[-0.02em] mb-6 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              From a Single Photo{" "}
              <span className="bg-gradient-to-br from-black via-gray-800 to-gray-500 bg-clip-text text-transparent">
                to Immersive VR
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-gray-600 leading-[1.6] mb-10 opacity-0 animate-slide-up max-w-3xl"
              style={{ animationDelay: "0.5s" }}
            >
              A depth-parallax viewer that transforms standard panoramas into
              WebXR-ready experiences. Currently powered by the DA² depth AI
              model for 360 degree depth conversion and real-time GPU rendering.
              The architecture readily supports future advancements, where
              integrating metric models can even provide highly realistic size
              estimations.
            </p>

            <div
              className="flex flex-wrap gap-4 opacity-0 animate-slide-up"
              style={{ animationDelay: "0.7s" }}
            >
              <Link
                href="/viewer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-semibold text-[0.9375rem] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] group"
              >
                <span>Experience the Demo</span>
                <svg
                  className="group-hover:translate-x-1 transition-transform"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <a
                href="#relevance"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black/5 text-black font-medium text-[0.9375rem] rounded-xl border border-black/10 transition-all duration-300 hover:bg-black/10 hover:border-black/20 hover:-translate-y-1"
              >
                <span>Why Spacely?</span>
              </a>
            </div>
          </div>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 pt-10 border-t border-black/10 opacity-0 animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            {[
              { value: "12+", label: "Environment Scenes" },
              { value: "3DoF", label: "Degrees of Freedom" },
              { value: "GLSL", label: "Efficient Ray Marching" },
              { value: "16-bit", label: "Depth Precision" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold tracking-[-0.03em] bg-gradient-to-br from-black to-gray-500 bg-clip-text text-transparent animate-count-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
              The Challenge
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[700px] mx-auto">
              360° Photos Are Flat.{" "}
              <span className="text-gray-400">Real Spaces Are Not.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-[1.7] max-w-[640px] mx-auto">
              Standard players project images onto a sphere but without
              structural data, there is no physical parallax, no stereoscopy,
              and no genuine sense of physical scale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-black/5 backdrop-blur-xl border border-black/10 rounded-2xl p-8 transition-all duration-300 hover:border-black/20 hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 bg-black/5 text-black border border-black/10">
                <span>🔴</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">
                Traditional 360° Viewer
              </h3>
              <ul className="text-gray-600 leading-loose text-[0.9375rem] space-y-2">
                <li>• Fixed viewpoint with no head movement parallax</li>
                <li>• Monoscopic mapping identical for both eyes</li>
                <li>• Flat rendering without structural representation</li>
                <li>• Unconvincing virtual reality sensation</li>
              </ul>
            </div>
            <div className="bg-black/5 backdrop-blur-xl border border-black/20 rounded-2xl p-8 transition-all duration-300 hover:border-black/40 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 bg-black/10 text-black border border-black/20 relative z-10">
                <span>✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 relative z-10">
                This Demo&apos;s Approach
              </h3>
              <ul className="text-gray-700 leading-loose text-[0.9375rem] space-y-2 relative z-10">
                <li className="flex gap-2">
                  <span className="text-black">✓</span> Real parallax from
                  AI-estimated depth structures
                </li>
                <li className="flex gap-2">
                  <span className="text-black">✓</span> True stereoscopy via
                  per-eye ray marching
                </li>
                <li className="flex gap-2">
                  <span className="text-black">✓</span> 3DoF rotational head
                  movement support in WebXR
                </li>
                <li className="flex gap-2">
                  <span className="text-black">✓</span> No LiDAR or special
                  hardware required
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pipeline Section */}
      <section
        id="pipeline"
        className="py-24 bg-gray-50 border-t border-black/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
              Technical Pipeline
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[600px] mx-auto">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 leading-[1.7] max-w-[640px] mx-auto">
              Six stages transform a regular capture into a fully immersive,
              depth-correct VR representation.
            </p>
          </div>

          <div className="grid gap-0 max-w-4xl mx-auto">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.title}
                className="group flex flex-col items-center"
              >
                <div className="w-full relative overflow-hidden bg-white backdrop-blur-xl border border-black/10 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-black/20 hover:-translate-y-1 hover:shadow-[0_25px_80px_-20px_rgba(0,0,0,0.05)] z-10">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="flex flex-col md:flex-row items-start gap-5 md:gap-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm font-mono relative shrink-0 text-white bg-black border border-black/20">
                      {String(i + 1).padStart(2, "0")}
                      <div className="absolute -inset-[1px] rounded-[13px] bg-gradient-to-br from-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-[0.9375rem] leading-[1.7] mb-4">
                        {step.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 bg-black/5 border border-black/10 rounded-full text-xs font-medium text-gray-600 group-hover:border-black/30 group-hover:text-black transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className="w-[2px] h-12 bg-gradient-to-b from-black/30 to-transparent my-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spacely Relevance */}
      <section
        id="relevance"
        className="py-24 bg-white border-t border-black/5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500 mb-4">
              Strategic Alignment
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-5 max-w-[700px] mx-auto">
              Built for{" "}
              <span className="bg-gradient-to-br from-black to-gray-600 bg-clip-text text-transparent">
                Spacely&apos;s Mission
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-[1.7] max-w-[640px] mx-auto">
              Every technical decision in this project directly maps to
              Spacely&apos;s core product needs and R&amp;D direction.
            </p>
          </div>

          <div className="bg-black/5 backdrop-blur-xl border border-black/10 rounded-2xl overflow-hidden max-w-4xl mx-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-500 border-b border-black/10">
                    This Demo
                  </th>
                  <th className="w-[60px] border-b border-black/10"></th>
                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gray-500 border-b border-black/10">
                    Spacely&apos;s Need
                  </th>
                </tr>
              </thead>
              <tbody>
                {relevanceRows.map((row, i) => (
                  <tr
                    key={i}
                    className="group hover:bg-black/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-[0.9375rem] text-gray-700 font-medium border-b border-black/5 group-last:border-none">
                      {row.demo}
                    </td>
                    <td className="px-0 py-4 text-center text-black border-b border-black/5 group-last:border-none">
                      →
                    </td>
                    <td className="px-6 py-4 text-[0.9375rem] text-black font-medium border-b border-black/5 group-last:border-none">
                      {row.spacely}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white border-t border-black/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.15] tracking-[-0.02em] mb-5">
            Ready to See It in Action?
          </h2>
          <p className="text-lg text-gray-600 leading-[1.7] max-w-[640px] mx-auto mb-10">
            Explore 12+ environments with real-time depth parallax. Put on a VR
            headset for the full stereoscopic layout.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/viewer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-semibold text-[1.0625rem] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] group"
            >
              <span>Launch the Viewer</span>
              <svg
                className="group-hover:translate-x-1 transition-transform"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-[0.8125rem]">
            Built by Bhuvaneshwaran M - Spacely R&amp;D Engineer Application
            Demo
          </div>
          <div className="flex gap-6 text-[0.8125rem]">
            <a
              href="https://corp.spacely.co.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
            >
              Spacely Corporate
            </a>
            <a
              href="https://corp.spacely.co.jp/recruit/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
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
    tags: ["Equirectangular", "Single Image", "No Special Hardware"],
  },
  {
    title: "AI Monocular Depth Estimation",
    description:
      "Feed the imagery through the DA² depth AI model. The artificial intelligence predicts per-pixel distance from the camera, generating a complete spatial map from a 2D photograph.",
    tags: ["DA²", "Monocular Depth", "AI / ML"],
  },
  {
    title: "16-bit Depth Packing",
    description:
      "Encode the resultant map as a 16-bit precision PNG using R + G/255 channel packing. This preserves fine detail while keeping the format web-compatible and lightweight.",
    tags: ["16-bit Precision", "R+G/255 Encoding", "PNG Format"],
  },
  {
    title: "GPU Ray Marching",
    description:
      "A custom GLSL fragment shader traverses through the field in real-time. By utilizing an optimized distance thresholding algorithm, it efficiently locates the proper surface geometry, achieving sub-pixel accuracy while remaining highly performant. Temporal jitter eliminates stepping artifacts.",
    tags: [
      "GLSL",
      "Efficient Ray Marching",
      "Binary Search",
      "Temporal Jitter",
    ],
  },
  {
    title: "Stereoscopic Rendering",
    description:
      "Stereoscopy provides two slightly offset perspectives, one for each eye. The brain merges these to create true depth perception. WebXR provides per-eye view matrices automatically, producing correct parallax with the user's natural IPD natively, without requiring duplicate geometry or manual offsets.",
    tags: ["WebXR", "Stereoscopy", "IPD-Correct"],
  },
  {
    title: "Immersive 3DoF Experience",
    description:
      "The result is a fully browser-native VR layout with authentic perception. Since only rotation is allowed from the user's fixed point in space, we support a comfortable 3DoF rotational head movement system.",
    tags: ["Browser Native", "3DoF", "Real-time", "No App Install"],
  },
];

const relevanceRows = [
  {
    demo: "AI mapping from 360° photos",
    spacely: "3D Player converts 2D panoramas to 3D",
  },
  {
    demo: "Ray-marching depth parallax",
    spacely: "Smooth 3DoF rotation for VR viewing",
  },
  {
    demo: "WebXR stereo rendering",
    spacely: "Browser-based delivery to customers",
  },
  {
    demo: "No LiDAR / special sensors",
    spacely: "USP works with standard cameras",
  },
  {
    demo: "Real-time GPU performance",
    spacely: "Cloud platform needs fast execution",
  },
  {
    demo: "Multiple environment support",
    spacely: "Thousands of property listings at scale",
  },
];
