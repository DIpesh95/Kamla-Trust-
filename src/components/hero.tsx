import Link from "next/link";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMaxYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      >
        <defs>
          <radialGradient id="petalGlow" cx="72%" cy="42%" r="65%">
            <stop offset="0%" stopColor="#96324A" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#7A2038" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2B1B20" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="700" fill="url(#petalGlow)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const cx = 860 + Math.cos(angle) * 210;
          const cy = 330 + Math.sin(angle) * 210;
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="150"
              ry="70"
              fill="none"
              stroke="#D2A867"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              transform={`rotate(${(angle * 180) / Math.PI} ${cx} ${cy})`}
            />
          );
        })}
      </svg>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-24 sm:py-32">
        <p className="font-data text-xs uppercase tracking-[0.16em] text-white/70">
          {trust.orgType} · Est. {trust.founded} · {getYearsActive()} years of work
        </p>
        <h1 className="font-display max-w-3xl text-4xl font-medium leading-tight sm:text-6xl">
          {trust.tagline}
        </h1>
        <p className="max-w-xl text-lg text-white/80">
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
      </div>
    </section>
  );
}
