import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { SubNav } from "@/components/sub-nav";
import { Container } from "@/components/container";
import { Reveal } from "@/components/motion";
import { trust } from "@/content/trust";
import { primaryNav } from "@/content/nav";

export const metadata: Metadata = {
  title: "Leadership",
  description: `The trustees leading ${trust.shortName}.`,
};

const aboutLinks = primaryNav.find((item) => item.label === "About Us")?.children ?? [];
const [lead, ...rest] = trust.trustees;

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Leadership" }]}
        eyebrow="About us"
        title="Leadership"
        dek="The trustees steering Kamala Trust’s work."
      />
      <SubNav links={aboutLinks} />

      <Container className="flex flex-col gap-20 py-16 sm:py-24">
        <Reveal className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-text">
            <span className="font-display text-[10rem] italic text-secondary/90">
              {lead.name.split(" ").filter((w) => /^[A-Za-z]/.test(w))[1]?.[0] ?? lead.name[0]}
            </span>
            <span className="absolute bottom-5 left-5 text-[10px] font-medium uppercase tracking-[0.18em] text-surface/40">
              Portrait pending
            </span>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">{lead.role}</p>
              <h2 className="mt-3 font-display text-4xl font-medium text-text sm:text-5xl">{lead.name}</h2>
            </div>
            <p className="font-display text-2xl italic leading-snug text-primary-strong">
              &ldquo;Leadership rooted in service.&rdquo;
            </p>
            <p className="max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">{lead.bio}</p>
            <div className="mt-2 flex flex-col gap-3 border-t border-line pt-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">Selected roles</p>
              <ul className="flex flex-col gap-2 text-sm text-text-muted">
                <li>Managing Director, Kamala Group of Industries</li>
                <li>National Patron, Bharat Vikas Parishad (Women&rsquo;s Wing)</li>
                <li>Trustee, {trust.legalName}</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {rest.length ? (
          <div className="flex flex-col gap-6 border-t border-line pt-14">
            <Reveal>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">Also on the board</p>
            </Reveal>
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((person, i) => (
                <Reveal key={person.name} delay={i * 0.08} className="rounded-sm border border-line bg-soft-bg p-7">
                  <p className="font-display text-xl font-medium text-text">{person.name}</p>
                  <p className="mt-1 text-sm font-medium text-primary-strong">{person.role}</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-muted">{person.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        <Reveal className="rounded-sm border border-dashed border-warn/50 bg-warn/5 p-6">
          <p className="text-sm font-semibold text-warn">Content gap</p>
          <p className="mt-1.5 max-w-2xl text-sm text-text-muted">
            The trust’s governing board may include additional trustees not named on the current site, and no
            portrait photography exists yet for either trustee. Confirm the full, current board list and arrange
            portraits before this page goes live.
          </p>
        </Reveal>
      </Container>
    </>
  );
}
