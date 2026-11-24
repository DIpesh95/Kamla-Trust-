import Link from "next/link";
import { trust } from "@/content/trust";
import { Reveal, RevealGroup, RevealItem } from "./motion";
import { Container } from "./container";

const assistanceCategories = [
  "Healthcare",
  "Education",
  "Women Empowerment",
  "Girl Child Support",
  "General Assistance",
];

const options = [
  {
    href: "/get-involved/donate",
    title: "Donate",
    line: "Your contribution funds education, healthcare, and dignity programs directly.",
    cta: "Give now",
  },
  {
    href: "/get-involved/volunteer",
    title: "Volunteer",
    line: "Give your time at events, drives, and ground-level programs across our focus areas.",
    cta: "Get involved",
  },
  {
    href: "/get-involved/csr-partnership",
    title: "CSR Partnership",
    line: "Partner with a five-decade track record to design and deliver impact at scale.",
    cta: "Start a conversation",
  },
];

export function GetInvolvedCTA() {
  return (
    <section className="bg-primary py-28 sm:py-36">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">Get involved</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display max-w-3xl text-4xl font-medium italic leading-[1.05] text-surface sm:text-6xl">
              Together, We Can Create a Better Tomorrow.
            </h2>
          </Reveal>
          <Reveal delay={0.16} className="max-w-lg text-lg leading-relaxed text-surface/80">
            Your time, resources, or partnership can help turn opportunity into change, for a student, a patient,
            a family, a community.
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.1}>
          {options.map((opt) => (
            <RevealItem key={opt.href}>
              <Link
                href={opt.href}
                className="group flex h-full flex-col justify-between gap-8 rounded-sm border border-surface/25 bg-surface/5 p-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-surface/60 hover:bg-surface/10"
              >
                <h3 className="font-display text-3xl font-medium text-surface">{opt.title}</h3>
                <div className="flex flex-col gap-4">
                  <p className="text-sm leading-relaxed text-surface/75">{opt.line}</p>
                  <span className="inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-surface">
                    {opt.cta}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="flex flex-col gap-6 rounded-sm border border-surface/20 bg-surface/5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-light-pink">
              Need assistance?
            </p>
            <div className="flex flex-wrap gap-2">
              {assistanceCategories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-surface/25 px-3.5 py-1 text-xs text-surface/85"
                >
                  {cat}
                </span>
              ))}
            </div>
            <p className="max-w-md text-sm text-surface/70">
              Email your request with your name, state, city, and category of assistance needed; the team will
              direct it to the relevant programme.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 text-sm">
            <a href={`mailto:${trust.email}`} className="font-semibold text-surface hover:text-light-pink">
              {trust.email}
            </a>
            <a href={`mailto:${trust.trusteeEmail}`} className="text-surface/70 hover:text-light-pink">
              {trust.trusteeEmail} (trustee)
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
