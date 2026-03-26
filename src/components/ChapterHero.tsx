"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ChapterHeroProps {
  headline: string;
  subtitle: string;
  chapterLabel: string;
  color: string;
  bgGradient: string;
}

export default function ChapterHero({
  headline,
  subtitle,
  chapterLabel,
  color,
  bgGradient,
}: ChapterHeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      className={`relative h-screen flex flex-col items-center justify-center bg-gradient-to-b ${bgGradient}`}
    >
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.p
          className="text-sm md:text-base uppercase tracking-[0.3em] mb-6"
          style={{ color }}
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {chapterLabel}
        </motion.p>
        <motion.h2
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
          style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
          initial={reducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {headline}
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Decorative gradient orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
      />
    </section>
  );
}
