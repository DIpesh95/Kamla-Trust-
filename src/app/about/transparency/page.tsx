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
        dek="What donors and CSR partners need to verify before they give — the section every reference foundation leads with."
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
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">80G — tax deduction for donors</p>
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
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">FCRA — foreign contributions</p>
            <div className="mt-2">
              <Fact value={trust.exemptionFCRA} />
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-line bg-surface p-7">
          <p className="font-display text-lg font-medium text-text">Financial statements & annual reports</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
            No audited financial statements or annual reports are currently published. Every reference
            foundation studied for this rebuild — Azim Premji Foundation, Reliance Foundation, Aga Khan
            Foundation, and Swades Foundation — publishes these prominently, since it&rsquo;s what turns a
            donation into an informed decision rather than a leap of faith.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-dashed border-warn/50 bg-warn/10 px-4 py-2.5 text-sm text-warn">
            Reports pending from trustees — this section should list downloadable PDFs once available.
          </div>
        </div>
      </Container>
    </>
  );
}
