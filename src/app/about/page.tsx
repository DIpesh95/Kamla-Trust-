import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { primaryNav } from "@/content/nav";
import { EventGallery } from "@/components/event-gallery";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: `The history and mission of ${trust.legalName}.`,
};

const aboutLinks = primaryNav.find((item) => item.label === "About")?.children ?? [];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A trust built on showing up, since 1969"
        dek={`${trust.legalName} is a ${trust.orgType.toLowerCase()}, working across education, healthcare, women & child welfare, and rural livelihoods.`}
      />
      <SubNav links={aboutLinks} />

      <Container className="flex flex-col gap-10 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-5 text-base leading-relaxed text-ink-soft">
            <p>
              Established in {trust.founded}, {trust.shortName} — formally {trust.legalName} — is a
              charitable foundation led by Trustee Nidarshana Gowani. Rooted in the values of diversity,
              equity, and inclusion, the trust operates on the principle that everyone deserves a healthy,
              productive life, regardless of background or circumstance.
            </p>
            <p>
              Its roots in education go back further still: in 1967, Shri G.K. Gowani founded a Commerce
              College in Bhinmal, Rajasthan, at a time when access to higher education there was limited.
              The Smt. Ankibai Ghamandiram Ji Hostel followed in 1975, giving students from distant
              villages a safe place to stay while they studied.
            </p>
            <p>
              Over {getYearsActive()} years, the trust’s work has grown to span education, healthcare,
              gender equality, rural upliftment, disaster relief, and social empowerment — including
              further schools and colleges in rural Rajasthan, and ongoing support for girl-child
              education and menstrual-hygiene awareness.
            </p>
            <p>
              The trust is also known for large-scale public initiatives such as Kamala Power Women,
              Kamala Rising Stars, and the Kamala Cricket Tournament, recognising individuals who have
              contributed to society — including COVID-19 frontline workers, transgender community
              members, and widows of armed-forces officers.
            </p>
          </div>

          <aside className="flex flex-col gap-4 rounded-2xl border border-line bg-surface p-6 h-fit">
            <p className="font-data text-xs uppercase tracking-[0.1em] text-ink-soft">At a glance</p>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-ink-soft">Founded</dt>
                <dd className="font-medium text-ink">{trust.founded}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Structure</dt>
                <dd className="font-medium text-ink">{trust.orgType}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Registered office</dt>
                <dd className="font-medium text-ink">{trust.registeredOffice}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="rounded-2xl border border-dashed border-warn/50 bg-warn/5 p-6">
          <p className="text-sm font-semibold text-warn">Needs trustee confirmation</p>
          <p className="mt-1.5 max-w-2xl text-sm text-ink-soft">{trust.relatedEntityNote}</p>
        </div>

        <Reveal>
          <p className="font-data mb-4 text-xs uppercase tracking-[0.1em] text-ink-soft">
            From the archive — real moments from the trust’s work
          </p>
          <EventGallery />
        </Reveal>
      </Container>
    </>
  );
}
