const spines = [
  { width: 58, heightPct: 88, color: "var(--primary)" },
  { width: 42, heightPct: 100, color: "var(--text)" },
  { width: 66, heightPct: 72, color: "var(--primary-strong)" },
  { width: 38, heightPct: 92, color: "#8a4a5c" },
  { width: 50, heightPct: 80, color: "var(--text)" },
];

/** Shows the shape the showcase will take, spines not covers, until real titles exist. */
export function BookShelf() {
  return (
    <div className="flex h-[200px] items-end gap-2.5 border-b-[3px] border-text">
      {spines.map((s, i) => (
        <div
          key={i}
          className="flex items-end justify-center rounded-t-sm pb-3.5"
          style={{
            width: s.width,
            height: `${s.heightPct}%`,
            backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0, rgba(255,255,255,.05) 1px, transparent 1px, transparent 11px), ${s.color}`,
          }}
        >
          <span className="font-data text-[11px] text-surface/70" style={{ writingMode: "vertical-rl" }}>
            Vol. &mdash;
          </span>
        </div>
      ))}
    </div>
  );
}
