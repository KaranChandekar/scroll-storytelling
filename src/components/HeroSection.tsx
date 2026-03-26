"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "The Changing Climate";
const SUBTITLE = "A Visual Journey Through Our Warming World";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    if (!section || !titleEl || !subtitleEl) return;

    // Wrap each character in a span
    titleEl.innerHTML = TITLE.split("")
      .map(
        (ch) =>
          `<span class="inline-block opacity-0" style="transform:translateY(10px)">${ch === " " ? "&nbsp;" : ch}</span>`
      )
      .join("");

    subtitleEl.innerHTML = SUBTITLE.split("")
      .map(
        (ch) =>
          `<span class="inline-block opacity-0" style="transform:translateY(10px)">${ch === " " ? "&nbsp;" : ch}</span>`
      )
      .join("");

    const titleChars = titleEl.querySelectorAll("span");
    const subtitleChars = subtitleEl.querySelectorAll("span");
    const allChars = [...Array.from(titleChars), ...Array.from(subtitleChars)];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=500",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(allChars, {
      opacity: 1,
      y: 0,
      stagger: 0.02,
      ease: "power2.out",
    });

    // Scroll indicator fade out
    const indicator = section.querySelector(".scroll-indicator");
    if (indicator) {
      gsap.to(indicator, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050a15 0%, #0a1628 100%)" }}
      aria-label="Hero section"
    >
      {/* Background atmospheric effect */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <noscript>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          >
            {TITLE}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">{SUBTITLE}</p>
        </noscript>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-heading), 'Playfair Display', serif" }}
          aria-label={TITLE}
        >
          {TITLE}
        </h1>
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300"
          aria-label={SUBTITLE}
        >
          {SUBTITLE}
        </p>
        <span
          ref={cursorRef}
          className="typewriter-cursor inline-block w-0.5 h-12 bg-white ml-1 align-middle"
          aria-hidden="true"
        />
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-sm tracking-widest uppercase">Scroll to explore</span>
        <svg
          className="w-6 h-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
