"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
}

export default function TextReveal({
  text,
  className = "",
  as: Tag = "p",
}: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.3,
            delay: i * 0.03,
            ease: "easeOut",
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
