import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { primaryNav } from "@/content/nav";
import { trust } from "@/content/trust";

export const metadata: Metadata = {
  title: "Social Partnership",
  description: `Collaborate with ${trust.shortName} on social-impact initiatives across education, healthcare, women & child welfare, and rural livelihoods.`,
};

const giLinks = primaryNav.find((item) => item.label === "Get Involved")?.children ?? [];

const partners = [
  {
    title: "Individuals",
    blurb: "Lend skills, time, or a specific program sponsorship, outside of a one-time donation or hands-on volunteering shift.",
  },
  {
    title: "Organisations",
    blurb: "Co-host an event, contribute in-kind resources, or run a joint campaign around one of the trust's five focus areas.",
  },
  {
    title: "Institutions",
    blurb: "Academic, medical, or civic institutions looking for a long-term, programmatic collaboration rather than a single engagement.",
  },
];

export default function SocialPartnershipPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get Involved" }, { label: "Social Partnership" }]}
        eyebrow="Get involved"
        title="Social Partnership"
        dek="A different track from CSR funding, for individuals, organisations, and institutions who want to collaborate on the work itself, not just fund it."
      />
      <SubNav links={giLinks} />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            {partners.map((p) => (
              <div key={p.title} className="rounded-sm border border-line bg-surface p-6">
                <p className="font-display text-lg font-medium text-text">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.blurb}</p>
              </div>
            ))}
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-display text-lg font-medium text-text">Where this fits</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Ongoing programs across education, healthcare, women &amp; child welfare, rural livelihoods,
              and disaster relief, see{" "}
              <Link href="/our-work" className="font-medium text-primary-strong">
                Our Work
              </Link>{" "}
              for the full breakdown. Looking to route CSR funds instead?{" "}
              <Link href="/get-involved/csr-partnership" className="font-medium text-primary-strong">
                See CSR Partnership
              </Link>
              .
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text">Start a conversation</p>
          <InquiryForm subjectPrefix="Social partnership inquiry" submitLabel="Contact us" includePhone />
        </div>
      </Container>
    </>
  );
}
