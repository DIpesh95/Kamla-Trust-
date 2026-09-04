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
    <section className="bg-brand-strong">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="mb-3 h-1 w-10 rounded-full bg-gold" aria-hidden="true" />
          <h2 className="font-display text-2xl font-medium text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 text-white/75">{dek}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link
            href={primary.href}
            className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-navy-strong transition-opacity hover:opacity-90"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
