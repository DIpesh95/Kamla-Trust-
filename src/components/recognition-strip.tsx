import { newsroom } from "@/content/newsroom";

export function RecognitionStrip() {
  const awards = newsroom.filter((item) => item.kind === "Recognition").slice(0, 6);

  return (
    <div className="border-b border-line bg-surface py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="shrink-0 font-sans text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Recognised by
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {awards.map((award) => (
              <span key={award.title} className="text-sm font-medium text-text-muted">
                {award.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
