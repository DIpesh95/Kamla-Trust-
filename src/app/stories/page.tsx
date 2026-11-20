import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { StoriesMagazine } from "@/components/stories-magazine";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Stories",
  description: "Stories from the communities Kamala Trust works with.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Stories" }]}
        eyebrow="Stories"
        title="Real people, not yet on this page"
        dek="Every reference foundation studied for this rebuild treats named, first-person stories as core content, not decoration. Kamala Trust doesn’t have any published yet. The slots below are placeholders for layout only, each one needs a real interview and a real photo before this goes live."
      />

      <Container className="flex flex-col gap-10 py-16 sm:py-24">
        <StoriesMagazine />

        <Reveal className="rounded-sm border border-dashed border-warn/50 bg-warn/5 p-6">
          <p className="text-sm font-semibold text-warn">Content gap</p>
          <p className="mt-1.5 max-w-2xl text-sm text-text-muted">
            These three slots aren&rsquo;t yet tied to a confirmed state or city, and the trust works across
            several regions. As real, consented interviews come in, add their state/city here so this page
            reflects the full geographic spread of the trust&rsquo;s work, not just Maharashtra.
          </p>
        </Reveal>
      </Container>
    </>
  );
}
