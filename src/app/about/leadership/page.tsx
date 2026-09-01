import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { trust } from "@/content/trust";
import { primaryNav } from "@/content/nav";

export const metadata: Metadata = {
  title: "Leadership",
  description: `The trustees leading ${trust.shortName}.`,
};

const aboutLinks = primaryNav.find((item) => item.label === "About")?.children ?? [];

export default function LeadershipPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Leadership" dek="The trustees steering Kamala Trust’s work." />
      <SubNav links={aboutLinks} />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {trust.trustees.map((person) => (
            <div key={person.name} className="rounded-2xl border border-line bg-surface p-7">
              <p className="font-display text-xl font-medium text-ink">{person.name}</p>
              <p className="mt-1 text-sm font-medium text-rose-strong">{person.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{person.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-warn/50 bg-warn/5 p-6">
          <p className="text-sm font-semibold text-warn">Content gap</p>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-soft">
            The trust’s governing board may include additional trustees not named on the current site.
            Confirm the full, current board list before this page goes live.
          </p>
        </div>
      </Container>
    </>
  );
}
