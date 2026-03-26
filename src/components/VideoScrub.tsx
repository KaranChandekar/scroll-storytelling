"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface VideoScrubProps {
  src: string;
  fallbackImage: string;
  className?: string;
}

export default function VideoScrub({
  src,
  fallbackImage,
  className = "",
}: VideoScrubProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container || videoError) return;

    // Wait for video to be ready
    const onLoaded = () => {
      const duration = video.duration;
      if (!duration || isNaN(duration)) return;

      // GSAP scrub: map scroll to video currentTime
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });
    };

    if (video.readyState >= 2) {
      onLoaded();
    } else {
      video.addEventListener("loadeddata", onLoaded);
    }

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [videoError]);

  if (videoError) {
    return (
      <div
        className={`relative w-full h-screen ${className}`}
        style={{
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="img"
        aria-label="Climate change visual - video unavailable"
      />
    );
  }

  return (
    <div ref={containerRef} className={`relative w-full h-screen ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        muted
        playsInline
        preload="auto"
        onError={() => setVideoError(true)}
        aria-label="Scroll-driven climate change video"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1628]/80" />
    </div>
  );
}
