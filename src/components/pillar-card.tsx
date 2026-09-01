import Link from "next/link";
import type { Pillar } from "@/content/types";

export function PillarCard({ pillar, index }: { pillar: Pillar; index: number }) {
  return (
    <Link
      href={`/our-work/${pillar.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-6 shadow-sm transition-colors hover:border-rose/40"
    >
      <div>
        <p className="font-data text-xs text-bronze">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="font-display mt-3 text-xl font-medium text-ink">{pillar.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.summary}</p>
      </div>
      <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-rose-strong">
        Explore {pillar.initiatives.length} programs
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          →
        </span>
      </p>
    </Link>
  );
}
