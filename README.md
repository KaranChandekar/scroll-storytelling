# The Changing Climate — Scroll-Driven Storytelling

An immersive, Apple-style scroll-driven storytelling website that takes you on a visual journey through climate change. Built with Next.js 15, GSAP ScrollTrigger, Framer Motion, D3.js, and Lenis smooth scrolling.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![GSAP](https://img.shields.io/badge/GSAP-3-green?logo=greensock)
![D3.js](https://img.shields.io/badge/D3.js-7-orange?logo=d3.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

## Overview

A 5-chapter narrative experience about "The Changing Climate" featuring scroll-driven animations, real-time data visualizations, parallax depth layers, and cinematic chapter transitions — all powered by scroll position.

## Features

- **Scroll-Driven Typewriter Hero** — Title types character-by-character as you scroll, powered by GSAP timeline scrubbed with ScrollTrigger
- **3-Layer Parallax** — Background, midground, and foreground layers move at different scroll speeds using Framer Motion `useTransform`
- **D3.js Data Visualizations** — Three animated charts (temperature line chart, regional bar chart, CO2 area chart) with scroll-triggered draw animations
- **Sticky Statistics** — Key climate stats pinned during scroll using GSAP ScrollTrigger `pin`
- **Cinematic Chapter Transitions** — Horizontal wipe transitions between all 5 chapters
- **Word-by-Word Text Reveals** — Narrative paragraphs animate in word-by-word with staggered delays
- **Progress Indicator** — Top bar showing scroll progress with chapter markers and tooltips
- **Smooth Scrolling** — Lenis integration with GSAP for buttery 60fps scrolling
- **Audio Controller** — Mute/unmute button for ambient chapter soundscapes
- **Accessibility** — Respects `prefers-reduced-motion`, semantic HTML, ARIA labels, screen reader data tables
- **Responsive** — Parallax disabled on mobile (<1024px) for performance

## Story Structure

| Chapter | Title | Key Feature |
|---------|-------|-------------|
| Hero | The Changing Climate | Scroll-driven typewriter effect |
| Chapter 1 | Our Planet Is Warming | Temperature anomaly line chart (1880–2024) |
| Chapter 2 | Weather Is Getting Wilder | Regional impact bar chart |
| Chapter 3 | The Ocean Is Changing | CO2 concentration area chart |
| Chapter 4 | Hope Through Innovation | 3-layer parallax with renewable energy imagery |
| Chapter 5 | Every Action Counts | Sticky stats and call to action |

## Tech Stack

- **Next.js 15** — App Router, TypeScript, dynamic imports for code splitting
- **GSAP + ScrollTrigger** — Scroll-driven animations, pinning, typewriter effect
- **Lenis** — Smooth scroll with easeOutExpo easing (1.2s duration)
- **Framer Motion** — Parallax layers, text reveals, viewport-triggered animations
- **D3.js** — SVG data visualizations with animated stroke-dasharray and area fills
- **Tailwind CSS** — Utility-first styling with custom theme colors

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to explore the story.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Playfair Display + Source Sans 3
│   ├── globals.css             # Global styles, Lenis config, animations
│   └── page.tsx                # Main page assembling all chapters
├── components/
│   ├── HeroSection.tsx         # Scroll-driven typewriter effect
│   ├── ProgressBar.tsx         # Top progress bar with chapter markers
│   ├── ChapterHero.tsx         # Full-screen chapter hero
│   ├── ChapterTransition.tsx   # Horizontal wipe transitions
│   ├── ParallaxSection.tsx     # 3-layer parallax with Framer Motion
│   ├── TextReveal.tsx          # Word-by-word text animation
│   ├── NarrativeBlock.tsx      # Narrative paragraph wrapper
│   ├── StickyStats.tsx         # GSAP pinned statistics
│   ├── VideoScrub.tsx          # Scroll-to-video scrubbing
│   ├── ImageSequence.tsx       # Canvas-based image sequence
│   ├── AudioController.tsx     # Ambient audio with crossfade
│   └── charts/
│       ├── TemperatureChart.tsx # D3 animated line chart
│       ├── RegionalBarChart.tsx # D3 staggered bar chart
│       └── CO2Chart.tsx        # D3 animated area chart
├── data/
│   └── climate-data.ts         # Climate datasets + chapter definitions
├── hooks/
│   ├── useWindowSize.ts        # Responsive sizing
│   └── useReducedMotion.ts     # Motion preference detection
└── providers/
    └── SmoothScrollProvider.tsx # Lenis + GSAP ScrollTrigger integration
```

## Customizing Content

- **Climate Data**: Edit `src/data/climate-data.ts` to update temperature, regional, and CO2 datasets
- **Chapter Content**: Modify chapter titles, narratives, and statistics in the same file
- **Images**: Swap Unsplash URLs in `src/app/page.tsx` with your own imagery
- **Colors**: Each chapter has a thematic color defined in the chapter data

## Data Sources

- [NASA GISS](https://data.giss.nasa.gov/) — Global temperature anomaly data
- [NOAA](https://www.noaa.gov/) — CO2 concentration measurements
- [Our World in Data](https://ourworldindata.org/) — Climate change datasets

## Assets

- **Images**: [Unsplash](https://unsplash.com/) — Free high-resolution editorial images
- **Fonts**: [Google Fonts](https://fonts.google.com/) — Playfair Display (headlines), Source Sans 3 (body)
- **Audio**: [Pixabay Music](https://pixabay.com/music/) — Royalty-free ambient soundtracks

## License

MIT
