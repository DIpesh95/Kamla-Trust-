import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Stories",
  description: "Stories from the communities Kamala Trust works with.",
};

const storySlots = [
  {
    pillar: "Women & Girl Child",
    prompt: "A Kanya Sneh Bandhan couple, on the day of their wedding and a year on.",
  },
  {
    pillar: "Healthcare",
    prompt: "Someone reached through the HPV vaccination drives, in their own words.",
  },
  {
    pillar: "Education",
    prompt: "A Kamala Rising Stars student, before and after the scholarship.",
  },
];

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Real people, not yet on this page"
        dek="Every reference foundation studied for this rebuild treats named, first-person stories as core content — not decoration. Kamala Trust doesn’t have any published yet, so this page shouldn’t either, until they’re real."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {storySlots.map((slot) => (
            <div
              key={slot.pillar}
              className="flex flex-col gap-3 rounded-2xl border border-dashed border-line bg-surface p-6"
            >
              <span className="w-fit rounded-full bg-rose-tint px-2.5 py-0.5 text-xs font-medium text-rose-strong">
                {slot.pillar}
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{slot.prompt}</p>
              <p className="mt-auto text-xs font-medium uppercase tracking-wide text-warn">
                Awaiting interview
              </p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
