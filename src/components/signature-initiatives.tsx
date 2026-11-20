"use client";

import { useState } from "react";
import Image from "next/image";
import { flagshipPrograms } from "@/content/flagship-programs";
import { Reveal } from "./motion";
import { Container } from "./container";

const objectPositionBySlug: Record<string, string> = {
  "kamala-power-women-awards": "20% 24%",
  "pillars-of-humanity": "50% 12%",
};

export function SignatureInitiatives() {
  const [active, setActive] = useState(flagshipPrograms[0].slug);
  const program = flagshipPrograms.find((p) => p.slug === active) ?? flagshipPrograms[0];

  return (
    <section className="bg-near-black py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">Signature initiatives</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-surface sm:text-5xl">
            Three traditions. Click one for the full record.
          </h2>
        </Reveal>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Signature initiatives">
          {flagshipPrograms.map((p) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={p.slug === active}
              onClick={() => setActive(p.slug)}
              className={`rounded-full border px-4.5 py-2 text-sm font-semibold transition-colors ${
                p.slug === active
                  ? "border-secondary bg-secondary text-primary-strong"
                  : "border-surface/25 text-surface/75 hover:border-surface/50"
              }`}
            >
              {p.name.replace(/ Awards?$/, "")}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-11 lg:grid-cols-2">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm">
            {program.image ? (
              <Image
                src={program.image.src}
                alt={program.image.alt}
                fill
                quality={90}
                sizes="(min-width: 1024px) 45vw, 100vw"
                style={{ objectPosition: objectPositionBySlug[program.slug] ?? "center" }}
                className="object-cover saturate-[.78] contrast-[1.06] brightness-[.86]"
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(255,255,255,.045) 0, rgba(255,255,255,.045) 1px, transparent 1px, transparent 13px), linear-gradient(155deg, var(--primary), var(--primary-strong))",
                }}
              >
                <span className="font-display text-lg italic text-secondary/60">{program.name.replace(/ Awards?$/, "")}</span>
              </div>
            )}
          </Reveal>
          <Reveal delay={0.08}>
            <span className="font-data text-xs text-secondary">{program.year}</span>
            <h3 className="font-display mt-2.5 text-3xl font-medium text-surface">{program.name.replace(/ Awards?$/, "")}</h3>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-surface/75">{program.story}</p>
            {!program.image && (
              <span className="mt-4 inline-block rounded-sm border border-secondary/40 px-2.5 py-1 text-xs uppercase tracking-[0.08em] text-secondary">
                Photograph pending from trustees
              </span>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
