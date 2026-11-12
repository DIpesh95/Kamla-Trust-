import { headlineStats } from "@/content/stats";
import { Reveal, CountUp } from "./motion";
import { Container } from "./container";
import { Fact } from "./fact";

const [cities, years, programs] = headlineStats;

export function ImpactNumbers() {
  return (
    <section className="bg-text py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">Five decades of action</p>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <Reveal y={34}>
            <div className="flex flex-col">
              <CountUp
                value={years.value}
                className="font-display text-[9rem] font-medium italic leading-none text-surface sm:text-[11rem]"
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
                  <span className="text-right font-sans text-xs font-medium uppercase tracking-[0.18em] text-surface/60">
                    {stat.label}
                  </span>
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
    </section>
  );
}
