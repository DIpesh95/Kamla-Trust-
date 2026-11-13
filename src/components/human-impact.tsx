import { PillarIcon } from "./pillar-icon";
import { Reveal } from "./motion";
import { Container } from "./container";

const vignettes = [
  {
    label: "A student",
    line: "A seat in a classroom that was never guaranteed, now it is.",
    slug: "education",
  },
  {
    label: "A patient",
    line: "A cervical-cancer screening that catches what would otherwise go unseen.",
    slug: "healthcare",
  },
  {
    label: "A woman",
    line: "A name read aloud on a stage built for people who are usually only spoken about.",
    slug: "women-and-girl-child",
  },
  {
    label: "A family",
    line: "A wedding day that becomes the start of a life, not the end of a struggle.",
    slug: "rural-livelihoods-environment",
  },
  {
    label: "A community",
    line: "A flag raised, a kit handed over, a street vendor's morning made a little steadier.",
    slug: "disaster-relief-civic-recognition",
  },
];

export function HumanImpact() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">What this looks like</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
            Impact isn&rsquo;t a figure. It&rsquo;s five decades of this.
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Illustrative examples of the kind of change these programs work toward, not individual
            beneficiary accounts.
          </p>
        </Reveal>

        <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-5 sm:overflow-visible sm:px-0">
          {vignettes.map((v, i) => (
            <Reveal
              key={v.label}
              delay={i * 0.08}
              className="group relative flex aspect-[3/4] w-[72vw] shrink-0 flex-col justify-between overflow-hidden rounded-sm bg-text p-4 sm:w-auto"
            >
              <PillarIcon
                slug={v.slug}
                className="h-9 w-9 text-secondary/70 transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="flex flex-col gap-1.5">
                <span className="font-display text-lg italic text-secondary">{v.label}</span>
                <p className="text-xs leading-snug text-surface/85">{v.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
