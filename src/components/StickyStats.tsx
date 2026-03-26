"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StickyStatsProps {
  stats: { label: string; value: string }[];
  color: string;
}

export default function StickyStats({ stats, color }: StickyStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pinned = pinnedRef.current;
    if (!container || !pinned) return;

    ScrollTrigger.create({
      trigger: container,
      start: "top 20%",
      end: "bottom bottom",
      pin: pinned,
      pinSpacing: false,
    });

    // Animate stats in
    const statEls = pinned.querySelectorAll(".stat-item");
    statEls.forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container || st.pin === pinned) st.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div ref={pinnedRef} className="w-full">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-16 px-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item text-center opacity-0"
            >
              <div
                className="text-5xl md:text-7xl font-bold mb-2"
                style={{ color, fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm md:text-base tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
