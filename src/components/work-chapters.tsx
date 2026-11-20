import Link from "next/link";
import { pillars } from "@/content/pillars";
import { pillarImages } from "@/content/media";
import { PillarIcon } from "./pillar-icon";
import { FilmFrame } from "./film-frame";
import { ClipReveal } from "./clip-reveal";
import { Container } from "./container";

const emotionalLine: Record<string, string> = {
  education: "Because opportunity should never depend on where you are born.",
  healthcare: "Because a healthy life should never be a privilege.",
  "women-and-girl-child": "Because dignity is not negotiable.",
  "rural-livelihoods-environment": "Because roots deserve as much care as growth.",
  "disaster-relief-civic-recognition": "Because showing up matters most when it's hardest.",
};

const accent: Record<string, { icon: string; tint: string; text: string }> = {
  education: { icon: "text-primary", tint: "bg-primary/10", text: "text-primary" },
  healthcare: { icon: "text-good", tint: "bg-good/10", text: "text-good" },
  "women-and-girl-child": { icon: "text-secondary", tint: "bg-secondary/10", text: "text-secondary" },
  "rural-livelihoods-environment": { icon: "text-gold", tint: "bg-gold/15", text: "text-gold" },
  "disaster-relief-civic-recognition": { icon: "text-primary-strong", tint: "bg-primary-strong/10", text: "text-primary-strong" },
};

export function WorkChapters() {
  return (
    <section className="bg-surface pb-24 sm:pb-32">
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const image = pillarImages[pillar.slug];
            const tone = accent[pillar.slug] ?? { icon: "text-primary", tint: "bg-soft-bg", text: "text-primary" };
            const n = i + 1;

            return (
              <ClipReveal key={pillar.slug} delay={i * 0.06} className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface">
                <Link href={`/our-work/${pillar.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {image ? (
                      <FilmFrame
                        src={image.src}
                        alt={image.alt}
                        reel={`Chapter 0${n}`}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center ${tone.tint}`}>
                        <PillarIcon slug={pillar.slug} className={`h-16 w-16 ${tone.icon} transition-transform duration-500 ease-out group-hover:scale-110`} />
                      </div>
                    )}
                    <span className="timecode absolute left-4 top-4 rounded-full bg-film-black/60 px-2.5 py-1 text-[10px] text-surface/90 backdrop-blur-sm">
                      Chapter {String(n).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 className="font-display text-2xl font-bold text-text">{pillar.name}</h3>
                    <p className={`font-display text-base italic leading-snug ${tone.text}`}>{emotionalLine[pillar.slug]}</p>
                    <p className="text-sm leading-relaxed text-text-muted">{pillar.summary}</p>
                    <span className="group/link mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
                      Explore programs
                      <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </ClipReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
