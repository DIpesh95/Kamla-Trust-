import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { Fact } from "@/components/fact";
import { CTASection } from "@/components/cta-section";
import { ProgramList } from "@/components/program-list";
import { pillars, getPillar } from "@/content/pillars";

export function generateStaticParams() {
  return pillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return { title: pillar.name, description: pillar.summary };
}

export default async function PillarPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Work", href: "/our-work" }, { label: pillar.name }]}
        eyebrow="Our work"
        title={pillar.name}
        dek={pillar.summary}
      />

      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <Link href="/our-work" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
            ← All pillars
          </Link>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-5xl italic text-primary sm:text-6xl">
              {pillar.initiatives.length}
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.18em] text-text-muted">
              {pillar.initiatives.length === 1 ? "Program" : "Programs"}
            </span>
          </div>
        </div>

        <Fact value={pillar.stat} className="text-sm text-text-muted" />

        <ProgramList initiatives={pillar.initiatives} />
      </Container>

      <CTASection
        title={`Support ${pillar.name}`}
        dek="Every pillar runs on a mix of individual gifts, CSR partnerships, and volunteer time."
        primary={{ label: "Donate", href: "/get-involved/donate" }}
        secondary={{ label: "CSR Partnership", href: "/get-involved/csr-partnership" }}
      />
    </>
  );
}
