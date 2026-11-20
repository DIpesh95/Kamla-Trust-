import Link from "next/link";
import { trust } from "@/content/trust";
import { isPlaceholder } from "@/content/types";
import { ClipReveal } from "./clip-reveal";
import { Reveal } from "./motion";
import { Container } from "./container";

export function LeadershipTeaser() {
  const [lead] = trust.trustees;
  const initial = lead.name.split(" ").filter((w) => /^[A-Za-z]/.test(w))[1]?.[0] ?? lead.name[0];
  const hasKnowMore = lead.knowMoreUrl && !isPlaceholder(lead.knowMoreUrl);

  return (
    <section className="bg-film-black py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 overflow-hidden rounded-sm lg:grid-cols-[0.8fr_1.2fr] lg:gap-0">
          <ClipReveal direction="left" className="relative flex aspect-square items-center justify-center bg-gradient-to-br from-primary-strong/50 via-film-black to-film-black sm:aspect-[4/5]">
            <span className="relative font-display text-[9rem] italic leading-none text-secondary/80 sm:text-[11rem]">
              {initial}
            </span>
            <svg aria-hidden="true" className="absolute inset-0 h-full w-full film-grain">
              <filter id="leadership-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#leadership-grain)" />
            </svg>
            <span className="timecode absolute bottom-6 left-6 text-[10px] text-surface/40">
              Portrait pending
            </span>
          </ClipReveal>
          <Reveal delay={0.1} className="flex flex-col gap-4 px-2 py-10 sm:px-12 lg:py-0">
            <p className="timecode text-xs font-bold text-gold">Leadership</p>
            <h2 className="font-display text-4xl font-bold text-surface sm:text-5xl">{lead.name}</h2>
            <p className="timecode text-sm text-secondary">{lead.role}</p>
            <p className="max-w-xl text-base leading-relaxed text-surface/75 sm:text-lg">{lead.bio}</p>
            <div className="mt-3 flex flex-wrap items-center gap-6">
              <Link
                href="/about/leadership"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-surface px-6 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-text transition-colors hover:bg-surface/90"
              >
                Meet the trustees
                <span aria-hidden="true">→</span>
              </Link>
              {hasKnowMore ? (
                <a
                  href={lead.knowMoreUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface/70 transition-colors hover:text-surface"
                >
                  Know more
                  <span aria-hidden="true">↗</span>
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
