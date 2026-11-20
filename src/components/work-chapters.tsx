import Link from "next/link";
import Image from "next/image";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { Reveal } from "./motion";

const chapterNumber: Record<string, string> = {
  education: "01",
  healthcare: "02",
  "women-and-girl-child": "03",
  "rural-livelihoods-environment": "04",
  "disaster-relief-civic-recognition": "05",
};

/** Explicit, asymmetric placement per pillar — not an alternating left/right template. */
const layout: Record<string, string> = {
  "women-and-girl-child": "col-start-1 col-span-2 row-start-1 row-span-2 min-h-[420px]",
  healthcare: "col-start-3 col-span-1 row-start-1 row-span-1 min-h-[240px]",
  education: "col-start-3 col-span-1 row-start-2 row-span-1 min-h-[240px]",
  "rural-livelihoods-environment": "col-start-1 col-span-1 row-start-3 row-span-1 min-h-[260px]",
  "disaster-relief-civic-recognition": "col-start-2 col-span-2 row-start-3 row-span-1 min-h-[260px]",
};

export function WorkChapters() {
  return (
    <div className="grid grid-cols-3 grid-rows-[auto_auto_auto] gap-4 max-sm:grid-cols-1 max-sm:grid-rows-none">
      {pillars.map((pillar) => {
        const image = pillarImages[pillar.slug];
        return (
          <Reveal
            key={pillar.slug}
            className={`group relative overflow-hidden rounded-sm max-sm:col-span-1 max-sm:col-start-1 max-sm:row-span-1 max-sm:row-start-auto max-sm:min-h-[260px] ${layout[pillar.slug] ?? ""}`}
          >
            <Link href={`/our-work/${pillar.slug}`} className="absolute inset-0 block">
              {image ? (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-[filter,transform] duration-500 ease-out [filter:sepia(.14)_saturate(.88)_contrast(1.04)] group-hover:scale-105 group-hover:[filter:sepia(0)_saturate(1)_contrast(1)]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(200deg, rgba(74,18,34,.05), rgba(20,16,15,.76))" }}
                  />
                </>
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(255,255,255,.045) 0, rgba(255,255,255,.045) 1px, transparent 1px, transparent 13px), linear-gradient(155deg, var(--primary), var(--primary-strong))",
                  }}
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <span className="font-data text-xs text-secondary">Ch. {chapterNumber[pillar.slug]}</span>
                <h3 className="font-display mt-1.5 text-[22px] font-medium text-surface">{pillar.name}</h3>
                <span className="text-xs text-surface/85">
                  {pillar.initiatives.length} named program{pillar.initiatives.length === 1 ? "" : "s"}
                </span>
                {!image && (
                  <span className="mt-2 inline-block w-fit rounded-sm border border-surface/40 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.08em] text-surface">
                    Photography pending
                  </span>
                )}
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
