"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { flagshipPrograms } from "@/content/flagship-programs";
import { Reveal, RevealImage } from "./motion";
import { Container } from "./container";

const EASE = [0.16, 1, 0.3, 1] as const;

const patterns: Record<string, string> = {
  "kamala-rising-star": "linear-gradient(150deg, #5c1636 0%, #251f21 70%)",
};

/**
 * Plain CSS mount-triggered fade, not Framer's AnimatePresence: the exit/enter crossfade proved
 * unreliable in this app (the same issue hit the hero's image transitions — see hero.tsx), so
 * tab switches here just fade the new content in without animating the old content out.
 */
function FadeIn({ id, children }: { id: string; children: React.ReactNode }) {
  const [settled, setSettled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 20);
    return () => clearTimeout(t);
  }, [id]);

  return (
    <div
      className="transition-opacity ease-out"
      style={{ opacity: settled ? 1 : 0, transitionDuration: reduceMotion ? "0ms" : "500ms" }}
    >
      {children}
    </div>
  );
}

/**
 * Consolidates what used to be two separate sections (Signature Initiatives and Annual
 * Gatherings & Signature Events) — both covered the same three programmes — into one tabbed
 * editorial feature so Kamala Power Women Awards, Pillars of Humanity, and Kamala Rising Star
 * each get one strong, distinct presentation instead of two repeated ones.
 */
export function SignatureEvents() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const program = flagshipPrograms[active];

  return (
    <section id="annual-gatherings" className="scroll-mt-24 bg-soft-bg py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Our signature initiatives &amp; events
          </p>
          <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
            The stages we return to, every year.
          </h2>
        </Reveal>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 border-b border-line">
          {flagshipPrograms.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              className={`relative px-4 py-3 text-sm font-semibold uppercase tracking-[0.06em] transition-colors sm:px-6 ${
                i === active ? "text-primary-strong" : "text-text-muted hover:text-text"
              }`}
            >
              {p.name}
              {i === active ? (
                <motion.span
                  layoutId="signature-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                />
              ) : null}
            </button>
          ))}
        </div>

        <FadeIn key={program.slug} id={program.slug}>
          <div className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-shadow duration-500 hover:shadow-xl md:flex-row">
            <Link href={`/#${program.slug}`} className="relative aspect-[16/10] w-full shrink-0 overflow-hidden md:w-1/2">
              {program.image ? (
                <RevealImage className="absolute inset-0">
                  <Image
                    src={program.image.src}
                    alt={program.image.alt}
                    fill
                    quality={92}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </RevealImage>
              ) : (
                <div className="relative flex h-full w-full items-center justify-center" style={{ background: patterns[program.slug] }}>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 14px)",
                    }}
                  />
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.2" className="relative h-16 w-16 text-surface/40" aria-hidden="true">
                    <path d="M20 6l3.8 8.2 8.9 1.1-6.6 6.1 1.8 8.9L20 26l-7.9 4.3 1.8-8.9-6.6-6.1 8.9-1.1Z" />
                  </svg>
                </div>
              )}
            </Link>

            <div className="flex flex-1 flex-col justify-center gap-3 p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  {program.year}
                </span>
                {program.venue ? <span className="text-xs text-text-muted">&middot; {program.venue}</span> : null}
              </div>
              <h3 className="font-display text-3xl font-medium text-text sm:text-4xl">{program.name}</h3>
              <p className="max-w-xl text-base leading-relaxed text-text-muted">{program.story}</p>
              <Link
                href={`/#${program.slug}`}
                className="group/link mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
              >
                {program.impact}
                <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1.5">→</span>
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
