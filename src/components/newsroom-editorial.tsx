import Image from "next/image";
import { newsroom } from "@/content/newsroom";
import type { PressItem } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";

const categories: PressItem["kind"][] = ["Press", "Recognition", "Event", "Community"];

function KindTag({ kind }: { kind: PressItem["kind"] }) {
  return (
    <span className="inline-flex w-fit items-center border border-primary px-3 py-[7px] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
      {kind}
    </span>
  );
}

/** Shared row treatment for the full `/newsroom` page (with description) and the homepage's
 * compact supporting rows (without one, matching the live homepage exactly). */
function Row({ item, showDescription = true }: { item: PressItem; showDescription?: boolean }) {
  return (
    <article className="flex items-start gap-5 border-t border-line py-5 first:border-t-0 sm:gap-8">
      {item.image ? (
        <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden sm:block">
          <Image src={item.image.src} alt={item.image.alt} fill quality={92} sizes="96px" className="object-cover" />
        </div>
      ) : null}
      <div className="w-28 shrink-0 pt-0.5 sm:w-32">
        <KindTag kind={item.kind} />
      </div>
      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="font-display text-lg font-medium text-text sm:text-xl">{item.title}</h4>
          {showDescription ? (
            <p className="max-w-xl text-sm leading-relaxed text-text-muted">{item.description}</p>
          ) : null}
        </div>
        <Fact value={item.date} className="shrink-0 text-xs uppercase tracking-[0.08em] text-text-muted sm:whitespace-nowrap" />
      </div>
    </article>
  );
}

/** Homepage featured card: image-led (matching the live site's actual treatment), not the
 * quote-led design this replaces. The featured item is always Lokmata Ahilyabai Holkar Mahila
 * Samman 2026, selected by exact title match per approved decision, not derived from kind or
 * image availability. */
function FeaturedCard({ item }: { item: PressItem }) {
  return (
    <Reveal className="grid grid-cols-1 overflow-hidden border border-line sm:grid-cols-[1fr_1fr]">
      {item.image ? (
        <div className="relative aspect-[16/10] w-full sm:aspect-auto">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            quality={92}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col justify-center gap-3 bg-surface p-6 sm:p-7">
        <span className="inline-flex w-fit items-center border border-primary px-3 py-[7px] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-primary">
          Featured &middot; {item.kind}
        </span>
        <h3 className="font-display text-2xl font-medium text-text sm:text-[28px]">{item.title}</h3>
        <p className="max-w-md text-sm leading-relaxed text-text-muted sm:text-base">{item.description}</p>
        <Fact value={item.date} className="text-xs text-text-muted" />
      </div>
    </Reveal>
  );
}

/**
 * Homepage treatment, matching the live site exactly: one featured item (Lokmata Ahilyabai
 * Holkar Mahila Samman 2026, by exact title, not derived) plus exactly three compact supporting
 * rows, in the live site's own order (Press, then Event, then Community) — no filter tabs, no
 * "Press releases" sub-listing: neither exists on the live site, confirmed by direct DOM
 * inspection before this rebuild.
 */
function FeaturedNewsroom() {
  const featured = newsroom.find((item) => item.title === "Lokmata Ahilyabai Holkar Mahila Samman 2026")!;
  const supportingTitles = [
    "“The Quiet Revolutionary”: Times Magazine profile",
    "Navbharat Times Utsav 2026",
    "Republic Day Celebration 2026",
  ];
  const supporting = supportingTitles.map((title) => newsroom.find((item) => item.title === title)!);

  return (
    <div className="flex flex-col gap-10">
      <FeaturedCard item={featured} />
      <div className="flex flex-col">
        {supporting.map((item) => (
          <Row key={item.title} item={item} showDescription={false} />
        ))}
      </div>
    </div>
  );
}

export function NewsroomEditorial({ featured }: { featured?: boolean }) {
  if (featured) {
    return <FeaturedNewsroom />;
  }

  return (
    <div className="flex flex-col gap-14">
      {categories.map((cat) => {
        const items = newsroom.filter((i) => i.kind === cat);
        if (!items.length) return null;
        return (
          <Reveal key={cat}>
            <div className="mb-2 flex items-baseline gap-4">
              <h3 className="font-display text-2xl italic text-primary">{cat}</h3>
              <span className="text-xs uppercase tracking-[0.1em] text-text-muted">{items.length} items</span>
            </div>
            <div className="flex flex-col">
              {items.map((item) => (
                <Row key={item.title} item={item} />
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
