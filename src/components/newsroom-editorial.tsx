import { newsroom } from "@/content/newsroom";
import type { PressItem } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";
import Image from "next/image";

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

export function NewsroomEditorial({ limit }: { limit?: number }) {
  if (limit) {
    const items = newsroom.slice(0, limit);
    return (
      <div className="flex flex-col">
        {items.map((item) => (
          <Row key={item.title} item={item} />
        ))}
      </div>
    );
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
