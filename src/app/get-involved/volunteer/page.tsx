import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { InquiryForm } from "@/components/inquiry-form";
import { pillars } from "@/content/pillars";
import { primaryNav } from "@/content/nav";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Volunteer with Kamala Trust across its five program pillars.",
};

const giLinks = primaryNav.find((item) => item.label === "Get Involved")?.children ?? [];

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get Involved" }, { label: "Volunteer" }]}
        eyebrow="Get involved"
        title="Volunteer"
        dek="Programs run across Mumbai and rural Maharashtra & Rajasthan, from event-day support to ongoing mentoring."
      />
      <SubNav links={giLinks} />

      <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-text">Where volunteers help</p>
          <ul className="flex flex-col gap-2">
            {pillars.map((pillar) => (
              <li key={pillar.slug} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-text-muted">
                <span className="font-medium text-text">{pillar.name}</span>: {pillar.summary}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-text">Tell us how you&rsquo;d like to help</p>
          <InquiryForm subjectPrefix="Volunteer inquiry" submitLabel="Send interest" includePhone />
        </div>
      </Container>
    </>
  );
}
