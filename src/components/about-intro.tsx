import Link from "next/link";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { homeAboutImage } from "@/content/media";
import { FilmFrame } from "./film-frame";
import { ClipReveal } from "./clip-reveal";
import { Reveal, CountUp } from "./motion";
import { Container } from "./container";

export function AboutIntro() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative lg:order-2">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 -left-6 select-none font-display text-[8rem] font-bold italic leading-none text-primary/[0.08] sm:-top-16 sm:-left-10 sm:text-[11rem]"
          >
            {trust.founded}
          </span>
          <ClipReveal direction="right" className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <FilmFrame src={homeAboutImage.src} alt={homeAboutImage.alt} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0" />
          </ClipReveal>
          <div className="absolute -bottom-7 -right-4 flex flex-col items-center justify-center rounded-sm bg-primary px-6 py-5 shadow-xl shadow-primary-strong/30 sm:-right-8">
            <CountUp value={`${getYearsActive()}`} className="font-display text-4xl font-bold italic leading-none text-surface sm:text-5xl" />
            <span className="timecode mt-1 text-[10px] text-surface/80">Years, running</span>
          </div>
        </div>

        <Reveal y={24} className="flex flex-col gap-6 lg:order-1">
          <p className="timecode text-xs font-bold text-primary">About Kamala Trust</p>
          <h2 className="font-display max-w-md text-4xl font-bold italic leading-[1.1] text-text sm:text-5xl">
            {getYearsActive()} years of {trust.tagline.toLowerCase()}.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-text-muted">
            {trust.shortName} has worked quietly and consistently since{" "}
            <strong className="font-semibold text-text">{trust.founded}</strong>, a {trust.orgType.toLowerCase()},
            built on the belief that dignity, education, and health shouldn&rsquo;t depend on circumstance. From a
            single college and hostel in Bhinmal to programs spanning education, healthcare, women&rsquo;s welfare,
            rural livelihoods, and disaster relief, the work has stayed the same at its core: showing up.
          </p>
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
