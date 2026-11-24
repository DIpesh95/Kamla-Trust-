"use client";

import { useState } from "react";
import Image from "next/image";
import { eventGallery, impactPhotos } from "@/content/media";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { Container } from "./container";

type GalleryItem = { src: string; alt: string; caption: string; category: "events" | "impact"; wide?: boolean };

const items: GalleryItem[] = [
  ...eventGallery.map((g): GalleryItem => ({ src: g.src, alt: g.alt, caption: g.caption, category: "events" })),
  { src: impactPhotos.student.src, alt: impactPhotos.student.alt, caption: "A student", category: "impact", wide: true },
  { src: impactPhotos.patient.src, alt: impactPhotos.patient.alt, caption: "A patient", category: "impact" },
  { src: impactPhotos.woman.src, alt: impactPhotos.woman.alt, caption: "A woman", category: "impact" },
  { src: impactPhotos.family.src, alt: impactPhotos.family.alt, caption: "A family", category: "impact" },
  { src: impactPhotos.community.src, alt: impactPhotos.community.alt, caption: "A community", category: "impact" },
];

const tabs: { key: "all" | "events" | "impact"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "events", label: "Moments & Gatherings" },
  { key: "impact", label: "The People Behind It" },
];

/**
 * Consolidates the former "Moments & Gatherings" and "Impact Gallery" sections (previously two
 * separate photo grids) into one filterable photographic gallery, using every photo exactly once.
 */
export function HumanImpact() {
  const [tab, setTab] = useState<"all" | "events" | "impact">("all");
  const visible = tab === "all" ? items : items.filter((i) => i.category === tab);

  return (
    <section className="bg-text py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">Gallery</p>
            <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-surface sm:text-6xl">
              What showing up looks like.
            </h2>
            <p className="mt-3 max-w-lg text-sm text-surface/55">
              Real events and real work, not individual beneficiary accounts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  tab === t.key
                    ? "border-secondary bg-secondary/15 text-secondary"
                    : "border-surface/20 text-surface/60 hover:border-surface/40 hover:text-surface"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <RevealGroup
          key={tab}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:[grid-auto-flow:dense] sm:auto-rows-[13rem] sm:gap-4"
          stagger={0.06}
        >
          {visible.map((item) => (
            <RevealItem
              key={item.src}
              className={`group relative overflow-hidden rounded-sm transition-transform duration-500 ease-out hover:-translate-y-1 ${
                item.wide ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-square sm:aspect-auto"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={90}
                sizes="(min-width: 640px) 35vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-text/85 via-text/10 to-transparent transition-opacity duration-500 group-hover:from-text/95"
              />
              <figcaption
                className={`absolute inset-x-0 bottom-0 translate-y-1 p-4 font-display italic leading-snug text-surface/90 transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-5 ${
                  item.wide ? "text-xl sm:text-2xl" : "text-sm"
                }`}
              >
                {item.caption}
              </figcaption>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
