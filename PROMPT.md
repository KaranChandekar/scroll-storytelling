# Scroll-Driven Storytelling - Claude Code Prompt

Build an immersive, Apple-style scroll-driven storytelling website with pinned sections, real-time video scrubbing on scroll, animated typewriter text reveals, parallax depth layers, inline D3.js data visualizations, and cinematic chapter transitions. Create a narrative experience around "The Changing Climate" with 5 chapters.

## Core Requirements

### Tech Stack Setup
- Initialize Next.js 15 with TypeScript
- Install: GSAP with ScrollTrigger, Lenis, Framer Motion, D3.js, Tailwind CSS
- Configure Lenis for smooth scrolling (duration: 1.2s, easing: easeOutExpo)
- Set up GSAP ScrollTrigger integration with Lenis

### Story Structure
Create a 5-chapter narrative: "The Changing Climate"
1. **Chapter 1: Overview** - Rising temperatures, melting ice, crisis scope
2. **Chapter 2: Weather Impact** - Extreme weather events becoming more frequent
3. **Chapter 3: Ocean Warming** - Coral bleaching, sea level rise
4. **Chapter 4: Solutions** - Renewable energy, carbon capture, innovation
5. **Chapter 5: Call to Action** - Individual responsibility and hope

Each chapter should:
- Full-screen hero with title and subtitle
- Multiple content sections
- Pinned scroll sections for dramatic reveals
- Thematic colors and backgrounds

### Hero Section with Typewriter Effect
- Full-screen title that "types" as user scrolls
- Title text: "The Changing Climate"
- Subtitle: "A Visual Journey Through Our Warming World"
- Text types character-by-character as scroll progresses
- Complete typewriter effect within first 500px of scroll
- Implement using GSAP timeline scrubbed by ScrollTrigger
- Smooth character reveal (not jerky letter-by-letter)
- Optional: Add blinking cursor at end of visible text
- Fallback: Show full text if JavaScript disabled

### Video Scrubbing on Scroll
- Full-width video element in Chapter 1
- Map scroll position to video `currentTime` playback
- User scrolls → video plays in sync with scroll progress
- Implement with GSAP ScrollTrigger `scrub: 1` (1-second smoothing)
- Video should complete playback when user finishes scrolling through section
- Use H.264 MP4 codec, compress to 5-15 MB
- Preload first chapter video, lazy-load others
- Fallback image if video fails to load

### Parallax Image Layers
- Implement 3-layer parallax in multiple sections:
  - Background layer: slowest movement (0.3x scroll speed)
  - Midground layer: medium movement (0.6x scroll speed)
  - Foreground layer: fastest movement (1.0x scroll speed)
- Use Framer Motion's `useTransform()` to map scroll to Y position
- Get scroll progress with `useViewportScroll()` or `useScroll()`
- Layers move in opposite Y direction (negative = upward)
- Disable parallax on mobile devices (< 1024px) for performance
- Each layer a separate `<img>` or `<div>` with `position: absolute`

### Inline Data Visualizations with D3.js
Implement 3 different visualization types:

**Chart 1: Temperature Trend Line Chart**
- X-axis: Years (1880-2024)
- Y-axis: Temperature anomaly (°C)
- Line chart showing global temperature increase
- Animate line stroke as section scrolls into view
- Use stroke-dasharray animation for gradual draw-in
- Legend showing warming trend magnitude

**Chart 2: Regional Impact Bar Chart**
- Compare climate impacts by region
- X-axis: Geographic region
- Y-axis: Temperature change (°C)
- Color bars by region, animate height on view
- Stagger bar reveal (bar 0, then bar 1, etc.)

**Chart 3: CO2 Concentration Area Chart**
- Time series of atmospheric CO2 concentration
- X-axis: Years, Y-axis: PPM (parts per million)
- Shaded area under curve, animate fill on view
- Show exponential increase pattern clearly

**Implementation Details:**
- Responsive sizing: `useWindowSize()` hook
- Trigger animations when chart scrolls into viewport
- Duration: 1-1.5 seconds for drawing animation
- Animate on first view only (`viewport={{ once: true }}`)
- Use D3 color scales for visual hierarchy

### Text Reveals (Word-by-Word & Line-by-Line)
- Paragraphs reveal word-by-word as section scrolls into view
- Each word fades in and slides up from bottom
- Stagger delay: 0.02-0.05s between words
- Trigger: `whileInView` animation
- Apply once per element: `viewport={{ once: true }}`
- Smooth easing: `easeOut` for 0.3s duration
- Fallback: Show full text immediately if animations disabled

### Progress Indicator Bar
- Thin bar at top of viewport showing total page scroll progress
- Width: 100% when at bottom, 0% at top
- Color: gradient (blue to purple) or animated gradient
- Add chapter markers as small ticks:
  - Vertical tick marks at each chapter boundary
  - Show chapter name on hover
  - Tooltip with chapter progress
- Update in real-time as user scrolls

### Chapter Transitions
- Cinematic transition effect between chapters
- Transition effect options:
  - Horizontal wipe (recommended): slide from right, revealing new chapter color
  - Crossfade: fade out current, fade in next
