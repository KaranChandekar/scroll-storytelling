---
name: scroll-storytelling
description: Build an immersive scroll-driven storytelling website with Apple-style pinned sections, video scrubbing on scroll, typewriter text effects, parallax image layers, inline data visualizations, and chapter transitions. Use this skill when building interactive narratives, editorial experiences, long-form scroll stories, or Apple-product-page-style scroll animations. Trigger when the user mentions scroll storytelling, interactive narrative, scroll-driven animations, editorial interactive, video scrub on scroll, Apple-style scroll, or parallax story.
---

# Scroll-Driven Storytelling Skill

Build an immersive, narrative-focused web experience with Apple-inspired scroll mechanics, real-time video scrubbing, parallax depth effects, animated data visualizations, and cinematic chapter transitions.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Scroll Animation**: GSAP with ScrollTrigger for scroll-driven timelines
- **Smooth Scrolling**: Lenis (smooth scrolling library) for fluid scroll experience
- **UI Animation**: Framer Motion for component-level animations
- **Data Visualization**: D3.js for inline charts and interactive graphics
- **Styling**: Tailwind CSS with custom CSS for typography and effects
- **Language**: TypeScript for type safety
- **APIs**: Open-Meteo (weather), REST Countries (geography) for dynamic data

## Design Principles

- **Narrative-First**: Content hierarchy supports storytelling, not distraction
- **Apple-Style Minimalism**: Clean typography, generous whitespace, subtle motion
- **Immersive Depth**: Parallax layers create 3D sense of space
- **Progressive Complexity**: Visual effects scale up as user scrolls deeper
- **Performance-Aware**: Animations respect `prefers-reduced-motion`, optimize for 60 FPS

## Core Architecture

### Story Structure and Chapter Framework

Organize content as chapter-based sections, each with dedicated scroll behavior:

```typescript
type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  theme: 'light' | 'dark';
  backgroundColor: string;
  content: {
    text: string[];
    images: string[];
    videoUrl?: string;
    dataViz?: 'chart' | 'map' | 'timeline';
  };
};

const chapters: Chapter[] = [
  {
    id: 'intro',
    title: 'The Changing Climate',
    subtitle: 'A Visual Journey Through Our Warming World',
    theme: 'dark',
    backgroundColor: '#1a1a1a',
    // ...
  },
  // more chapters
];
```

**Chapter Components:**
- Full-screen hero section (title + subtitle)
- Multiple content sections within each chapter
- Pinned sections for scroll-triggered reveals
- Chapter-to-chapter transitions with full-screen wipes

### Lenis Smooth Scrolling Setup

Implement butter-smooth scrolling that enhances perceived quality:

```typescript
import Lenis from '@studio-freight/lenis';

useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2, // Scroll duration in seconds
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => lenis.destroy();
}, []);
```

**Benefits:**
- Eliminates jankiness of default scroll
- Consistent across browsers and devices
- Integrates with GSAP ScrollTrigger
- Can be disabled on mobile for performance

### Hero Title with Typewriter Effect

Create an engaging opening with animated text that "types" as user scrolls:

```typescript
const heroText = 'The Changing Climate';
const [displayedText, setDisplayedText] = useState('');

useEffect(() => {
  // Scrub typewriter effect based on scroll progress
  const handleScroll = () => {
    const progress = Math.min(window.scrollY / 500, 1); // Complete within 500px
    const charCount = Math.floor(heroText.length * progress);
    setDisplayedText(heroText.slice(0, charCount));
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Alternative: Use GSAP timeline scrubbed by ScrollTrigger
useEffect(() => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '[data-hero]',
      start: 'top top',
      end: 'bottom 50%',
      scrub: 1, // Tie animation to scrollbar (1 = 1 second delay)
      markers: true, // Debug markers (remove in production)
    },
  });

  timeline.from('[data-hero-text]', {
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 1,
  });
}, []);
```

**Implementation:**
- Map scroll position (0-100%) to character count (0-full text)
- Smooth character reveal, not letter-by-letter jerky
- Use monospace font for consistent character widths
- Optional: Add blinking cursor at end of visible text
- Fallback: If JavaScript disabled, show full text immediately

### Video Scrubbing on Scroll

Synchronize video playback to scroll position for cinematic effect:

```typescript
const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleScroll = () => {
    // Map scroll position within container to video progress
    const container = document.querySelector('[data-video-container]');
    const containerTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress (0 to 1) within this container
    const scrollProgress = 1 - (containerTop / (windowHeight + containerHeight));
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Map progress to video time
    video.currentTime = clampedProgress * video.duration;
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<video
  ref={videoRef}
  data-video-container
  className="w-full h-auto"
  preload="metadata"
>
  <source src="/video/chapter1.mp4" type="video/mp4" />
</video>
```

