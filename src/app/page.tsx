import Link from "next/link";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { RecognitionStrip } from "@/components/recognition-strip";
import { AboutIntro } from "@/components/about-intro";
import { Timeline } from "@/components/timeline";
import { ImpactNumbers } from "@/components/impact-numbers";
import { WorkChapters } from "@/components/work-chapters";
import { NamedProgrammes } from "@/components/named-programmes";
import { SignatureInitiatives } from "@/components/signature-initiatives";
import { QuoteBanner } from "@/components/quote-banner";
import { HumanImpact } from "@/components/human-impact";
import { StoriesMagazine } from "@/components/stories-magazine";
import { EventGallery } from "@/components/event-gallery";
import { NewsroomEditorial } from "@/components/newsroom-editorial";
import { LeadershipTeaser } from "@/components/leadership-teaser";
import { BooksPublications } from "@/components/books-publications";
import { GetInvolvedCTA } from "@/components/get-involved-cta";
import { Reveal } from "@/components/motion";
import { getActiveProgramCount } from "@/content/stats";
import { trust } from "@/content/trust";

export default function Home() {
  return (
    <>
      {/* Hero, Recognition Strip */}
      <Hero />
      <RecognitionStrip />

      {/* About & Timeline */}
      <AboutIntro />
      <section className="bg-soft-bg py-24 sm:py-32">
        <Container>
          <Timeline />
        </Container>
      </section>

      {/* Our Impact */}
      <ImpactNumbers />

      {/* Focus Areas */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-14">
          <Reveal className="max-w-2xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Our focus areas</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
              Five chapters, one trust.
            </h2>
            <p className="mt-4 text-base text-text-muted">
              {trust.shortName} runs {getActiveProgramCount()}+ programs across Maharashtra, organised into five
              focus areas.
            </p>
          </Reveal>
          <WorkChapters />
        </Container>
      </section>

      {/* Our Work: Named Programmes */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
                Our work &middot; Named programmes
              </p>
              <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
                Not abstractions. Named programmes, running now.
              </h2>
            </div>
            <p className="max-w-xs text-right text-sm text-text-muted">
              A closer look at specific initiatives inside the five focus areas above.
            </p>
          </Reveal>
          <NamedProgrammes />
        </Container>
      </section>

      {/* Signature Initiatives */}
      <SignatureInitiatives />

      {/* Editorial Pause / Quote Banner */}
      <QuoteBanner />

      {/* Human Impact */}
      <HumanImpact />

      {/* Stories of Impact */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Stories</p>
              <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
                Behind every number, a name.
              </h2>
              <p className="mt-3 text-sm text-text-muted">
                Real beneficiary stories are the single most important content gap in this content. The frames
                below are the finished design &mdash; only the photograph and the interview are still to come, with
                full consent.
              </p>
            </div>
            <Link href="/stories" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              All stories →
            </Link>
          </Reveal>
          <StoriesMagazine />
        </Container>
      </section>

      {/* Impact Gallery */}
      <section className="bg-text py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="max-w-2xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">Impact gallery</p>
            <h2 className="mt-4 font-display text-4xl font-medium text-surface sm:text-5xl">
              A closer look, in the Trust&rsquo;s own photography.
            </h2>
            <p className="mt-3 text-sm text-surface/70">
              The Trust&rsquo;s real photo library is still small, so the two featured events here are revisited
              from elsewhere on this page, at a different crop and a wider story. Everything else is honestly
              marked pending.
            </p>
          </Reveal>
          <EventGallery />
        </Container>
      </section>

      {/* Newsroom & Press Releases */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Newsroom</p>
              <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
                Recognition &amp; recent activity.
              </h2>
            </div>
            <Link href="/newsroom" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              View all →
            </Link>
          </Reveal>
          <NewsroomEditorial featured />
        </Container>
      </section>

      {/* Leadership */}
      <LeadershipTeaser />

      {/* Books & Publications */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-10">
          <Reveal className="max-w-2xl text-center sm:mx-auto">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Books &amp; publications
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium text-text sm:text-5xl">
              A record still being written.
            </h2>
            <p className="mt-3 text-sm text-text-muted">
              No trust-published book, report, or piece of literature has been confirmed for public listing yet.
              The shelf below is reserved for them, in the categories the Trust is most likely to publish &mdash;
              nothing here is an invented title or cover.
            </p>
          </Reveal>
          <BooksPublications />
        </Container>
      </section>

      {/* Get Involved */}
      <GetInvolvedCTA />

      {/* Footer, rendered globally in layout.tsx */}
    </>
  );
}
