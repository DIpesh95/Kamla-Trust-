import Link from "next/link";
import { flagshipPrograms } from "@/content/flagship-programs";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { Container } from "./container";

/**
 * Deliberately typographic/pattern-led (no photography) so this section reads as visually
 * distinct from the photo-led Annual Gatherings section that follows it, even though both cover
 * the same three initiatives.
 */
const identities: Record<string, { gradient: string; icon: React.ReactNode }> = {
  "kamala-power-women-awards": {
    gradient: "linear-gradient(140deg, #7a1040 0%, #251f21 70%)",
    icon: (
      <path d="M12 3l2.4 5 5.6.6-4.2 3.8 1.2 5.6L12 15 6.9 18l1.2-5.6L4 8.6 9.6 8 12 3Z" />
    ),
  },
  "pillars-of-humanity": {
    gradient: "linear-gradient(150deg, #5c1636 0%, #251f21 65%)",
    icon: (
      <path d="M12 21s-7-4.5-7-10.8C5 6.5 7.5 4 10.5 4c1.6 0 3 .8 1.5 2.2C13.5 4.8 14.9 4 16.5 4 19.5 4 22 6.5 22 10.2 22 16.5 12 21 12 21Z" />
    ),
  },
  "kamala-rising-star": {
    gradient: "linear-gradient(135deg, #421226 0%, #251f21 60%)",
    icon: <path d="M12 3l2.3 5 5.5.7-4 3.7 1.1 5.5L12 15l-4.9 2.9 1.1-5.5-4-3.7 5.5-.7L12 3Z" />,
  },
};

export function SignatureInitiatives() {
  return (
    <section className="bg-soft-bg py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Signature initiatives</p>
          <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
            Three traditions, carried every year.
          </h2>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 gap-5 lg:grid-cols-3" stagger={0.1}>
          {flagshipPrograms.map((program) => {
            const identity = identities[program.slug];
            return (
              <RevealItem key={program.slug}>
                <Link
                  href={`/#${program.slug}`}
                  className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-sm p-8 transition-transform duration-500 ease-out hover:-translate-y-1.5 sm:p-9"
                  style={{ background: identity?.gradient }}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 14px)",
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                      {program.year}
                    </span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-9 w-9 text-surface/70 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:text-secondary"
                      aria-hidden="true"
                    >
                      {identity?.icon}
                    </svg>
                  </div>

                  <div className="relative flex flex-col gap-3">
                    <h3 className="font-display text-3xl font-medium leading-[1.05] text-surface sm:text-4xl">
                      {program.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-surface/75">{program.blurb}</p>
                    {program.venue ? <p className="text-xs text-surface/50">{program.venue}</p> : null}
                    <span className="mt-1 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-surface">
                      {program.impact}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
