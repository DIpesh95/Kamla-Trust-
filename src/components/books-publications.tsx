import Image from "next/image";
import { bookSlots } from "@/content/books";
import { isPlaceholder } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";
import { Container } from "./container";

function RibbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="12" r="7.2" />
      <path d="M11.3 18.2 9 27l7-3.2 7 3.2-2.3-8.8" />
    </svg>
  );
}

function CoverPlaceholder({ relatedTo, className = "" }: { relatedTo: string; className?: string }) {
  return (
    <div
      className={`relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-strong via-primary to-primary-strong p-5 ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-3 rounded-sm border border-surface/25" />
      <span className="relative w-fit rounded-full bg-text/40 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-surface/80 backdrop-blur-sm">
        Cover pending
      </span>
      <div className="relative flex flex-col items-center gap-3 text-center">
        <RibbonIcon className="h-9 w-9 text-surface/60" />
        <span className="font-display text-lg italic leading-tight text-surface/90">{relatedTo}</span>
      </div>
    </div>
  );
}

export function BooksPublications() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <Reveal className="max-w-2xl">
          <p className="timecode text-xs font-bold text-primary">Books &amp; publications</p>
          <h2 className="mt-4 font-display text-4xl font-bold italic text-text sm:text-5xl">
            In print, as well as on stage.
          </h2>
          <p className="mt-3 text-sm text-text-muted">
            Souvenir publications released alongside the trust&rsquo;s annual ceremonies, awaiting titles and
            cover art from the trustees.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-3">
          {bookSlots.map((book, i) => (
            <Reveal key={book.slug} delay={i * 0.08} className="flex flex-col gap-4">
              {book.cover ? (
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                  <Image
                    src={book.cover.src}
                    alt={book.cover.alt}
                    fill
                    quality={92}
                    sizes="(min-width: 640px) 30vw, 80vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <CoverPlaceholder relatedTo={book.relatedTo} className="aspect-[3/4] w-full rounded-sm" />
              )}
              <div className="flex flex-col gap-1.5">
                <span className="timecode text-xs text-primary">
                  {book.relatedTo}
                </span>
                <h3 className="font-display text-xl font-medium text-text">
                  <Fact value={book.title} />
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  <Fact value={book.description} />
                </p>
                {isPlaceholder(book.title) ? (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-warn">
                    Awaiting publication details
                  </span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
