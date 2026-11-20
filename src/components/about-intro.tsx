import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { pillars } from "@/content/pillars";
import { getYearsActive } from "@/content/stats";
import { homeAboutImage } from "@/content/media";
import { Reveal } from "./motion";
import { Container } from "./container";

export function AboutIntro() {
  const years = getYearsActive();
  const programCount = pillars.reduce((sum, p) => sum + p.initiatives.length, 0);

  return (
    <section className="bg-soft-bg py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] w-full -rotate-1 overflow-hidden rounded-sm shadow-xl">
            <Image
              src={homeAboutImage.src}
              alt={homeAboutImage.alt}
              fill
              quality={90}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-4 top-[12%] hidden rounded-md border border-line bg-surface px-4 py-3 shadow-lg sm:block">
            <p className="font-display text-2xl font-medium text-primary">{years}</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-text-muted">years of work</p>
          </div>
          <div className="absolute -left-4 bottom-[10%] hidden rounded-md border border-line bg-surface px-4 py-3 shadow-lg sm:block">
            <p className="font-display text-2xl font-medium text-primary">{programCount}+</p>
            <p className="font-sans text-[10px] uppercase tracking-[0.12em] text-text-muted">named programs</p>
          </div>
        </Reveal>

        <Reveal y={24} className="flex flex-col gap-6">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">About Kamala Trust</p>
          <h2 className="font-display max-w-lg text-4xl font-medium italic leading-[1.12] text-text sm:text-5xl">
            Fifty-seven years since the Trust was registered. Fifty-nine since its first classroom opened.
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-text-muted">
            Shri G.K. Gowani opened the Commerce College in Bhinmal in 1967, two years before {trust.legalName}{" "}
            was formally registered in {trust.founded}. The Ankibai Hostel followed in 1975. The instinct hasn&rsquo;t
            changed since: build what a community is missing, then stay long enough for it to matter.
          </p>
          <p className="font-display text-xl italic text-primary-strong">A registered public trust, women-led.</p>
          <Link
            href="/about"
            className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
          >
            Read Our Story
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
