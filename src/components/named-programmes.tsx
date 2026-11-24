import Link from "next/link";
import Image from "next/image";
import { getPillar } from "@/content/pillars";
import { Fact } from "./fact";
import { PillarIcon } from "./pillar-icon";
import { RevealGroup, RevealItem, RevealImage } from "./motion";

type Slot = {
  pillarSlug: string;
  initiativeName: string;
  image?: { src: string; alt: string };
};

const slots: Slot[] = [
  {
    pillarSlug: "women-and-girl-child",
    initiativeName: "Kanya Sneh Bandhan",
    image: {
      src: "/images/gallery-kanya-sneh-bandhan-square.jpg",
      alt: "Kanya Sneh Bandhan mass wedding ceremony, bride receiving a gift",
    },
  },
  { pillarSlug: "healthcare", initiativeName: "HPV Bharat – Kamala Beti Kavach" },
  { pillarSlug: "education", initiativeName: "Commerce College & Hostel, Bhinmal" },
  { pillarSlug: "rural-livelihoods-environment", initiativeName: "Renewable Power Plants" },
  {
    pillarSlug: "disaster-relief-civic-recognition",
    initiativeName: "Tiranga Rally",
    image: {
      src: "/images/programme-tiranga-rally.jpg",
      alt: "Tiranga Rally, Mumbai",
    },
  },
];

function findInitiative(pillarSlug: string, name: string) {
  const pillar = getPillar(pillarSlug);
  const initiative = pillar?.initiatives.find((i) => i.name === name);
  return pillar && initiative ? { pillar, initiative } : null;
}

export function NamedProgrammes() {
  const resolved = slots.map((slot) => ({ slot, hit: findInitiative(slot.pillarSlug, slot.initiativeName) })).filter((r) => r.hit);
  const [featured, ...rest] = resolved;
  const medium = rest.slice(0, 2);
  const small = rest.slice(2);

  if (!featured) return null;

  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
      <RevealItem className="lg:col-span-2 lg:row-span-2">
        <Card slot={featured.slot} pillar={featured.hit!.pillar} initiative={featured.hit!.initiative} size="large" />
      </RevealItem>
      {medium.map(({ slot, hit }) => (
        <RevealItem key={slot.initiativeName} className="sm:col-span-1 lg:row-span-1">
          <Card slot={slot} pillar={hit!.pillar} initiative={hit!.initiative} size="medium" />
        </RevealItem>
      ))}
      {small.map(({ slot, hit }) => (
        <RevealItem key={slot.initiativeName}>
          <Card slot={slot} pillar={hit!.pillar} initiative={hit!.initiative} size="small" />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function Card({
  slot,
  pillar,
  initiative,
  size,
}: {
  slot: Slot;
  pillar: NonNullable<ReturnType<typeof getPillar>>;
  initiative: { name: string; blurb: Parameters<typeof Fact>[0]["value"]; location?: string };
  size: "large" | "medium" | "small";
}) {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <Link
      href={`/our-work/${pillar.slug}`}
      className={`group relative flex h-full flex-col justify-end overflow-hidden rounded-sm border border-line bg-text transition-transform duration-500 ease-out hover:-translate-y-1 ${
        isLarge ? "min-h-[26rem] lg:min-h-full" : isSmall ? "min-h-[14rem] p-6" : "min-h-[18rem] p-7"
      }`}
    >
      {slot.image ? (
        <>
          <RevealImage className="absolute inset-0">
            <Image
              src={slot.image.src}
              alt={slot.image.alt}
              fill
              quality={92}
              sizes={isLarge ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </RevealImage>
          <div className="absolute inset-0 bg-gradient-to-t from-text via-text/40 to-text/5" />
        </>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-15">
          <PillarIcon slug={pillar.slug} className="h-32 w-32 text-surface" />
        </div>
      )}

      <div className={`relative flex flex-col gap-2 ${slot.image ? "p-6 sm:p-7" : ""}`}>
        <span className="font-data text-[11px] uppercase tracking-[0.18em] text-secondary">{pillar.shortName}</span>
        <h3 className={`font-display font-medium leading-tight text-surface ${isLarge ? "text-3xl sm:text-4xl" : isSmall ? "text-lg" : "text-2xl"}`}>
          {initiative.name}
        </h3>
        {!isSmall ? (
          <p className={`leading-snug text-surface/75 ${isLarge ? "max-w-md text-sm sm:text-base" : "text-sm"}`}>
            <Fact value={initiative.blurb} />
          </p>
        ) : null}
        <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-surface/90">
          View programme
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
