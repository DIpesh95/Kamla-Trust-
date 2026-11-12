const icons: Record<string, React.ReactNode> = {
  education: (
    <>
      <path d="M4 10L20 5l16 5-16 5-16-5Z" />
      <path d="M9 13.5V21c0 1.5 4 3.5 11 3.5s11-2 11-3.5v-7.5" />
      <path d="M26 11.5V19" />
    </>
  ),
  healthcare: (
    <>
      <path d="M20 27S7 19.5 7 11.8C7 7.6 10.3 5 13.8 5c2.4 0 4.7 1.3 6.2 3.6C21.5 6.3 23.8 5 26.2 5 29.7 5 33 7.6 33 11.8 33 19.5 20 27 20 27Z" />
      <path d="M13 15h3.2l1.8-3 2.4 6 1.8-3H27" />
    </>
  ),
  "women-and-girl-child": (
    <>
      <circle cx="14" cy="10" r="4.2" />
      <path d="M14 14.2V23M9.5 18h9" />
      <circle cx="25" cy="15" r="3.2" />
      <path d="M25 18.2v6.8M22 22h6" />
    </>
  ),
  "rural-livelihoods-environment": (
    <>
      <path d="M20 29V15" />
      <path d="M20 15C20 7 27 6 29 6c0 6-3 11-9 11Z" />
      <path d="M20 19c0-6-6-8-9-8 0 5.5 4 9.5 9 9.5" />
    </>
  ),
  "disaster-relief-civic-recognition": (
    <>
      <path d="M20 6 32 10v9c0 8-6 12.5-12 15-6-2.5-12-7-12-15v-9Z" />
      <path d="M15 20l3.5 3.5L26 16" />
    </>
  ),
};

export function PillarIcon({ slug, className = "" }: { slug: string; className?: string }) {
  const icon = icons[slug];
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 40 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}
