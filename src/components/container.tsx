import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-[22px] sm:px-10 lg:px-[60px] ${className}`}>{children}</div>
  );
}
