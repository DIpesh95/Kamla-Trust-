import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { homeAboutImage } from "@/content/media";
import { Reveal, CountUp } from "./motion";
import { Container } from "./container";

export function AboutIntro() {
  const years = getYearsActive();

  return (
    <section className="bg-surface py-20 sm:py-28">
      <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:col-span-7">
          <Image
            src={homeAboutImage.src}
            alt={homeAboutImage.alt}
            fill
            quality={95}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />

          <div className="absolute bottom-0 left-0 flex flex-col gap-1 rounded-tr-sm bg-text/90 px-6 py-5 backdrop-blur-sm sm:px-8 sm:py-6">
            <CountUp
              value={String(years)}
              className="font-display text-6xl font-medium italic leading-none text-secondary sm:text-7xl"
            />
            <span className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-surface/70">
              years of {trust.tagline.toLowerCase()}
            </span>
          </div>
        </Reveal>

        <Reveal
          y={24}
          className="flex flex-col gap-6 self-center lg:col-span-5 lg:col-start-8 lg:pl-4"
        >
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">About Kamala Trust</p>
          <h2 className="font-display max-w-md text-4xl font-medium italic leading-[1.08] text-text sm:text-5xl">
            {years} years of {trust.tagline.toLowerCase()}.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-text-muted">
            {trust.shortName} has worked quietly and consistently since {trust.founded}, a {trust.orgType.toLowerCase()},
            built on the belief that dignity, education, and health shouldn&rsquo;t depend on circumstance. From a
            single college and hostel in Bhinmal to programs spanning education, healthcare, women&rsquo;s welfare,
            rural livelihoods, and disaster relief, the work has stayed the same at its core: showing up.
          </p>
          <Link
            href="/about"
            className="group mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong"
          >
            Read Our Story
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1.5">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
