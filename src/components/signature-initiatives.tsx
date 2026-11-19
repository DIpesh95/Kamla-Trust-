import Link from "next/link";
import Image from "next/image";
import { flagshipPrograms } from "@/content/flagship-programs";
import { Reveal } from "./motion";
import { Container } from "./container";

export function SignatureInitiatives() {
  const [kpw, poh, krs] = flagshipPrograms;

  return (
    <section className="bg-soft-bg py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Signature initiatives</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
            Three traditions, carried every year.
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Each one built around a different kind of recognition, not a repeat of the same format.
          </p>
        </Reveal>

        {/* Equal-height grid: every card the same size, each with its own visual treatment */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 1. Kamala Power Women Awards: full-bleed image banner */}
          <Reveal className="min-h-[480px]">
            <Link href={`/#${kpw.slug}`} className="group relative block h-full min-h-[480px] overflow-hidden rounded-sm">
              <Image
                src={kpw.image!.src}
                alt={kpw.image!.alt}
                fill
                quality={92}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
                <span className="inline-flex w-fit items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                  <span aria-hidden="true" className="h-px w-5 bg-secondary/70" />
                  {kpw.year}
                </span>
                <h3 className="font-display text-3xl font-medium text-surface sm:text-4xl">{kpw.name}</h3>
                <p className="max-w-lg text-sm text-surface/80">{kpw.story}</p>
                <span className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
                  {kpw.impact}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* 2. Pillars of Humanity: full-bleed image, stat-forward */}
          <Reveal delay={0.05} className="min-h-[480px]">
            <Link
              href={`/#${poh.slug}`}
              className="group relative block h-full min-h-[480px] overflow-hidden rounded-sm border border-line"
            >
              <Image
                src={poh.image!.src}
                alt={poh.image!.alt}
                fill
                quality={92}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/85 via-text/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7">
                <span className="font-display text-6xl font-medium italic leading-none text-secondary">6</span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-surface/70">{poh.impact}</span>
                <h3 className="mt-2 font-display text-2xl font-medium text-surface">{poh.name}</h3>
                <p className="text-sm text-surface/75">{poh.blurb}</p>
              </div>
            </Link>
          </Reveal>

          {/* 3. Kamala Rising Star: text-forward, editorial gradient card */}
          <Reveal
            delay={0.1}
            className="group relative flex min-h-[480px] flex-col justify-between gap-8 overflow-hidden rounded-sm bg-gradient-to-br from-primary via-primary to-primary-strong p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-secondary/15 transition-transform duration-700 ease-out group-hover:scale-125"
            />
            <Link href={`/#${krs.slug}`} className="relative flex flex-1 flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">{krs.year}</span>
                  <h3 className="font-display text-3xl font-medium text-surface">{krs.name}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-surface/80">{krs.story}</p>
                </div>
                <div className="relative hidden h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-surface/10 ring-1 ring-surface/20 sm:flex">
                  {krs.image ? (
                    <Image src={krs.image.src} alt={krs.image.alt} fill sizes="96px" className="object-cover" />
                  ) : (
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9 text-secondary" aria-hidden="true">
                      <path d="M20 6l3.8 8.2 8.9 1.1-6.6 6.1 1.8 8.9L20 26l-7.9 4.3 1.8-8.9-6.6-6.1 8.9-1.1Z" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
                {krs.impact}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
