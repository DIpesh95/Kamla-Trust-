import Link from "next/link";

export function CTASection({
  title,
  dek,
  primary,
  secondary,
}: {
  title: string;
  dek: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="bg-text">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 h-1 w-10 rounded-full bg-secondary" aria-hidden="true" />
          <h2 className="font-display text-2xl font-medium text-surface sm:text-3xl">{title}</h2>
          <p className="mt-2 text-surface/70">{dek}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={primary.href}
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="rounded-full border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:border-surface"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
