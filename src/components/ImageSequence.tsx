"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageSequenceProps {
  frameCount: number;
  /** Function to generate URL for a given frame index */
  getFrameUrl: (index: number) => string;
  className?: string;
  altText?: string;
}

export default function ImageSequence({
  frameCount,
  getFrameUrl,
  className = "",
  altText = "Image sequence animation showing climate change impact",
}: ImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ current: 0 });

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img) return;

    canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fit image to canvas
    const scale = Math.max(
      canvas.width / img.width,
      canvas.height / img.height
    );
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount) {
          setLoading(false);
          renderFrame(0);
        }
      };
      img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount) setLoading(false);
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, [frameCount, getFrameUrl, renderFrame]);

  useEffect(() => {
    if (loading) return;
    const container = containerRef.current;
    if (!container) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const frame = Math.min(
          Math.floor(self.progress * frameCount),
          frameCount - 1
        );
        if (frame !== frameRef.current.current) {
          frameRef.current.current = frame;
          renderFrame(frame);
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [loading, frameCount, renderFrame]);

  return (
    <div ref={containerRef} className={`relative w-full h-screen ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-10">
          <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 rounded-full transition-all duration-200"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-3">Loading sequence... {loadProgress}%</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        role="img"
        aria-label={altText}
      />
    </div>
  );
}
