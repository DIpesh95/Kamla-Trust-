import type { HeadlineStat } from "@/content/types";

export function StatStrip({ stats }: { stats: HeadlineStat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-surface px-5 py-6 sm:px-6 sm:py-8">
          <dt className="order-2 mt-1 text-sm text-ink-soft">{stat.label}</dt>
          <dd className="font-display order-1 tabular-nums text-3xl font-medium text-teal sm:text-4xl">
            {stat.value}
          </dd>
          {stat.note ? <p className="mt-2 text-xs text-ink-soft/80">{stat.note}</p> : null}
        </div>
      ))}
    </dl>
  );
}
