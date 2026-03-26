"use client";

import { useEffect, useRef, useState } from "react";
import { chapters } from "@/data/climate-data";

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, pct));
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapterPositions = chapters.map((_, i) => ((i + 1) / (chapters.length + 1)) * 100);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-black/30 backdrop-blur-sm"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        ref={barRef}
        className="h-full progress-gradient transition-[width] duration-75 ease-linear"
        style={{ width: `${progress}%` }}
      />
      {/* Chapter markers */}
      {chapters.map((chapter, i) => (
        <div
          key={chapter.id}
          className="absolute top-0 h-3 w-0.5 bg-white/60 cursor-pointer group"
          style={{ left: `${chapterPositions[i]}%` }}
          onMouseEnter={() => setHoveredChapter(chapter.subtitle)}
          onMouseLeave={() => setHoveredChapter(null)}
        >
          {hoveredChapter === chapter.subtitle && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap backdrop-blur-sm">
              {chapter.subtitle}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
