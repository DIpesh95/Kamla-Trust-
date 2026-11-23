import Link from "next/link";
import { Reveal } from "./motion";
import { Container } from "./container";

function ArrowButton({ variant }: { variant: "burgundy" | "pink" | "outline" }) {
  const styles = {
    burgundy: "bg-primary text-surface",
    pink: "bg-secondary text-surface",
    outline: "border border-surface/60 text-surface",
  };
  return (
    <span
      aria-hidden="true"
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base ${styles[variant]}`}
    >
      →
    </span>
  );
}

export function GetInvolvedCTA() {
  return (
    <section className="bg-primary py-28 sm:py-36">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Reveal>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">Get involved</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display max-w-3xl text-4xl font-medium leading-[1.05] text-surface sm:text-6xl">
              Together, We Can Create a Better Tomorrow.
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="max-w-lg text-lg leading-relaxed text-surface/80">
            Your time, resources, or partnership can help turn opportunity into change, for a student, a patient,
            a family, a community.
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-2">
          {/* Donate: primary action, largest card, solid white fill */}
          <Reveal delay={0.22} className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <Link
              href="/get-involved/donate"
              className="flex h-full flex-col justify-between gap-10 bg-surface p-8 transition-transform duration-500 ease-out hover:-translate-y-1 sm:p-10 lg:p-12"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Give</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-3xl font-medium text-text sm:text-4xl">Donate</h3>
                <p className="max-w-sm text-sm leading-relaxed text-text-muted sm:text-base">
                  Funds named initiatives directly &mdash; every rupee tied to a programme you can see.
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.04em] text-text">Donate Now</span>
                  <ArrowButton variant="burgundy" />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Volunteer: lighter pink-tinted fill over the burgundy section, circular "V" badge */}
          <Reveal delay={0.3}>
            <Link
              href="/get-involved/volunteer"
              className="flex h-full flex-col justify-between gap-8 bg-secondary/20 p-7 transition-transform duration-500 ease-out hover:-translate-y-1 sm:p-8"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-surface">
                  V
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-surface/85">Show up</span>
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-medium text-surface">Volunteer</h3>
                <p className="text-sm leading-relaxed text-surface/85">Support weddings, camps, and community events.</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.04em] text-surface">Get Involved</span>
                  <ArrowButton variant="pink" />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* CSR Partnership: outlined/transparent, square "CSR" badge */}
          <Reveal delay={0.38}>
            <Link
              href="/get-involved/csr-partnership"
              className="flex h-full flex-col justify-between gap-8 border border-surface/40 p-7 transition-colors duration-500 ease-out hover:border-surface sm:p-8"
            >
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-sm border border-surface/60 text-[10px] font-semibold uppercase tracking-[0.04em] text-surface">
                  CSR
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-surface/85">Partner</span>
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-2xl font-medium text-surface">CSR Partnership</h3>
                <p className="text-sm leading-relaxed text-surface/85">Partner on focus areas aligned to your company.</p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.04em] text-surface">Explore Partnership</span>
                  <ArrowButton variant="outline" />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
