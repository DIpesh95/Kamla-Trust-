import type { ReactNode } from "react";

/**
 * The "documentary chapter" heading used at the top of every major section: a huge,
 * translucent chapter number bleeding off the edge of the frame behind a timecode-style
 * eyebrow and an italic serif title. This is the single most repeated signature of the
 * Archive Reel direction, replacing the plain eyebrow+h2 pattern used everywhere before.
 */
export function ChapterHeading({
  number,
  eyebrow,
  title,
  dek,
  tone = "light",
  align = "left",
  className = "",
}: {
  number: string;
  eyebrow: string;
  title: ReactNode;
  dek?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "right";
  className?: string;
}) {
  const numeralColor = tone === "dark" ? "text-surface/[0.06]" : "text-text/[0.05]";
  const eyebrowColor = tone === "dark" ? "text-secondary" : "text-primary";
  const titleColor = tone === "dark" ? "text-surface" : "text-text";
  const dekColor = tone === "dark" ? "text-surface/70" : "text-text-muted";

  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-10 select-none font-display text-[9rem] font-bold italic leading-none sm:-top-16 sm:text-[14rem] ${numeralColor} ${
          align === "right" ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8"
        }`}
      >
        {number}
      </span>
      <div className="relative flex flex-col gap-4">
        <span className={`timecode text-[11px] font-semibold sm:text-xs ${eyebrowColor}`}>{eyebrow}</span>
        <h2 className={`font-display text-4xl font-bold italic leading-[1.05] sm:text-6xl ${titleColor}`}>
          {title}
        </h2>
        {dek ? <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${dekColor}`}>{dek}</p> : null}
      </div>
    </div>
  );
}
