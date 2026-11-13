import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { primaryNav } from "@/content/nav";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles and how to reach Kamala Trust about working there.",
};

const giLinks = primaryNav.find((item) => item.label === "Get Involved")?.children ?? [];

export default function CareersPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get Involved" }, { label: "Careers" }]}
        eyebrow="Get involved"
        title="Careers"
        dek="No open roles are listed yet. Every reference foundation studied keeps an active careers page. Worth deciding whether the trust wants the same before launch."
      />
      <SubNav links={giLinks} />

      <Container className="py-16 sm:py-20">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-medium text-text">Interested anyway? Send a note.</p>
          <InquiryForm subjectPrefix="Careers inquiry" submitLabel="Send" includePhone />
        </div>
      </Container>
    </>
  );
}
