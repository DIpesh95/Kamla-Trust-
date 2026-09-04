import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { heroImage } from "@/content/media";

export function Hero() {
  return (
    <section className="bg-brand-strong">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="h-1 w-10 rounded-full bg-gold" aria-hidden="true" />
          <p className="font-data text-xs uppercase tracking-[0.16em] text-white/70">
            {trust.orgType} · Est. {trust.founded} · {getYearsActive()} years of work
          </p>
          <h1 className="font-display max-w-xl text-4xl font-medium leading-tight text-white sm:text-5xl">
            {trust.tagline}
          </h1>
          <p className="max-w-lg text-lg text-white/80">
            {trust.shortName} works across education, healthcare, women &amp; child welfare, and
            rural livelihoods from Mumbai — reaching communities across Maharashtra and beyond.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/get-involved/donate"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-strong transition-opacity hover:opacity-90"
            >
              Donate
            </Link>
            <Link
              href="/our-work"
              className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              See our work
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15">
            <Image src={heroImage.src} alt={heroImage.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <p className="mt-3 text-xs text-white/60">{heroImage.alt}</p>
        </div>
      </div>
    </section>
  );
}
