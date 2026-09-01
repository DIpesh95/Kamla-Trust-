import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { Fact } from "@/components/fact";
import { primaryNav } from "@/content/nav";
import { trust } from "@/content/trust";

export const metadata: Metadata = {
  title: "CSR Partnership",
  description: `Partner with ${trust.shortName} on CSR-funded programs across education, healthcare, women & child welfare, and rural livelihoods.`,
};

const giLinks = primaryNav.find((item) => item.label === "Get Involved")?.children ?? [];

export default function CSRPartnershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title="CSR Partnership"
        dek="A dedicated CSR-1 registration is what lets a company route CSR funds to the trust directly."
      />
      <SubNav links={giLinks} />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="font-display text-lg font-medium text-ink">CSR-1 registration</p>
            <div className="mt-2 text-sm">
              <Fact value={{ pending: true, note: "CSR-1 (Registrar of Companies) status not yet confirmed — required for companies to route CSR funds here." }} />
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="font-display text-lg font-medium text-ink">Where CSR funding fits</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Ongoing programs across education, healthcare, women &amp; child welfare, rural livelihoods,
              and disaster relief — see{" "}
              <Link href="/our-work" className="font-medium text-navy-strong">
                Our Work
              </Link>{" "}
              for the full breakdown.
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-ink">Start a conversation</p>
          <InquiryForm subjectPrefix="CSR partnership inquiry" submitLabel="Contact us" includePhone />
        </div>
      </Container>
    </>
  );
}
