"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

/** Matches the card's fixed desktop width (sm:w-[15.5rem]) and its p-3 padding, in px. */
const CARD_WIDTH_PX = 248;
const CARD_PADDING_PX = 12;

export function FiveDecadesTimeline() {
  const years = getYearsActive();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const manualControlRef = useRef(false);
  const programmaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches,
  );
  const reduceMotion = useReducedMotion();
  const progressPct = (active / (milestones.length - 1)) * 100;

  function milestoneNodes(el: HTMLDivElement) {
    // The scroll container's direct child is RevealGroup's own wrapper div; the milestone
    // cards are one level deeper. The travelling puck is rendered as that wrapper's first
    // child (before the mapped cards), so it has to be skipped here or every index below
    // would point one card too early — the mistargeted scrollIntoView() this caused is what
    // looked like the journey stuttering/restarting around the middle of the timeline.
    return Array.from(el.firstElementChild?.children ?? []).slice(1) as HTMLElement[];
  }

  function stopAutoplay() {
    if (autoplayRef.current !== null) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function takeManualControl() {
    manualControlRef.current = true;
    stopAutoplay();
  }

  // scrollIntoView's native smooth-scroll fires a stream of scroll events while it's mid-flight.
  // Without this guard, onScroll below recalculates "nearest milestone" from the in-progress
  // scroll position and briefly overrides the index we just set explicitly — the dot visibly
  // gets pulled back before the scroll finishes, looking like it stalls and needs a second
  // click/tick to actually arrive. Mark these scrolls as programmatic so onScroll ignores them
  // until they've settled; manual drag/wheel scrolling is untouched and still drives onScroll.
  function markProgrammaticScroll() {
    programmaticScrollRef.current = true;
    if (programmaticScrollTimeoutRef.current !== null) {
      window.clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 700);
  }

  function scrollToIndex(i: number) {
    takeManualControl();
    const el = trackRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(milestones.length - 1, i));
    setActive(clamped);
    const nodes = milestoneNodes(el);
    markProgrammaticScroll();
    nodes[clamped]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current !== null) window.clearTimeout(programmaticScrollTimeoutRef.current);
    };
  }, []);

  // The travelling marker and its autoplay only make sense on the desktop horizontal layout —
  // on mobile the milestones are a plain vertical list with no horizontal track, so the same
  // scrollIntoView() calls would instead auto-scroll the whole page up and down, which is not
  // the intended behaviour there. Matches Tailwind's `sm` breakpoint used throughout this file.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    function onChange(e: MediaQueryListEvent) {
      setIsDesktop(e.matches);
    }
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Tracks whether the timeline is actually on screen, continuously (not just once), so the
  // journey plays while the visitor is looking at this section and stops the moment they scroll
  // away. Direct rect-checks on scroll/resize plus a short poll, rather than relying on
  // IntersectionObserver alone, matching the rest of the site's reveal logic. The moment it
  // leaves view it's reset back to 1967, ready to play again next time it's scrolled to.
  useEffect(() => {
    let wasVisible = false;
    function check() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.top < vh - 80 && rect.bottom > 80;
      if (visible === wasVisible) return;
      wasVisible = visible;
      setInView(visible);
      if (!visible && !manualControlRef.current) {
        stopAutoplay();
        setActive(0);
        trackRef.current?.scrollTo({ left: 0 });
      }
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const poll = window.setInterval(check, 250);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.clearInterval(poll);
    };
  }, []);

  // Plays the journey from 1967 to 2026 while the section is in view; stops the moment it
  // scrolls out of view (reset handled above) or the visitor takes manual control (arrow click,
  // drag, or wheel) — autoplay then steps aside permanently so it never fights them. Never runs
  // under prefers-reduced-motion.
  useEffect(() => {
    if (reduceMotion || manualControlRef.current || !inView || !isDesktop) {
      stopAutoplay();
      return;
    }

    autoplayRef.current = window.setInterval(() => {
      setActive((prev) => {
        if (prev >= milestones.length - 1) {
          stopAutoplay();
          return prev;
        }
        const next = prev + 1;
        const el = trackRef.current;
        if (el) {
          markProgrammaticScroll();
          milestoneNodes(el)[next]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }
        return next;
      });
    }, 1700);
    return stopAutoplay;
  }, [reduceMotion, inView, isDesktop]);

  function onScroll() {
    if (programmaticScrollRef.current) return;
    const el = trackRef.current;
    if (!el) return;

    let nearest = 0;
    let best = Infinity;
    milestoneNodes(el).forEach((node, i) => {
      const diff = Math.abs(node.offsetLeft - el.scrollLeft);
      if (diff < best) {
        best = diff;
        nearest = i;
      }
    });
    setActive(nearest);
  }

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

        {/* Timeline: the connecting line draws across once in view (desktop), then each milestone
            reveals in sequence. Desktop scrolls horizontally with an active/muted state driven by
            scroll position or the arrow controls below; mobile stacks vertically so every
            milestone is reachable by ordinary page scroll alone. */}
        <div ref={sectionRef} className="relative">
          <DrawLine className="absolute left-0 top-[0.56rem] hidden h-px w-full bg-gradient-to-r from-secondary via-secondary/50 to-secondary/10 sm:block" />
          <div
            ref={trackRef}
            onScroll={onScroll}
            onWheel={takeManualControl}
            onPointerDown={takeManualControl}
            className="sm:-mx-6 sm:overflow-x-auto sm:px-6 sm:pb-4"
          >
            <RevealGroup className="relative flex flex-col gap-8 sm:flex-row sm:gap-0" stagger={0.12}>
              {/* Single travelling marker: slides along the line to the active milestone, rather
                  than every dot popping independently, so the eye can actually follow it move. */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-[0.75rem] z-10 hidden h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_0_4px_var(--secondary),0_0_14px_2px_rgba(240,98,146,0.55)] sm:block"
                initial={false}
                animate={{ x: active * CARD_WIDTH_PX + CARD_PADDING_PX }}
                transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              />
              {milestones.map((m, i) => {
                const isActive = i === active;
                return (
                  <RevealItem
                    key={m.year}
                    className={`group relative flex w-full shrink-0 flex-col gap-3 rounded-sm p-3 transition-all duration-500 ease-out hover:bg-surface/[0.06] sm:w-[15.5rem] sm:pr-8 ${
                      isActive ? "sm:opacity-100" : "sm:opacity-45 sm:hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:hidden">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                      <div className="h-px flex-1 bg-surface/20" aria-hidden="true" />
                    </div>
                    <span
                      aria-hidden="true"
                      className="relative hidden h-2.5 w-2.5 shrink-0 rounded-full bg-surface/30 sm:block"
                    />
                    <span
                      className={`font-display text-2xl italic transition-all duration-500 ease-out ${
                        isActive ? "scale-105 text-secondary" : "text-secondary/60"
                      }`}
                      style={{ transformOrigin: "left center" }}
                    >
                      {m.year}
                    </span>
                    <h3 className="text-base font-semibold text-surface">{m.title}</h3>
                    <p className="text-sm leading-snug text-surface/70">{m.blurb}</p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
          {/* Edge fade, hinting there's more to scroll (desktop only — mobile is a plain vertical list). */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-primary-strong to-transparent sm:block" />
        </div>

        {/* Controls: progress bar + step count + prev/next, desktop only (mobile scrolls the page). */}
        <div className="hidden items-center gap-5 sm:flex">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface/15">
            <div
              className="h-full rounded-full bg-secondary transition-[width] duration-700 ease-out"
              style={{ width: `${Math.max(6, progressPct)}%` }}
            />
          </div>
          <span className="shrink-0 font-data text-xs text-surface/50">
            {String(active + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
          </span>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(active - 1)}
              aria-label="Previous milestone"
              disabled={active === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-surface/25 text-surface transition-all duration-300 hover:-translate-x-0.5 hover:border-secondary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(active + 1)}
              aria-label="Next milestone"
              disabled={active === milestones.length - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-surface/25 text-surface transition-all duration-300 hover:translate-x-0.5 hover:border-secondary disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-x-0"
            >
              &#8594;
            </button>
          </div>
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
