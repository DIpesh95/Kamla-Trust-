"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { pillars, getPillar } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { PillarIcon } from "./pillar-icon";
import { Reveal, RevealImage } from "./motion";

const emotionalLine: Record<string, string> = {
  education: "Because opportunity should never depend on where you are born.",
  healthcare: "Because a healthy life should never be a privilege.",
  "women-and-girl-child": "Because dignity is not negotiable.",
  "rural-livelihoods-environment": "Because roots deserve as much care as growth.",
  "disaster-relief-civic-recognition": "Because showing up matters most when it's hardest.",
};

/** Used for the one pillar with no real photograph yet, so the card still reads as designed. */
const patternGradients: Record<string, string> = {
  "disaster-relief-civic-recognition": "linear-gradient(155deg, #421226 0%, #251f21 60%)",
};

const displayOrder = [
  "healthcare",
  "women-and-girl-child",
  "education",
  "rural-livelihoods-environment",
  "disaster-relief-civic-recognition",
];

export function WorkChapters() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const ordered = displayOrder.map((slug) => getPillar(slug)!).filter(Boolean);
  const list = ordered.length === pillars.length ? ordered : pillars;

  function scrollBy(dir: 1 | -1) {
    trackRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0"
      >
        {list.map((pillar, i) => (
          <Reveal key={pillar.slug} delay={i * 0.08} className="snap-start">
            <PillarCard pillar={pillar} index={i} />
          </Reveal>
        ))}
      </div>
      {/* Edge fade, hinting there's more to scroll. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-20 bg-gradient-to-l from-surface to-transparent pb-4 sm:block" />

      <div className="mt-5 flex items-center justify-between gap-6">
        {/* Scroll progress */}
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary/15">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-150 ease-out"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll focus areas left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text transition-all duration-300 hover:-translate-x-0.5 hover:border-primary hover:text-primary"
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll focus areas right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-text transition-all duration-300 hover:translate-x-0.5 hover:border-primary hover:text-primary"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: (typeof pillars)[number]; index: number }) {
  const image = pillarImages[pillar.slug];
  const pattern = patternGradients[pillar.slug];

  return (
    <Link
      href={`/our-work/${pillar.slug}`}
      className="group relative flex h-[26rem] w-[19rem] shrink-0 flex-col justify-between overflow-hidden rounded-sm p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:w-[21rem]"
      style={pattern ? { background: pattern } : undefined}
    >
      {image ? (
        <>
          <RevealImage className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              quality={92}
              sizes="340px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </RevealImage>
          <div className="absolute inset-0 bg-gradient-to-t from-text/92 via-text/35 to-text/5" />
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 14px)",
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -right-4 select-none font-display text-[9rem] italic leading-none text-surface/5"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full bg-primary/15 blur-2xl transition-transform duration-700 ease-out group-hover:scale-125"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="font-data text-xs uppercase tracking-[0.2em] text-secondary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <PillarIcon
          slug={pillar.slug}
          className="h-10 w-10 shrink-0 text-surface/80 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:text-secondary"
        />
      </div>

      <div className="relative flex flex-col gap-3">
        <h3 className="font-display text-2xl font-medium leading-[1.05] text-surface sm:text-3xl">{pillar.name}</h3>
        <p className="font-display text-sm italic leading-snug text-surface/70 sm:text-base">
          {emotionalLine[pillar.slug]}
        </p>
        <span className="mt-1 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-surface">
          Explore programs
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
