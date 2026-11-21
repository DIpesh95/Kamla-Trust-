import Link from "next/link";
import { Reveal } from "./motion";
import { Container } from "./container";
import { GsapStagger } from "./scroll-fx";

const actions = [
  {
    href: "/get-involved/donate",
    label: "Donate",
    headline: "Give directly to a program already at work.",
    copy: "Every rupee moves through a named initiative, not a general fund.",
    tone: "dominant" as const,
  },
  {
    href: "/get-involved/volunteer",
    label: "Volunteer",
    headline: "Bring your time to the next gathering.",
    copy: "Hands on the ground at weddings, camps, and community events.",
    tone: "light" as const,
  },
  {
    href: "/get-involved/csr-partnership",
    label: "CSR Partnership",
    headline: "Partner at an institutional scale.",
    copy: "For companies looking to fund a focus area, not just a line item.",
    tone: "outline" as const,
  },
];

export function GetInvolvedCTA() {
  return (
    <section className="bg-primary py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <div>
          <Reveal>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">Get involved</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-4 max-w-3xl text-4xl font-medium italic leading-[1.05] text-surface sm:text-6xl">
              Together, We Can Create a Better Tomorrow.
            </h2>
          </Reveal>
        </div>

        <GsapStagger className="grid gap-5 lg:grid-cols-3" selector=":scope > a" y={28} stagger={0.1}>
          {actions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className={`group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-sm p-8 transition-transform duration-500 hover:-translate-y-1 sm:p-9 ${
                a.tone === "dominant"
                  ? "bg-surface lg:col-span-2"
                  : a.tone === "light"
                    ? "bg-primary-strong"
                    : "border border-surface/35 bg-transparent"
              }`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    a.tone === "dominant"
                      ? "radial-gradient(circle, rgba(168,23,89,0.14), transparent 70%)"
                      : "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)",
                }}
              />
              <span
                className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${
                  a.tone === "dominant" ? "text-primary" : "text-light-pink"
                }`}
              >
                {a.label}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className={`font-display text-2xl font-medium italic leading-snug sm:text-3xl ${
                    a.tone === "dominant" ? "text-text" : "text-surface"
                  }`}
                >
                  {a.headline}
                </h3>
                <p className={`max-w-sm text-sm leading-relaxed ${a.tone === "dominant" ? "text-text-muted" : "text-surface/75"}`}>
                  {a.copy}
                </p>
                <span
                  className={`mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] ${
                    a.tone === "dominant" ? "text-primary-strong" : "text-surface"
                  }`}
                >
                  {a.label}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </GsapStagger>
      </Container>
    </section>
  );
}
