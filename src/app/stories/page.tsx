import type { Metadata } from "next";
import Image from "next/image";
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
    image: {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80&auto=format&fit=crop",
      alt: "Sample placeholder image — not an actual Kamala Trust beneficiary",
    },
  },
  {
    pillar: "Healthcare",
    prompt: "Someone reached through the HPV vaccination drives, in their own words.",
    image: {
      src: "https://images.unsplash.com/photo-1596450514537-fae68a81346b?w=1200&q=80&auto=format&fit=crop",
      alt: "Sample placeholder image — not an actual Kamala Trust beneficiary",
    },
  },
  {
    pillar: "Education",
    prompt: "A Kamala Rising Stars student, before and after the scholarship.",
    image: {
      src: "https://images.unsplash.com/photo-1572847748080-bac263fae977?w=1200&q=80&auto=format&fit=crop",
      alt: "Sample placeholder image — not an actual Kamala Trust beneficiary",
    },
  },
];

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stories"
        title="Real people, not yet on this page"
        dek="Every reference foundation studied for this rebuild treats named, first-person stories as core content — not decoration. Kamala Trust doesn’t have any published yet. The photos below are stock placeholders standing in for layout only — swap each one for a real interview and real photo before this goes live."
      />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {storySlots.map((slot) => (
            <div key={slot.pillar} className="overflow-hidden rounded-2xl border border-dashed border-line bg-surface">
              <div className="relative h-48 w-full">
                <Image
                  src={slot.image.src}
                  alt={slot.image.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover grayscale-[60%] brightness-[1.05] contrast-[.97]"
                />
                <div className="absolute inset-0 bg-teal/20 mix-blend-multiply" />
                <span className="absolute right-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Sample photo, not a real beneficiary
                </span>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <span className="w-fit rounded-full bg-teal-tint px-2.5 py-0.5 text-xs font-medium text-teal-strong">
                  {slot.pillar}
                </span>
                <p className="text-sm leading-relaxed text-ink-soft">{slot.prompt}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-warn">Awaiting interview</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
