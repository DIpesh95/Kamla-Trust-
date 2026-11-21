import Link from "next/link";
import { trust } from "@/content/trust";
import { Reveal } from "./motion";
import { Container } from "./container";
import { GsapStagger } from "./scroll-fx";

function initials(name: string) {
  return (
    name
      .split(" ")
      .filter((w) => /^[A-Za-z]/.test(w))
      .slice(-2)
      .map((w) => w[0])
      .join("") || name[0]
  );
}

export function LeadershipTeaser() {
  const [lead, ...rest] = trust.trustees;

  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <Reveal className="max-w-2xl">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Leadership</p>
          <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
            The people carrying this forward.
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-0">
          {/* Portrait panel: typographic, since no trustee photography is cleared yet */}
          <Reveal y={30} className="relative flex aspect-[4/5] items-end overflow-hidden rounded-sm bg-gradient-to-br from-text via-primary-strong to-primary lg:aspect-auto lg:rounded-r-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70"
              style={{ background: "radial-gradient(circle at 20% 15%, rgba(245,183,208,0.3), transparent 60%)" }}
            />
            <span className="relative select-none font-display text-[11rem] italic leading-[0.8] text-surface/20 sm:text-[13rem]">
              {initials(lead.name)}
            </span>
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-7 sm:p-9">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-light-pink">
                Trustee photography pending
              </span>
              <span className="text-xs text-surface/60">Shown as initials until cleared by the trustees.</span>
            </div>
          </Reveal>

          {/* Biography panel */}
          <div className="flex flex-col justify-center gap-6 rounded-sm border border-line bg-soft-bg p-8 sm:p-12 lg:rounded-l-none lg:border-l-0">
            <Reveal y={22}>
              <h3 className="font-display text-3xl font-medium text-text sm:text-4xl">{lead.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.1em] text-primary-strong">{lead.role}</p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">{lead.bio}</p>
            </Reveal>

            {rest.length ? (
              <GsapStagger className="grid gap-4 border-t border-line pt-6 sm:grid-cols-2" selector=":scope > div" y={18} stagger={0.1}>
                {rest.map((t) => (
                  <div key={t.name} className="flex flex-col gap-1">
                    <span className="font-display text-lg font-medium text-text">{t.name}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-strong">{t.role}</span>
                    <p className="mt-1 text-sm leading-relaxed text-text-muted">{t.bio}</p>
                  </div>
                ))}
              </GsapStagger>
            ) : null}

            <Link
              href="/about/leadership"
              className="group mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
            >
              Meet the trustees
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
