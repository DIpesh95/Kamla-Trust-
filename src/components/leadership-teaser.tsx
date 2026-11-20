import Link from "next/link";
import { trust } from "@/content/trust";
import { Reveal } from "./motion";
import { Container } from "./container";

export function LeadershipTeaser() {
  const [lead] = trust.trustees;
  const initials = lead.name
    .split(" ")
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(-2)
    .map((w) => w[0])
    .join("");

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container>
        <Reveal className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div
            className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3.5 rounded-sm px-8 text-center"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,.045) 0, rgba(255,255,255,.045) 1px, transparent 1px, transparent 13px), linear-gradient(155deg, var(--primary), var(--primary-strong))",
            }}
          >
            <span className="font-display text-7xl italic leading-none text-light-pink sm:text-8xl">{initials}</span>
            <span className="h-px w-9 bg-light-pink/50" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-light-pink">
              Trustee
            </span>
            <span className="max-w-[22ch] font-sans text-xs italic text-light-pink/55">
              Portrait to replace this plate once supplied
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Leadership</p>
            <h2 className="font-display text-3xl font-medium text-text sm:text-4xl">{lead.name}</h2>
            <p className="text-sm font-medium text-primary-strong">{lead.role}</p>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted">{lead.bio}</p>
            <span className="mt-1 w-fit rounded-sm border border-dashed border-warn/50 bg-warn/10 px-2 py-0.5 text-xs text-warn">
              Portrait pending from trustees
            </span>
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