**Advanced Setup with GSAP:**
```typescript
useEffect(() => {
  gsap.to(videoRef.current, {
    currentTime: videoRef.current.duration,
    duration: 1,
    scrollTrigger: {
      trigger: '[data-video-container]',
      start: 'top center',
      end: 'bottom center',
      scrub: 1, // Smooth scrubbing
      onUpdate: (self) => {
        // Optionally add parallax or other effects
      },
    },
  });
}, []);
```

**Video Optimization:**
- Use MP4 codec with H.264 for broad browser support
- Compress to 5-15 MB for typical chapter videos
- Provide WebM fallback for better compression
- Preload first chapter, lazy-load others
- Use `preload="metadata"` to load duration without full download

### Parallax Image Layers

Create 3D depth effect with multiple image layers moving at different speeds:

```typescript
const parallaxVariants = {
  foreground: { y: 0 },
  midground: { y: '-20px' },
  background: { y: '-50px' },
};

<motion.div
  className="relative h-screen overflow-hidden"
  initial="initial"
  whileInView="inView"
  viewport={{ once: false, amount: 0.3 }}
>
  {/* Background layer - moves slowest */}
  <motion.img
    src="/images/bg-mountains.jpg"
    className="absolute inset-0 w-full h-full object-cover"
    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
  />

  {/* Midground layer */}
  <motion.img
    src="/images/forest.png"
    className="absolute inset-0 w-full h-full object-cover"
    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
  />

  {/* Foreground layer - moves with scroll */}
  <motion.img
    src="/images/rocks.png"
    className="absolute inset-0 w-full h-full object-cover"
    style={{ y: useTransform(scrollYProgress, [0, 1], [0, 20]) }}
  />

  {/* Text overlay */}
  <div className="relative z-10 flex items-center justify-center h-full">
    <h2 className="text-6xl text-white text-center">{title}</h2>
  </div>
</motion.div>
```

**Implementation Details:**
- Typically 3 layers: background (slowest), midground (medium), foreground (fastest)
- Use `useViewportScroll()` from Framer Motion to get scroll progress
- `useTransform()` maps scroll progress to Y position
- Layers move in opposite Y direction (negative = up)
- Parallax ratios: bg: 0.3x, mid: 0.6x, fg: 1.0x (relative to scroll speed)
- Consider mobile: disable parallax on devices < 1024px wide for performance

### Inline Data Visualizations with D3.js

Embed animated charts that build on scroll:

```typescript
import { LineChart, BarChart, AreaChart } from 'd3-components';

<motion.section
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true, amount: 0.3 }}
>
  <h3>Global Temperature Rise</h3>

  {/* Line chart that animates when scrolled into view */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <LineChart
      data={temperatureData}
      width={800}
      height={400}
      animate={true}
      animationDuration={1000}
    />
  </motion.div>

  <p className="mt-8 text-lg text-gray-700">
    Since 1880, global temperatures have risen by 1.1°C, with acceleration
    in recent decades.
  </p>
</motion.section>
```

**Chart Types to Implement:**
- **Line Chart**: Temperature trends over time
- **Bar Chart**: Regional climate impacts, emissions by country
- **Area Chart**: Atmospheric CO2 concentration
- **Map Visualization**: Geographic data (country population, climate zones)

**D3 Integration:**
- Use React-wrapped D3 components for integration
- Animate chart path strokes with SVG stroke-dasharray
- Color gradients for visual impact
- Responsive sizing with `useWindowSize()` hook
- Legends with toggleable series

### Text Reveals (Word-by-Word, Line-by-Line)

Animate text reveal as section scrolls into view:

```typescript
const MotionParagraph = ({ text }) => {
  const words = text.split(' ');

  return (
    <motion.p className="text-lg leading-relaxed">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.02, duration: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className="inline"
        >
          {word}{' '}
        </motion.span>
      ))}
    </motion.p>
  );
};
```

**Variations:**
- **Word-by-word reveal**: Stagger each word (delay multiplier: 0.02-0.05s)
- **Line-by-line reveal**: Group words into lines, stagger by line
- **Fade in**: Simple opacity animation (opacity: 0 → 1)
- **Slide up**: Combine opacity with Y translation
- **Scale in**: Grow from center (scale: 0.8 → 1.0)

**Performance:**
- Limit stagger delay to avoid excessive element re-renders
- Use `whileInView` to trigger only when scrolled into viewport
- Set `viewport={{ once: true }}` to animate only on first view

### Progress Indicator Bar

Display scroll progress with chapter markers:

