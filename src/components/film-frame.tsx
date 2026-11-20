"use client";

import { useId } from "react";
import Image from "next/image";

/**
 * The one photo treatment used everywhere on the site: film-grade color grading, a soft
 * vignette, a faint grain overlay, and an optional timecode-style caption row. This is what
 * turns a dozen real but visually inconsistent photographs into one cohesive "documentary film"
 * identity (the Archive Reel direction) instead of a pile of unrelated snapshots.
 */
export function FilmFrame({
  src,
  alt,
  reel,
  caption,
  sizes = "100vw",
  priority = false,
  quality = 92,
  objectPosition = "center 25%",
  className = "",
  grade = true,
  scanline = false,
}: {
  src: string;
  alt: string;
  /** Left-aligned timecode label, e.g. "REEL 02 · WOMEN'S EMPOWERMENT" */
  reel?: string;
  /** Right-aligned timecode label, e.g. a date or "EST. 1969" */
  caption?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  objectPosition?: string;
  className?: string;
  /** Set false for icon/placeholder slides where there's no real photo to grade. */
  grade?: boolean;
  scanline?: boolean;
}) {
  const filterId = useId();

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={quality}
        sizes={sizes}
        style={{ objectPosition }}
        className={`object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105 ${
          grade ? "film-grade" : ""
        }`}
      />
      {grade ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 film-vignette" />
          <svg aria-hidden="true" className="absolute inset-0 h-full w-full film-grain">
            <filter id={filterId}>
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#${filterId})`} />
          </svg>
        </>
      ) : null}
      {scanline ? (
        <div aria-hidden="true" className="film-scanline absolute inset-x-0 top-0 h-px opacity-60" />
      ) : null}
      {reel || caption ? (
        <div className="timecode absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 text-[10px] text-ivory/85 sm:p-4">
          {reel ? <span>{reel}</span> : <span />}
          {caption ? <span className="text-right">{caption}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
