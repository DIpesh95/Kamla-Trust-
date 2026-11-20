"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Pins the section and scrubs an inner horizontal track in sync with vertical scroll, so
 * scrolling down reads as "walking through" the track left to right, film-reel style. Falls
 * back to a plain horizontally-scrollable row (no pin) when the browser can't run the effect
 * or the visitor has requested reduced motion, so the content is never unreachable.
 */
export function PinnedScrub({
  children,
  trackClassName = "",
}: {
  children: ReactNode;
  trackClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track || prefersReducedMotion()) return;
    if (window.innerWidth < 1024) return; // keep the simple scrollable row on small screens, untouched

    container.classList.add("overflow-hidden");
    container.classList.remove("overflow-x-auto");

    const distance = () => Math.max(0, track.scrollWidth - container.clientWidth);

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    // Images and web fonts loading after mount can shift layout enough to throw off the
    // pin's measured start/end positions; refresh once everything has actually settled.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      ctx.revert();
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <div ref={trackRef} className={`flex ${trackClassName}`}>
        {children}
      </div>
    </div>
  );
}
