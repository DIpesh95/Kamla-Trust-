import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MotionProvider } from "@/components/motion-provider";
import { siteUrl } from "@/lib/site";

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const serif = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Kamala Trust | Rising By Lifting Others",
    template: "%s | Kamala Trust",
  },
  description:
    "Kamala Ankibai Ghamandiram Gowani Trust, a Mumbai-based, women-led public charitable trust working in education, healthcare, women & child welfare, and rural livelihoods since 1969.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} h-full overflow-x-hidden antialiased`}>
      <body className="min-h-full flex flex-col overflow-x-hidden bg-ivory text-text">
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
