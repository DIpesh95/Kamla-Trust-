"use client";

import { useEffect, useState } from "react";
import { newsroom } from "@/content/newsroom";
import type { PressItem } from "@/content/types";
import { Fact } from "./fact";
import { Reveal, RevealImage } from "./motion";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";

const categories: PressItem["kind"][] = ["Press", "Recognition", "Event", "Community"];

/**
 * Plain CSS mount-triggered fade, not Framer's AnimatePresence: the exit/enter crossfade proved
 * unreliable in this app (see hero.tsx, signature-events.tsx), so slide changes here just fade
 * the new content in without animating the old content out.
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

function Row({ item }: { item: PressItem }) {
  return (
    <article className="group flex items-center gap-5 border-t border-line py-5 pl-0 transition-all duration-300 ease-out first:border-t-0 hover:-translate-y-0.5 hover:pl-2 sm:gap-8">
      <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-soft-bg sm:block">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            quality={92}
            sizes="112px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="font-display text-lg font-medium text-text sm:text-xl">{item.title}</h4>
          <p className="max-w-xl text-sm leading-relaxed text-text-muted">{item.description}</p>
        </div>
        <Fact value={item.date} className="shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.08em] text-text-muted" />
      </div>
    </article>
  );
}

/** Homepage mode: an editorial feature slider — a rotating featured story with a supporting list. */
function FeatureSlider({ items }: { items: PressItem[] }) {
  const withPhoto = items.filter((i) => i.image);
  const slides = withPhoto.length ? withPhoto : items.slice(0, 1);
  const [active, setActive] = useState(0);
  const featured = slides[active];
  const rest = items.filter((i) => i !== featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative overflow-hidden rounded-sm">
        <FadeIn key={featured.title} id={featured.title}>
          <Link href="/newsroom" className="group relative block">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              {featured.image ? (
                <RevealImage className="absolute inset-0">
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    fill
                    quality={92}
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </RevealImage>
              ) : (
                <div className="h-full w-full bg-text" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/25 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 sm:p-10">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                {featured.kind}
              </span>
              <h3 className="font-display text-3xl font-medium text-surface sm:text-5xl">{featured.title}</h3>
              <p className="max-w-lg text-sm text-surface/80 sm:text-base">{featured.description}</p>
              <Fact value={featured.date} className="text-xs uppercase tracking-[0.1em] text-surface/70" />
            </div>
          </Link>
        </FadeIn>

        {slides.length > 1 ? (
          <div className="absolute right-6 top-6 flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show featured story ${i + 1}`}
                className={`h-1.5 w-6 rounded-full transition-colors ${i === active ? "bg-secondary" : "bg-surface/30"}`}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        {rest.map((item) => (
          <Row key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}

export function NewsroomEditorial({ limit }: { limit?: number }) {
  if (limit) {
    return <FeatureSlider items={newsroom.slice(0, limit)} />;
  }

  return (
    <div className="flex flex-col gap-14">
      {categories.map((cat) => {
        const items = newsroom.filter((i) => i.kind === cat);
        if (!items.length) return null;
        return (
          <Reveal key={cat}>
            <div className="mb-2 flex items-baseline gap-4">
              <h3 className="font-display text-2xl italic text-primary">{cat}</h3>
              <span className="text-xs uppercase tracking-[0.1em] text-text-muted">{items.length} items</span>
            </div>
            <div className="flex flex-col">
              {items.map((item) => (
                <Row key={item.title} item={item} />
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
