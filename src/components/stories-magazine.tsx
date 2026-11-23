import { storySlots } from "@/content/stories";
import { Reveal } from "./motion";

function PersonGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.9 3.1-6.6 7-6.6s7 2.7 7 6.6" />
    </svg>
  );
}

/** Approved `.frame` treatment: thin burgundy border around the whole card, a `.story-well`
 * gradient photo area with a centered person glyph + italic "Photograph to follow" caption,
 * then a thick burgundy rule separating the photo from the story text below. All three story
 * slots render with identical chrome and the same full disclosure text, matching the live site's
 * equal-weight treatment rather than singling one story out as "featured." */
export function StoriesMagazine() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      {storySlots.map((slot, i) => (
        <Reveal key={slot.slug} delay={i * 0.08} className="flex flex-col border border-primary">
          <div className="story-well flex aspect-[4/3] w-full flex-col items-center justify-center gap-3">
            <PersonGlyph className="h-9 w-9 text-primary" />
            <span className="font-display text-sm italic text-primary">Photograph to follow</span>
          </div>
          <div className="h-[3px] w-full bg-primary" />
          <div className="flex flex-col gap-3 p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{slot.pillar}</span>
              <span className="w-fit border border-primary px-2 py-[3px] text-[10.5px] font-semibold uppercase tracking-[0.1em] text-primary">
                Awaiting interview
              </span>
            </div>
            <h3 className="font-display text-2xl font-medium text-text sm:text-[28px]">&ldquo;{slot.title}&rdquo;</h3>
            <p className="max-w-lg text-base leading-relaxed text-text-muted">{slot.prompt}</p>
            <p className="mt-2 border-t border-line pt-4 text-xs text-text-muted">
              Real photo &amp; interview not yet available &mdash; this card will carry an actual story once one is
              recorded.
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
