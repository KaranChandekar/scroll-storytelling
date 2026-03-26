"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface AudioControllerProps {
  currentChapter: number;
}

// Ambient sounds - using placeholder URLs
// In production, replace with actual Pixabay royalty-free ambient audio
const CHAPTER_AUDIO: Record<number, string> = {};

export default function AudioController({
  currentChapter,
}: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [started, setStarted] = useState(false);

  const toggle = useCallback(() => {
    if (!started) {
      setStarted(true);
      setIsMuted(false);
    } else {
      setIsMuted((prev) => !prev);
    }
  }, [started]);

  useEffect(() => {
    if (!started || isMuted) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    const src = CHAPTER_AUDIO[currentChapter];
    if (!src) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    // Crossfade
    audio.volume = 0;
    audio.src = src;
    audio.play().catch(() => {});

    // Fade in
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol = Math.min(vol + 0.03, 0.3);
      audio.volume = vol;
      if (vol >= 0.3) clearInterval(fadeIn);
    }, 50);

    return () => {
      clearInterval(fadeIn);
      // Fade out
      let v = audio.volume;
      const fadeOut = setInterval(() => {
        v = Math.max(v - 0.03, 0);
        audio.volume = v;
        if (v <= 0) {
          clearInterval(fadeOut);
          audio.pause();
        }
      }, 50);
    };
  }, [currentChapter, started, isMuted]);

  return (
    <button
      onClick={toggle}
      className="mute-btn"
      aria-label={isMuted ? "Unmute ambient audio" : "Mute ambient audio"}
      title={isMuted ? "Play ambient sounds" : "Mute"}
    >
      {isMuted ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
