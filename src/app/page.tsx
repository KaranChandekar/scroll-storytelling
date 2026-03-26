"use client";

import dynamic from "next/dynamic";
import { chapters } from "@/data/climate-data";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import HeroSection from "@/components/HeroSection";
import ProgressBar from "@/components/ProgressBar";
import ChapterHero from "@/components/ChapterHero";
import ChapterTransition from "@/components/ChapterTransition";
import NarrativeBlock from "@/components/NarrativeBlock";
import StickyStats from "@/components/StickyStats";
import ParallaxSection from "@/components/ParallaxSection";
import AudioController from "@/components/AudioController";

// Dynamic imports for heavy D3 chart components
const TemperatureChart = dynamic(
  () => import("@/components/charts/TemperatureChart"),
  { ssr: false }
);
const RegionalBarChart = dynamic(
  () => import("@/components/charts/RegionalBarChart"),
  { ssr: false }
);
const CO2Chart = dynamic(() => import("@/components/charts/CO2Chart"), {
  ssr: false,
});

// Unsplash images for parallax layers (free)
const IMAGES = {
  ice: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?w=1920&q=80",
  storm: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&q=80",
  ocean: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&q=80",
  coral: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=1920&q=80",
  solar: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80",
  wind: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&q=80",
  nature: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80",
  earth: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
  forest: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=1920&q=80",
  sky: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80",
};

export default function Home() {
  const ch = chapters;

  return (
    <SmoothScrollProvider>
      <ProgressBar />
      <AudioController currentChapter={1} />

      <main>
        {/* ===== HERO ===== */}
        <HeroSection />

        {/* ===== CHAPTER 1: OVERVIEW ===== */}
        <ChapterTransition
          color={ch[0].color}
          title={ch[0].title}
          subtitle={ch[0].subtitle}
        />

        <ChapterHero
          headline={ch[0].headline}
          subtitle="Rising temperatures. Melting ice. A crisis of unprecedented scope."
          chapterLabel={ch[0].title}
          color={ch[0].color}
          bgGradient={ch[0].bgGradient}
        />

        <ParallaxSection
          bgImage={IMAGES.earth}
          midImage={IMAGES.ice}
          bgColor="#0a1628"
        >
          <NarrativeBlock paragraphs={ch[0].narrativeBlocks} />
        </ParallaxSection>

        <section className="py-16 bg-gradient-to-b from-[#0a1628] to-[#0d1a30]">
          <TemperatureChart />
        </section>

        <StickyStats stats={ch[0].stats} color={ch[0].color} />

        {/* ===== CHAPTER 2: EXTREME WEATHER ===== */}
        <ChapterTransition
          color={ch[1].color}
          title={ch[1].title}
          subtitle={ch[1].subtitle}
        />

        <ChapterHero
          headline={ch[1].headline}
          subtitle="Hurricanes, droughts, and floods are becoming more frequent and severe."
          chapterLabel={ch[1].title}
          color={ch[1].color}
          bgGradient={ch[1].bgGradient}
        />

        <ParallaxSection
          bgImage={IMAGES.storm}
          midImage={IMAGES.sky}
          bgColor="#1a0a28"
        >
          <NarrativeBlock paragraphs={ch[1].narrativeBlocks} />
        </ParallaxSection>

        <section className="py-16 bg-gradient-to-b from-[#1a0a28] to-[#150820]">
          <RegionalBarChart />
        </section>

        <StickyStats stats={ch[1].stats} color={ch[1].color} />

        {/* ===== CHAPTER 3: OCEANS ===== */}
        <ChapterTransition
          color={ch[2].color}
          title={ch[2].title}
          subtitle={ch[2].subtitle}
        />

        <ChapterHero
          headline={ch[2].headline}
          subtitle="Coral bleaching, rising seas, and marine ecosystems under threat."
          chapterLabel={ch[2].title}
          color={ch[2].color}
          bgGradient={ch[2].bgGradient}
        />

        <ParallaxSection
          bgImage={IMAGES.ocean}
          midImage={IMAGES.coral}
          bgColor="#0a1e2e"
        >
          <NarrativeBlock paragraphs={ch[2].narrativeBlocks} />
        </ParallaxSection>

        <section className="py-16 bg-gradient-to-b from-[#0a1e2e] to-[#081a28]">
          <CO2Chart />
        </section>

        <StickyStats stats={ch[2].stats} color={ch[2].color} />

        {/* ===== CHAPTER 4: SOLUTIONS ===== */}
        <ChapterTransition
          color={ch[3].color}
          title={ch[3].title}
          subtitle={ch[3].subtitle}
        />

        <ChapterHero
          headline={ch[3].headline}
          subtitle="Renewable energy, carbon capture, and nature-based innovation are scaling fast."
          chapterLabel={ch[3].title}
          color={ch[3].color}
          bgGradient={ch[3].bgGradient}
        />

        <ParallaxSection
          bgImage={IMAGES.solar}
          midImage={IMAGES.wind}
          fgImage={IMAGES.forest}
          bgColor="#0a2818"
        >
          <NarrativeBlock paragraphs={ch[3].narrativeBlocks} />
        </ParallaxSection>

        <StickyStats stats={ch[3].stats} color={ch[3].color} />

        {/* ===== CHAPTER 5: CALL TO ACTION ===== */}
        <ChapterTransition
          color={ch[4].color}
          title={ch[4].title}
          subtitle={ch[4].subtitle}
        />

        <ChapterHero
          headline={ch[4].headline}
          subtitle="Individual responsibility, collective impact, and a future worth fighting for."
          chapterLabel={ch[4].title}
          color={ch[4].color}
          bgGradient={ch[4].bgGradient}
        />

        <ParallaxSection
          bgImage={IMAGES.nature}
          midImage={IMAGES.forest}
          bgColor="#2a1a08"
        >
          <NarrativeBlock paragraphs={ch[4].narrativeBlocks} />
        </ParallaxSection>

        <StickyStats stats={ch[4].stats} color={ch[4].color} />

        {/* ===== FOOTER ===== */}
        <footer className="relative py-32 text-center bg-gradient-to-b from-[#2a1a08] to-[#0a0a0a]">
          <div className="max-w-2xl mx-auto px-6">
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 text-amber-400"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              The story continues with you.
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              Climate change is the defining challenge of our time. Every action
              you take, every choice you make, writes the next chapter of this
              story.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://ourworldindata.org/climate-change"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors text-sm"
              >
                Learn More
              </a>
              <a
                href="https://www.un.org/en/climatechange"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors text-sm"
              >
                Take Action
              </a>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-16">
            Built with Next.js, GSAP, Framer Motion, D3.js, and Lenis.
            <br />
            Data: NASA GISS, NOAA, Our World in Data. Images: Unsplash.
          </p>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}
