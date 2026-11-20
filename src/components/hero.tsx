"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { trust } from "@/content/trust";
import { heroSlides } from "@/content/media";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.5 } },
};
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Hero() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduceMotion]);

  function show(i: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
  }

  const slide = heroSlides[active];

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-near-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 1.3, ease: EASE }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={active === 0}
            quality={90}
            sizes="100vw"
            style={{ objectPosition: slide.objectPosition }}
            className="object-cover saturate-[.76] contrast-[1.06] brightness-[.8]"
          />
        </motion.div>
      </AnimatePresence>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/35 to-near-black/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-primary-strong/45 via-transparent to-transparent" />

      <motion.div
        className="relative mx-auto flex w-full max-w-6xl flex-col gap-7 px-6 pb-20 pt-32 sm:pb-28"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={rise} className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">
          {trust.shortName} &middot; Est. {trust.founded}
        </motion.p>

        <div className="flex flex-col">
          <motion.span
            variants={rise}
            className="font-display text-[15vw] font-medium italic leading-[0.95] text-surface sm:text-[8.5vw] lg:text-[6.2rem]"
          >
            Rising by
          </motion.span>
          <motion.span
            variants={rise}
            className="font-display text-[15vw] italic leading-[0.95] text-surface sm:text-[8.5vw] lg:text-[6.2rem]"
          >
            lifting others.
          </motion.span>
        </div>

        <motion.p variants={rise} className="max-w-md text-base leading-relaxed text-surface/80 sm:text-lg">
          Five real moments from the last two years of work, not stock photography, not a mood board.
        </motion.p>

        <motion.div variants={rise} className="flex flex-wrap items-center gap-4 pt-2">
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
        </motion.div>

        <motion.div variants={rise} className="flex flex-wrap items-center gap-4 pt-2">
          <span className="font-data max-w-md text-xs text-surface/60 sm:text-sm" aria-live="polite">
            {slide.caption}
          </span>
          <div className="ml-auto flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => show(i)}
                aria-label={`Show hero photo ${i + 1} of ${heroSlides.length}`}
                aria-pressed={i === active}
                className={`h-[3px] w-6 rounded-full transition-colors ${
                  i === active ? "bg-secondary" : "bg-surface/30 hover:bg-surface/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
