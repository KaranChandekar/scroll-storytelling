"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ChapterTransitionProps {
  color: string;
  title: string;
  subtitle: string;
}

export default function ChapterTransition({
  color,
  title,
  subtitle,
}: ChapterTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wipe = wipeRef.current;
    const text = textRef.current;
    if (!section || !wipe || !text) return;

    // Horizontal wipe transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 20%",
        scrub: 0.5,
      },
    });

    tl.fromTo(wipe, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, ease: "power2.inOut" });
    tl.fromTo(
      text,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Wipe overlay */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          backgroundColor: color,
          opacity: 0.15,
          transform: "scaleX(0)",
        }}
      />
      {/* Chapter title */}
      <div ref={textRef} className="relative z-10 text-center px-6 opacity-0">
        <p
          className="text-sm md:text-base uppercase tracking-[0.3em] mb-4"
          style={{ color }}
        >
          {title}
        </p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold"
          style={{ fontFamily: "var(--font-heading)", color }}
        >
          {subtitle}
        </h2>
      </div>
    </div>
  );
}
