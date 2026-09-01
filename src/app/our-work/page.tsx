import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { PillarCard } from "@/components/pillar-card";
import { pillars } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Our Work",
  description: "The five program pillars Kamala Trust runs across Maharashtra.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Five pillars, twenty-five-plus programs"
        dek="Regrouped from the trust’s original flat initiative list into focus areas, the way Swades Foundation and Reliance Foundation structure comparable multi-cause work. Pending trustee sign-off before launch."
      />
      <Container className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.slug} pillar={pillar} index={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
