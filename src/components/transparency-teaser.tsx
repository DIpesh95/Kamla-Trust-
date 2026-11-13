import Link from "next/link";
import { trust } from "@/content/trust";
import { Fact } from "./fact";
import { Reveal } from "./motion";
import { Container } from "./container";

const rows = [
  { label: "Trust registration", value: trust.registrationNumber },
  { label: "80G: tax deduction for donors", value: trust.exemption80G },
  { label: "12A registration", value: trust.exemption12A },
  { label: "FCRA: foreign contributions", value: trust.exemptionFCRA },
];

export function TransparencyTeaser() {
  return (
    <section className="bg-soft-bg py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Annual reports &amp; transparency
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
              What to verify before you give.
            </h2>
          </div>
          <Link
            href="/about/transparency"
            className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
          >
            Full details →
          </Link>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rows.map((row) => (
            <Reveal key={row.label} className="rounded-sm border border-line bg-surface p-6">
              <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">{row.label}</p>
              <div className="mt-2">
                <Fact value={row.value} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
