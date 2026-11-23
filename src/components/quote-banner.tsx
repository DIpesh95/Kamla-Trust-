import Image from "next/image";
import { heroImage } from "@/content/media";
import { getPillar } from "@/content/pillars";
import { Reveal, RevealMask } from "./motion";

/**
 * Full-bleed editorial pause between Signature Initiatives and Human Impact, reusing the wide
 * Kanya Sneh Bandhan crop already shown (narrower) in the Hero. Intentional, disclosed asset
 * reuse given the trust's small real photo library, not a duplicate-content bug. The line below
 * the image is pulled verbatim from the Kanya Sneh Bandhan initiative already sourced in
 * content/pillars.ts, not an invented caption or beneficiary quote.
 */
export function QuoteBanner() {
  const pillar = getPillar("women-and-girl-child");
  const initiative = pillar?.initiatives.find((i) => i.name === "Kanya Sneh Bandhan");

  return (
    <section className="relative flex min-h-[70vh] w-full items-center overflow-hidden bg-text">
      <RevealMask className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          quality={92}
          sizes="100vw"
          className="object-cover object-[center_22%]"
        />
      </RevealMask>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-text via-text/55 to-text/25" />

      <Reveal className="relative mx-auto w-full max-w-3xl px-[22px] py-20 text-center sm:px-10">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-secondary">Kanya Sneh Bandhan</p>
        {initiative ? (
          <p className="mt-5 font-display text-2xl italic leading-snug text-surface sm:text-4xl">
            {typeof initiative.blurb === "string" ? initiative.blurb : initiative.blurb.note}
          </p>
        ) : null}
      </Reveal>
    </section>
  );
}
