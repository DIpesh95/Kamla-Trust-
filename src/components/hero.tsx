"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { heroImage } from "@/content/media";

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
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-text">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
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
            className="font-sans text-[15vw] font-semibold uppercase leading-[0.92] tracking-tight text-surface sm:text-[8.5vw] lg:text-[6.2rem]"
          >
            Rising By
          </motion.span>
          <motion.span
            variants={rise}
            className="font-display text-[15vw] italic leading-[0.95] text-surface sm:text-[8.5vw] lg:text-[6.2rem]"
          >
            Lifting Others.
          </motion.span>
        </div>

        <motion.p variants={rise} className="max-w-md text-base leading-relaxed text-surface/80 sm:text-lg">
          Creating opportunities, restoring dignity, and building stronger communities for more than five decades.
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-surface/60">{getYearsActive()} years of work</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-surface/40"
        />
      </motion.div>
    </section>
  );
}
