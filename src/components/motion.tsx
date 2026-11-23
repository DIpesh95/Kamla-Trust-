"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fires once when the element scrolls into view. Deliberately does not rely on
 * IntersectionObserver / framer-motion's whileInView alone; uses direct
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

/** Image-mask wipe reveal, triggered by the same scroll-detection as Reveal (not framer-motion's whileInView). */
export function RevealMask({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, active } = useRevealTrigger<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const revealed = active || reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: "inset(0 0 0 100%)" }}
      animate={{ clipPath: revealed ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
      transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const CLIP_CLOSED: Record<"left" | "right" | "up" | "down", string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
};

/**
 * Directional clip-path reveal, triggered by the same scroll-detection as Reveal (not
 * framer-motion's whileInView), so it shares the same reliability guarantees: content can
 * never get stuck invisible if a browser's viewport detection misbehaves.
 */
export function ClipReveal({
  children,
  className = "",
  direction = "left",
  duration = 1.1,
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
}) {
  const { ref, active } = useRevealTrigger<HTMLDivElement>();
  const reduceMotion = useReducedMotion();
  const revealed = active || reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ willChange: "clip-path" }}
      initial={{ clipPath: CLIP_CLOSED[direction] }}
      animate={{ clipPath: revealed ? "inset(0% 0% 0% 0%)" : CLIP_CLOSED[direction] }}
      transition={{ duration: reduceMotion ? 0.01 : duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A horizontally scrollable row: native touch scrolling on touch devices, click-drag on mouse,
 * ArrowLeft/ArrowRight when the row itself has keyboard focus, and optional prev/next buttons.
 * Scroll-snap and overflow handle reduced-motion automatically for the drag itself; the one
 * place motion is explicit (arrow-key/button scrolling) drops to an instant jump under
 * prefers-reduced-motion instead of a smooth scroll.
 */
export function DragRow({
  children,
  className = "",
  rowClassName = "",
  showArrows = true,
  ariaLabel = "Scrollable gallery",
}: {
  children: ReactNode;
  className?: string;
  rowClassName?: string;
  showArrows?: boolean;
  ariaLabel?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const reduceMotion = useReducedMotion();

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !rowRef.current) return;
    drag.current = { down: true, startX: e.clientX, startScroll: rowRef.current.scrollLeft, moved: false };
    rowRef.current.setPointerCapture(e.pointerId);
    rowRef.current.classList.add("cursor-grabbing");
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current.down || !rowRef.current) return;
    if (Math.abs(e.clientX - drag.current.startX) > 3) drag.current.moved = true;
    rowRef.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  }
  function endDrag() {
    drag.current.down = false;
    rowRef.current?.classList.remove("cursor-grabbing");
  }
  function onClickCapture(e: ReactMouseEvent<HTMLDivElement>) {
    // A drag that actually moved the row shouldn't also fire the card's own
    // click/navigation underneath the cursor.
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  }
  function scrollByPage(dir: 1 | -1) {
    const row = rowRef.current;
    if (!row) return;
    row.scrollBy({ left: dir * row.clientWidth * 0.82, behavior: reduceMotion ? "auto" : "smooth" });
  }
  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByPage(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByPage(-1);
    }
  }

  return (
    <div className={className}>
      <div
        ref={rowRef}
        tabIndex={0}
        role="group"
        aria-label={`${ariaLabel}. Use the left and right arrow keys, or drag, to browse.`}
        className={`scroller flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong [-webkit-overflow-scrolling:touch] [touch-action:pan-x] ${rowClassName}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
      {showArrows ? (
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByPage(-1)}
            className="flex h-11 w-11 items-center justify-center border border-line text-primary-strong transition-colors hover:border-primary hover:bg-primary hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByPage(1)}
            className="flex h-11 w-11 items-center justify-center border border-line text-primary-strong transition-colors hover:border-primary hover:bg-primary hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
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

  // Always start with the correct, final value, never a zeroed placeholder,
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
