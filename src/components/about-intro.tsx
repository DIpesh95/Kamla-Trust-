import Link from "next/link";
import Image from "next/image";
import { trust } from "@/content/trust";
import { getYearsActive } from "@/content/stats";
import { homeAboutImage } from "@/content/media";
import { Reveal } from "./motion";
import { Container } from "./container";

export function AboutIntro() {
  return (
    <section className="bg-surface py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:order-2">
          <Image
            src={homeAboutImage.src}
            alt={homeAboutImage.alt}
            fill
            quality={95}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </Reveal>

        <Reveal y={24} className="flex flex-col gap-6 lg:order-1">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.28em] text-primary">About Kamala Trust</p>
          <h2 className="font-display max-w-md text-4xl font-medium italic leading-[1.1] text-text sm:text-5xl">
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
