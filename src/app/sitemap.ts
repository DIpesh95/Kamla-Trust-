import type { MetadataRoute } from "next";
import { pillars } from "@/content/pillars";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/leadership",
    "/about/transparency",
    "/our-work",
    "/impact",
    "/stories",
    "/newsroom",
    "/get-involved/donate",
    "/get-involved/volunteer",
    "/get-involved/csr-partnership",
    "/get-involved/careers",
    "/contact",
  ];

  const pillarRoutes = pillars.map((pillar) => `/our-work/${pillar.slug}`);

  return [...staticRoutes, ...pillarRoutes].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