```typescript
const ProgressBar = ({ chapters, currentChapter }) => {
  const scrollProgress = useMotionValueEvent(); // 0 to 1
  const [chapterMarkers, setChapterMarkers] = useState([]);

  useEffect(() => {
    // Calculate chapter scroll positions
    const markers = chapters.map((chapter) => {
      const element = document.querySelector(`[data-chapter="${chapter.id}"]`);
      const offsetTop = element?.offsetTop || 0;
      const height = element?.offsetHeight || 0;
      return {
        id: chapter.id,
        progress: offsetTop / (document.documentElement.scrollHeight - window.innerHeight),
        title: chapter.title,
      };
    });
    setChapterMarkers(markers);
  }, [chapters]);

  return (
    <motion.div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500">
      <motion.div
        className="h-full w-full origin-left"
        style={{ scaleX: scrollProgress }}
      />

      {/* Chapter markers */}
      {chapterMarkers.map((marker) => (
        <div
          key={marker.id}
          className="absolute top-0 h-1 w-0.5 bg-white"
          style={{ left: `${marker.progress * 100}%` }}
          title={marker.title}
        />
      ))}
    </motion.div>
  );
};
```

**Features:**
- Thin bar at very top of viewport
- Continuous progress from 0% to 100% (full page scroll)
- Small vertical ticks marking chapter boundaries
- Color gradient or gradient animation
- Tooltip on hover showing chapter name

### Chapter Transitions

Smooth visual transitions between chapters:

```typescript
const ChapterTransition = ({ fromChapter, toChapter }) => {
  return (
    <motion.div
      className={`fixed inset-0 z-50`}
      style={{ backgroundColor: toChapter.backgroundColor }}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    />
  );
};
```

**Transition Effects:**
- **Wipe (horizontal)**: Slide from right to left covering screen
- **Crossfade**: Fade out current chapter, fade in next
- **Vertical slide**: Slide from bottom or top
- **Color blend**: Fade through a solid color
- **Scale**: Zoom out current, zoom in next

**Timing:**
- Trigger when toChapter comes 80% into viewport
- Duration: 0.6-1.2 seconds
- Ease: easeInOut for smooth acceleration/deceleration

### Sticky Elements (Stats, Quotes)

Pin content during scroll, unpin when passing:

```typescript
useEffect(() => {
  gsap.to('[data-sticky]', {
    scrollTrigger: {
      trigger: '[data-sticky-container]',
      start: 'top 20%',
      end: 'bottom 20%',
      pin: true,
      pinSpacing: false, // Don't add extra spacing
    },
  });
}, []);
```

**Use Cases:**
- Key statistics or facts
- Important quotes
- Call-to-action buttons
- Navigation menus
- Chapter titles

**Behavior:**
- When scrolling into container: element pins to viewport
- While scrolling through container: element stays fixed
- After scrolling out: element unpins and continues with page flow
- Can pin multiple elements at different breakpoints

### Image Sequence Animation

Create stop-motion effect by rapidly swapping images on scroll:

```typescript
const ImageSequence = ({ imageBasePath, frameCount }) => {
  const containerRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const scrollProgress = (
        (window.scrollY - container.offsetTop) /
        (container.offsetHeight - window.innerHeight)
      );
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      const frameIndex = Math.floor(clampedProgress * (frameCount - 1));
      setCurrentFrame(frameIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [frameCount]);

  return (
    <div ref={containerRef} className="w-full h-96">
      <img
        src={`${imageBasePath}/frame-${currentFrame.toString().padStart(4, '0')}.jpg`}
        alt="Animation frame"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
```

**Use Cases:**
- Product 360° rotation
- Exploded diagrams
- Complex process breakdown
- Character expressions/animations

**Performance:**
- Pre-download and cache all images
- Use WebP format for smaller file size
- Limit frame count (30-60 frames typical)
- Show loading spinner while images cache

### Ambient Audio with Fade In/Out

Add subtle soundscapes that transition between chapters:

```typescript
const useAmbientAudio = (chapters) => {
  const audioRefs = useRef([]);

  useEffect(() => {
    chapters.forEach((chapter, index) => {
      const audio = new Audio(`/audio/${chapter.id}.mp3`);
      audio.loop = true;
      audio.volume = 0;
      audioRefs.current[index] = audio;
    });

    const handleScroll = () => {
      const scrollProgress = window.scrollY / document.documentElement.scrollHeight;
      const chapterIndex = Math.floor(scrollProgress * chapters.length);

      audioRefs.current.forEach((audio, index) => {
        if (index === chapterIndex) {
          gsap.to(audio, { volume: 0.3, duration: 1 });
          if (!audio.playing) audio.play();
        } else {
          gsap.to(audio, { volume: 0, duration: 1, onComplete: () => audio.pause() });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);
};
```

**Audio Considerations:**
- Keep volume low (0.2-0.4) to avoid overwhelming
- Use royalty-free ambient sounds (rain, wind, nature)
- Fade in/out over 1 second for smooth transitions
- Provide mute button to disable audio
- Don't autoplay without user interaction (browser policy)

