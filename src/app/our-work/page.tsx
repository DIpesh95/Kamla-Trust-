import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { WorkChapters } from "@/components/work-chapters";
import { pillars } from "@/content/pillars";

export const metadata: Metadata = {
  title: "Our Work",
  description: "The five program pillars Kamala Trust runs across Maharashtra.",
};

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Work" }]}
        eyebrow="Our work"
        title={`Five pillars, ${pillars.reduce((n, p) => n + p.initiatives.length, 0)}+ programs`}
        dek="Regrouped from the trust’s original flat initiative list into focus areas, the way Swades Foundation and Reliance Foundation structure comparable multi-cause work. Pending trustee sign-off before launch."
      />
      <Container className="py-6 sm:py-10">
        <WorkChapters />
      </Container>
    </>
  );
}
