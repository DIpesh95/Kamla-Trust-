/** Placeholder mark until the trust supplies their vector logo — a simple four-petal motif in the brand rose. */
export function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.6">
        <path d="M16 16C16 10 12 6 16 3C20 6 16 10 16 16Z" />
        <path d="M16 16C22 16 26 12 29 16C26 20 22 16 16 16Z" />
        <path d="M16 16C16 22 20 26 16 29C12 26 16 22 16 16Z" />
        <path d="M16 16C10 16 6 20 3 16C6 12 10 16 16 16Z" />
      </g>
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}
