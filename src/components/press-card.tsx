import type { PressItem } from "@/content/types";
import { Fact } from "./fact";

const kindStyles: Record<PressItem["kind"], string> = {
  Press: "bg-rose-tint text-rose-strong",
  Award: "bg-bronze-tint text-bronze",
  Event: "bg-line text-ink-soft",
};

export function PressCard({ item }: { item: PressItem }) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${kindStyles[item.kind]}`}>
          {item.kind}
        </span>
        <Fact value={item.date} className="text-xs text-ink-soft" />
      </div>
      <h3 className="font-display mt-3 text-lg font-medium text-ink">{item.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.description}</p>
    </article>
  );
}
