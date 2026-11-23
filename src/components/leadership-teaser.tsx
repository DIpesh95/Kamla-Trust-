import Link from "next/link";
import { trust } from "@/content/trust";
import { Reveal } from "./motion";
import { Container } from "./container";

const HONORIFICS = new Set(["Smt.", "Shri", "Dr.", "Mr.", "Mrs.", "Ms."]);

/** Initials from the meaningful parts of a name, excluding honorifics like "Smt."/"Shri" —
 * e.g. "Smt. Nidarshana Gowani" -> "NG", not "N". */
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter((word) => word && !HONORIFICS.has(word))
    .map((word) => word[0])
    .join("");
}

/**
 * Approved composition, matching the live site: both trustees side by side as one unified
 * section, equal visual importance — Nidarshana shown with an initials placeholder (left,
 * narrower), Ramesh typographic-only (right, wider), separated by a vertical rule. No portrait
 * file exists for Nidarshana yet (portrait-cutout-v2.webp is referenced in the approved design
 * but isn't in this project's assets, and wasn't even embeddable in the canonical artboard export
 * either) — rendered as initials, the live site's own honest pending-photo treatment, not a
 * fabricated or unrelated image.
 */
export function LeadershipTeaser() {
  const [nidarshana, ramesh] = trust.trustees;
  const initials = getInitials(nidarshana.name);

  return (
    <section className="bg-text py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-light-pink">Leadership</p>
          <h2 className="mt-4 font-display text-4xl font-medium text-surface sm:text-5xl">
            The people carrying this forward.
          </h2>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.3fr] lg:gap-14">
          <div className="relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-burgundy-deep p-6 sm:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-surface/60">
              Trustee photography pending
            </span>
            <div className="flex flex-col gap-1.5">
              <span className="font-display text-5xl font-medium text-secondary">{initials}</span>
              <p className="text-xs text-surface/45">Shown as initials until cleared by the trustees.</p>
              <h3 className="mt-2 font-display text-2xl font-medium text-surface sm:text-[28px]">{nidarshana.name}</h3>
              <p className="text-sm text-surface/70">
                {nidarshana.role} &middot; Managing Director, Kamala Group of Industries
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-surface/85 sm:text-base">{nidarshana.bio}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 border-t border-surface/15 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-light-pink">{ramesh.role}</p>
            <h3 className="font-display text-2xl font-medium text-surface sm:text-[28px]">{ramesh.name}</h3>
            <p className="text-sm text-surface/70">Real estate and renewable energy</p>
            <p className="max-w-sm text-sm leading-relaxed text-surface/85">{ramesh.bio}</p>
            <p className="mt-2 max-w-sm text-xs leading-relaxed text-surface/45">
              Shown here in type only, intentionally &mdash; a photographic portrait awaits trustee approval. No
              placeholder image is used.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/about/leadership"
            className="inline-flex w-fit items-center border border-surface/60 px-7 py-[17px] text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:border-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            Meet the Trustees
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
