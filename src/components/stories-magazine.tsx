import { storySlots } from "@/content/stories";
import { PillarIcon } from "./pillar-icon";
import { RevealGroup, RevealItem } from "./motion";

const pillarSlugs: Record<string, string> = {
  "Women & Girl Child": "women-and-girl-child",
  Healthcare: "healthcare",
  Education: "education",
};

const gradients: Record<string, string> = {
  "women-and-girl-child": "linear-gradient(145deg, #5c1636 0%, #251f21 65%)",
  healthcare: "linear-gradient(140deg, #4a0f2e 0%, #251f21 65%)",
  education: "linear-gradient(135deg, #3a1420 0%, #251f21 60%)",
};

function StoryVisual({ pillar }: { pillar: string }) {
  const slug = pillarSlugs[pillar];
  return (
    <div
      className="relative flex aspect-[4/3] w-full flex-col items-center justify-center overflow-hidden rounded-sm"
      style={{ background: gradients[slug] ?? gradients.education }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 1px, transparent 1px, transparent 14px)",
        }}
      />
      {slug ? (
        <PillarIcon slug={slug} className="relative h-14 w-14 text-surface/30" />
      ) : null}
      <span className="relative mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-surface/60">
        Photo &amp; interview pending
      </span>
    </div>
  );
}

export function StoriesMagazine() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-7" stagger={0.1}>
      {storySlots.map((slot) => (
        <RevealItem key={slot.slug} className="group flex flex-col gap-5">
          <StoryVisual pillar={slot.pillar} />
          <div className="flex flex-col gap-3">
            <span className="w-fit rounded-full border border-primary/30 px-3 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
              {slot.pillar}
            </span>
            <h3 className="font-display text-3xl font-medium italic leading-tight text-text">{slot.title}</h3>
            <p className="text-base leading-relaxed text-text-muted">{slot.prompt}</p>
            <span className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-warn">
              Awaiting interview
            </span>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