- Trigger transition: when next chapter reaches ~80% into viewport
- Duration: 0.8-1.0 seconds
- Easing: easeInOut for smooth acceleration/deceleration
- Full-screen overlay with thematic color of new chapter

### Sticky Elements (Stats & Quotes)
- Pin key statistics during scroll through container
- Example elements:
  - "1.1°C" - temperature increase stat
  - "50% more extreme events" - climate impact stat
  - Important quotes about climate
- Pin behavior:
  - Start pinning when element reaches top 20% of viewport
  - Stay pinned while scrolling through container
  - Unpin when exiting container bottom
  - Use GSAP ScrollTrigger `pin: true`

### Image Sequence Animation
- Create stop-motion effect with rapid image swaps on scroll
- Use case: Show climate impacts (ice melting progression, forest changes)
- 30-60 frame sequence per animation section
- Pre-download and cache all images
- Use WebP format for smaller file sizes
- Show loading spinner while images preload
- Map scroll progress to frame index: `frame = Math.floor(progress * frameCount)`

### Ambient Audio with Chapter Transitions
- Optional: Add subtle ambient soundscapes
- Different audio track per chapter (e.g., ominous → hopeful progression)
- Fade in/out between chapters:
  - Current chapter audio: fade to volume 0.3
  - New chapter audio: fade from 0 to 0.3
  - Transition duration: 1 second
- Volume: keep low (0.2-0.4) to avoid overwhelming
- Provide mute button to disable audio
- Do not autoplay (browser policy) - start on user interaction
- Use royalty-free ambient sounds (Pixabay Audio)

## Story Content

Generate compelling narrative content for each chapter:

**Chapter 1: The Overview**
- Headline: "Our Planet Is Warming"
- Statistics: 1.1°C rise since 1880, accelerating recently
- Visuals: Video of melting ice, satellite imagery
- Video scrubbing feature highlighted here

**Chapter 2: Extreme Weather**
- Headline: "Weather Is Getting Wilder"
- Content: Increased hurricanes, droughts, floods
- Chart: Bar chart showing frequency of extreme events
- Parallax imagery of weather events

**Chapter 3: Oceans in Crisis**
- Headline: "The Ocean Is Changing"
- Content: Coral bleaching, sea level rise, marine life displacement
- Chart: Area chart of sea level rise over time
- Image sequence: Coral bleaching progression

**Chapter 4: Solutions**
- Headline: "Hope Through Innovation"
- Content: Renewable energy, carbon capture, nature-based solutions
- Chart: Growth of renewable energy capacity
- Tone shift: More optimistic, forward-looking

**Chapter 5: Your Role**
- Headline: "Every Action Counts"
- Content: Individual actions, collective impact, call to action
- Sticky element: "You can help" stat
- Final video or image sequence showing positive change

## Free Resources & Data

- **Stock Photos**: Unsplash (https://unsplash.com/) - high-resolution editorial images
- **Video Footage**: Pexels Videos (https://www.pexels.com/videos/) - free video clips
- **Ambient Audio**: Pixabay Music (https://pixabay.com/music/) - royalty-free soundtracks
- **Climate Data**: Our World in Data (https://ourworldindata.org/) - verified datasets
- **Weather API**: Open-Meteo (https://open-meteo.com/) - free historical weather data
- **Fonts**: Google Fonts - Playfair Display (headlines), Source Sans Pro (body)
- **D3 Examples**: https://d3js.org/gallery - reference implementations

## Performance Optimization

- Lazy load media: Use Intersection Observer for images, videos
- Preload next chapter assets before user scrolls there
- Compress video: Target 5-15 MB per video clip
- Optimize images: Use Next.js Image with WebP format
- Debounce/throttle scroll handlers to 60 FPS max
- Code split: Dynamic imports for D3 visualization components
- Reduce animations on lower-end devices (detect with JS)
- Target Lighthouse score: 85+ for performance

## Visual Design

- **Color Scheme**: Dark mode for opening (dark blue background), lightens through chapters, warm hopeful tones by Chapter 5
- **Typography**: Playfair Display for large headlines, Source Sans Pro for body text
- **Spacing**: Generous whitespace, breathing room between sections
- **Animations**: Prefer smooth, eased motion over snappy animations
- **Loading States**: Show skeleton screens or spinners during media loads

## Accessibility

- Respect `prefers-reduced-motion`: Skip animations if user prefers
- Provide captions/transcripts for ambient audio
- Alt text for all images
- Minimum 4.5:1 contrast ratio for text
- Keyboard navigation support
- Semantic HTML with proper heading hierarchy
- Screen reader support for chart data (use `<table>` with ARIA)

## Deliverables

- Fully functional scroll-driven story website on localhost:3000
- 5 complete chapters with narrative flow
- Responsive design tested on mobile, tablet, desktop
- All animations smooth at 60 FPS (measure with DevTools)
- Clean, well-commented TypeScript codebase
- All free/open assets (Unsplash, Pexels, Pixabay, Google Fonts)
- README with setup, story customization, and how to swap content
- Lighthouse score: 85+ for Core Web Vitals
