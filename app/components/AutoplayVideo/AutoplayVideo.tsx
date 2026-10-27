"use client";

import { useEffect, useRef, useState } from "react";

interface AutoplayVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Pauses the video when false, for example while its slide is hidden. */
  active?: boolean;
}

/**
 * Muted, looping background video. It downloads and plays only while it is
 * near the viewport, and stays on its poster for visitors who prefer reduced
 * motion or whose browser blocks autoplay.
 */
export default function AutoplayVideo({
  src,
  poster,
  className,
  active = true,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (active && isNearViewport && !prefersReducedMotion) {
      // play() rejects when the browser blocks autoplay; the poster stays up.
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active, isNearViewport]);

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
