import Link from "next/link";
import { Hero } from "@/components/hero";
import { Container } from "@/components/container";
import { RecognitionStrip } from "@/components/recognition-strip";
import { AboutIntro } from "@/components/about-intro";
import { FiveDecadesTimeline } from "@/components/five-decades-timeline";
import { WorkChapters } from "@/components/work-chapters";
import { SignatureInitiatives } from "@/components/signature-initiatives";
import { EventGallery } from "@/components/event-gallery";
import { StoriesMagazine } from "@/components/stories-magazine";
import { NewsroomEditorial } from "@/components/newsroom-editorial";
import { LeadershipTeaser } from "@/components/leadership-teaser";
import { TransparencyTeaser } from "@/components/transparency-teaser";
import { GetInvolvedCTA } from "@/components/get-involved-cta";
import { SectionPreview, Chip } from "@/components/section-preview";
import { BookShelf } from "@/components/book-shelf";
import { Reveal } from "@/components/motion";
import { Fact } from "@/components/fact";
import { pillars } from "@/content/pillars";
import { trust } from "@/content/trust";
import { newsroom } from "@/content/newsroom";

export default function Home() {
  const annualEvents = newsroom.filter((i) => i.kind === "Event").slice(0, 5);
  const recognitions = newsroom.filter((i) => i.kind === "Recognition");

  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Recognised By */}
      <RecognitionStrip />

      {/* 3. About Kamala Trust — Our Story */}
      <AboutIntro />

      {/* 4. Five Decades of Action */}
      <FiveDecadesTimeline />

      {/* 5. Our Focus Areas */}
      <section className="bg-soft-bg py-24 sm:py-32">
        <Container className="flex flex-col gap-14">
          <Reveal className="max-w-2xl">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Our focus areas</p>
            <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
              Five chapters, one trust.
            </h2>
            <p className="mt-4 text-base text-text-muted">
              {trust.shortName} runs {pillars.reduce((n, p) => n + p.initiatives.length, 0)}+ programs across
              Maharashtra and Rajasthan, organised into five focus areas. Two of them are still waiting on a
              photograph, shown honestly rather than papered over.
            </p>
          </Reveal>
          <WorkChapters />
        </Container>
      </section>

      {/* 6. Signature Initiatives */}
      <SignatureInitiatives />

      {/* 7. Annual Gatherings & Signature Events */}
      <SectionPreview
        eyebrow="Annual gatherings & signature events"
        heading="Every edition, on the record."
        dek="Previous editions and the Trust's own event photography. A dedicated archive with filtering is a second-pass build."
      >
        <EventGallery />
        {annualEvents.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2.5">
            {annualEvents.map((e) => (
              <Chip key={e.title}>
                {e.title} &middot; <Fact value={e.date} />
              </Chip>
            ))}
          </div>
        )}
      </SectionPreview>

      {/* 8. Impact Gallery */}
      <SectionPreview
        eyebrow="Impact gallery"
        heading="A human-centric photography experience."
        dek="A dedicated, scrollable gallery of the Trust's own event photography, not a grid of thumbnails. Full build is a second pass."
        tone="ivory"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-line bg-surface p-5">
            <span className="font-data text-xs text-primary">01</span>
            <h4 className="mt-2 text-[15px] font-medium text-text">Event coverage</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
              Kanya Sneh Bandhan, Lokmata Samman, Pillars of Humanity, Republic Day, already photographed and ready
              to sequence.
            </p>
          </div>
          <div className="rounded-sm border border-line bg-surface p-5">
            <span className="font-data text-xs text-primary">02</span>
            <h4 className="mt-2 text-[15px] font-medium text-text">Layout</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
              Full-bleed horizontal scroll, varied aspect ratios, captions pulled from verified event records.
            </p>
          </div>
          <div className="rounded-sm border border-line bg-surface p-5">
            <span className="font-data text-xs text-primary">03</span>
            <h4 className="mt-2 text-[15px] font-medium text-text">Status</h4>
            <p className="mt-1.5 text-[13px] leading-relaxed text-text-muted">
              Not built this round, a lightweight preview only, per the approved scope for this pass.
            </p>
          </div>
        </div>
      </SectionPreview>

      {/* 9. Books & Publications */}
      <SectionPreview
        eyebrow="Books & publications"
        heading="A dedicated publication showcase."
        dek="No publication titles, cover art, or descriptions exist in the Trust's content yet. The shelf below holds the shape the showcase will take, spines, not covers, until real material arrives."
      >
        <BookShelf />
        <span className="mt-5 inline-block w-fit rounded-sm border border-dashed border-warn/50 bg-warn/10 px-2 py-0.5 text-xs text-warn">
          Titles, cover art, and descriptions pending from trustees
        </span>
      </SectionPreview>

      {/* 10. Leadership & Trustee */}
      <LeadershipTeaser />

      {/* 11. Our Work */}
      <TransparencyTeaser />

      {/* 12. Stories of Impact */}
      <section className="bg-surface py-24 sm:py-32">
        <Container className="flex flex-col gap-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">Stories of impact</p>
              <h2 className="mt-4 font-display text-4xl font-medium italic text-text sm:text-5xl">
                Behind every number, a name.
              </h2>
              <p className="mt-2 max-w-xl text-sm text-text-muted">
                Three proposed story directions, not real stories yet, each needs real interviews, consent, and
                photography before it can run.
              </p>
            </div>
            <Link href="/stories" className="text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong">
              All stories →
            </Link>
          </Reveal>
          <StoriesMagazine />
        </Container>
      </section>

      {/* 13. Newsroom & Media Coverage */}
      <SectionPreview
        eyebrow="Newsroom & media coverage"
        heading="Recognition and recent activity."
        dek="Press coverage and recent events, pulled directly from the Trust's verified press record."
        tone="ivory"
      >
        <NewsroomEditorial limit={4} kinds={["Press", "Community", "Event"]} />
        <Link
          href="/newsroom"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
        >
          View all →
        </Link>
      </SectionPreview>

      {/* 14. Press Releases & Recognitions */}
      <SectionPreview
        eyebrow="Press releases & recognitions"
        heading="Separated from general news, on purpose."
        dek="Formal recognitions, kept distinct from event coverage."
      >
        <div className="flex flex-wrap gap-2.5">
          {recognitions.map((r) => (
            <Chip key={r.title}>
              {r.title} {r.date ? <>&middot; <Fact value={r.date} /></> : null}
            </Chip>
          ))}
        </div>
      </SectionPreview>

      {/* 15. Get Involved */}
      <GetInvolvedCTA />

      {/* 16. Footer, rendered globally in layout.tsx */}
    </>
  );
}
