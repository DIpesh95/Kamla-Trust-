import { annualDocumentation } from "@/content/documentation";
import { isPlaceholder } from "@/content/types";
import { Fact } from "./fact";
import { Reveal } from "./motion";

function DocumentIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 4h11l5 5v19a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M20 4v5h5" />
      <path d="M12 16h8M12 20h8M12 24h5" />
    </svg>
  );
}

export function AnnualDocumentation() {
  const doc = annualDocumentation;
  const titlePending = isPlaceholder(doc.title);

  return (
    <Reveal className="flex flex-col gap-6 rounded-sm border border-line bg-soft-bg p-7 sm:flex-row sm:items-center sm:gap-8 sm:p-10">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <DocumentIcon className="h-8 w-8 text-primary" />
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-primary">Our work, documented</p>
        <h3 className="font-display text-xl font-semibold text-text">
          <Fact value={doc.title} />
        </h3>
        <p className="text-sm leading-relaxed text-text-muted">
          <Fact value={doc.description} />
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap gap-3">
        {doc.file ? (
          <>
            <a
              href={doc.file.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-surface transition-colors hover:bg-primary-strong"
            >
              View {doc.file.label}
            </a>
            <a
              href={doc.file.href}
              download
              className="inline-flex items-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.04em] text-primary-strong transition-colors hover:bg-primary/10"
            >
              Download{doc.file.sizeLabel ? ` (${doc.file.sizeLabel})` : ""}
            </a>
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-warn/50 bg-warn/10 px-3 py-2 text-xs text-warn">
            {titlePending ? "Document pending upload" : "File pending upload"}
          </span>
        )}
      </div>
    </Reveal>
  );
}
