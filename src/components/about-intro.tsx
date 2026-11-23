import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { homeAboutImage } from "@/content/media";
import { ClipReveal, Reveal } from "./motion";
import { Container } from "./container";

export function AboutIntro() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6 lg:col-start-7">
          <ClipReveal direction="right" className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
            <Image
              src={homeAboutImage.src}
              alt={homeAboutImage.alt}
              fill
              quality={95}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </ClipReveal>
          <Reveal
            delay={0.3}
            className="relative mt-[-3rem] ml-6 w-fit max-w-[14rem] border border-line bg-surface p-5 shadow-[0_18px_40px_-22px_rgba(37,33,38,0.25)] sm:mt-[-4rem] sm:ml-10"
          >
            <span className="font-display text-4xl font-medium leading-none text-primary">{getYearsActive()}</span>
            <p className="mt-1.5 text-xs leading-snug text-text-muted">
              years since {trust.founded}, still showing up.
            </p>
          </Reveal>
        </div>

        <Reveal y={24} className="flex flex-col gap-6 lg:col-span-6 lg:col-start-1 lg:row-start-1">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">About Kamala Trust</p>
          <h2 className="font-display max-w-md text-4xl font-medium leading-[1.1] text-text sm:text-5xl">
            {getYearsActive()} years of {trust.tagline.toLowerCase()}.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-text-muted">
            {trust.shortName} has worked quietly and consistently since {trust.founded}, a {trust.orgType.toLowerCase()},
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
