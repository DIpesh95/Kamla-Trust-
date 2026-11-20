"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { trust } from "@/content/trust";
import { Reveal } from "./motion";
import { Container } from "./container";

type Era = {
  year: string;
  title: string;
  body: string;
  image?: { src: string; alt: string };
};

const eras: Era[] = [
  {
    year: "1967",
    title: "First classroom opens",
    body: "Shri G.K. Gowani founds the Commerce College in Bhinmal, two years before the Trust itself is registered.",
  },
  {
    year: "1969",
    title: `${trust.shortName} founded`,
    body: `${trust.legalName} is registered as a public charitable trust.`,
  },
  {
    year: "1975",
    title: "Ankibai Hostel opens",
    body: "Safe, affordable housing for students arriving from distant areas.",
  },
  {
    year: "2020",
    title: "Times Power Women",
    body: "“Times Power Women 2020” — verified from the Trust's press record.",
  },
  {
    year: "2022",
    title: "Kamala Power Woman Award",
    body: "38 women honoured, awards presented by then-Governor of Maharashtra Shri Bhagat Singh Koshyari.",
  },
  {
    year: "2026",
    title: "Lokmata Samman",
    body: "The programme's largest documented edition to date.",
    image: {
      src: "/images/kpw-lokmata-award.jpg",
      alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026 awards ceremony",
    },
  },
];

export function FiveDecadesTimeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(4);
  const dragState = useRef<{ down: boolean; startX: number; startLeft: number }>({
    down: false,
    startX: 0,
    startLeft: 0,
  });

  function updateProgress() {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    const pct = max > 0 ? (rail.scrollLeft / max) * 100 : 0;
    setProgress(Math.max(4, pct));
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail) return;
    if (e.key === "ArrowRight") {
      rail.scrollBy({ left: 260, behavior: "smooth" });
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      rail.scrollBy({ left: -260, behavior: "smooth" });
      e.preventDefault();
    }
  }

  return (
    <section className="bg-near-black py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">57 years of action</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-surface sm:text-5xl">
            Drag through the record. Most of it has no photograph, and that&rsquo;s shown honestly, not papered over.
          </h2>
        </Reveal>

        <div className="h-[3px] w-full overflow-hidden rounded-full bg-surface/15">
          <div
            className="h-full bg-secondary transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div
          ref={railRef}
          tabIndex={0}
          role="region"
          aria-label="Five decades timeline, scrollable with arrow keys"
          onScroll={updateProgress}
          onKeyDown={onKeyDown}
          onMouseDown={(e) => {
            dragState.current = { down: true, startX: e.pageX, startLeft: railRef.current?.scrollLeft ?? 0 };
          }}
          onMouseUp={() => {
            dragState.current.down = false;
          }}
          onMouseLeave={() => {
            dragState.current.down = false;
          }}
          onMouseMove={(e) => {
            if (!dragState.current.down || !railRef.current) return;
            railRef.current.scrollLeft = dragState.current.startLeft - (e.pageX - dragState.current.startX);
          }}
          className="flex cursor-grab gap-0 overflow-x-auto pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary [scroll-snap-type:x_proximity]"
        >
          {eras.map((era, i) => (
            <div
              key={era.year}
              className={`shrink-0 border-l border-surface/15 px-7 first:border-l-0 [scroll-snap-align:start] ${
                i === 0 ? "pl-0" : ""
              }`}
              style={{ flexBasis: 260 }}
            >
              <span className="font-data text-sm text-secondary">{era.year}</span>
              <div className="relative my-3.5 aspect-[3/4] overflow-hidden rounded-sm">
                {era.image ? (
                  <Image
                    src={era.image.src}
                    alt={era.image.alt}
                    fill
                    quality={90}
                    sizes="260px"
                    style={{ objectPosition: "58% 14%" }}
                    className="object-cover saturate-[.72] contrast-[1.08] brightness-[.84]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-strong to-near-black bg-[length:200%_200%] px-5 text-center [background-image:repeating-linear-gradient(135deg,rgba(231,201,206,.06)_0,rgba(231,201,206,.06)_1px,transparent_1px,transparent_13px),linear-gradient(160deg,var(--primary-strong),var(--near-black))]">
                    <span className="font-display text-base italic text-secondary/60">{era.title}</span>
                  </div>
                )}
              </div>
              <h4 className="text-[17px] font-medium text-surface">{era.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-surface/60">{era.body}</p>
              {!era.image && (
                <span className="mt-2 inline-block rounded-sm border border-secondary/35 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.08em] text-secondary">
                  No photograph
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
