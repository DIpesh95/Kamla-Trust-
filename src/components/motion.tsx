"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fires once when the element scrolls into view. Deliberately does not rely on
 * IntersectionObserver / framer-motion's whileInView alone — uses direct
 * getBoundingClientRect checks on scroll/resize, a short poll, and a hard
 * timeout fallback, so content can never get stuck invisible if viewport
 * detection fails to fire in a given browser/environment.
 */
function useRevealTrigger<T extends HTMLElement>(marginPx = 80, fallbackMs = 4000) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    function fire() {
      if (firedRef.current) return;
      firedRef.current = true;
      setActive(true);
    }
    function check() {
      if (firedRef.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh - marginPx && rect.bottom > 0) fire();
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const poll = window.setInterval(check, 250);
    const fallback = window.setTimeout(fire, fallbackMs);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearInterval(poll);
      window.clearTimeout(fallback);
    };
  }, [marginPx, fallbackMs]);

  return { ref, active };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const { ref, active } = useRevealTrigger<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : y;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: offset }}
      transition={{ duration: reduceMotion ? 0.2 : 0.8, delay: reduceMotion ? 0 : delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className = "",
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { ref, active } = useRevealTrigger<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : stagger } },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={active ? "show" : "hidden"}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : y;
  const item: Variants = {
    hidden: { opacity: 0, y: offset },
    show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0.2 : 0.8, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/** Animates the leading number in strings like "57", "50k+", "30+" from 0 to its value once in view. */
export function CountUp({
  value,
  className = "",
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const { ref, active } = useRevealTrigger<HTMLSpanElement>(60);
  const reduceMotion = useReducedMotion();

  const match = value.match(/^([0-9][0-9,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  // Always start with the correct, final value — never a zeroed placeholder —
  // so the real number is right on first paint even if the reveal trigger,
  // the animation, or JS itself never runs. The count-up below is a pure
  // visual enhancement layered on top, not something correctness depends on.
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    if (!active || target === null || reduceMotion) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.max(0, Math.min(1, (now - start) / (duration * 1000)));
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.max(0, Math.round(eased * target));
      setDisplay(t < 1 ? `${current.toLocaleString()}${suffix}` : value);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, suffix, duration, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
