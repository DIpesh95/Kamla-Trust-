"use client";

import { useId, useState } from "react";
import { storySlots } from "@/content/stories";
import { Fact } from "./fact";
import { Reveal } from "./motion";

function PhotoPending({ className = "" }: { className?: string }) {
  const filterId = useId();
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-film-black px-4 text-center ${className}`}
    >
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full film-grain">
        <filter id={filterId}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter={`url(#${filterId})`} />
      </svg>
      <span className="timecode relative text-[10px] text-surface/70">Photo pending</span>
      <span className="relative text-[10px] leading-snug text-surface/45">Real photo &amp; interview not yet available</span>
    </div>
  );
}

function StoryDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed text-text">{value}</dd>
    </div>
  );
}

function CompactStory({ slot, delay }: { slot: (typeof storySlots)[number]; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay} className="flex flex-col gap-5">
      <div className="flex gap-5">
        <PhotoPending className="h-28 w-28 shrink-0 rounded-sm sm:h-32 sm:w-32" />
        <div className="flex flex-col gap-1.5">
          <span className="timecode text-[11px] text-primary">
            {slot.pillar} &middot; <Fact value={slot.location} />
          </span>
          <h4 className="font-display text-xl font-medium text-text">{slot.title}</h4>
          <p className="text-sm leading-snug text-text-muted">{slot.background}</p>
        </div>
      </div>

      {open ? (
        <dl className="grid grid-cols-1 gap-3 border-t border-line pt-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Challenge</dt>
            <dd className="mt-1 text-text-muted">
              <Fact value={slot.challenge} />
            </dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Support</dt>
            <dd className="mt-1 text-text-muted">{slot.support}</dd>
          </div>
          <div>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Outcome</dt>
            <dd className="mt-1 text-text-muted">
              <Fact value={slot.outcome} />
            </dd>
          </div>
        </dl>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex w-fit items-center gap-2 border-t border-line pt-4 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
      >
        {open ? "Show less" : "Read Full Story"}
        <span aria-hidden="true" className={`transition-transform ${open ? "-rotate-90" : "rotate-90"}`}>
          ⌄
        </span>
      </button>
    </Reveal>
  );
}

export function StoriesMagazine() {
  const [featured, ...rest] = storySlots;

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        <Reveal className="lg:w-2/5">
          <PhotoPending className="aspect-[4/3] w-full rounded-sm" />
          <div className="mt-6 flex flex-col gap-3">
            <span className="timecode w-fit text-xs text-primary">
              {featured.pillar} &middot; <Fact value={featured.location} />
            </span>
            <h3 className="font-display text-3xl font-medium italic text-text sm:text-4xl">{featured.title}</h3>
          </div>
        </Reveal>

        <div className="flex flex-col gap-5 lg:w-3/5">
          <dl className="grid gap-5 sm:grid-cols-3">
            <StoryDetail label="Background" value={featured.background} />
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Challenge</dt>
              <dd className="mt-1 text-sm leading-relaxed text-text">
                <Fact value={featured.challenge} />
              </dd>
            </div>
            <StoryDetail label="Support provided" value={featured.support} />
          </dl>
          <div className="border-t border-line pt-4">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-muted">Outcome</dt>
            <dd className="mt-1 text-sm leading-relaxed text-text">
              <Fact value={featured.outcome} />
            </dd>
          </div>
        </div>
      </div>

      <div className="grid gap-10 sm:grid-cols-2">
        {rest.map((slot, i) => (
          <CompactStory key={slot.slug} slot={slot} delay={0.1 + i * 0.08} />
        ))}
      </div>
    </div>
  );
}
