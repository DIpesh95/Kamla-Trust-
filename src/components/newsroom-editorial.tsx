import Image from "next/image";
import { newsroom } from "@/content/newsroom";
import type { PressItem } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";
import { GsapStagger, ClipReveal } from "./scroll-fx";

const categories: PressItem["kind"][] = ["Press", "Recognition", "Event", "Community"];

function Row({ item }: { item: PressItem }) {
  return (
    <article className="group flex items-center gap-5 border-t border-line py-5 first:border-t-0 sm:gap-8">
      <div className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-sm bg-soft-bg sm:block">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            quality={92}
            sizes="112px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-1">
          <h4 className="font-display text-lg font-medium text-text sm:text-xl">{item.title}</h4>
          <p className="max-w-xl text-sm leading-relaxed text-text-muted">{item.description}</p>
        </div>
        <Fact value={item.date} className="shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.08em] text-text-muted" />
      </div>
    </article>
  );
}

/** Homepage teaser: one dominant photographic feature, plus a run of compact supporting cards. */
function FeaturedLayout({ items }: { items: PressItem[] }) {
  const withPhoto = items.find((i) => i.image);
  const featured = withPhoto ?? items[0];
  const supporting = items.filter((i) => i !== featured);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <article className="group relative overflow-hidden rounded-sm">
        <ClipReveal direction="left" className="relative aspect-[16/10] w-full">
          {featured.image ? (
            <Image
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              quality={92}
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-text via-text to-primary-strong/70" />
          )}
        </ClipReveal>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-text/92 via-text/20 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7 sm:p-9">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            {featured.kind}
          </span>
          <h3 className="font-display text-2xl font-medium italic text-surface sm:text-3xl">{featured.title}</h3>
          <p className="max-w-md text-sm leading-relaxed text-surface/80">{featured.description}</p>
          <Fact value={featured.date} className="text-xs uppercase tracking-[0.1em] text-surface/60" />
        </div>
      </article>

      <GsapStagger className="flex flex-col gap-4" selector=":scope > article" y={22} stagger={0.1}>
        {supporting.slice(0, 3).map((item) => (
          <article
            key={item.title}
            className="group flex gap-4 rounded-sm border border-line bg-surface p-4 transition-colors hover:border-primary/40"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-soft-bg">
              {item.image ? (
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  quality={90}
                  sizes="80px"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-lg italic text-primary/50">{item.kind.slice(0, 2)}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-1 py-0.5">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                {item.kind}
              </span>
              <h4 className="font-display text-base font-medium leading-snug text-text">{item.title}</h4>
              <Fact value={item.date} className="text-[11px] uppercase tracking-[0.08em] text-text-muted" />
            </div>
          </article>
        ))}
      </GsapStagger>
    </div>
  );
}

export function NewsroomEditorial({ limit }: { limit?: number }) {
  if (limit) {
    const items = newsroom.slice(0, limit);
    return <FeaturedLayout items={items} />;
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