## Free Resources

**Media:**
- **Editorial Images**: Unsplash (https://unsplash.com/) - high-resolution editorial photography
- **Video Footage**: Pexels Videos (https://www.pexels.com/videos/) - free stock videos
- **Ambient Audio**: Pixabay Music (https://pixabay.com/music/) - royalty-free soundtracks

**Data & APIs:**
- **Weather Data**: Open-Meteo (https://open-meteo.com/) - free weather API
- **Geographic Data**: REST Countries (https://restcountries.com/) - country data
- **Climate Data**: Our World in Data (https://ourworldindata.org/) - free climate datasets

**Fonts:**
- **Headlines**: Playfair Display (Google Fonts) - elegant serif
- **Body**: Source Sans Pro (Google Fonts) - clean, readable sans-serif
- **Monospace**: JetBrains Mono (Google Fonts) - for code/data

**Libraries:**
- D3.js (https://d3js.org/) - data visualization
- GSAP ScrollTrigger (https://greensock.com/scrolltrigger/) - scroll animations
- Lenis (https://github.com/studio-freight/lenis) - smooth scrolling

## Story Suggestions

**Option 1: "The Changing Climate"**
- Chapter 1: Overview (rising temperatures, ice melting)
- Chapter 2: Impact on Weather (extreme events increase)
- Chapter 3: Ocean Warming (coral bleaching, sea level rise)
- Chapter 4: Solutions (renewable energy, carbon capture)
- Chapter 5: Call to Action (individual actions matter)

**Option 2: "The Story of the Internet"**
- Chapter 1: Before (ARPANET, early computing)
- Chapter 2: Birth of Web (WWW invention, browsers)
- Chapter 3: Explosion (dotcom boom, social media)
- Chapter 4: Mobile Revolution (smartphones, apps)
- Chapter 5: Future (AI, decentralization, metaverse)

## File Structure

```
06-scroll-storytelling/
├── app/
│   ├── layout.tsx
│   └── page.tsx (main story page)
├── components/
│   ├── HeroSection.tsx
│   ├── ChapterSection.tsx
│   ├── VideoScrubber.tsx
│   ├── ParallaxSection.tsx
│   ├── DataVisualization.tsx
│   ├── TextReveal.tsx
│   ├── ProgressBar.tsx
│   ├── ChapterTransition.tsx
│   ├── StickyElement.tsx
│   ├── ImageSequence.tsx
│   └── AmbientAudio.tsx
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   ├── useAmbientAudio.ts
│   └── useParallax.ts
├── lib/
│   ├── chapters.ts (story structure and content)
│   ├── data.ts (API fetch functions)
│   └── animations.ts (reusable GSAP configs)
├── public/
│   ├── videos/ (chapter videos)
│   ├── images/ (parallax layers, backgrounds)
│   └── audio/ (ambient soundscapes)
└── styles/
    └── globals.css (custom animations, utilities)
```

## Implementation Steps

1. **Set up Next.js project** with GSAP, Framer Motion, Lenis, D3.js
2. **Define story structure** and content (chapters, sections, narrative flow)
3. **Create layout and Hero section** with typewriter effect
4. **Implement video scrubbing** for key chapter video
5. **Build parallax layers** for multiple sections
6. **Add data visualizations** with D3.js charts
7. **Implement text reveals** (word/line animations)
8. **Create progress bar** with chapter markers
9. **Build chapter transitions** with wipe/fade effects
10. **Add sticky elements** (stats, quotes)
11. **Implement image sequences** for animation sections
12. **Add ambient audio** with fade transitions
13. **Optimize media** (compress video, optimize images)
14. **Test on mobile** and optimize for lower-end devices
15. **Performance audit** (Core Web Vitals, Lighthouse)

## Performance Optimization

- **Lazy load media**: Use Intersection Observer for images/videos
- **Preload next chapter**: Fetch next chapter assets before user scrolls there
- **Optimize video codec**: Use H.264 for broad compatibility, compress heavily
- **Image optimization**: Use Next.js Image component with WebP format
- **Debounce scroll handlers**: Throttle scroll events to 60 FPS max
- **Code splitting**: Dynamic imports for heavy components (D3 visualizations)
- **Lighthouse target**: 90+ in all categories

## Accessibility

- **Keyboard navigation**: Allow chapter jumping with keyboard shortcuts
- **Skip animations**: Respect `prefers-reduced-motion` media query
- **Alt text**: Provide meaningful descriptions for all images
- **Color contrast**: Maintain 4.5:1 ratio for body text on backgrounds
- **Focus management**: Visible focus indicators for interactive elements
- **Audio captions**: Provide transcripts for ambient audio sections
- **Screen reader support**: Use semantic HTML, proper heading hierarchy
