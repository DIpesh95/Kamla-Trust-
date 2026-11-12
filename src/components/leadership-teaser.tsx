import Link from "next/link";
import { trust } from "@/content/trust";
import { Reveal } from "./motion";
import { Container } from "./container";

export function LeadershipTeaser() {
  const [lead] = trust.trustees;
  const initial = lead.name.split(" ").filter((w) => /^[A-Za-z]/.test(w))[1]?.[0] ?? lead.name[0];

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <Reveal className="grid items-center gap-10 rounded-sm border border-line bg-soft-bg p-8 sm:p-12 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-text sm:h-36 sm:w-36">
            <span className="font-display text-5xl italic text-secondary/90 sm:text-6xl">{initial}</span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Leadership</p>
            <h2 className="font-display text-3xl font-medium text-text sm:text-4xl">{lead.name}</h2>
            <p className="text-sm font-medium text-primary-strong">{lead.role}</p>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted">{lead.bio}</p>
            <Link
              href="/about/leadership"
              className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
            >
              Meet the trustees
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
