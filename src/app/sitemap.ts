import type { MetadataRoute } from "next"
import { getAllBlogSlugs } from "@/lib/blog"

const workSlugs = [
  "coffeeseed",
  "dedicon",
  "dpg-media",
  "infosupport",
  "millennium",
  "ov-chipkaart",
  "pge",
  "screenconsult",
  "t-mobile",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devillers.nl"
  const now = new Date()

  const staticRoutes = ["", "/about", "/blog", "/work"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }))

  const blogRoutes = getAllBlogSlugs().map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const projectRoutes = workSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
