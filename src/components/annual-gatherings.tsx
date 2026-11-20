import { flagshipPrograms } from "@/content/flagship-programs";
import { Fact } from "./fact";
import { FilmFrame } from "./film-frame";
import { ClipReveal } from "./clip-reveal";
import { Reveal } from "./motion";
import { Container } from "./container";

function RibbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="12" r="7.2" />
      <path d="M11.3 18.2 9 27l7-3.2 7 3.2-2.3-8.8" />
    </svg>
  );
}

export function AnnualGatherings() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <p className="timecode text-xs font-bold text-primary">Annual gatherings</p>
          <h2 className="mt-4 font-display text-4xl font-bold italic text-text sm:text-5xl">
            Three traditions, in full.
          </h2>
        </Reveal>

        <div className="flex flex-col gap-14">
          {flagshipPrograms.map((program, i) => (
            <div key={program.slug} id={program.slug} className="scroll-mt-28">
            <ClipReveal
              delay={i * 0.05}
              className="grid gap-8 overflow-hidden rounded-sm border border-line lg:grid-cols-[1.1fr_1fr]"
            >
              <div className="relative aspect-[16/10] w-full bg-soft-bg lg:aspect-auto">
                {program.image ? (
                  <FilmFrame
                    src={program.image.src}
                    alt={program.image.alt}
                    reel={`Gathering 0${i + 1}`}
                    caption={program.year}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="absolute inset-0"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] w-full items-center justify-center">
                    <RibbonIcon className="h-14 w-14 text-primary/40" />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 p-7 sm:p-10">
                <span className="timecode text-xs text-primary">
                  {program.year}
                </span>
                <h3 className="font-display text-3xl font-semibold text-text sm:text-4xl">{program.name}</h3>
                <p className="text-sm leading-relaxed text-text-muted sm:text-base">{program.story}</p>

                <dl className="mt-2 grid grid-cols-2 gap-4 border-y border-line py-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Date</dt>
                    <dd className="mt-1 font-medium text-text">
                      <Fact value={program.date} />
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Venue</dt>
                    <dd className="mt-1 font-medium text-text">
                      <Fact value={program.venue} />
                    </dd>
                  </div>
                </dl>

                {program.highlights.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
                      Highlights &amp; moments
                    </p>
                    <ul className="flex flex-col gap-1.5 text-sm leading-relaxed text-text-muted">
                      {program.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2">
                          <span aria-hidden="true" className="text-primary">
                            •
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm italic text-text-muted">
                    Specific past editions and honourees pending confirmation from the trustees.
                  </p>
                )}
              </div>
            </ClipReveal>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
