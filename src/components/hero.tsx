"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { heroImage } from "@/content/media";

/**
 * trust.tagline ("Rising By Lifting Others") is rendered verbatim, split into two display
 * lines. The split point differs by breakpoint: desktop keeps "Rising By" / "Lifting Others.",
 * mobile wraps as "Rising By Lifting" / "Others." per the approved Direction D artboard, which
 * verified that break has no awkward line-wrap at 375-430px. Both lines are derived from the
 * same source string, not hardcoded, so the tagline can never drift from content/trust.ts. Both
 * lines render in upright Fraunces (no italic, no sans-serif swap) — the approved h1 has one
 * consistent display-face treatment across the whole headline.
 */
const taglineWords = trust.tagline.split(" ");
const desktopLine1 = taglineWords.slice(0, 2).join(" ");
const desktopLine2 = `${taglineWords.slice(2).join(" ")}.`;
const mobileLine1 = taglineWords.slice(0, 3).join(" ");
const mobileLine2 = `${taglineWords.slice(3).join(" ")}.`;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-text">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.8 }}
      >
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-[center_22%]"
        />
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-text via-text/35 to-text/10" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-text/70 via-transparent to-transparent" />

      <motion.div
        className="relative mx-auto flex w-full max-w-[1320px] flex-col gap-7 px-[22px] pb-20 pt-32 sm:px-10 sm:pb-28 lg:px-[60px]"
        initial={{ opacity: reduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.6, delay: reduceMotion ? 0 : 0.2 }}
      >
        <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">
          {trust.shortName} &middot; Est. {trust.founded}
        </p>

        <h1 className="contents">
          <div className="flex flex-col sm:hidden">
            <span className="font-display text-[13vw] font-semibold leading-[0.92] text-surface">{mobileLine1}</span>
            <span className="font-display text-[13vw] font-semibold leading-[0.95] text-surface">{mobileLine2}</span>
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="font-display text-[8.5vw] font-semibold leading-[0.92] text-surface lg:text-[6.2rem]">
              {desktopLine1}
            </span>
            <span className="font-display text-[8.5vw] font-semibold leading-[0.95] text-surface lg:text-[6.2rem]">
              {desktopLine2}
            </span>
          </div>
        </h1>

        <p className="max-w-md text-base leading-relaxed text-surface/80 sm:text-lg">
          Creating opportunities, restoring dignity, and building stronger communities for more than five decades.
        </p>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Link
            href="/our-work"
            className="bg-primary px-7 py-[17px] text-center text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            Explore Our Work
          </Link>
          <Link
            href="/get-involved/donate"
            className="border border-surface/60 px-7 py-[17px] text-center text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:border-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            Be Part of the Change
          </Link>
          <span className="hidden items-center gap-2 border border-surface/30 px-5 py-[17px] text-xs font-semibold uppercase tracking-[0.1em] text-surface/90 sm:inline-flex">
            {getYearsActive()} Years of Work
          </span>
        </div>
      </motion.div>
    </section>
  );
}
