import Image from "next/image";
import { DragRow, RevealGroup, RevealItem } from "./motion";
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
        <RevealGroup className="max-w-2xl">
          <RevealItem>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Moments &amp; gatherings</p>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
              Impact isn&rsquo;t a figure. It&rsquo;s a room full of people, year after year.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 text-sm text-text-muted">&#8596; Drag, or use the arrows, to see more.</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="flex flex-col gap-10">
          <DragRow
            rowClassName="sm:grid sm:w-full sm:grid-cols-[repeat(4,320px)] lg:grid-cols-none lg:grid-flow-col lg:auto-cols-[minmax(0,1fr)]"
            ariaLabel="Moments and gatherings"
          >
            {moments.map((m) => (
              <RevealItem
                key={m.src}
                className={`group relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden sm:w-auto ${
                  m.width === "wide" ? "lg:aspect-[1/1]" : "lg:aspect-[3/4]"
                }`}
              >
                <Image
                  src={m.src}
                  alt={m.alt}
                  fill
                  quality={92}
                  sizes="(min-width: 640px) 45vw, 78vw"
                  className="pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text/90 via-text/10 to-transparent"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 sm:p-6">
                  <span className="w-fit font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    {m.tag}
                  </span>
                  <span className="font-display text-xl font-medium text-surface sm:text-2xl">{m.title}</span>
                  <span className="max-w-xs text-xs leading-snug text-surface/80 sm:text-sm">{m.description}</span>
                </div>
              </RevealItem>
            ))}
          </DragRow>
        </RevealGroup>
      </Container>
    </section>
  );
}
