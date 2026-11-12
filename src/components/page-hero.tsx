import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  dek,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  dek?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="border-b border-line bg-soft-bg">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 pb-16 pt-32 sm:pb-20 sm:pt-40">
        {breadcrumb?.length ? (
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-text">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="font-display max-w-2xl text-4xl font-medium italic text-text sm:text-6xl">{title}</h1>
        {dek ? <p className="max-w-2xl text-lg text-text-muted">{dek}</p> : null}
      </div>
    </section>
  );
}
