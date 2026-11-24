"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { trust } from "@/content/trust";
import { heroSlides, type HeroTextPosition } from "@/content/media";

const SLIDE_DURATION_MS = 7500;
const SWIPE_THRESHOLD = 50;

/**
 * Ken Burns zoom for the hero photo. The photo itself is always fully opaque and painted
 * immediately on mount — an earlier version faded it in via a mount-triggered CSS transition,
 * but that introduced a brief window where the photo could be invisible if caught mid-transition,
 * so visibility no longer depends on any transition completing. Only the slow zoom animates.
 */
function KenBurnsPhoto({
  src,
  alt,
  focus,
  reduceMotion,
}: {
  src: string;
  alt: string;
  focus: string;
  reduceMotion: boolean;
}) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setZoomed(true), 20);
    return () => clearTimeout(id);
  }, [src]);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 transition-transform ease-linear"
        style={{
          transform: zoomed && !reduceMotion ? "scale(1.08)" : "scale(1)",
          transitionDuration: reduceMotion ? "0ms" : `${SLIDE_DURATION_MS + 1100}ms`,
        }}
      >
        <Image src={src} alt={alt} fill priority quality={92} sizes="100vw" className={`object-cover ${focus}`} />
      </div>
    </div>
  );
}

/** Per-slide gradient + text block placement, tuned so the scrim only darkens the quadrant text actually sits in. */
const layout: Record<
  HeroTextPosition,
  { wrapper: string; gradient: string; items: string; textAlign: string }
> = {
  "bottom-left": {
    // flex-col wrapper: `items-*` is horizontal, `justify-*` is vertical.
    wrapper: "items-start justify-end text-left",
    gradient: "bg-gradient-to-t from-text/90 via-text/35 to-transparent",
    items: "items-start",
    textAlign: "text-left",
  },
  "bottom-right": {
    wrapper: "items-end justify-end text-right",
    gradient: "bg-gradient-to-t from-text/90 via-text/35 to-transparent",
    items: "items-end",
    textAlign: "text-right",
  },
  "top-left": {
    wrapper: "items-start justify-start text-left",
    gradient: "bg-gradient-to-b from-text/85 via-text/30 to-transparent",
    items: "items-start",
    textAlign: "text-left",
  },
  "top-right": {
    wrapper: "items-end justify-start text-right",
    gradient: "bg-gradient-to-b from-text/85 via-text/30 to-transparent",
    items: "items-end",
    textAlign: "text-right",
  },
};

/**
 * Staggered text entrance, mount-triggered via plain CSS (not Framer's variants/stagger engine,
 * which proved unreliable on remount in this app — see KenBurnsPhoto above). Each child gets an
 * incrementing transition-delay to fake the stagger.
 */
