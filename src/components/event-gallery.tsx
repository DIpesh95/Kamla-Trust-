import { eventGallery } from "@/content/media";
import { FilmFrame } from "./film-frame";

export function EventGallery() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {eventGallery.map((photo) => (
        <figure key={photo.src} className="relative aspect-square overflow-hidden rounded-sm bg-soft-bg">
          <FilmFrame src={photo.src} alt={photo.alt} caption={photo.caption} sizes="(min-width: 640px) 33vw, 50vw" className="absolute inset-0" />
        </figure>
      ))}
    </div>
  );
}
