import { getAllBlogPosts } from "@/lib/blog"

export const runtime = "nodejs"
export const revalidate = 3600

const defaultSiteUrl = "https://www.devillers.nl"
const channelTitle = "Martin Devillers Blog"
const channelDescription = "Engineering notes, project stories, and technical write-ups by Martin Devillers."

const getSiteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl).replace(/\/$/, "")

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")

const toRssDate = (value?: string): string => {
  if (!value) {
    return new Date().toUTCString()
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString()
}

export function GET() {
  const siteUrl = getSiteUrl()
  const posts = getAllBlogPosts()
  const lastBuildDate = toRssDate(posts[0]?.frontmatter.date)

  const items = posts
    .map((post) => {
      const title = escapeXml(post.frontmatter.title || post.slug)
      const description = escapeXml(post.frontmatter.excerpt || "")
      const link = `${siteUrl}/blog/${post.slug}`
      const pubDate = toRssDate(post.frontmatter.date)

      return [
        "    <item>",
        `      <title>${title}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description>${description}</description>`,
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(channelDescription)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
