# Spacely 3D Depth-Parallax Demo

A browser-native WebXR depth-parallax viewer that transforms standard 360° panoramas into fully immersive stereoscopic VR spaces. Built as part of a technical DX application pipeline showcasing real-time GPU-based depth reconstruction and spatial layout optimization.

---

## Key Features

- **3D Depth Parallax**: Simulates realistic spatial depth from a single equirectangular capture using custom GPU shaders.
- **DA² AI Depth Integration**: Leverages predicted spatial layouts parsed into high-precision 16-bit packed depth textures (R + G/255 encoding).
- **High-Performance GLSL Ray Marching**: Traverses packed distance layers natively in a customized Babylon.js render pipeline with optimized distance check search loops.
- **Interactive Metric Controls**:
  - **Max Depth Slider**: Adjust target environment boundary limits manually or dynamically between **1.0m and 30.0m** (with real-time keystroke input parsing and focus safety sanitization).
  - **Render Scale Optimizer**: Floating resolution modifier containing real-time pixel counter and MP (Megapixel) estimation metrics.
  - **Stereo/Mono Toggle**: Switches immediately between monoscopic presentation and stereoscopic rendering formats.
- **Refined Black-and-White Theme**: Floating side-docked panels designed with a premium, high-contrast black-and-white minimalist layout matching Spacely corporate guidelines.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Engine**: [Babylon.js](https://www.babylonjs.com/) (WebGL 2.0 / Custom GLSL shaders)
- **Package Manager**: `pnpm`

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/) installed.

### Installation

1. Clone the repository and navigate to the project root:

   ```bash
   git clone https://github.com/felix-ops/spacely-demo.git
   cd spacely-demo
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

Start the local development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the landing page and launch the interactive WebGL viewport.

---

## Core Technical Pipeline

1. **Panorama Capture**: Captures 360° panoramas using client-accessible cameras (Ricoh Theta, Insta360).
2. **AI Model parsing**: Generates a monocular depth prediction map utilizing the DA² spatial layout neural network.
3. **16-Bit Compression**: Packs depth distance outputs directly into standard web-legible png files.
4. **Distance Marching**: Custom ray marching fragment shaders track camera-to-surface intersection in real-time, outputting dynamic view parallax.
5. **WebXR Translation**: Produces per-eye offset projections inside compatible browser headsets natively.
