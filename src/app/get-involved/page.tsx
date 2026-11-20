import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { GetInvolvedForm } from "@/components/get-involved-form";
import { Reveal } from "@/components/motion";
import { trust } from "@/content/trust";
import { primaryNav } from "@/content/nav";
import { getInvolvedContact, assistanceCategories } from "@/content/get-involved";

export const metadata: Metadata = {
  title: "Get Involved",
  description: `Connect with ${trust.shortName}, request assistance, or support the work directly.`,
};

const giLinks = primaryNav.find((item) => item.label === "Get Involved")?.children ?? [];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Get Involved" }]}
        eyebrow="Get involved"
        title="Connect with the trust"
        dek="Reach us directly, or tell us what you need and we'll route it to the right team."
      />
      <SubNav links={giLinks} />

      <Container className="flex flex-col gap-16 py-16 sm:py-24">
        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-sm border border-line bg-soft-bg p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">General enquiries</p>
            <a href={`mailto:${getInvolvedContact.generalEmail}`} className="mt-2 block font-medium text-primary-strong">
              {getInvolvedContact.generalEmail}
            </a>
          </div>
          <div className="rounded-sm border border-line bg-soft-bg p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Trustee communication</p>
            <a href={`mailto:${getInvolvedContact.trusteeEmail}`} className="mt-2 block font-medium text-primary-strong">
              {getInvolvedContact.trusteeEmail}
            </a>
          </div>
          <div className="rounded-sm border border-line bg-soft-bg p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Phone</p>
            <a href={`tel:${trust.phone.replace(/\s+/g, "")}`} className="mt-2 block font-medium text-primary-strong">
              {trust.phone}
            </a>
          </div>
          <div className="rounded-sm border border-line bg-soft-bg p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Instagram</p>
            <a
              href={getInvolvedContact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block font-medium text-primary-strong"
            >
              @kamala.trust ↗
            </a>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col gap-5">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.28em] text-primary">Request assistance</p>
            <h2 className="font-display text-3xl font-bold italic text-text sm:text-4xl">
              Tell us what you need.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              Use this form if you or your community need support. We review every request and direct it to the
              team best placed to help.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">Categories we support</p>
              <ul className="flex flex-wrap gap-2">
                {assistanceCategories.map((category) => (
                  <li
                    key={category}
                    className="rounded-full border border-line bg-soft-bg px-3.5 py-1.5 text-xs font-medium text-text"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-text-muted">
              Looking to donate, volunteer, or partner with us instead?{" "}
              <Link href="/get-involved/donate" className="font-semibold text-primary-strong">
                See all ways to give
              </Link>
              .
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <GetInvolvedForm />
          </Reveal>
        </div>
      </Container>
    </>
  );
}
