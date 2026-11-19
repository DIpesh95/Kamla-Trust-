"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { heroSlides } from "@/content/hero-slides";
import { isPlaceholder } from "@/content/types";

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 6500;

function PendingSlideBackground({ note }: { note: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-text via-text/95 to-primary/40">
      <div className="flex max-w-xs flex-col items-center gap-2 rounded-sm border border-dashed border-surface/30 px-6 py-5 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-surface/60">Photo pending</span>
        <span className="text-xs leading-snug text-surface/50">{note}</span>
      </div>
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = heroSlides.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || reduceMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reduceMotion, total]);

  const slide = heroSlides[index];
  const pendingImage = isPlaceholder(slide.image);

  return (
    <section
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-text"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.3 : 1.4, ease: EASE }}
        >
          {pendingImage ? (
            <PendingSlideBackground note={(slide.image as { note: string }).note} />
          ) : (
            <Image
              src={(slide.image as { src: string; alt: string }).src}
              alt={(slide.image as { src: string; alt: string }).alt}
              fill
              priority={index === 0}
              quality={95}
              sizes="100vw"
              className="object-cover object-[center_22%]"
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-text via-text/35 to-text/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-text/70 via-transparent to-transparent" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-7 px-6 pb-20 pt-32 sm:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col gap-4"
          >
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">
              {trust.shortName} &middot; {slide.theme}
            </p>
            <div className="flex flex-col">
              <span className="font-display text-[11vw] italic leading-[0.98] text-surface sm:text-[6vw] lg:text-[4.4rem]">
                {slide.title}
              </span>
            </div>
            <p className="max-w-md text-base leading-relaxed text-surface/80 sm:text-lg">{slide.dek}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-wrap items-center gap-4 pt-2">
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
        </div>

        <div className="flex items-center gap-5 pt-4">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prev}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-surface/30 text-surface/80 transition-colors hover:border-surface hover:text-surface"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Hero slides">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.theme}
                onClick={() => goTo(i)}
                className="group relative h-1.5 w-7 overflow-hidden rounded-full bg-surface/25"
              >
                {i === index ? (
                  <motion.span
                    layoutId="hero-dot-fill"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                ) : null}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next slide"
            onClick={next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-surface/30 text-surface/80 transition-colors hover:border-surface hover:text-surface"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-7 right-6 hidden flex-col items-end gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-surface/60">{getYearsActive()} years of work</span>
      </div>
    </section>
  );
}
