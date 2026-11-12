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
    <div className="flex flex-col">
      {pillars.map((pillar, i) => {
        const image = pillarImages[pillar.slug];
        const imageRight = i % 2 === 0;
        return (
          <Reveal key={pillar.slug} y={30} className="border-t border-line py-14 first:border-t-0 sm:py-20">
            <Link
              href={`/our-work/${pillar.slug}`}
              className={`group grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                imageRight ? "" : "lg:[&>*:first-child]:order-2"
              }`}
            >
              <div className="flex flex-col gap-5">
                <span className="font-display text-sm italic text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-4xl font-medium leading-[1.05] text-text sm:text-5xl">
                  {pillar.name}
                </h3>
                <p className="max-w-md font-display text-xl italic leading-snug text-text-muted">
                  {emotionalLine[pillar.slug]}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
                  Explore programs
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-soft-bg">
                    <PillarIcon
                      slug={pillar.slug}
                      className="h-20 w-20 text-primary transition-transform duration-700 ease-out group-hover:scale-110 sm:h-28 sm:w-28"
                    />
                  </div>
                )}
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
