"use client";

import { useCallback, useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getYearsActive } from "@/content/stats";
import { heroSlides } from "@/content/banners";
import { PillarIcon } from "./pillar-icon";

const AUTOPLAY_MS = 7000;

/**
 * Deliberately NOT using framer-motion's AnimatePresence for the slide swap: with this
 * project's framer-motion/React combo, AnimatePresence (mode="wait" and mode="sync" alike)
 * can desync from component state under rapid/background-throttled interval ticks, freezing
 * the displayed slide while state (and the indicators) keep advancing correctly. Instead,
 * all slides stay mounted and crossfade via plain CSS opacity transitions, which has no
 * mount/unmount race to get stuck in.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const filterId = useId();

  const goTo = useCallback((next: number) => {
    const len = heroSlides.length;
    setIndex(((next % len) + len) % len);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [index, goTo, paused]);

  return (
    <section
      className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-film-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {heroSlides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.id}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
              active ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            {slide.image ? (
              <>
                <div
                  className="absolute inset-0"
                  style={{
                    transform: active ? "scale(1.08)" : "scale(1)",
                    transition: active ? `transform ${AUTOPLAY_MS + 1500}ms linear` : "transform 0s",
                  }}
                >
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    priority={i === 0}
                    quality={95}
                    sizes="100vw"
                    className="object-cover object-[center_22%] film-grade"
                  />
                </div>
                <div aria-hidden="true" className="absolute inset-0 film-vignette" />
                <svg aria-hidden="true" className="absolute inset-0 h-full w-full film-grain">
                  <filter id={`${filterId}-${i}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter={`url(#${filterId}-${i})`} />
                </svg>
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-film-black via-primary-strong/40 to-film-black">
                <PillarIcon slug={slide.pillarIconSlug ?? ""} className="h-40 w-40 text-secondary/30 sm:h-56 sm:w-56" />
              </div>
            )}
          </div>
        );
      })}

      <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-film-black via-film-black/35 to-film-black/10" />
      <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-r from-film-black/70 via-transparent to-transparent" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl flex-col gap-7 px-6 pb-20 pt-32 sm:pb-28">
        <div className="relative">
          {heroSlides.map((slide, i) => {
            const active = i === index;
            return (
              <div
                key={slide.id}
                aria-hidden={!active}
                className={`flex flex-col gap-7 transition-opacity duration-700 ease-out ${
                  active ? "static opacity-100" : "pointer-events-none absolute inset-0 opacity-0"
                }`}
              >
                <p className="timecode text-xs font-semibold text-secondary">
                  Reel {String(i + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")} &middot; {slide.eyebrow}
                </p>

                <div className="flex flex-col">
                  <span className="font-sans text-[15vw] font-semibold uppercase leading-[0.92] tracking-tight text-surface sm:text-[8.5vw] lg:text-[6.2rem]">
                    {slide.headline[0]}
                  </span>
                  <span className="font-display text-[15vw] italic leading-[0.95] text-surface sm:text-[8.5vw] lg:text-[6.2rem]">
                    {slide.headline[1]}
                  </span>
                </div>

                <p className="max-w-md text-base leading-relaxed text-surface/80 sm:text-lg">{slide.description}</p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={slide.primaryCta.href}
                    tabIndex={active ? undefined : -1}
                    className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.04em] text-surface shadow-lg shadow-primary-strong/30 transition-all hover:bg-primary-strong hover:shadow-xl hover:shadow-primary-strong/40"
                  >
                    {slide.primaryCta.label}
                  </Link>
                  <Link
                    href={slide.secondaryCta.href}
                    tabIndex={active ? undefined : -1}
                    className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface"
                  >
                    {slide.secondaryCta.label}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-6">
          <div className="flex flex-1 gap-2 sm:max-w-sm" role="tablist" aria-label="Hero slides">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={s.headline.join(" ")}
                onClick={() => goTo(i)}
                className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-surface/25"
              >
                {i === index ? (
                  <span
                    key={index}
                    className="absolute inset-y-0 left-0 bg-surface"
                    style={{
                      animation: `hero-progress ${AUTOPLAY_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                  />
                ) : i < index ? (
                  <span className="absolute inset-0 bg-surface/60" />
                ) : null}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goTo(index - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-surface/40 text-surface transition-colors hover:bg-surface/10"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goTo(index + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-surface/40 text-surface transition-colors hover:bg-surface/10"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-7 right-6 z-20 hidden flex-col items-end gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="timecode text-[10px] text-surface/60">{getYearsActive()} years of work</span>
        <span className="h-8 w-px animate-pulse bg-surface/40" />
      </div>
    </section>
  );
}
