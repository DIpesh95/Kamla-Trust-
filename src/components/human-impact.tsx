"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PillarIcon } from "./pillar-icon";
import { FilmFrame } from "./film-frame";
import { Reveal } from "./motion";
import { Container } from "./container";

const vignettes = [
  {
    label: "A student",
    line: "A seat in a classroom that was never guaranteed, now it is.",
    slug: "education",
    // No real classroom photo confirmed yet; renders an editorial typographic card instead of a photo.
  },
  {
    label: "A patient",
    line: "A cervical-cancer screening that catches what would otherwise go unseen.",
    slug: "healthcare",
    // No real clinical photo confirmed yet; renders an editorial typographic card instead of a photo.
  },
  {
    label: "A woman",
    line: "A name read aloud on a stage built for people who are usually only spoken about.",
    slug: "women-and-girl-child",
    image: {
      src: "/images/kpw-lokmata-award.jpg",
      alt: "A woman honoured on stage at the Kamala Power Women Awards",
    },
  },
  {
    label: "A family",
    line: "A wedding day that becomes the start of a life, not the end of a struggle.",
    slug: "rural-livelihoods-environment",
    image: {
      src: "/images/hero-kanya-sneh-bandhan-alt.jpg",
      alt: "A family at the Kanya Sneh Bandhan mass wedding ceremony",
    },
  },
  {
    label: "A community",
    line: "A flag raised, a kit handed over, a street vendor's morning made a little steadier.",
    slug: "disaster-relief-civic-recognition",
    image: {
      src: "/images/republic-day-2026.jpg",
      alt: "Republic Day community gathering and kit distribution at Kamala Mills Compound",
    },
  },
];

function Lightbox({
  vignette,
  onClose,
}: {
  vignette: (typeof vignettes)[number];
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!vignette.image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={vignette.label}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-text/90 p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-surface/40 text-surface transition-colors hover:bg-surface/10"
      >
        ✕
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-sm bg-text"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image src={vignette.image.src} alt={vignette.image.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <div className="flex flex-col gap-1.5 p-6">
          <span className="font-display text-xl italic text-secondary">{vignette.label}</span>
          <p className="text-sm leading-relaxed text-surface/85">{vignette.line}</p>
        </div>
      </div>
    </div>
  );
}

export function HumanImpact() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 280) + 16;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="timecode text-xs font-bold text-primary">Impact gallery</p>
            <h2 className="mt-4 font-display text-4xl font-bold italic text-text sm:text-5xl">
              What this looks like.
            </h2>
            <p className="mt-3 text-sm text-text-muted">
              Real moments, where photographs exist, and illustrative examples where they don&rsquo;t yet, not
              individual beneficiary accounts.
            </p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByCard(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text transition-colors hover:bg-soft-bg"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByCard(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text transition-colors hover:bg-soft-bg"
            >
              →
            </button>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:gap-5 sm:px-0"
        >
          {vignettes.map((v, i) => (
            <div key={v.label} data-card className="w-[72vw] shrink-0 snap-start sm:w-[260px]">
              <Reveal delay={i * 0.08} className="h-full">
                <button
                  type="button"
                  onClick={() => v.image && setExpanded(i)}
                  disabled={!v.image}
                  aria-label={v.image ? `View larger photo: ${v.label}` : v.label}
                  className={`group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-sm p-5 text-left ${
                    v.image
                      ? "cursor-zoom-in bg-film-black"
                      : "cursor-default bg-gradient-to-br from-film-black via-primary-strong/25 to-film-black"
                  }`}
                >
                  {v.image ? (
                    <>
                      <FilmFrame
                        src={v.image.src}
                        alt={v.image.alt}
                        sizes="(min-width: 640px) 260px, 72vw"
                        className="absolute inset-0"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-film-black/50 text-surface opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                      >
                        ⤢
                      </span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="font-display text-6xl italic leading-none text-secondary/40">
                        &ldquo;
                      </span>
                      <div aria-hidden="true" className="absolute right-5 top-5">
                        <PillarIcon slug={v.slug} className="h-7 w-7 text-surface/25" />
                      </div>
                    </>
                  )}
                  <div className="relative flex flex-col gap-1.5">
                    <span className="font-display text-lg italic text-secondary">{v.label}</span>
                    <p className="text-xs leading-snug text-surface/85">{v.line}</p>
                    {!v.image ? (
                      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-surface/40">
                        Illustrative, photo pending
                      </span>
                    ) : null}
                  </div>
                </button>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>

      {expanded !== null ? <Lightbox vignette={vignettes[expanded]} onClose={() => setExpanded(null)} /> : null}
    </section>
  );
}
