import Link from "next/link";
import Image from "next/image";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { PillarIcon } from "./pillar-icon";
import { Reveal } from "./motion";

const emotionalLine: Record<string, string> = {
  education: "Because opportunity should never depend on where you are born.",
  healthcare: "Because a healthy life should never be a privilege.",
  "women-and-girl-child": "Because dignity is not negotiable.",
  "rural-livelihoods-environment": "Because roots deserve as much care as growth.",
  "disaster-relief-civic-recognition": "Because showing up matters most when it's hardest.",
};

export function WorkChapters() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar, i) => {
        const image = pillarImages[pillar.slug];
        return (
          <Reveal key={pillar.slug} delay={i * 0.07} y={28}>
            <Link
              href={`/our-work/${pillar.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-sm border border-line bg-surface transition-shadow duration-300 hover:shadow-lg hover:shadow-text/5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <span className="absolute left-4 top-4 z-10 font-display text-sm italic text-surface/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-soft-bg transition-colors duration-500 group-hover:bg-primary/5">
                    <PillarIcon
                      slug={pillar.slug}
                      className="h-16 w-16 text-primary transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-text/70 via-text/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                <h3 className="font-display text-2xl font-medium leading-tight text-text">{pillar.name}</h3>
                <p className="flex-1 text-sm leading-relaxed text-text-muted">{emotionalLine[pillar.slug]}</p>
                <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
                  Explore programs
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
