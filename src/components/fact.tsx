import { isPlaceholder, type Verified } from "@/content/types";

/** Renders a confirmed value normally, or a visibly flagged note when the trust hasn't supplied real data yet. */
export function Fact({ value, className = "" }: { value: Verified<string>; className?: string }) {
  if (isPlaceholder(value)) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md bg-light-pink px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-primary-strong ${className}`}
      >
        {value.note}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}
