import Link from "next/link";
import { trust } from "@/content/trust";
import { Fact } from "./fact";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { Container } from "./container";

const rows = [
  { label: "Trust registration", value: trust.registrationNumber },
  { label: "80G: tax deduction", value: trust.exemption80G },
  { label: "12A registration", value: trust.exemption12A },
  { label: "FCRA", value: trust.exemptionFCRA },
];

const publications = [
  { title: "Kamala Rising Star", note: "Publication pending" },
  { title: "Kamala Power Woman", note: "Publication pending" },
];

function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
    </svg>
  );
}

function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  );
}

function DocIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M8 3h5l5 5v13H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M13 3v5h5" />
    </svg>
  );
}

/** Consolidates Our Work (PDF) + Books & Publications + Transparency into one compact strip. */
export function TransparencyTeaser() {
  return (
    <section className="bg-soft-bg py-14 sm:py-20">
      <Container className="flex flex-col gap-8">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Resources</p>
          <h2 className="mt-3 font-display text-3xl font-medium italic text-text sm:text-4xl">
            What to know before you give, or read.
          </h2>
        </Reveal>

        <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={0.08}>
          <RevealItem className="flex flex-col gap-3 rounded-sm border border-line bg-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
            <div className="flex items-center gap-2">
              <DocIcon className="h-5 w-5 text-primary/70" />
              <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                Annual documentation
              </p>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              A compiled PDF of programmes and annual activity is being prepared.
            </p>
            <a
              href="mailto:contact@kamalatrust.org?subject=Request%20for%20Kamala%20Trust%20programme%20documentation"
              className="mt-auto text-xs font-semibold uppercase tracking-[0.06em] text-primary-strong"
            >
              Request a copy →
            </a>
          </RevealItem>

          <RevealItem className="flex flex-col gap-3 rounded-sm border border-line bg-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
            <div className="flex items-center gap-2">
              <BookIcon className="h-5 w-5 text-primary/70" />
              <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                Books &amp; publications
              </p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {publications.map((p) => (
                <li key={p.title} className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="text-text">{p.title}</span>
                  <span className="shrink-0 text-xs text-text-muted/70">{p.note}</span>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="flex flex-col gap-3 rounded-sm border border-line bg-surface p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldIcon className="h-5 w-5 text-primary/70" />
                <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-text-muted">
                  Transparency
                </p>
              </div>
              <Link href="/about/transparency" className="text-xs font-semibold uppercase tracking-[0.06em] text-primary-strong">
                Full details →
              </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {rows.map((row) => (
                <li key={row.label} className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-[0.04em] text-text-muted/70">{row.label}</span>
                  <Fact value={row.value} className="text-xs font-medium text-text" />
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
