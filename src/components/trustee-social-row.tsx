import type { Trustee } from "@/content/types";
import { isPlaceholder } from "@/content/types";
import { WebsiteIcon, InstagramIcon, LinkedinIcon } from "./social-icons";

const entries: { key: keyof NonNullable<Trustee["socialLinks"]>; label: string; Icon: typeof WebsiteIcon }[] = [
  { key: "website", label: "Official website", Icon: WebsiteIcon },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon },
];

export function TrusteeSocialRow({ trustee, className = "" }: { trustee: Trustee; className?: string }) {
  const links = trustee.socialLinks;
  if (!links) return null;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {entries.map(({ key, label, Icon }) => {
        const value = links[key];
        if (!value) return null;
        if (isPlaceholder(value)) {
          return (
            <span
              key={key}
              title={`${label}: ${value.note}`}
              aria-label={`${label} (pending verification)`}
              className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-line text-text-muted/50"
            >
              <Icon className="h-4 w-4" />
            </span>
          );
        }
        return (
          <a
            key={key}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-text-muted transition-colors hover:border-primary hover:text-primary-strong"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
