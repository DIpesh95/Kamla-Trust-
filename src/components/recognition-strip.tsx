import { newsroom } from "@/content/newsroom";

export function RecognitionStrip() {
  const awards = newsroom.filter((item) => item.kind === "Award").slice(0, 6);

  return (
    <div className="border-y border-line bg-surface py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-data shrink-0 text-xs uppercase tracking-[0.1em] text-ink-soft">
            Recognised by
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {awards.map((award) => (
              <span key={award.title} className="text-sm font-medium text-ink-soft">
                {award.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
