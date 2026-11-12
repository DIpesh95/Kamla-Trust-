import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { Fact } from "@/components/fact";
import { trust } from "@/content/trust";
import { primaryNav } from "@/content/nav";
import { placeholder } from "@/content/types";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${trust.shortName}'s work in education, healthcare, women & child welfare, and rural livelihoods.`,
};

const giLinks = primaryNav.find((item) => item.label === "Get Involved")?.children ?? [];
const paymentDetails = placeholder("Bank transfer and UPI details are being finalised — check back or write in below.");

export default function DonatePage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get Involved" }, { label: "Donate" }]}
        eyebrow="Get involved"
        title="Donate"
        dek="This is the single biggest gap versus every reference foundation studied — none existed on the trust’s site before this page."
      />
      <SubNav links={giLinks} />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-display text-lg font-medium text-text">Bank transfer / UPI</p>
            <div className="mt-2 text-sm">
              <Fact value={paymentDetails} />
            </div>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-display text-lg font-medium text-text">Tax deduction</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              80G eligibility isn&rsquo;t confirmed yet — see{" "}
              <Link href="/about/transparency" className="font-medium text-primary-strong">
                Registration &amp; Transparency
              </Link>
              .
            </p>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-display text-lg font-medium text-text">Giving at scale</p>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              For CSR-scale giving, see{" "}
              <Link href="/get-involved/csr-partnership" className="font-medium text-primary-strong">
                CSR Partnership
              </Link>
              .
            </p>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text">Want to give now?</p>
          <InquiryForm subjectPrefix="Donation inquiry" submitLabel="Contact us to give" includePhone />
        </div>
      </Container>
    </>
  );
}
