import { newsroom } from "@/content/newsroom";
import { isPlaceholder } from "@/content/types";

export function RecognitionStrip() {
  const awards = newsroom.filter((item) => item.kind === "Recognition").slice(0, 6);

  return (
    <div className="border-t border-primary bg-text py-9">
      <div className="mx-auto w-full max-w-[1320px] px-[22px] sm:px-10 lg:px-[60px]">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-light-pink">Recognised by</p>
        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {awards.map((award) => (
            <div key={award.title} className="flex flex-col gap-2 border-l border-surface/15 pl-4">
              <span className="text-sm leading-snug text-surface/80">{award.title}</span>
              {isPlaceholder(award.date) ? (
                <span className="inline-flex w-fit items-center bg-light-pink px-2 py-[3px] text-[10.5px] font-semibold uppercase tracking-[0.04em] text-primary-strong">
                  {award.date.note}
                </span>
              ) : (
                <span className="text-xs text-surface/50">{award.date}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
