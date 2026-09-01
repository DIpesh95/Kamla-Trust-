export function SectionHeading({
  eyebrow,
  title,
  dek,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  dek?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {eyebrow ? (
        <p className="font-data text-xs uppercase tracking-[0.14em] text-navy">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">{title}</h2>
      {dek ? <p className="max-w-2xl text-base text-ink-soft">{dek}</p> : null}
    </div>
  );
}
