import Image from "next/image";
import { eventGallery } from "@/content/media";

/** Approved composition: one dominant feature (left) + two stacked slots (right) — a real,
 * disclosed-reuse photo on top and a single dashed-border pending slot below. Not a grid. */
export function EventGallery() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
      <div className="relative flex aspect-[3/2] w-full flex-col justify-end overflow-hidden sm:aspect-auto">
        <Image
          src={eventGallery.feature.src}
          alt={eventGallery.feature.alt}
          fill
          quality={92}
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[72%]"
          style={{ background: "linear-gradient(0deg, rgba(8,3,6,.94), rgba(8,3,6,0) 100%)" }}
        />
        <div className="relative flex flex-col gap-2.5 p-6 sm:p-7">
          <span className="inline-flex w-fit items-center border border-surface/55 px-3 py-[7px] text-[10.5px] font-semibold uppercase tracking-[0.12em] text-surface">
            {eventGallery.feature.tag}
          </span>
          <p className="max-w-md text-sm text-surface/80">{eventGallery.feature.caption}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:gap-5">
        <div className="relative flex aspect-[2/1] w-full flex-col justify-end overflow-hidden">
          <Image
            src={eventGallery.supporting.src}
            alt={eventGallery.supporting.alt}
            fill
            quality={92}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[72%]"
            style={{ background: "linear-gradient(0deg, rgba(8,3,6,.94), rgba(8,3,6,0) 100%)" }}
          />
          <p className="relative p-4 text-xs text-surface/85 sm:p-5">{eventGallery.supporting.caption}</p>
        </div>

        <div className="flex aspect-[2/1] w-full items-center justify-center border border-dashed border-surface/25 bg-text p-6 text-center">
          <p className="max-w-[26ch] text-xs text-surface/55">
            Additional gallery photography pending from the Trust&rsquo;s own archive
          </p>
        </div>
      </div>
    </div>
  );
}
