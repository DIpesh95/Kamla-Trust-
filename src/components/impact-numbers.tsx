import { headlineStats } from "@/content/stats";
import { geographicReach } from "@/content/geography";
import { milestones } from "@/content/milestones";
import { Reveal, CountUp } from "./motion";
import { Container } from "./container";
import { Fact } from "./fact";
import { PinnedScrub } from "./pinned-scrub";

const [cities, years, programs] = headlineStats;

export function ImpactNumbers() {
  return (
    <section className="bg-deep-bronze py-24 sm:py-20">
      <Container className="flex flex-col gap-16">
        <Reveal>
          <p className="timecode text-xs font-semibold text-gold">Our journey</p>
          <h2 className="mt-4 font-display text-4xl font-bold italic text-surface sm:text-5xl">
            Five Decades of Action.
          </h2>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal y={34}>
            <div className="flex flex-col">
              <CountUp
                value={years.value}
                className="font-display text-[9rem] font-medium italic leading-none text-gold-soft sm:text-[11rem]"
              />
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-surface/70">
                Years of turning service into action. {years.note}
              </p>
              {years.source ? (
                <p className="mt-2 text-xs text-surface/45">
                  Source: <Fact value={years.source} />
                </p>
              ) : null}
            </div>
          </Reveal>

          <div className="flex flex-col divide-y divide-surface/15 border-t border-surface/15 lg:border-t-0">
            {[cities, programs].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1} className="flex flex-col gap-1.5 py-6">
                <div className="flex items-baseline justify-between gap-6">
                  <CountUp value={stat.value} className="font-display text-5xl font-medium text-surface sm:text-6xl" />
                  <span className="timecode text-right text-xs text-surface/60">{stat.label}</span>
                </div>
                {stat.source || stat.period ? (
                  <p className="text-right text-xs text-surface/40">
                    {stat.source ? <Fact value={stat.source} /> : null}
                    {stat.source && stat.period ? " · " : null}
                    {stat.period ? <Fact value={stat.period} /> : null}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <div className="mt-20 border-t border-surface/15 pt-20">
        <Container className="mb-10">
          <p className="timecode text-xs font-semibold text-gold">The reel, 1969 &rarr; today</p>
          <p className="mt-3 max-w-md text-sm text-surface/55">Scroll to walk through the trust&rsquo;s history and reach, frame by frame.</p>
        </Container>

        <PinnedScrub trackClassName="gap-6 px-6 sm:px-10">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="flex h-[360px] w-[78vw] shrink-0 flex-col justify-between border border-surface/15 bg-surface/[0.03] p-8 sm:w-[420px] sm:p-10"
            >
              <span className="timecode text-[10px] text-surface/40">Milestone</span>
              <div className="flex flex-col gap-4">
                <span className="font-display text-6xl italic leading-none text-gold-soft sm:text-7xl">{m.year}</span>
                <p className="max-w-sm text-base leading-relaxed text-surface/70">{m.text}</p>
              </div>
            </div>
          ))}
          {geographicReach.map((place) => (
            <div
              key={place.city}
              className="flex h-[360px] w-[78vw] shrink-0 flex-col justify-between border border-surface/15 bg-surface/[0.03] p-8 sm:w-[420px] sm:p-10"
            >
              <span className="timecode text-[10px] text-surface/40">Location</span>
              <div className="flex flex-col gap-4">
                <p className="font-display text-4xl font-semibold text-gold-soft">
                  {place.city}
                  <span className="ml-2 timecode text-xs text-surface/50">{place.state}</span>
                </p>
                <p className="max-w-sm text-base leading-relaxed text-surface/70">{place.context}</p>
              </div>
            </div>
          ))}
        </PinnedScrub>
      </div>
    </section>
  );
}
