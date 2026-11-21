"use client";

import {
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Staggers the direct children of its container in on scroll, once, using GSAP + ScrollTrigger.
 * Used for grids/rows of cards (bento grids, carousels) where framer-motion's per-item variants
 * would mean threading delay props through every card; this does it from one place instead.
 */
export function GsapStagger({
  children,
  className = "",
  selector = ":scope > *",
  y = 28,
  stagger = 0.1,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  selector?: string;
  y?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>(selector);
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    // If the trigger is already past its reveal point when this mounts (deep link, restored
    // scroll position, a jump-scroll, or layout that settled after ScrollTrigger's first
    // measurement), show it immediately rather than waiting for a scroll crossing that will
    // never come — content must never be stuck invisible.
    const rect = root.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    gsap.set(targets, { opacity: 0, y });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root,
        start,
        once: true,
        onEnter: () => {
          gsap.to(targets, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger });
        },
      });
    }, root);

    return () => ctx.revert();
  }, [selector, y, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Wraps a photo/media block in a clip-path reveal that plays once on scroll-in, with a slight
 * accompanying scale-settle. direction controls which edge the clip opens from.
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const closed: Record<typeof direction, string> = {
      left: "inset(0% 100% 0% 0%)",
      right: "inset(0% 0% 0% 100%)",
      up: "inset(100% 0% 0% 0%)",
      down: "inset(0% 0% 100% 0%)",
    };

    const img = el.querySelector<HTMLElement>("img, [data-clip-fill]");

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)" });
      if (img) gsap.set(img, { scale: 1, clearProps: "transform" });
      return;
    }

    gsap.set(el, { clipPath: closed[direction] });
    if (img) gsap.set(img, { scale: 1.12 });

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration, ease: "power4.out" });
          if (img) gsap.to(img, { scale: 1, duration: duration + 0.3, ease: "power3.out" });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [direction, duration]);

  return (
    <div ref={ref} className={className} style={{ willChange: "clip-path" }}>
      {children}
    </div>
  );
}

/**
 * A horizontally scrollable row: native touch scrolling on touch devices, click-drag on mouse,
 * optional prev/next arrow buttons. Scroll-snap and overflow handle reduced-motion automatically
 * since nothing here animates beyond the drag itself.
 */
export function DragRow({
  children,
  className = "",
  rowClassName = "",
  showArrows = true,
}: {
  children: ReactNode;
  className?: string;
  rowClassName?: string;
  showArrows?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

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
    row.scrollBy({ left: dir * row.clientWidth * 0.82, behavior: "smooth" });
  }

  return (
    <div className={className}>
      <div
        ref={rowRef}
        tabIndex={0}
        className={`scrollbar-none flex cursor-grab snap-x snap-proximity gap-5 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch] [touch-action:pan-x] ${rowClassName}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
      >
        {children}
      </div>
      {showArrows ? (
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByPage(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-primary-strong transition-colors hover:border-primary hover:bg-primary hover:text-surface"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByPage(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-primary-strong transition-colors hover:border-primary hover:bg-primary hover:text-surface"
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
