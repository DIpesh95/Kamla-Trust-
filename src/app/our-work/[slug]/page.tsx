import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { Fact } from "@/components/fact";
import { CTASection } from "@/components/cta-section";
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
      <PageHero eyebrow="Our work" title={pillar.name} dek={pillar.summary} />

      <Container className="flex flex-col gap-8 py-16 sm:py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/our-work" className="text-sm font-semibold text-rose-strong">
            ← All pillars
          </Link>
          <Fact value={pillar.stat} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillar.initiatives.map((initiative) => (
            <div key={initiative.name} className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg font-medium text-ink">{initiative.name}</h3>
                {initiative.location ? (
                  <span className="shrink-0 rounded-full bg-bronze-tint px-2.5 py-0.5 text-xs font-medium text-bronze">
                    {initiative.location}
                  </span>
                ) : null}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-ink-soft">
                <Fact value={initiative.blurb} />
              </div>
            </div>
          ))}
        </div>
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
