import Image from "next/image";
import { DragRow, GsapStagger } from "./scroll-fx";
import { Reveal } from "./motion";
import { Container } from "./container";

type Moment = {
  src: string;
  alt: string;
  title: string;
  description: string;
  tag: string;
  width: "regular" | "wide";
};

/**
 * Real photographed gatherings and moments, pulled from the trust's own event photography
 * (see content/media.ts and content/newsroom.ts for the same facts used elsewhere on the site).
 * No image, date, or description here is invented.
 */
const moments: Moment[] = [
  {
    src: "/images/hero-kanya-sneh-bandhan-alt.jpg",
    alt: "Governor of Maharashtra Shri Jishnu Dev Varma Ji at the Kanya Sneh Bandhan mass wedding ceremony",
    title: "Kanya Sneh Bandhan",
    description: "A mass wedding ceremony for underprivileged couples, attended by the Governor of Maharashtra.",
    tag: "Women & Girl Child",
    width: "wide",
  },
  {
    src: "/images/lokmata-ahilyabai-holkar-2026.jpg",
    alt: "Devendra Fadnavis speaking at the Lokmata Ahilyabai Holkar Mahila Samman 2026, NCPA",
    title: "Lokmata Ahilyabai Holkar Mahila Samman",
    description:
      "Kamala Power Women's annual awards, honouring women across healthcare, journalism, education, art, entrepreneurship, and social work.",
    tag: "2026",
    width: "regular",
  },
  {
    src: "/images/republic-day-2026.jpg",
    alt: "Outdoor Republic Day gathering, Kamala Mills Compound",
    title: "Republic Day Celebration",
    description:
      "Flag hoisting, a community pledge, and livelihood-support kits for mochis, street vendors, Dabbawalas and transgender artisans.",
    tag: "2026",
    width: "wide",
  },
  {
    src: "/images/kpw-lokmata-award.jpg",
    alt: "Lokmata Ahilyabai Holkar Mahila Samman 2026 awards ceremony",
    title: "Kamala Power Women, on stage",
    description: "Awards presented across the ceremony, recognising achievement across twenty-plus sectors.",
    tag: "Recognition",
    width: "regular",
  },
];

export function HumanImpact() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Moments &amp; gatherings</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
            Impact isn&rsquo;t a figure. It&rsquo;s a room full of people, year after year.
          </h2>
          <p className="mt-3 text-sm text-text-muted">↔ Drag, or use the arrows, to see more.</p>
        </Reveal>

        <GsapStagger className="flex flex-col gap-10" selector="figure" y={26} stagger={0.1}>
          <DragRow rowClassName="sm:grid sm:grid-flow-col sm:auto-cols-[minmax(0,1fr)]">
            {moments.map((m) => (
          <figure
            key={m.src}
            className={`group relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-sm sm:w-auto ${
              m.width === "wide" ? "sm:aspect-[16/11]" : "sm:aspect-[3/4]"
            }`}
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              quality={90}
              sizes="(min-width: 640px) 45vw, 78vw"
              className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text/90 via-text/10 to-transparent"
            />
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
              <span className="w-fit font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                {m.tag}
              </span>
              <span className="font-display text-xl font-medium italic text-surface sm:text-2xl">{m.title}</span>
              <span className="max-w-xs text-xs leading-snug text-surface/80 sm:text-sm">{m.description}</span>
            </figcaption>
          </figure>
            ))}
          </DragRow>
        </GsapStagger>
      </Container>
    </section>
  );
}
