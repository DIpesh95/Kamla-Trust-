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
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-6 px-[22px] py-14 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-[60px]">
        <div className="max-w-xl">
          <div className="mb-3 h-1 w-10 rounded-full bg-secondary" aria-hidden="true" />
          <h2 className="font-display text-2xl font-medium text-surface sm:text-3xl">{title}</h2>
          <p className="mt-2 text-surface/70">{dek}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={primary.href}
            className="bg-primary px-6 py-3 text-sm font-semibold text-surface transition-colors hover:bg-primary-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="border border-surface/30 px-6 py-3 text-sm font-semibold text-surface transition-colors hover:border-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
