import Image from "next/image";

export function Logomark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <Image
        src="/images/logo-mark.png"
        alt="Kamala Trust lotus mark"
        fill
        sizes="48px"
        className="object-contain"
      />
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return <span className={`font-display italic ${className}`}>Kamala Trust</span>;
}
