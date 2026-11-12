import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { ImpactNumbers } from "@/components/impact-numbers";
import { Fact } from "@/components/fact";
import { Reveal } from "@/components/motion";
import { pillars } from "@/content/pillars";
import { placeholder } from "@/content/types";

export const metadata: Metadata = {
  title: "Impact",
  description: "How Kamala Trust measures and reports its impact.",
};

const reportsPlaceholder = placeholder(
  "No annual report or downloadable impact report is published yet — add one here once available."
);

export default function ImpactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Impact" }]}
        eyebrow="Impact"
        title="What the numbers mean"
        dek="Headline figures today, with a per-pillar breakdown to build out once verified data comes from the trustees."
      />

      <ImpactNumbers />

      <Container className="flex flex-col gap-14 py-16 sm:py-20">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">Per-pillar impact</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.slug} className="rounded-sm border border-line bg-surface p-6">
                <p className="font-display text-lg font-medium text-text">{pillar.name}</p>
                <div className="mt-2 text-sm">
                  <Fact value={pillar.stat} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="rounded-sm border border-line bg-surface p-7">
          <p className="font-display text-lg font-medium text-text">Methodology & reports</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            The current “50k+ lives impacted” figure is carried over from the trust’s existing site as a
            single, unbroken total. Reference organisations publish how they count impact — a person
            trained counted once, a household with clean water counted per person, and so on. Kamala
            Trust should adopt the same discipline before this page states firm numbers.
          </p>
          <div className="mt-4">
            <Fact value={reportsPlaceholder} />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
