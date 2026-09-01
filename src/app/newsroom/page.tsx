import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { PressCard } from "@/components/press-card";
import { Reveal } from "@/components/reveal";
import { newsroom } from "@/content/newsroom";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "Press coverage, awards, and events for Kamala Trust.",
};

export default function NewsroomPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Press, awards & events"
        dek="Merged from the trust’s previously separate Achievements and Spotlight pages into one timeline."
      />
      <Container className="py-16 sm:py-20">
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newsroom.map((item) => (
            <PressCard key={item.title} item={item} />
          ))}
        </Reveal>
      </Container>
    </>
  );
}
