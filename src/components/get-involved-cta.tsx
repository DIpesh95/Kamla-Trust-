import Link from "next/link";
import { Reveal } from "./motion";
import { Container } from "./container";

const paths = [
  {
    num: "01",
    title: "Donate",
    body: "Fund a programme directly, education, healthcare, relief.",
    href: "/get-involved/donate",
    tone: "donate" as const,
  },
  {
    num: "02",
    title: "Volunteer",
    body: "Give time on the ground at an event or an ongoing programme.",
    href: "/get-involved/volunteer",
    tone: "outline" as const,
  },
  {
    num: "03",
    title: "Partner as CSR",
    body: "Bring a company's CSR mandate to a named initiative.",
    href: "/get-involved/csr-partnership",
    tone: "dark" as const,
  },
  {
    num: "04",
    title: "Request assistance",
    body: "Reach the Trust directly if your community needs support.",
    href: "/contact",
    tone: "pale" as const,
  },
];

const toneClasses: Record<(typeof paths)[number]["tone"], string> = {
  donate: "min-h-[280px] text-surface bg-[linear-gradient(155deg,var(--secondary)_0%,var(--primary)_65%)]",
  outline: "min-h-[220px] text-surface border border-surface/25",
  dark:
    "min-h-[220px] text-surface bg-[linear-gradient(155deg,var(--primary-strong),var(--near-black))] [background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.05)_0,rgba(255,255,255,.05)_1px,transparent_1px,transparent_13px),linear-gradient(155deg,var(--primary-strong),var(--near-black))]",
  pale: "min-h-[220px] text-primary-strong bg-light-pink",
};

export function GetInvolvedCTA() {
  return (
    <section className="bg-near-black py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">Get involved</p>
          <h2 className="mt-4 font-display max-w-2xl text-4xl font-medium italic leading-[1.1] text-surface sm:text-5xl">
            Four paths in, not one form with a dropdown.
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-4">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <Link
                href={p.href}
                className={`flex flex-col justify-end gap-2 rounded-sm p-6 transition-transform hover:-translate-y-0.5 ${toneClasses[p.tone]}`}
              >
                <span className="font-data text-xs opacity-70">{p.num}</span>
                <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                <p className="text-[13px] leading-snug opacity-85">{p.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
