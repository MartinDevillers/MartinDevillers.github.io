import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"
import { BlogFrontmatter, BlogPost } from "@/lib/types"

const BLOG_DIR = path.join(process.cwd(), "src/content/blog")

export const getAllBlogPosts = (): BlogPost[] => {
  const filenames = fs.readdirSync(BLOG_DIR).filter((filename) => filename.endsWith(".mdx"))

  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const fullPath = path.join(BLOG_DIR, filename)
    const raw = fs.readFileSync(fullPath, "utf-8")
    const { data, content } = matter(raw)

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      readingTime: readingTime(content),
      content,
    }
  })

  posts.sort((a, b) => (b.frontmatter.date || "").localeCompare(a.frontmatter.date || ""))
  return posts
}

export const getAllBlogSlugs = (): string[] => getAllBlogPosts().map((post) => post.slug)

export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const raw = fs.readFileSync(fullPath, "utf-8")
  const { data, content } = matter(raw)

  return {
    slug,
    frontmatter: data as BlogFrontmatter,
    readingTime: readingTime(content),
    content,
  }
}

// Keeps MDX files byte-for-byte while allowing JSX-compatible attributes at render time.
export const normalizeMdxForRuntime = (content: string): string =>
  content
    .replace(/<div class=/g, "<div className=")
    .replace(/ frameborder=/g, " frameBorder=")
    .replace(/ allowfullscreen(?=[\s>])/g, " allowFullScreen")
