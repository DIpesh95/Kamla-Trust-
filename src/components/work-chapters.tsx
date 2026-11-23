import Link from "next/link";
import Image from "next/image";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { Reveal } from "./motion";

const emotionalLine: Record<string, string> = {
  education: "Because opportunity should never depend on where you are born.",
  healthcare: "Because a healthy life should never be a privilege.",
  "women-and-girl-child": "Because dignity is not negotiable.",
  "rural-livelihoods-environment": "Because roots deserve as much care as growth.",
  "disaster-relief-civic-recognition": "Because showing up matters most when it's hardest.",
};

function Tag({ children, onDark }: { children: React.ReactNode; onDark: boolean }) {
  return (
    <span
      className={`inline-flex w-fit items-center border px-3 py-[7px] text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
        onDark ? "border-surface/55 text-surface" : "border-primary text-primary"
      }`}
    >
      {children}
    </span>
  );
}

/** Row 1: the two pillars with a real, approved photograph — full-bleed with a bottom scrim. */
function PhotoFeature({ index, slug, name, summary }: { index: number; slug: string; name: string; summary: string }) {
  const image = pillarImages[slug];
  if (!image) return null;

  return (
    <Reveal y={24} delay={index * 0.05}>
      <Link
        href={`/our-work/${slug}`}
        className="group relative block aspect-[4/5] w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-surface lg:aspect-[2/1]"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[72%]"
          style={{ background: "linear-gradient(0deg, rgba(8,3,6,.94), rgba(8,3,6,0) 100%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-6 sm:p-7">
          <Tag onDark>
            {String(index).padStart(2, "0")} &middot; {name}
          </Tag>
          <h3 className="font-display text-2xl font-medium leading-snug text-surface sm:text-[28px]">
            {emotionalLine[slug]}
          </h3>
          <p className="max-w-md text-sm text-surface/70">{summary}</p>
        </div>
      </Link>
    </Reveal>
  );
}

/** Row 2, photo-pending slot: Education always, plus Rural Livelihoods / Disaster Relief until
 * their approved assets (cleanliness-drive.webp, honouring-workers.webp) are supplied — ivory
 * background, bordered tag, large burgundy numeral, plain typographic pending caption. No
 * gradient, no icon: this is the approved "photography not yet available" treatment, not a
 * substitute photo. */
function PendingCard({ index, slug, name, summary }: { index: number; slug: string; name: string; summary: string }) {
  return (
    <Reveal y={24} delay={index * 0.05}>
      <Link
        href={`/our-work/${slug}`}
        className="group flex aspect-[2/1] w-full flex-col justify-between overflow-hidden bg-soft-bg p-6 sm:p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary"
      >
        <Tag onDark={false}>
          {String(index).padStart(2, "0")} &middot; {name}
        </Tag>
        <div className="flex flex-col gap-2">
          <span className="font-display text-4xl font-semibold leading-none text-primary">
            {String(index).padStart(2, "0")}
          </span>
          <p className="line-clamp-2 max-w-[26ch] text-sm leading-snug text-text-muted">{summary}</p>
          <span className="text-xs text-text-muted/70">Programme photography pending</span>
        </div>
      </Link>
    </Reveal>
  );
}

export function WorkChapters() {
  const bySlug = (slug: string) => pillars.find((p) => p.slug === slug)!;
  const women = bySlug("women-and-girl-child");
  const healthcare = bySlug("healthcare");
  const education = bySlug("education");
  const rural = bySlug("rural-livelihoods-environment");
  const disaster = bySlug("disaster-relief-civic-recognition");

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <PhotoFeature index={1} slug={women.slug} name={women.shortName} summary={women.summary} />
        <PhotoFeature index={2} slug={healthcare.slug} name={healthcare.shortName} summary={healthcare.summary} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <PendingCard index={3} slug={education.slug} name={education.shortName} summary={education.summary} />
        {pillarImages[rural.slug] ? (
          <PhotoFeature index={4} slug={rural.slug} name={rural.shortName} summary={rural.summary} />
        ) : (
          <PendingCard index={4} slug={rural.slug} name={rural.shortName} summary={rural.summary} />
        )}
        {pillarImages[disaster.slug] ? (
          <PhotoFeature index={5} slug={disaster.slug} name={disaster.shortName} summary={disaster.summary} />
        ) : (
          <PendingCard index={5} slug={disaster.slug} name={disaster.shortName} summary={disaster.summary} />
        )}
      </div>
    </div>
  );
}
