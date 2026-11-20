import { newsroom } from "@/content/newsroom";
import type { PressItem } from "@/content/types";
import { isPlaceholder } from "@/content/types";
import { Fact } from "./fact";
import { FilmFrame } from "./film-frame";
import { ClipReveal } from "./clip-reveal";
import { Reveal } from "./motion";

const categories: PressItem["kind"][] = ["Press", "Recognition", "Event", "Community"];

function ArticleLink({ item }: { item: PressItem }) {
  if (!item.articleUrl || isPlaceholder(item.articleUrl)) return null;
  return (
    <a
      href={item.articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-primary-strong"
    >
      Read article
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function FeaturedCard({ item }: { item: PressItem }) {
  return (
    <ClipReveal className="group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-sm bg-film-black sm:min-h-[400px]">
      {item.image ? (
        <FilmFrame src={item.image.src} alt={item.image.alt} sizes="100vw" className="absolute inset-0" />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-film-black via-primary-strong/30 to-film-black" />
      )}
      <div className="relative flex flex-col gap-2 p-7 sm:p-10">
        {item.publication ? (
          <span className="w-fit rounded-full bg-secondary/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-text">
            {item.publication}
          </span>
        ) : null}
        <h3 className="font-display text-2xl font-semibold text-surface sm:text-3xl">{item.title}</h3>
        <p className="max-w-xl text-sm text-surface/80 sm:text-base">{item.description}</p>
        <div className="mt-1 flex flex-wrap items-center gap-4">
          <Fact value={item.date} className="text-xs uppercase tracking-[0.08em] text-surface/60" />
          <ArticleLink item={item} />
        </div>
      </div>
    </ClipReveal>
  );
}

function GridCard({ item }: { item: PressItem }) {
  return (
    <article className="flex flex-col gap-3 overflow-hidden rounded-sm border border-line bg-surface">
      <div className="relative aspect-[16/10] w-full bg-soft-bg">
        {item.image ? (
          <FilmFrame src={item.image.src} alt={item.image.alt} sizes="(min-width: 1024px) 24vw, 100vw" className="absolute inset-0" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-5 pb-5">
        {item.publication ? (
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
            {item.publication}
          </span>
        ) : null}
        <h4 className="font-display text-lg font-medium text-text">{item.title}</h4>
        <p className="text-sm leading-relaxed text-text-muted">{item.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
          <Fact value={item.date} className="text-xs uppercase tracking-[0.08em] text-text-muted" />
          <ArticleLink item={item} />
        </div>
      </div>
    </article>
  );
}

/** Puts items with a confirmed publication (e.g. Navbharat Times) first, stable otherwise. */
function prioritise(items: PressItem[]): PressItem[] {
  return [...items].sort((a, b) => (b.publication ? 1 : 0) - (a.publication ? 1 : 0));
}

export function NewsroomEditorial({ limit }: { limit?: number }) {
  if (limit) {
    const items = prioritise(newsroom).slice(0, limit);
    const [featured, ...rest] = items;
    if (!featured) return null;
    return (
      <div className="flex flex-col gap-6">
        <FeaturedCard item={featured} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <GridCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-14">
      {categories.map((cat) => {
        const items = prioritise(newsroom.filter((i) => i.kind === cat));
        if (!items.length) return null;
        return (
          <Reveal key={cat}>
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="font-display text-2xl italic text-primary">{cat}</h3>
              <span className="timecode text-xs text-text-muted">{items.length} items</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <GridCard key={item.title} item={item} />
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
