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
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Signature initiatives</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
            Three traditions, carried every year.
          </h2>
        </Reveal>

        {/* 1. Kamala Power Women Awards: full-width banner */}
        <Reveal>
          <Link
            href={`/#${kpw.slug}`}
            className="group relative block overflow-hidden rounded-sm"
          >
            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
              <Image
                src={kpw.image!.src}
                alt={kpw.image!.alt}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 sm:p-10">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">{kpw.year}</span>
              <h3 className="font-display text-3xl font-medium text-surface sm:text-5xl">{kpw.name}</h3>
              <p className="max-w-lg text-sm text-surface/80 sm:text-base">{kpw.story}</p>
              <span className="mt-1 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
                {kpw.impact}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* 2. Pillars of Humanity: portrait, stat-forward */}
          <Reveal delay={0.05} className="group relative overflow-hidden rounded-sm border border-line">
            <Link href={`/#${poh.slug}`}>
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={poh.image!.src}
                  alt={poh.image!.alt}
                  fill
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text/85 via-text/10 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7">
                <span className="font-display text-6xl font-medium italic leading-none text-secondary">6</span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-surface/70">{poh.impact}</span>
                <h3 className="mt-2 font-display text-2xl font-medium text-surface">{poh.name}</h3>
                <p className="text-sm text-surface/75">{poh.blurb}</p>
              </div>
            </Link>
          </Reveal>

          {/* 3. Kamala Rising Star: text-forward, small accent image */}
          <Reveal delay={0.1} className="group flex flex-col justify-between gap-8 rounded-sm border border-line bg-surface p-8 sm:p-10">
            <Link href={`/#${krs.slug}`} className="flex flex-1 flex-col justify-between gap-8">
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">{krs.year}</span>
                  <h3 className="font-display text-3xl font-medium text-text sm:text-4xl">{krs.name}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-text-muted sm:text-base">{krs.story}</p>
                </div>
                <div className="relative hidden h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-soft-bg sm:flex">
                  {krs.image ? (
                    <Image src={krs.image.src} alt={krs.image.alt} fill sizes="112px" className="object-cover" />
                  ) : (
                    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-primary" aria-hidden="true">
                      <path d="M20 6l3.8 8.2 8.9 1.1-6.6 6.1 1.8 8.9L20 26l-7.9 4.3 1.8-8.9-6.6-6.1 8.9-1.1Z" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
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
