import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { NewsroomEditorial } from "@/components/newsroom-editorial";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press coverage, awards, and events for Kamala Trust.",
};

export default function NewsroomPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Newsroom" }]}
        eyebrow="Newsroom"
        title="Press, recognition & events"
        dek="Merged from the trust’s previously separate Achievements and Spotlight pages into one timeline, grouped by kind."
      />
      <Container className="py-16 sm:py-24">
        <NewsroomEditorial />
      </Container>
    </>
  );
}
