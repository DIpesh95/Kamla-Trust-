import Image from "next/image";
import { eventGallery } from "@/content/media";

export function EventGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {eventGallery.map((photo) => (
        <figure key={photo.src} className="group relative aspect-square overflow-hidden rounded-sm bg-soft-bg">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            quality={92}
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
