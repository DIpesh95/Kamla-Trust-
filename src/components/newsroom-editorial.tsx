import Link from "next/link";
import Image from "next/image";
import { newsroom } from "@/content/newsroom";
import type { PressItem } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";

const categories: PressItem["kind"][] = ["Press", "Recognition", "Event", "Community"];

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function KindBadge({ kind }: { kind: PressItem["kind"] }) {
  return (
    <span className="absolute left-3 top-3 z-10 rounded-full bg-text/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-surface">
      {kind}
    </span>
  );
}

function RibbonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="12" r="7.2" />
      <path d="M11.3 18.2 9 27l7-3.2 7 3.2-2.3-8.8" />
    </svg>
  );
}

function Card({ item }: { item: PressItem }) {
  const id = slugify(item.title);
  return (
    <article id={id} className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-soft-bg">
        <KindBadge kind={item.kind} />
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            quality={92}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-soft-bg to-secondary/10">
            <RibbonIcon className="h-10 w-10 text-primary/50" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Fact value={item.date} className="text-xs font-medium uppercase tracking-[0.08em] text-text-muted" />
        <h4 className="font-display text-lg font-medium leading-snug text-text">{item.title}</h4>
        <p className="flex-1 text-sm leading-relaxed text-text-muted">{item.description}</p>
        <Link
          href={`/newsroom#${id}`}
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-primary-strong"
        >
          Read more
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}

export function NewsroomEditorial({ limit }: { limit?: number }) {
  if (limit) {
    const items = newsroom.slice(0, limit);
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.title} item={item} />
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
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="font-display text-2xl italic text-primary">{cat}</h3>
              <span className="text-xs uppercase tracking-[0.1em] text-text-muted">{items.length} items</span>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
