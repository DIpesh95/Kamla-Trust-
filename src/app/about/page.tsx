import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { trust } from "@/content/trust";
import { primaryNav } from "@/content/nav";
import { EventGallery } from "@/components/event-gallery";
import { Timeline } from "@/components/timeline";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "About",
  description: `The history and mission of ${trust.legalName}.`,
};

const aboutLinks = primaryNav.find((item) => item.label === "About Us")?.children ?? [];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us" }]}
        eyebrow="About us"
        title="A trust built on showing up, since 1969"
        dek={`${trust.legalName} is a ${trust.orgType.toLowerCase()}, working across education, healthcare, women & child welfare, and rural livelihoods.`}
      />
      <SubNav links={aboutLinks} />

      <Container className="flex flex-col gap-20 py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <Reveal className="flex flex-col gap-5 text-base leading-relaxed text-text-muted">
            <p>
              {trust.shortName}, formally {trust.legalName}, is a charitable foundation led by Trustee
              Nidarshana Gowani. Rooted in the values of diversity, equity, and inclusion, the trust operates
              on the principle that everyone deserves a healthy, productive life, regardless of background or
              circumstance.
            </p>
            <p>
              The trust is also known for large-scale public initiatives such as Kamala Power Women, Kamala
              Rising Stars, and the Kamala Cricket Tournament, recognising individuals who have contributed to
              society, including COVID-19 frontline workers, transgender community members, and widows of
              armed-forces officers.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="flex h-fit flex-col gap-4 rounded-sm border border-line bg-soft-bg p-6">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-text-muted">At a glance</p>
              <dl className="flex flex-col gap-3 text-sm">
                <div>
                  <dt className="text-text-muted">Founded</dt>
                  <dd className="font-medium text-text">{trust.founded}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Structure</dt>
                  <dd className="font-medium text-text">{trust.orgType}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Registered office</dt>
                  <dd className="font-medium text-text">{trust.registeredOffice}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>

        <div>
          <Reveal className="mb-10 max-w-xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">1969 → Today</p>
            <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
              Five decades, in four moments.
            </h2>
          </Reveal>
          <Timeline />
        </div>

        <Reveal className="rounded-sm border border-dashed border-warn/50 bg-warn/5 p-6">
          <p className="text-sm font-semibold text-warn">Needs trustee confirmation</p>
          <p className="mt-1.5 max-w-2xl text-sm text-text-muted">{trust.relatedEntityNote}</p>
        </Reveal>

        <Reveal>
          <p className="mb-4 font-sans text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
            From the archive: real moments from the trust&rsquo;s work
          </p>
          <EventGallery />
        </Reveal>
      </Container>
    </>
  );
}
