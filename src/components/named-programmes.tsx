import Link from "next/link";
import { getPillar } from "@/content/pillars";

function find(slug: string, name: string) {
  const pillar = getPillar(slug)!;
  const initiative = pillar.initiatives.find((i) => i.name === name)!;
  return { pillar, initiative };
}

const healthcare = find("healthcare", "HPV Bharat – Kamala Beti Kavach");
const education = find("education", "Schools & Colleges");
const women = find("women-and-girl-child", "Transgender Community Welfare");
const rural = find("rural-livelihoods-environment", "Vocal for Local");
const disaster = find("disaster-relief-civic-recognition", "Frontline Warriors Recognition");

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="7" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6.2 6.5-6.2s6.5 2.6 6.5 6.2" />
    </svg>
  );
}

function CirclePlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2.5l2.6 6.3 6.8.5-5.2 4.4 1.7 6.6L12 16.8l-5.9 3.5 1.7-6.6-5.2-4.4 6.8-.5Z" />
    </svg>
  );
}

function Tag({ children, variant }: { children: React.ReactNode; variant: "ink" | "on-dark" | "plain-on-dark" }) {
  if (variant === "plain-on-dark") {
    return (
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-light-pink">{children}</span>
    );
  }
  return (
    <span
      className={`inline-flex w-fit items-center border px-3 py-[7px] text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
        variant === "on-dark" ? "border-surface/55 text-surface" : "border-primary text-primary"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * Approved composition: one large dark-burgundy feature, one ivory card, then a supporting row
 * of three (white / white / charcoal) with small line-icon glyphs. No photo-well of any kind —
 * named programmes are deliberately typographic in the approved design, not photo-pending.
 */
export function NamedProgrammes() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1fr] sm:gap-5">
        <Link href={`/our-work/${healthcare.pillar.slug}`} className="flex min-h-[230px] flex-col justify-between gap-6 bg-primary p-6 sm:p-7">
          <Tag variant="on-dark">{healthcare.pillar.shortName}</Tag>
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-2xl font-medium text-surface sm:text-[28px]">{healthcare.initiative.name}</h3>
            <p className="max-w-xl text-sm leading-relaxed text-surface/85">{healthcare.initiative.blurb as string}</p>
          </div>
        </Link>

        <Link href={`/our-work/${education.pillar.slug}`} className="flex min-h-[230px] flex-col justify-between gap-6 bg-soft-bg p-6 sm:p-7">
          <Tag variant="ink">{education.pillar.shortName}</Tag>
          <div className="flex flex-col gap-2">
            <h3 className="font-display text-xl font-medium text-text">
              {education.initiative.name}
              {education.initiative.location ? `, ${education.initiative.location}` : ""}
            </h3>
            <p className="text-sm leading-relaxed text-text-muted">{education.initiative.blurb as string}</p>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        <Link href={`/our-work/${women.pillar.slug}`} className="flex min-h-[190px] flex-col justify-between gap-5 border border-line bg-surface p-6 sm:p-7">
          <PersonIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col gap-2">
            <Tag variant="ink">{women.pillar.name}</Tag>
            <h3 className="font-display text-lg font-medium text-text">{women.initiative.name}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{women.initiative.blurb as string}</p>
          </div>
        </Link>

        <Link href={`/our-work/${rural.pillar.slug}`} className="flex min-h-[190px] flex-col justify-between gap-5 border border-line bg-surface p-6 sm:p-7">
          <CirclePlusIcon className="h-6 w-6 text-primary" />
          <div className="flex flex-col gap-2">
            <Tag variant="ink">{rural.pillar.name}</Tag>
            <h3 className="font-display text-lg font-medium text-text">{rural.initiative.name}</h3>
            <p className="text-sm leading-relaxed text-text-muted">{rural.initiative.blurb as string}</p>
          </div>
        </Link>

        <Link href={`/our-work/${disaster.pillar.slug}`} className="flex min-h-[190px] flex-col justify-between gap-5 bg-text p-6 sm:p-7">
          <StarIcon className="h-6 w-6 text-secondary" />
          <div className="flex flex-col gap-2">
            <Tag variant="plain-on-dark">{disaster.pillar.name}</Tag>
            <h3 className="font-display text-lg font-medium text-surface">{disaster.initiative.name}</h3>
            <p className="text-sm leading-relaxed text-surface/75">{disaster.initiative.blurb as string}</p>
          </div>
        </Link>
      </div>

      <p className="text-xs text-text-muted">
        No dedicated photography exists yet for these named programmes &mdash; shown here in type, not with stock
        or placeholder imagery.
      </p>
    </div>
  );
}
