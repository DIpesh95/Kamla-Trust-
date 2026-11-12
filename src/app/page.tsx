import Link from "next/link";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { RecognitionStrip } from "@/components/recognition-strip";
import { AboutIntro } from "@/components/about-intro";
import { ImpactNumbers } from "@/components/impact-numbers";
import { WorkChapters } from "@/components/work-chapters";
import { SignatureInitiatives } from "@/components/signature-initiatives";
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
      <RecognitionStrip />

      {/* 2. About */}
      <AboutIntro />

      {/* 3. Our Impact */}
      <ImpactNumbers />

      {/* 4. Our Focus Areas */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-14">
          <Reveal className="max-w-2xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Our focus areas</p>
            <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
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

      {/* 5. Signature Initiatives */}
      <SignatureInitiatives />

      {/* 6. Human Impact */}
      <HumanImpact />

      {/* 7. Stories of Change */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Stories</p>
              <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
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

      {/* 8. Newsroom */}
      <section className="bg-soft-bg py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Newsroom</p>
              <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
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

      {/* 9. Leadership */}
      <LeadershipTeaser />

      {/* 10. Annual Reports & Transparency */}
      <TransparencyTeaser />

      {/* 11. Get Involved */}
      <GetInvolvedCTA />

      {/* 12. Footer — rendered globally in layout.tsx */}
    </>
  );
}
