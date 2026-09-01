export function PageHero({
  eyebrow,
  title,
  dek,
}: {
  eyebrow: string;
  title: string;
  dek?: string;
}) {
  return (
    <section className="border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-16 sm:py-20">
        <p className="font-data text-xs uppercase tracking-[0.14em] text-navy">{eyebrow}</p>
        <h1 className="font-display max-w-2xl text-3xl font-medium text-ink sm:text-5xl">{title}</h1>
        {dek ? <p className="max-w-2xl text-lg text-ink-soft">{dek}</p> : null}
      </div>
    </section>
  );
}
