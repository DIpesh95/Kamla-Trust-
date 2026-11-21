import Link from "next/link";
import { trust } from "@/content/trust";
import { isPlaceholder } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";
import { Container } from "./container";
import { GsapStagger } from "./scroll-fx";

const filings = [
  { label: "Trust registration", value: trust.registrationNumber, spine: "Reg." },
  { label: "80G: tax deduction for donors", value: trust.exemption80G, spine: "80G" },
  { label: "12A registration", value: trust.exemption12A, spine: "12A" },
  { label: "FCRA: foreign contributions", value: trust.exemptionFCRA, spine: "FCRA" },
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

        <GsapStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" selector=":scope > article" y={24} stagger={0.1}>
          {filings.map((row) => {
            const pending = isPlaceholder(row.value);
            return (
              <article
                key={row.label}
                className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(122,16,64,0.35)]"
              >
                <div
                  className={`flex h-28 items-center justify-center ${
                    pending ? "bg-text/90" : "bg-gradient-to-br from-primary-strong to-primary"
                  }`}
                >
                  <span className="font-display text-3xl italic text-surface/80">{row.spine}</span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="font-data text-[11px] uppercase tracking-[0.1em] text-text-muted">{row.label}</p>
                  <Fact value={row.value} />
                </div>
              </article>
            );
          })}
        </GsapStagger>
      </Container>
    </section>
  );
}
