"use client";

import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { leadershipPhoto } from "@/content/media";
import { Reveal, RevealGroup, RevealItem, RevealImage } from "./motion";
import { Container } from "./container";

function monogram(name: string) {
  const parts = name.split(" ").filter((w) => /^[A-Za-z]/.test(w));
  return (parts[1] ?? parts[0] ?? name)[0];
}

export function LeadershipTeaser() {
  const [lead, ...rest] = trust.trustees;

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Leadership</p>
            <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
              The people behind the work.
            </h2>
          </div>
          <Link
            href="/about/leadership"
            className="group text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
          >
            Meet the trustees
            <span aria-hidden="true" className="ml-1.5 inline-block transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-5 lg:grid-cols-5" stagger={0.1}>
          <RevealItem className="overflow-hidden rounded-sm border border-line bg-soft-bg lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-[0.8fr_1fr]">
              <div className="relative aspect-[4/5] w-full sm:aspect-auto">
                <RevealImage className="absolute inset-0">
                  <Image
                    src={leadershipPhoto.src}
                    alt={leadershipPhoto.alt}
                    fill
                    quality={92}
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover object-top"
                  />
                </RevealImage>
              </div>
              <div className="flex flex-col justify-center gap-3 p-8 sm:p-10">
                <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">Trustee</p>
                <h3 className="font-display text-3xl font-medium text-text sm:text-4xl">{lead.name}</h3>
                <p className="leading-relaxed text-text-muted">{lead.bio}</p>
              </div>
            </div>
          </RevealItem>

          {rest.map((person) => (
            <RevealItem key={person.name} className="lg:col-span-2">
              <div
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm p-8 transition-transform duration-500 ease-out hover:-translate-y-1 lg:p-9"
                style={{ background: "linear-gradient(150deg, #4a0f2e 0%, #251f21 70%)" }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 14px)",
                  }}
                />
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-surface/20 bg-surface/5 transition-transform duration-500 ease-out group-hover:scale-105">
                  <span className="font-display text-4xl italic text-secondary">{monogram(person.name)}</span>
                </div>
                <div className="relative mt-8 flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-medium text-surface sm:text-3xl">{person.name}</h3>
                  <p className="text-sm font-medium uppercase tracking-[0.08em] text-secondary">{person.role}</p>
                  <p className="mt-1 leading-relaxed text-surface/70">{person.bio}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
