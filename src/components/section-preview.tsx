import type { ReactNode } from "react";
import { Reveal } from "./motion";
import { Container } from "./container";

const toneClasses = {
  white: "bg-surface",
  ivory: "bg-soft-bg",
  dark: "bg-near-black text-surface",
} as const;

export function SectionPreview({
  eyebrow,
  heading,
  dek,
  tone = "white",
  children,
}: {
  eyebrow: string;
  heading: string;
  dek: string;
  tone?: keyof typeof toneClasses;
  children: ReactNode;
}) {
  return (
    <section className={`${toneClasses[tone]} border-t border-line py-20 sm:py-24`}>
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className={`font-sans text-xs font-medium uppercase tracking-[0.28em] ${
                tone === "dark" ? "text-secondary" : "text-primary"
              }`}
            >
              {eyebrow}
            </p>
            <h2 className="font-display mt-3 max-w-xl text-3xl font-medium italic sm:text-4xl">{heading}</h2>
          </div>
          <p className={`max-w-md text-sm leading-relaxed ${tone === "dark" ? "text-surface/65" : "text-text-muted"}`}>
            {dek}
          </p>
        </Reveal>
        <Reveal delay={0.06}>{children}</Reveal>
      </Container>
    </section>
  );
}

export function Chip({ children, tone = "white" }: { children: ReactNode; tone?: keyof typeof toneClasses }) {
  return (
    <span
      className={`rounded-full border px-3.5 py-2 text-[13px] ${
        tone === "dark" ? "border-surface/20 bg-surface/5 text-surface/85" : "border-line bg-surface text-text"
      }`}
    >
      {children}
    </span>
  );
}
