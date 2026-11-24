import Image from "next/image";
import { eventGallery } from "@/content/media";
import { RevealGroup, RevealItem } from "./motion";

/**
 * Full photographic masonry using all 6 verified event photos (no new imagery invented),
 * dense-packed into a clean 4-column bento rhythm with no leftover gaps.
 */
export function MomentsGallery() {
  const [a, b, c, d, e, f] = eventGallery;

  return (
    <RevealGroup
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:[grid-auto-flow:dense] sm:auto-rows-[15rem] sm:gap-4"
      stagger={0.08}
    >
      <RevealItem className="col-span-2 row-span-2">
        <Photo photo={a} className="aspect-[4/5] sm:aspect-auto sm:h-full" />
      </RevealItem>
      <RevealItem className="col-span-2">
        <Photo photo={b} className="aspect-[16/10] sm:aspect-auto sm:h-full" />
      </RevealItem>
      <RevealItem>
        <Photo photo={c} className="aspect-square sm:aspect-auto sm:h-full" />
      </RevealItem>
      <RevealItem>
        <Photo photo={d} className="aspect-square sm:aspect-auto sm:h-full" />
      </RevealItem>
      <RevealItem className="col-span-2">
        <Photo photo={e} className="aspect-[16/10] sm:aspect-auto sm:h-full" />
      </RevealItem>
      <RevealItem className="col-span-2">
        <Photo photo={f} className="aspect-[16/10] sm:aspect-auto sm:h-full" />
      </RevealItem>
    </RevealGroup>
  );
}

function Photo({
  photo,
  className = "",
}: {
  photo: (typeof eventGallery)[number];
  className?: string;
}) {
  return (
    <figure className={`group relative w-full overflow-hidden rounded-sm bg-soft-bg ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        quality={92}
        sizes="(min-width: 640px) 45vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/0 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-4 text-sm font-medium leading-snug text-surface transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-5">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
