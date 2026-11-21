import Link from "next/link";
import Image from "next/image";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { GsapStagger, ClipReveal } from "./scroll-fx";

const emotionalLine: Record<string, string> = {
  education: "Because opportunity should never depend on where you are born.",
  healthcare: "Because a healthy life should never be a privilege.",
  "women-and-girl-child": "Because dignity is not negotiable.",
  "rural-livelihoods-environment": "Because roots deserve as much care as growth.",
  "disaster-relief-civic-recognition": "Because showing up matters most when it's hardest.",
};

const monogram: Record<string, string> = {
  education: "Ed",
  healthcare: "Hc",
  "women-and-girl-child": "Wg",
  "rural-livelihoods-environment": "Rl",
  "disaster-relief-civic-recognition": "Dr",
};

function PhotoPillarCard({
  pillar,
  image,
  size,
  clipFrom,
}: {
  pillar: (typeof pillars)[number];
  image: { src: string; alt: string };
  size: "wide" | "tall";
  clipFrom: "left" | "right";
}) {
  return (
    <Link
      href={`/our-work/${pillar.slug}`}
      className={`group relative block overflow-hidden rounded-sm ${
        size === "wide" ? "lg:col-span-7" : "lg:col-span-5"
      } lg:row-span-2`}
    >
      <ClipReveal
        direction={clipFrom}
        className={`relative aspect-[4/3] w-full ${size === "wide" ? "lg:aspect-[16/10]" : "lg:aspect-[3/4]"}`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          quality={92}
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
      </ClipReveal>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-text/92 via-text/25 to-transparent transition-opacity duration-500 group-hover:from-text/95"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7 sm:p-9">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Focus area
        </span>
        <h3 className="font-display text-3xl font-medium italic text-surface sm:text-4xl">{pillar.name}</h3>
        <p className="max-w-sm font-display text-base italic leading-snug text-surface/80">
          {emotionalLine[pillar.slug]}
        </p>
        <span className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
          Explore programs
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

function TypographicPillarCard({ pillar }: { pillar: (typeof pillars)[number] }) {
  return (
    <Link
      href={`/our-work/${pillar.slug}`}
      className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-sm bg-gradient-to-br from-primary-strong via-primary to-secondary p-7 sm:p-9 lg:col-span-4"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.16), transparent 55%)" }}
      />
      <div className="flex items-start justify-between">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-light-pink">
          Focus area
        </span>
        <span className="font-display text-5xl italic leading-none text-surface/35 transition-transform duration-500 group-hover:scale-110 group-hover:text-surface/50">
          {monogram[pillar.slug]}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-medium italic text-surface sm:text-3xl">{pillar.name}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-surface/80">{pillar.summary}</p>
        <span className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
          Explore programs
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

export function WorkChapters() {
  const photoPillars = pillars.filter((p) => pillarImages[p.slug]);
  const typePillars = pillars.filter((p) => !pillarImages[p.slug]);

  return (
    <GsapStagger className="grid gap-5 lg:grid-cols-12" y={32}>
      {photoPillars.map((pillar, i) => (
        <PhotoPillarCard
          key={pillar.slug}
          pillar={pillar}
          image={pillarImages[pillar.slug]}
          size={i === 0 ? "wide" : "tall"}
          clipFrom={i === 0 ? "left" : "right"}
        />
      ))}
      {typePillars.map((pillar) => (
        <TypographicPillarCard key={pillar.slug} pillar={pillar} />
      ))}
    </GsapStagger>
  );
}
