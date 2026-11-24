import Image from "next/image";
import { newsroom } from "@/content/newsroom";
import { recognitionPhotos } from "@/content/media";
import { Fact } from "./fact";
import { Reveal, RevealGroup, RevealItem, RevealImage } from "./motion";
import { Container } from "./container";

export function RecognitionsAwards() {
  const recognitions = newsroom.filter((item) => item.kind === "Recognition" || item.kind === "Event").slice(0, 5);

  return (
    <section className="bg-text py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">Recognised by</p>
          <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-surface sm:text-6xl">
            Kamala Power Woman, and the recognitions along the way.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
          {/* Featured: Top 50 Most Influential Indians, London */}
          <Reveal className="group relative overflow-hidden rounded-sm transition-transform duration-500 ease-out hover:-translate-y-1.5">
            <div className="relative aspect-[16/9] w-full sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[26rem]">
              <RevealImage className="absolute inset-0">
                <Image
                  src={recognitionPhotos.top50Collage.src}
                  alt={recognitionPhotos.top50Collage.alt}
                  fill
                  quality={92}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </RevealImage>
              <div className="absolute inset-0 bg-gradient-to-t from-text/95 via-text/75 via-55% to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7 sm:p-10">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                Recognition
              </span>
              <h3 className="font-display text-2xl font-medium text-surface sm:text-5xl">
                Top 50 Most Influential Indians
              </h3>
              <p className="max-w-lg text-sm text-surface/80 sm:text-base">
                Named among the Top 50 Most Influential Indians at an event held at Tower Bridge, London.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <RevealItem className="group relative flex-1 overflow-hidden rounded-sm border border-surface/15 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-secondary/40">
              <div className="relative aspect-[4/3] w-full sm:h-full sm:aspect-auto">
                <RevealImage className="absolute inset-0">
                  <Image
                    src={recognitionPhotos.top50Portrait.src}
                    alt={recognitionPhotos.top50Portrait.alt}
                    fill
                    quality={92}
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </RevealImage>
                <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/45 via-50% to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg italic text-surface">Congratulations</p>
                <p className="text-xs text-surface/70">Top 50 Influential Indians, London</p>
              </div>
            </RevealItem>

            <RevealItem className="group relative flex-1 overflow-hidden rounded-sm border border-surface/15 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-secondary/40">
              <div className="relative aspect-[4/3] w-full sm:h-full sm:aspect-auto">
                <RevealImage className="absolute inset-0">
                  <Image
                    src={recognitionPhotos.withDignitary.src}
                    alt={recognitionPhotos.withDignitary.alt}
                    fill
                    quality={92}
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </RevealImage>
                <div className="absolute inset-0 bg-gradient-to-t from-text/90 via-text/45 via-50% to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg italic text-surface">Meeting with dignitaries</p>
                <p className="text-xs text-surface/70">Exact occasion pending confirmation</p>
              </div>
            </RevealItem>
          </div>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-x-10 gap-y-3 border-t border-surface/10 pt-8 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {recognitions.map((item) => (
            <RevealItem key={item.title} className="group flex items-baseline justify-between gap-4 border-b border-surface/10 pb-3 transition-colors duration-300 hover:border-secondary/50">
              <span className="text-sm font-medium leading-snug text-surface transition-transform duration-300 group-hover:translate-x-1">{item.title}</span>
              <Fact value={item.date} className="shrink-0 text-xs text-surface/55" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
