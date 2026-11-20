import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { Fact } from "@/components/fact";
import { FilmFrame } from "@/components/film-frame";
import { ClipReveal } from "@/components/clip-reveal";
import { Reveal } from "@/components/motion";
import { newsroom } from "@/content/newsroom";
import { trust } from "@/content/trust";

export const metadata: Metadata = {
  title: "Recognitions & Awards",
  description: `Awards and formal recognitions received by ${trust.shortName} and its trustees.`,
};

function RibbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="12" r="7.2" />
      <path d="M11.3 18.2 9 27l7-3.2 7 3.2-2.3-8.8" />
    </svg>
  );
}

export default function RecognitionsPage() {
  const awards = newsroom.filter((item) => item.kind === "Recognition");
  const trustAwards = awards.filter((a) => (a.recipient ?? "Kamala Trust") === "Kamala Trust");
  const personalAwards = awards.filter((a) => a.recipient && a.recipient !== "Kamala Trust");

  const groups = [
    { label: "Kamala Trust", items: trustAwards },
    { label: "Nidarshana Gowani, Trustee", items: personalAwards },
  ].filter((g) => g.items.length > 0);

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Recognitions & Awards" }]}
        eyebrow="Recognitions & awards"
        title="Every award, every ceremony, on the record"
        dek={`Formal recognitions received by ${trust.shortName} and by Trustee Nidarshana Gowani, with the occasion and date confirmed wherever the trust has supplied it.`}
      />

      <Container className="flex flex-col gap-16 py-16 sm:py-24">
        {groups.map((group) => {
          const governor = group.items.find((a) => a.title.includes("Governor of Maharashtra"));
          const rest = group.items.filter((a) => a !== governor);
          return (
          <Reveal key={group.label} className="flex flex-col gap-8">
            <h2 className="font-display text-3xl font-bold italic text-text sm:text-4xl">{group.label}</h2>

            {governor ? (
              <ClipReveal className="grid gap-0 overflow-hidden rounded-sm border border-primary/30 lg:grid-cols-2">
                <div className="relative aspect-[16/10] w-full lg:aspect-auto">
                  <FilmFrame
                    src="/images/hero-kanya-sneh-bandhan.jpg"
                    alt="Governor of Maharashtra at a Kamala Trust ceremony"
                    objectPosition="center 22%"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="absolute inset-0"
                  />
                </div>
                <div className="flex flex-col justify-center gap-3 bg-soft-bg p-8 sm:p-10">
                  <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-text">
                    Featured recognition
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text sm:text-3xl">{governor.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{governor.description}</p>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    <span className="flex items-center gap-1.5 text-text-muted">
                      <span className="font-semibold uppercase tracking-[0.1em] text-primary">Date</span>
                      <Fact value={governor.date} />
                    </span>
                    {governor.occasion ? (
                      <span className="flex items-center gap-1.5 text-text-muted">
                        <span className="font-semibold uppercase tracking-[0.1em] text-primary">Occasion</span>
                        <Fact value={governor.occasion} />
                      </span>
                    ) : null}
                  </div>
                </div>
              </ClipReveal>
            ) : null}

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((award) => (
                <div
                  key={award.title}
                  className="flex flex-col gap-4 overflow-hidden rounded-sm border border-line bg-surface"
                >
                  <div className="relative aspect-[16/10] w-full bg-soft-bg">
                    {award.image ? (
                      <FilmFrame
                        src={award.image.src}
                        alt={award.image.alt}
                        sizes="(min-width: 1024px) 32vw, 100vw"
                        className="absolute inset-0"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <RibbonIcon className="h-10 w-10 text-primary/50" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 px-5 pb-5">
                    <h3 className="font-display text-xl font-semibold text-text">{award.title}</h3>
                    <p className="text-sm leading-relaxed text-text-muted">{award.description}</p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                      <span className="flex items-center gap-1.5 text-text-muted">
                        <span className="font-semibold uppercase tracking-[0.1em] text-primary">Date</span>
                        <Fact value={award.date} />
                      </span>
                      {award.occasion ? (
                        <span className="flex items-center gap-1.5 text-text-muted">
                          <span className="font-semibold uppercase tracking-[0.1em] text-primary">Occasion</span>
                          <Fact value={award.occasion} />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          );
        })}
      </Container>
    </>
  );
}
