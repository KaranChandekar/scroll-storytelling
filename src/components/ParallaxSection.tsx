"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxSectionProps {
  bgImage: string;
  midImage?: string;
  fgImage?: string;
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}

export default function ParallaxSection({
  bgImage,
  midImage,
  fgImage,
  children,
  className = "",
  bgColor = "#0a1628",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();
  const reducedMotion = useReducedMotion();
  const isMobile = width < 1024;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const shouldAnimate = !isMobile && !reducedMotion;

  return (
    <div
      ref={ref}
      className={`relative min-h-screen overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={shouldAnimate ? { y: bgY } : undefined}
      >
        <div
          className="w-full h-full bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${bgImage})` }}
          role="img"
          aria-label="Background parallax layer"
        />
      </motion.div>

      {/* Midground layer */}
      {midImage && (
        <motion.div
          className="absolute inset-0 w-full h-[116%] -top-[8%]"
          style={shouldAnimate ? { y: midY } : undefined}
        >
          <div
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${midImage})` }}
            role="img"
            aria-label="Midground parallax layer"
          />
        </motion.div>
      )}

      {/* Foreground layer */}
      {fgImage && (
        <motion.div
          className="absolute inset-0 w-full h-[106%] -top-[3%]"
          style={shouldAnimate ? { y: fgY } : undefined}
        >
          <div
            className="w-full h-full bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${fgImage})` }}
            role="img"
            aria-label="Foreground parallax layer"
          />
        </motion.div>
      )}

      {/* Content overlay */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
