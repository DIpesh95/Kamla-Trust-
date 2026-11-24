"use client";

import { trust } from "@/content/trust";
import { getYearsActive, headlineStats } from "@/content/stats";
import { Reveal, RevealGroup, RevealItem, CountUp, DrawLine } from "./motion";
import { Fact } from "./fact";
import { Container } from "./container";

const milestones = [
  {
    year: "1967",
    title: "Commerce College, Bhinmal",
    blurb: "Shri G.K. Gowani founds the Commerce College, bringing higher education to Bhinmal.",
  },
  {
    year: "1969",
    title: "Kamala Trust registered",
    blurb: `${trust.legalName}, a ${trust.orgType.toLowerCase()}, is established.`,
  },
  {
    year: "1975",
    title: "Ankibai Ghamandiram Ji Hostel",
    blurb: "Safe, affordable accommodation opens for students travelling from distant areas to study in Bhinmal.",
  },
  {
    year: "2022",
    title: "Kamala Power Women Award",
    blurb: "38 women achievers honoured; awards presented by the then-Governor of Maharashtra, Shri Bhagat Singh Koshyari.",
  },
  {
    year: "2023",
    title: "Trendsetter Indians Awards & Khadiology",
    blurb: "Recognition at the Trendsetter Indians Awards, alongside “Khadiology: A Walk for Awareness.”",
  },
  {
    year: "2024",
    title: "Pillars of Humanity, Gateway of India",
    blurb: "An annual walk for humanity, honouring six communities the country too often looks past.",
  },
  {
    year: "2026",
    title: "Kamala Power Women Award 4.0",
    blurb: "Lokmata Ahilyabai Holkar Mahila Samman, presented by Shri Nitin Gadkari.",
  },
];

/** Verified, named locations drawn from existing initiative and newsroom records only. */
const locations = [
  "Mumbai, Maharashtra",
  "Bhinmal, Rajasthan",
  "Vrindavan, Uttar Pradesh",
  "Bhilwara, Rajasthan",
  "Palitana, Gujarat",
  "Varanasi, Uttar Pradesh",
  "Delhi",
];

const [cities, , programs] = headlineStats;

export function FiveDecadesTimeline() {
  const years = getYearsActive();

  return (
    <section className="relative overflow-hidden bg-primary-strong py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 32px)",
        }}
      />
      {/* Ambient glow: slow, subtle, decorative only — respects reduced-motion via motion-safe:. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl motion-safe:animate-pulse"
        style={{ animationDuration: "6s" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-20 h-[26rem] w-[26rem] rounded-full bg-light-pink/10 blur-3xl motion-safe:animate-pulse"
        style={{ animationDuration: "8s" }}
      />
      <Container className="relative flex flex-col gap-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal className="flex flex-col gap-4">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">
              Five decades of action
            </p>
            <h2 className="font-display text-5xl font-medium italic leading-[1.05] text-surface sm:text-6xl">
              <CountUp value={String(years)} /> years, one journey.
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-surface/75">
              From a single college and hostel in Bhinmal to programs spanning education, healthcare, women&rsquo;s
              welfare, rural livelihoods, and disaster relief.
            </p>
          </Reveal>

          <RevealGroup className="flex gap-10 lg:justify-end" stagger={0.1}>
            {[cities, programs].map((stat) => (
              <RevealItem key={stat.label} className="flex flex-col gap-1">
                <CountUp value={stat.value} className="font-display text-4xl font-medium text-surface sm:text-5xl" />
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-surface/60">{stat.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Timeline: the connecting line draws across once in view, then each milestone reveals in sequence. */}
        <div className="relative">
          <DrawLine className="absolute left-0 top-[0.56rem] hidden h-px w-full bg-gradient-to-r from-secondary via-secondary/50 to-secondary/10 sm:block" />
          <RevealGroup
            className="-mx-6 flex gap-0 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0"
            stagger={0.12}
          >
            {milestones.map((m) => (
              <RevealItem
                key={m.year}
                className="group relative flex w-[15.5rem] shrink-0 flex-col gap-3 rounded-sm p-3 pr-8 transition-all duration-400 ease-out hover:-translate-y-1 hover:bg-surface/[0.06]"
              >
                <div className="flex items-center gap-3 sm:hidden">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
                  <div className="h-px flex-1 bg-surface/20" aria-hidden="true" />
                </div>
                <span
                  aria-hidden="true"
                  className="relative hidden h-2.5 w-2.5 shrink-0 rounded-full bg-secondary ring-4 ring-primary-strong transition-transform duration-300 ease-out group-hover:scale-125 group-hover:ring-secondary/30 sm:block"
                />
                <span className="font-display text-2xl italic text-secondary transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  {m.year}
                </span>
                <h3 className="text-base font-semibold text-surface">{m.title}</h3>
                <p className="text-sm leading-snug text-surface/70">{m.blurb}</p>
              </RevealItem>
            ))}
          </RevealGroup>
          {/* Edge fade, hinting there's more to scroll. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-primary-strong to-transparent sm:block" />
        </div>

        <Reveal className="flex flex-col gap-4 border-t border-surface/15 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-light-pink">
              Geographical reach
            </p>
            {cities.source ? (
              <p className="text-xs text-surface/40">
                Source: <Fact value={cities.source} />
              </p>
            ) : null}
          </div>
          <RevealGroup className="flex flex-wrap gap-3" stagger={0.05}>
            {locations.map((loc) => (
              <RevealItem key={loc}>
                <span className="inline-block cursor-default rounded-full border border-surface/25 px-4 py-1.5 text-sm text-surface/85 transition-all duration-300 hover:border-secondary/60 hover:bg-surface/10 hover:text-surface">
                  {loc}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Reveal>
      </Container>
    </section>
  );
}
