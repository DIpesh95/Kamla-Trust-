import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { StoriesMagazine } from "@/components/stories-magazine";

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
        dek="Every reference foundation studied for this rebuild treats named, first-person stories as core content — not decoration. Kamala Trust doesn’t have any published yet. The photos below are stock placeholders standing in for layout only — swap each one for a real interview and real photo before this goes live."
      />

      <Container className="py-16 sm:py-24">
        <StoriesMagazine />
      </Container>
    </>
  );
}
