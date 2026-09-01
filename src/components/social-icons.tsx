type IconProps = { className?: string };

export function FacebookIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7.2h2.4l.36-2.8h-2.76V9.2c0-.81.22-1.36 1.39-1.36h1.48V5.34C15.9 5.24 15.06 5.16 14.1 5.16c-2 0-3.37 1.22-3.37 3.46v1.93H8.32v2.8h2.41V21h2.77Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.5 8.1s-.2-1.5-.85-2.16c-.8-.86-1.7-.86-2.1-.91C15.7 4.8 12 4.8 12 4.8h-.02s-3.7 0-6.55.23c-.4.05-1.3.05-2.1.91C2.7 6.6 2.5 8.1 2.5 8.1S2.3 9.85 2.3 11.6v1.28c0 1.76.2 3.51.2 3.51s.2 1.5.85 2.16c.8.86 1.85.83 2.32.92 1.68.16 7.1.22 7.1.22s3.7 0 6.55-.23c.4-.05 1.3-.05 2.1-.92.65-.65.85-2.16.85-2.16s.2-1.75.2-3.5v-1.28c0-1.76-.2-3.51-.2-3.51ZM9.9 14.9V8.8l5.6 3.06-5.6 3.05Z" />
    </svg>
  );
}

export function XIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.9 10.6 20.4 3h-1.9l-5.6 6.6L8.4 3H3l6.8 9.7L3 21h1.9l5.9-7 4.8 7H21l-7.1-10.4Zm-2.1 2.5-.7-1L5.7 4.4h2.1l4.4 6.3.7 1 5.7 8.1h-2.1l-4.7-6.7Z" />
    </svg>
  );
}
