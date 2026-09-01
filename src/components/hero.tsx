import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { heroImage } from "@/content/media";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_25%]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-hero from-15% via-hero/75 via-50% to-hero/10"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-hero/60 via-transparent to-transparent"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24 sm:py-32">
        <p className="font-data text-xs uppercase tracking-[0.16em] text-white/70">
          {trust.orgType} · Est. {trust.founded} · {getYearsActive()} years of work
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
          {trust.tagline}
        </h1>
        <p className="max-w-xl text-lg text-white/85">
          {trust.shortName} works across education, healthcare, women &amp; child welfare, and
          rural livelihoods from Mumbai — reaching communities across Maharashtra and beyond.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/get-involved/donate"
            className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
          >
            Donate
          </Link>
          <Link
            href="/our-work"
            className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            See our work
          </Link>
        </div>
        <p className="text-xs text-white/50">{heroImage.alt}</p>
      </div>
    </section>
  );
}
