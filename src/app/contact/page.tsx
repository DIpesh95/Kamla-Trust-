import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { trust } from "@/content/trust";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${trust.shortName}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Get in touch"
        dek="Reach the trust directly, or send a note below."
      />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-5">
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">Registered office</p>
            <p className="mt-2 text-sm leading-relaxed text-text">{trust.registeredOffice}</p>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">Phone</p>
            <a href={`tel:${trust.phone.replace(/\s+/g, "")}`} className="mt-2 block text-sm text-primary-strong">
              {trust.phone}
            </a>
          </div>
          <div className="rounded-sm border border-line bg-surface p-6">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-text-muted">Email</p>
            <a href={`mailto:${trust.email}`} className="mt-2 block text-sm text-primary-strong">
              {trust.email}
            </a>
          </div>
        </div>

        <InquiryForm subjectPrefix="Website contact" submitLabel="Send message" includePhone />
      </Container>
    </>
  );
}
