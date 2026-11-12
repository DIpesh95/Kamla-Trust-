import Link from "next/link";
import { Reveal } from "./motion";
import { Container } from "./container";

export function GetInvolvedCTA() {
  return (
    <section className="bg-primary py-28 sm:py-36">
      <Container className="flex flex-col items-start gap-8">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">Get involved</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display max-w-3xl text-4xl font-medium italic leading-[1.05] text-surface sm:text-6xl">
            Together, We Can Create a Better Tomorrow.
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="max-w-lg text-lg leading-relaxed text-surface/80">
          Your time, resources, or partnership can help turn opportunity into change — for a student, a patient,
          a family, a community.
        </Reveal>
        <Reveal delay={0.24} className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/get-involved/donate"
            className="rounded-full bg-surface px-8 py-4 text-sm font-semibold uppercase tracking-[0.04em] text-primary transition-colors hover:bg-light-pink"
          >
            Donate
          </Link>
          <Link
            href="/get-involved/volunteer"
            className="rounded-full border border-surface/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:border-surface"
          >
            Volunteer
          </Link>
          <Link
            href="/get-involved/csr-partnership"
            className="rounded-full border border-surface/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:border-surface"
          >
            CSR Partnership
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
