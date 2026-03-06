import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import mdxComponents from "@/components/mdx-components"
import { getAllBlogPosts, getAllBlogSlugs, getBlogPostBySlug, normalizeMdxForRuntime } from "@/lib/blog"

interface BlogPostRouteProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogPostRouteProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.frontmatter.title || slug,
    description: post.frontmatter.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostRouteProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const posts = getAllBlogPosts()
  const currentIndex = posts.findIndex((item) => item.slug === slug)
  if (currentIndex < 0) {
    notFound()
  }

  const previousPost = posts[(currentIndex - 1 + posts.length) % posts.length]
  const nextPost = posts[(currentIndex + 1) % posts.length]
  const runtimeContent = normalizeMdxForRuntime(post.content)

  return (
    <article className="mx-auto w-full max-w-4xl px-4 pb-8 pt-12 md:px-8 md:pb-12 md:pt-16">
      <header className="mb-10 border-b border-zinc-200/80 pb-8 dark:border-zinc-800/80">
        <h1 className="font-heading text-5xl leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl">
          {post.frontmatter.title}
        </h1>
        <p className="mt-5 text-base text-zinc-600 dark:text-zinc-400">
          {post.frontmatter.date ? format(parseISO(post.frontmatter.date), "PPP") : ""} · {post.readingTime.text}
        </p>
      </header>
      <div className="mdx-content">
        <MDXRemote
          source={runtimeContent}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </div>
      <nav className="mt-4 pt-1" aria-label="Blog post navigation">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={`/blog/${previousPost.slug}`}
            className="inline-flex min-w-0 items-center gap-2 rounded-full border border-zinc-300/80 px-4 py-2 text-sm text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <span aria-hidden="true">←</span>
            <span className="sm:hidden">Previous</span>
            <span className="hidden truncate sm:inline">Previous: {previousPost.frontmatter.title || previousPost.slug}</span>
          </Link>
          <Link
            href={`/blog/${nextPost.slug}`}
            className="inline-flex min-w-0 items-center gap-2 rounded-full border border-zinc-300/80 px-4 py-2 text-sm text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <span className="sm:hidden">Next</span>
            <span className="hidden truncate sm:inline">Next: {nextPost.frontmatter.title || nextPost.slug}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </article>
  )
}
