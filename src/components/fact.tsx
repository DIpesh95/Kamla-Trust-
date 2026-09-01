import { isPlaceholder, type Verified } from "@/content/types";

/** Renders a confirmed value normally, or a visibly flagged note when the trust hasn't supplied real data yet. */
export function Fact({ value, className = "" }: { value: Verified<string>; className?: string }) {
  if (isPlaceholder(value)) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-warn/50 bg-warn/10 px-2 py-0.5 text-[13px] text-warn ${className}`}
      >
        {value.note}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}
