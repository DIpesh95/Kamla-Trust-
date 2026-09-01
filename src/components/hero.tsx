import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { heroImage } from "@/content/media";

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="h-1 w-10 rounded-full bg-gold" aria-hidden="true" />
          <p className="font-data text-xs uppercase tracking-[0.16em] text-navy-strong">
            {trust.orgType} · Est. {trust.founded} · {getYearsActive()} years of work
          </p>
          <h1 className="font-display max-w-xl text-4xl font-medium leading-tight text-ink sm:text-5xl">
            {trust.tagline}
          </h1>
          <p className="max-w-lg text-lg text-ink-soft">
            {trust.shortName} works across education, healthcare, women &amp; child welfare, and
            rural livelihoods from Mumbai — reaching communities across Maharashtra and beyond.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/get-involved/donate"
              className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-strong"
            >
              Donate
            </Link>
            <Link
              href="/our-work"
              className="rounded-full border border-navy/30 px-7 py-3.5 text-sm font-semibold text-navy-strong transition-colors hover:border-navy"
            >
              See our work
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line">
            <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <p className="mt-3 text-xs text-ink-soft">{heroImage.alt}</p>
        </div>
      </div>
    </section>
  );
}
