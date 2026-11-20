import Link from "next/link";
import Image from "next/image";
import { newsroom } from "@/content/newsroom";
import { Fact } from "./fact";
import { FilmFrame } from "./film-frame";

function RibbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
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

export function RecognitionStrip() {
  const awards = newsroom.filter((item) => item.kind === "Recognition").slice(0, 7);
  const governor = awards.find((a) => a.title.includes("Governor of Maharashtra"));
  const rest = awards.filter((a) => a !== governor).slice(0, 6);

  return (
    <div className="border-b border-line bg-surface py-14 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="timecode text-xs text-primary">The archive</p>
            <p className="mt-1 font-display text-2xl font-bold italic text-text sm:text-3xl">Recognised by</p>
          </div>
          <Link
            href="/recognitions"
            className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
          >
            All recognitions →
          </Link>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[1.3fr_2fr]">
          {governor ? (
            <Link
              href="/recognitions"
              className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-sm border border-primary/30"
            >
              <FilmFrame
                src="/images/hero-kanya-sneh-bandhan.jpg"
                alt="Governor of Maharashtra at a Kamala Trust ceremony"
                objectPosition="center 22%"
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="absolute inset-0"
              />
              <div className="relative flex flex-col gap-1.5 p-6">
                <span className="w-fit rounded-full bg-secondary/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-text">
                  Featured recognition
                </span>
                <span className="font-display text-xl font-semibold text-surface sm:text-2xl">{governor.title}</span>
                <span className="text-xs text-surface/70">
                  <Fact value={governor.date} />
                </span>
              </div>
            </Link>
          ) : null}

          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {rest.map((award) => (
              <div
                key={award.title}
                className="flex flex-col items-start gap-3 rounded-sm border border-line bg-soft-bg/60 p-4"
              >
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                  {award.image ? (
                    <Image src={award.image.src} alt={award.image.alt} fill sizes="40px" className="object-cover" />
                  ) : (
                    <RibbonIcon className="h-5 w-5 text-primary" />
                  )}
                </div>
                <span className="text-sm font-semibold leading-snug text-text">{award.title}</span>
                <span className="text-xs text-text-muted">
                  <Fact value={award.date} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
