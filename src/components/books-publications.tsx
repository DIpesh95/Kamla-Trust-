import { Reveal } from "./motion";

const slots = ["Annual Report", "Financial Statements", "Trust Literature"];

/**
 * No trust-published book, report, or piece of literature has been confirmed for public listing
 * yet. This renders an intentional "editorial display" treatment, not empty book-cover
 * placeholders and not invented titles or cover art. Deliberately distinct from the
 * "Pending Trustee Confirmation" badge used in Transparency: that pattern flags a document that
 * exists but isn't confirmed, this one flags a publication that does not exist yet. The category
 * label sits below the card as a caption, matching the approved artboard.
 */
export function BooksPublications() {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {slots.map((label, i) => (
        <Reveal key={label} delay={i * 0.08} className="flex flex-col items-center gap-4">
          <div className="relative flex aspect-[2/3] w-full max-w-[220px] items-center justify-center overflow-hidden border border-line bg-soft-bg">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-primary" />
            <span aria-hidden="true" className="absolute right-4 top-4 h-3 w-3 border-r border-t border-primary/50" />
            <span aria-hidden="true" className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-primary/50" />

            <div className="flex flex-col items-center gap-2">
              <span aria-hidden="true" className="flex h-2.5 w-2.5 rotate-45 bg-primary/70" />
              <span className="font-display text-base italic text-primary-strong">Reserved</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                Awaiting publication
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-text">{label}</span>
        </Reveal>
      ))}
    </div>
  );
}
