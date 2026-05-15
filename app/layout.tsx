import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spacely Demo | Depth-Parallax VR from 360° Photos",
  description:
    "A WebXR-enabled stereoscopic VR viewer that transforms monoscopic 360° panoramas into immersive depth-aware experiences using AI depth estimation and GPU ray marching. Built for Spacely R&D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="h-full flex flex-col">{children}</body>
    </html>
  );
}
