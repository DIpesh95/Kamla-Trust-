import { Reveal } from "./motion";
import { Container } from "./container";

/**
 * Preserved, not deleted: this was the homepage's Human Impact section before the live site's
 * "Moments & Gatherings" photo carousel was restored in its place (see human-impact.tsx). Kept
 * here, unimported, so this illustrative-archetype treatment is recoverable rather than lost if
 * a future direction wants it back. Not currently rendered anywhere.
 */

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20.2S3.5 15 3.5 9.1C3.5 6 5.9 4 8.5 4c1.6 0 3.1.9 3.5 2.3C12.4 4.9 13.9 4 15.5 4c2.6 0 5 2 5 5.1 0 5.9-8.5 11.1-8.5 11.1Z" />
    </svg>
  );
}

function CapIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 7 2 11.5 12 16l10-4.5Z" />
      <path d="M6 13.5V18c0 1 2.7 2 6 2s6-1 6-2v-4.5" />
      <path d="M20 11.5v5" />
    </svg>
  );
}

function HouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 11 12 4l8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  );
}

const large = {
  label: "A woman",
  line: "A name read aloud on a stage built for people who are usually only spoken about.",
  Icon: PersonIcon,
};

/** Approved checkerboard order, left-to-right top-to-bottom: charcoal, ivory, ivory, charcoal. */
const small = [
  {
    label: "A student",
    line: "A seat in a classroom that was never guaranteed, now it is.",
    Icon: PersonIcon,
    tone: "bg-text",
    onDark: true,
  },
  {
    label: "A patient",
    line: "A cervical-cancer screening that catches what would otherwise go unseen.",
    Icon: HeartIcon,
    tone: "bg-soft-bg",
    onDark: false,
  },
  {
    label: "A family",
    line: "A wedding day that becomes the start of a life, not the end of a struggle.",
    Icon: CapIcon,
    tone: "bg-soft-bg",
    onDark: false,
  },
  {
    label: "A community",
    line: "A flag raised, a kit handed over, a street vendor's morning made a little steadier.",
    Icon: HouseIcon,
    tone: "bg-text",
    onDark: true,
  },
];

export function HumanImpactArchetype() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">What this looks like</p>
          <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
            Impact isn&rsquo;t a figure. It&rsquo;s five decades of this.
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Illustrative examples of the kind of change these programs work toward, not individual
            beneficiary accounts.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:grid-rows-2 lg:min-h-[600px]">
          <Reveal className="relative col-span-2 flex aspect-[16/10] flex-col justify-between overflow-hidden bg-primary p-7 sm:aspect-[21/9] lg:col-span-1 lg:row-span-2 lg:aspect-auto lg:h-full lg:p-10">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full border border-surface/15 lg:h-56 lg:w-56"
            />
            <large.Icon className="relative h-10 w-10 text-secondary/70 lg:h-12 lg:w-12" />
            <div className="relative flex flex-col gap-2">
              <span className="font-display text-2xl italic text-secondary lg:text-4xl">{large.label}</span>
              <p className="max-w-sm text-sm leading-snug text-surface/85 sm:text-base">{large.line}</p>
            </div>
          </Reveal>

          {small.map((v, i) => (
            <Reveal
              key={v.label}
              delay={i * 0.08}
              className={`relative flex aspect-square flex-col justify-between overflow-hidden p-5 sm:p-6 lg:aspect-auto lg:h-full ${v.tone}`}
            >
              <v.Icon className={`h-8 w-8 ${v.onDark ? "text-secondary/70" : "text-primary/70"}`} />
              <div className="flex flex-col gap-1.5">
                <span className={`font-display text-lg italic ${v.onDark ? "text-secondary" : "text-primary-strong"}`}>
                  {v.label}
                </span>
                <p className={`text-xs leading-snug ${v.onDark ? "text-surface/85" : "text-text-muted"}`}>{v.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
