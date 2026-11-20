import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion";
import { trust } from "@/content/trust";

export const metadata: Metadata = {
  title: "Press Releases & Recognitions",
  description: `Official press releases, media announcements, and milestones for ${trust.shortName}.`,
};

export default function PressReleasesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Press Releases & Recognitions" }]}
        eyebrow="Press releases & recognitions"
        title="Official statements, as they're published"
        dek="A dedicated home for official press releases, media announcements, major recognitions, and milestones, planned for this site."
      />

      <Container className="flex flex-col gap-10 py-16 sm:py-24">
        <Reveal className="rounded-sm border border-dashed border-warn/50 bg-warn/5 p-6">
          <p className="text-sm font-semibold text-warn">Coming soon</p>
          <p className="mt-1.5 max-w-2xl text-sm text-text-muted">
            No official press releases have been supplied yet. In the meantime, press coverage and media
            mentions already published appear in the{" "}
            <Link href="/newsroom" className="font-semibold text-primary-strong">
              Newsroom
            </Link>
            , and formal awards and honours appear under{" "}
            <Link href="/recognitions" className="font-semibold text-primary-strong">
              Recognitions &amp; Awards
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </>
  );
}
