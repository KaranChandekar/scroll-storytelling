"use client";

import TextReveal from "./TextReveal";

interface NarrativeBlockProps {
  paragraphs: string[];
  className?: string;
}

export default function NarrativeBlock({
  paragraphs,
  className = "",
}: NarrativeBlockProps) {
  return (
    <div
      className={`max-w-3xl mx-auto px-6 py-24 space-y-8 ${className}`}
    >
      {paragraphs.map((text, i) => (
        <TextReveal
          key={i}
          text={text}
          className="text-lg md:text-xl leading-relaxed text-gray-300"
        />
      ))}
    </div>
  );
}
