import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/container";
import { AnnualGatherings } from "@/components/annual-gatherings";
import { NewsroomEditorial } from "@/components/newsroom-editorial";
import { EventGallery } from "@/components/event-gallery";
import { Reveal } from "@/components/motion";
import { trust } from "@/content/trust";

export const metadata: Metadata = {
  title: "Our Experiences",
  description: `Annual gatherings, recognitions, and on-ground moments from ${trust.shortName}.`,
};

export default function OurExperiencesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Experiences" }]}
        eyebrow="Our experiences"
        title="The gatherings, moments, and people behind the work"
        dek="Our signature annual initiatives, recent activity, and real moments from the field, in one place."
      />

      <AnnualGatherings />

      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Recent activity</p>
              <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
                What&rsquo;s happened lately.
              </h2>
            </div>
            <Link href="/newsroom" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              Full newsroom →
            </Link>
          </Reveal>
          <NewsroomEditorial limit={6} />
        </Container>
      </section>

      <section className="bg-soft-bg py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">From the archive</p>
            <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
              Real moments from the field.
            </h2>
          </Reveal>
          <EventGallery />
        </Container>
      </section>
    </>
  );
}
