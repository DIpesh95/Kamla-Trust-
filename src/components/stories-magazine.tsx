import { storySlots } from "@/content/stories";
import { Reveal } from "./motion";

function PhotoPending({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-dashed border-line bg-soft-bg px-4 text-center ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">Photo pending</span>
      <span className="text-[10px] leading-snug text-text-muted/80">Real photo &amp; interview not yet available</span>
    </div>
  );
}

export function StoriesMagazine() {
  const [featured, ...rest] = storySlots;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      <Reveal className="lg:w-3/5">
        <article className="group">
          <PhotoPending className="aspect-[4/3] w-full rounded-sm" />
          <div className="mt-6 flex flex-col gap-3">
            <span className="w-fit font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">
              {featured.pillar}
            </span>
            <h3 className="font-display text-3xl font-medium italic text-text sm:text-4xl">{featured.title}</h3>
            <p className="max-w-lg text-base leading-relaxed text-text-muted">{featured.prompt}</p>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-warn">Awaiting interview</span>
          </div>
        </article>
      </Reveal>

      <div className="flex flex-col gap-8 lg:w-2/5">
        {rest.map((slot, i) => (
          <Reveal key={slot.slug} delay={0.1 + i * 0.08}>
            <article className="group flex gap-5">
              <PhotoPending className="h-28 w-28 shrink-0 rounded-sm sm:h-32 sm:w-32" />
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
                  {slot.pillar}
                </span>
                <h4 className="font-display text-xl font-medium text-text">{slot.title}</h4>
                <p className="text-sm leading-snug text-text-muted">{slot.prompt}</p>
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-warn">Awaiting interview</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
