import Link from "next/link";
import Image from "next/image";
import type { Pillar } from "@/content/types";
import { pillarImages } from "@/content/media";

export function PillarCard({ pillar }: { pillar: Pillar }) {
  const image = pillarImages[pillar.slug];

  return (
    <Link
      href={`/our-work/${pillar.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-colors hover:border-rose/40"
    >
      <div className="relative h-40 w-full overflow-hidden bg-rose-tint">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-xl font-medium text-ink">{pillar.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.summary}</p>
        </div>
        <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-rose-strong">
          Explore {pillar.initiatives.length} programs
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}
