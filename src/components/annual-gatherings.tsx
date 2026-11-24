import Link from "next/link";
import Image from "next/image";
import { flagshipPrograms } from "@/content/flagship-programs";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { Container } from "./container";

export function AnnualGatherings() {
  const [kpw, poh, krs] = flagshipPrograms;

  return (
    <section id="annual-gatherings" className="scroll-mt-24 bg-soft-bg py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Annual gatherings &amp; signature events
          </p>
          <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
            The stages we return to, every year.
          </h2>
        </Reveal>

        {/* Featured: Kamala Power Women Award, full-width banner */}
        <Reveal>
          <Link href={`/#${kpw.slug}`} className="group relative block overflow-hidden rounded-sm">
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <Image
                src={kpw.image!.src}
                alt={kpw.image!.alt}
                fill
                quality={92}
                sizes="100vw"
                className="object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/92 via-text/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                  {kpw.year}
                </span>
                {kpw.venue ? <span className="text-xs text-surface/60">&middot; {kpw.venue}</span> : null}
              </div>
              <h3 className="font-display text-3xl font-medium text-surface sm:text-5xl">{kpw.name}</h3>
              <p className="max-w-xl text-sm text-surface/80 sm:text-base">{kpw.story}</p>
              <span className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
                {kpw.impact}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Pillars of Humanity + Kamala Rising Star, side by side */}
        <RevealGroup className="grid grid-cols-1 gap-6 lg:grid-cols-2" stagger={0.1}>
          <RevealItem className="group relative overflow-hidden rounded-sm border border-line">
            <Link href={`/#${poh.slug}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={poh.image!.src}
                  alt={poh.image!.alt}
                  fill
                  quality={92}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/15 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">{poh.year}</span>
                  {poh.venue ? <span className="text-xs text-surface/60">&middot; {poh.venue}</span> : null}
                </div>
                <h3 className="font-display text-2xl font-medium text-surface sm:text-3xl">{poh.name}</h3>
                <p className="max-w-sm text-sm text-surface/75">{poh.blurb}</p>
                <span className="mt-1 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-surface">
                  {poh.impact}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>
          </RevealItem>

          <RevealItem className="group relative overflow-hidden rounded-sm border border-line">
            <Link href={`/#${krs.slug}`} className="flex h-full flex-col justify-between">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(150deg, #5c1636 0%, #251f21 70%)" }}
              >
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 14px)",
                  }}
                />
                <span className="pointer-events-none absolute -bottom-10 -right-6 select-none font-display text-[10rem] italic leading-none text-surface/5">
                  03
                </span>
              </div>
              <div className="relative flex min-h-[18rem] flex-col justify-between gap-6 p-7 sm:min-h-full sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-secondary">{krs.year}</span>
                  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-10 w-10 text-surface/70 transition-transform duration-500 ease-out group-hover:scale-110" aria-hidden="true">
                    <path d="M20 6l3.8 8.2 8.9 1.1-6.6 6.1 1.8 8.9L20 26l-7.9 4.3 1.8-8.9-6.6-6.1 8.9-1.1Z" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl font-medium text-surface sm:text-3xl">{krs.name}</h3>
                  <p className="max-w-sm text-sm text-surface/75">{krs.blurb}</p>
                  <span className="mt-1 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-surface">
                    {krs.impact}
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
