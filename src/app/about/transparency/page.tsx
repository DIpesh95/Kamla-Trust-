import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { Fact } from "@/components/fact";
import { trust } from "@/content/trust";
import { primaryNav } from "@/content/nav";

export const metadata: Metadata = {
  title: "Registration & Transparency",
  description: `Registration, tax-exemption status, and financial transparency for ${trust.legalName}.`,
};

const aboutLinks = primaryNav.find((item) => item.label === "About Us")?.children ?? [];

export default function TransparencyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Registration & Transparency" },
        ]}
        eyebrow="About us"
        title="Registration & transparency"
        dek="What donors and CSR partners need to verify before they give. The section every reference foundation leads with."
      />
      <SubNav links={aboutLinks} />

      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">Trust registration</p>
            <div className="mt-2">
              <Fact value={trust.registrationNumber} />
            </div>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">80G: tax deduction for donors</p>
            <div className="mt-2">
              <Fact value={trust.exemption80G} />
            </div>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">12A registration</p>
            <div className="mt-2">
              <Fact value={trust.exemption12A} />
            </div>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">FCRA: foreign contributions</p>
            <div className="mt-2">
              <Fact value={trust.exemptionFCRA} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