function StaggerIn({ id, className = "", children }: { id: string; className?: string; children: React.ReactNode[] }) {
  const [settled, setSettled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 30);
    return () => clearTimeout(t);
  }, [id]);

  return (
    <div className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className="transition-all ease-out"
          style={{
            opacity: settled ? 1 : 0,
            transform: settled || reduceMotion ? "translateY(0)" : "translateY(20px)",
            transitionDuration: reduceMotion ? "0ms" : "700ms",
            transitionDelay: reduceMotion ? "0ms" : `${150 + i * 100}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/**
 * Full-width, edge-to-edge photographic hero (Tata Trusts style): one large background
 * photograph per slide with text layered directly on top in whichever quadrant that specific
 * photo leaves clear of faces, rather than a split-panel layout.
 */
export function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i + 1) % heroSlides.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    function onVisibility() {
      setHidden(document.hidden);
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduceMotion || paused || hidden) return;
    const id = setInterval(next, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused, hidden, index, next]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD) prev();
    else if (delta < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
  }

  const slide = heroSlides[index];
  const pos = layout[slide.textPosition];

  return (
    <section
      className="relative flex w-full flex-col overflow-hidden bg-text focus:outline-none sm:block sm:h-[100svh] sm:min-h-[560px]"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Kamala Trust highlights"
    >
      {/*
        Mobile (<sm): the photo and text are physically stacked — a shorter photo band on top,
        then the headline on a solid background below. This guarantees a face can never sit
        behind the text, regardless of how aggressively object-cover crops a landscape photo into
        a narrow, tall viewport (which it does, much more so than on desktop).
        Desktop (sm+): the classic full-bleed editorial hero, text layered over the photo.
      */}
      <div className="relative h-[42vh] min-h-[260px] w-full shrink-0 overflow-hidden sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
        <KenBurnsPhoto key={slide.src} src={slide.src} alt={slide.alt} focus={slide.focus} reduceMotion={!!reduceMotion} />

        {/* Scrim: only darkens the quadrant the text actually occupies on desktop, so the rest of the photo stays bright. */}
        <div aria-hidden="true" className={`absolute inset-0 hidden sm:block ${pos.gradient}`} />
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-t from-text/25 via-transparent to-transparent sm:block" />
        {/* Photos packed edge-to-edge with faces (e.g. a full group portrait) need a uniform wash on desktop, not just a corner gradient, so the headline never lands on an unobscured face. */}
        {slide.denseCrowd ? <div aria-hidden="true" className="absolute inset-0 hidden bg-text/55 sm:block" /> : null}
        {/* On mobile the photo sits in its own band with no text over it, but a soft bottom fade still helps it meet the solid panel below cleanly. */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-text/50 to-transparent sm:hidden" />

        {/* Prev / Next controls, desktop only */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-surface/40 text-surface backdrop-blur-sm transition-colors hover:border-surface/80 hover:bg-surface/10 sm:flex"
        >
          <span aria-hidden="true">&#8592;</span>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-surface/40 text-surface backdrop-blur-sm transition-colors hover:border-surface/80 hover:bg-surface/10 sm:flex"
        >
          <span aria-hidden="true">&#8594;</span>
        </button>
      </div>

      <div
        className={`relative z-10 flex w-full flex-col bg-text p-6 pb-10 pt-8 sm:absolute sm:inset-0 sm:bg-transparent sm:p-10 sm:pt-32 lg:p-16 lg:pt-36 ${pos.wrapper}`}
      >
        <StaggerIn id={`slide-text-${index}`} className={`flex max-w-xl flex-col gap-5 ${pos.items} ${pos.textAlign}`}>
          {[
            <p key="eyebrow" className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-secondary">
              {trust.shortName} &middot; Est. {trust.founded}
            </p>,
            <h1 key="headline" className="flex flex-col">
              <span className="font-sans text-[13vw] font-semibold uppercase leading-[0.92] tracking-tight text-surface sm:text-[6vw] lg:text-[4.2rem]">
                Rising By
              </span>
              <span className="font-display text-[13vw] italic leading-[0.98] text-surface sm:text-[6vw] lg:text-[4.2rem]">
                Lifting Others.
              </span>
            </h1>,
            <p key="description" className="max-w-md text-base leading-relaxed text-surface/85 sm:text-lg">
              Creating opportunities, restoring dignity, and building stronger communities for more than five decades.
            </p>,
            <div key="ctas" className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/our-work"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:bg-primary-strong"
              >
                Explore Our Work
              </Link>
              <Link
                href="/get-involved/donate"
                className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface"
              >
                Be Part of the Change
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>,
            <div key="caption" className="mt-1 flex flex-col gap-1">
              <span className="font-data text-[11px] uppercase tracking-[0.2em] text-secondary">
                {String(index + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
              </span>
              <span className="font-display text-sm italic leading-snug text-surface/85">{slide.label}</span>
            </div>,
          ]}
        </StaggerIn>

        {/* Pagination */}
        <div className={`mt-8 flex items-center gap-2.5 ${pos.items === "items-end" ? "self-end" : "self-start"}`} role="tablist" aria-label="Hero slides">
          {heroSlides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}: ${s.label}`}
              className="group relative h-1.5 w-8 overflow-hidden rounded-full bg-surface/25 sm:w-10"
            >
              {i === index ? (
                <motion.span
                  key={reduceMotion || paused || hidden ? "static" : index}
                  className="absolute inset-y-0 left-0 rounded-full bg-secondary"
                  initial={{ width: reduceMotion ? "100%" : "0%" }}
                  animate={{ width: paused || hidden ? undefined : "100%" }}
                  transition={{ duration: reduceMotion ? 0 : SLIDE_DURATION_MS / 1000, ease: "linear" }}
                />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
