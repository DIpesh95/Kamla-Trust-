import Link from "next/link";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { StatStrip } from "@/components/stat-strip";
import { SectionHeading } from "@/components/section-heading";
import { PillarCard } from "@/components/pillar-card";
import { PressCard } from "@/components/press-card";
import { CTASection } from "@/components/cta-section";
import { RecognitionStrip } from "@/components/recognition-strip";
import { FlagshipProgramsSection } from "@/components/flagship-programs-section";
import { headlineStats } from "@/content/stats";
import { pillars } from "@/content/pillars";
import { newsroom } from "@/content/newsroom";
import { trust } from "@/content/trust";

export default function Home() {
  return (
    <>
      <Hero />
      <RecognitionStrip />

      <section className="py-14 sm:py-16">
        <Container>
          <StatStrip stats={headlineStats} />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Our work"
            title="Five pillars, one trust"
            dek={`${trust.shortName} runs ${pillars.reduce((n, p) => n + p.initiatives.length, 0)}+ programs across Maharashtra, organised into five focus areas.`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <PillarCard key={pillar.slug} pillar={pillar} />
            ))}
          </div>
        </Container>
      </section>

      <FlagshipProgramsSection />

      <section className="border-t border-line py-20 sm:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Newsroom" title="Recognition & recent activity" />
            <Link href="/newsroom" className="text-sm font-semibold text-navy-strong">
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsroom.slice(0, 3).map((item) => (
              <PressCard key={item.title} item={item} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Partner with Kamala Trust"
        dek="Whether it’s a one-time gift, a CSR partnership, or your time — there’s a way to help."
        primary={{ label: "Donate", href: "/get-involved/donate" }}
        secondary={{ label: "CSR Partnership", href: "/get-involved/csr-partnership" }}
      />
    </>
  );
}
