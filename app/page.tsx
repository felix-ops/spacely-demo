"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAssetUrl } from "./environments";

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
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
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
      <section className="relative pt-28 pb-8 bg-gray-50 border-b border-black/5 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2 mb-6">
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

              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-6 text-black">
                From a Single 360° Image to Stereoscopic VR
              </h1>
              {/* 
              <p
                className="text-base text-gray-600 leading-relaxed mb-8 opacity-0 animate-slide-up max-w-2xl"
                style={{ animationDelay: "0.3s" }}
              >
                A depth-parallax viewer that transforms standard panoramas into
                WebXR-ready experiences. Currently powered by the DA² depth AI
                model for 360 degree depth conversion and real-time GPU
                rendering. The architecture readily supports future
                advancements, where integrating metric models can provide highly
                realistic size estimations.
              </p> */}

              <div className="flex flex-wrap items-center gap-3">
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

                <a
                  href="https://github.com/felix-ops/spacely-demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-black font-medium text-sm rounded-lg border border-black/10 transition-all shadow-sm"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column - Carousel */}
            <div className="relative w-full group">
              <HeroCarousel />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-black/10">
            {[
              { value: "Stereo VR", label: "Realistic Depth Perception" },
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
      <section id="pipeline" className="py-16 bg-white">
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
              href="https://buva.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              My Website
            </a>
            <a
              href="https://github.com/felix-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              Github
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
    description: (
      <>
        Feed the imagery through the{" "}
        <a
          href="https://github.com/EnVision-Research/DA-2"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black font-semibold transition-colors"
        >
          DA² depth AI model
        </a>
        . The model predicts per-pixel distance from the camera, generating a
        complete spatial map from a 2D photograph.
      </>
    ),
    tags: ["DA²", "Monocular", "AI / ML"],
  },
  {
    title: "16-bit Depth Packing",
    description:
      "Encode the resultant map as a 16-bit precision PNG using R + G/255 channel packing. This preserves fine detail while keeping the format web-compatible.",
    tags: ["16-bit", "R+G/255 Encoding", "PNG"],
  },
  {
    title: "GPU Ray Marching (For Parallax)",
    description:
      "A custom GLSL fragment shader traverses through the field in real-time. By utilizing an optimized distance thresholding algorithm, it efficiently locates the proper surface geometry.",
    tags: ["GLSL", "Ray Marching", "Binary Search"],
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

function HeroCarousel() {
  const slides = [
    {
      image: "slide_show/rico_theta_cubemap.png",
      title: pipelineSteps[0].title,
      description: pipelineSteps[0].description,
    },
    {
      image: "slide_show/classroom_depth.png",
      title: pipelineSteps[1].title,
      description: pipelineSteps[1].description,
    },
    {
      image: "slide_show/canvas_loop.gif",
      title: pipelineSteps[3].title,
      description: pipelineSteps[3].description,
    },
    {
      image: "slide_show/stereo_explanation.png",
      title: pipelineSteps[4].title,
      description: pipelineSteps[4].description,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [slides.length, currentIndex]);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Title above image */}
      <div className="mb-4 grid">
        {slides.map((slide, idx) => (
          <h3
            key={idx}
            className={`col-start-1 row-start-1 text-xl font-bold text-black transition-opacity duration-500 ${
              idx === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={idx !== currentIndex}
          >
            {slide.title}
          </h3>
        ))}
      </div>

      {/* Images */}
      <div
        className="relative w-full aspect-video bg-transparent cursor-pointer"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
      >
        {slides.map((slide, idx) => (
          <img
            key={idx}
            src={getAssetUrl(slide.image)}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-100 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Description below image */}
      <div className="mt-4">
        <div className="grid">
          {slides.map((slide, idx) => (
            <p
              key={idx}
              className={`col-start-1 row-start-1 text-sm text-gray-600 transition-opacity duration-500 ${
                idx === currentIndex
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={idx !== currentIndex}
            >
              {slide.description}
            </p>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-black"
                  : "w-1.5 bg-black/20 hover:bg-black/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
