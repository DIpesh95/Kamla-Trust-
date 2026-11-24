import Link from "next/link";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { RecognitionsAwards } from "@/components/recognitions-awards";
import { AboutIntro } from "@/components/about-intro";
import { FiveDecadesTimeline } from "@/components/five-decades-timeline";
import { WorkChapters } from "@/components/work-chapters";
import { NamedProgrammes } from "@/components/named-programmes";
import { SignatureEvents } from "@/components/signature-events";
import { HumanImpact } from "@/components/human-impact";
import { StoriesMagazine } from "@/components/stories-magazine";
import { NewsroomEditorial } from "@/components/newsroom-editorial";
import { LeadershipTeaser } from "@/components/leadership-teaser";
import { TransparencyTeaser } from "@/components/transparency-teaser";
import { GetInvolvedCTA } from "@/components/get-involved-cta";
import { Reveal } from "@/components/motion";
import { pillars } from "@/content/pillars";
import { trust } from "@/content/trust";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Five Decades of Action (stats + timeline + geography, one section) */}
      <FiveDecadesTimeline />

      {/* 3. Recognitions & Awards */}
      <RecognitionsAwards />

      {/* 4. About Kamala Trust — Our Story */}
      <AboutIntro />

      {/* 5. Our Focus Areas (horizontal carousel) */}
      <section className="bg-surface py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <Reveal className="max-w-2xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Our focus areas</p>
            <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
              Five chapters, one trust.
            </h2>
            <p className="mt-4 text-base text-text-muted">
              {trust.shortName} runs {pillars.reduce((n, p) => n + p.initiatives.length, 0)}+ programs across
              Maharashtra, organised into five focus areas.
            </p>
          </Reveal>
          <WorkChapters />
        </Container>
      </section>

      {/* 6. Our Work: Named Programmes */}
      <section className="bg-soft-bg py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Our work</p>
              <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
                Named programmes, decades running.
              </h2>
            </div>
            <Link href="/our-work" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              All programmes →
            </Link>
          </Reveal>
          <NamedProgrammes />
        </Container>
      </section>

      {/* 7. Our Signature Initiatives & Events (KPW / PoH / KRS, one tabbed section) */}
      <SignatureEvents />

      {/* 8. Gallery (Moments & Gatherings + Impact Gallery, one filterable gallery) */}
      <HumanImpact />

      {/* 9. Stories of Impact */}
      <section className="bg-surface py-20 sm:py-28">
        <Container className="flex flex-col gap-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Stories of impact</p>
              <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
                Behind every number, a name.
              </h2>
            </div>
            <Link href="/stories" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              All stories →
            </Link>
          </Reveal>
          <StoriesMagazine />
        </Container>
      </section>

      {/* 10. Newsroom & Media Coverage */}
      <section className="bg-soft-bg py-20 sm:py-28">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Newsroom &amp; media coverage</p>
              <h2 className="mt-4 font-display text-5xl font-medium italic leading-[1.05] text-text sm:text-6xl">
                Recognition &amp; recent activity.
              </h2>
            </div>
            <Link href="/newsroom" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              View all →
            </Link>
          </Reveal>
          <NewsroomEditorial limit={4} />
        </Container>
      </section>

      {/* 11. Leadership & Trustee */}
      <LeadershipTeaser />

      {/* 12. Resources (Documentation + Publications + Transparency, one compact strip) */}
      <TransparencyTeaser />

      {/* 13. Get Involved */}
      <GetInvolvedCTA />

      {/* 14. Footer, rendered globally in layout.tsx */}
    </>
  );
}
