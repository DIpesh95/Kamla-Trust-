"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const CLIP_FROM: Record<"up" | "left" | "right", string> = {
  up: "inset(0 0 100% 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

/**
 * A scroll-triggered clip-path wipe, like a camera aperture opening onto the frame, used for
 * the large photo and heading reveals the Archive Reel direction calls for. Falls back to a
 * plain fade-in with no clip when reduced motion is requested.
 */
export function ClipReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, clipPath: "none" });
      return;
    }

    gsap.set(el, { clipPath: CLIP_FROM[direction], opacity: 0.001 });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: "inset(0 0 0 0)",
          opacity: 1,
          duration: 1.1,
          delay,
          ease: "power3.out",
        });
      },
    });

    return () => trigger.kill();
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
