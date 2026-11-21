import { storySlots } from "@/content/stories";
import { DragRow, GsapStagger } from "./scroll-fx";

export function StoriesMagazine() {
  return (
    <GsapStagger selector="article" y={30} stagger={0.1}>
      <DragRow rowClassName="sm:grid sm:grid-flow-col sm:auto-cols-[minmax(0,1fr)]">
        {storySlots.map((slot) => (
          <article
            key={slot.slug}
            className="group relative flex aspect-[3/4] w-[80vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-sm border border-line bg-gradient-to-br from-text via-text to-primary-strong/80 p-7 sm:w-auto sm:p-9"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle at 80% 10%, rgba(217,54,131,0.35), transparent 55%)" }}
            />
            <div className="relative flex items-start justify-between">
              <span className="w-fit font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                {slot.pillar}
              </span>
              <span className="rounded-full border border-surface/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-surface/70">
                Awaiting interview
              </span>
            </div>
            <div className="relative flex flex-col gap-3">
              <h3 className="font-display text-2xl font-medium italic leading-snug text-surface sm:text-3xl">
                {slot.title}
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-surface/70">{slot.prompt}</p>
              <span className="text-[11px] leading-snug text-surface/45">
                Real photo &amp; interview not yet available &mdash; this card will carry an actual story once one is
                recorded.
              </span>
            </div>
          </article>
        ))}
      </DragRow>
    </GsapStagger>
  );
}
