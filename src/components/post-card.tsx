import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { BlogPost } from "@/lib/types"

const defaultThumb =
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"

const PostCard: React.FC<BlogPost> = ({ slug, frontmatter, readingTime }) => (
  <Link
    href={`/blog/${slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition hover:-translate-y-0.5 hover:border-brand-500 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div className="relative h-52 w-full bg-white">
      <Image
        src={frontmatter.thumb || defaultThumb}
        alt={frontmatter.title || slug}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
    </div>
    <div className="flex-1 flex flex-col gap-2 p-5">
      <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-brand-600 dark:text-brand-300">
        {frontmatter.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-brand-200 px-2 py-0.5 dark:border-brand-800">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="font-heading text-2xl tracking-tight text-zinc-900 dark:text-zinc-100">{frontmatter.title}</h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{frontmatter.excerpt}</p>
      <p className="mt-auto text-xs text-zinc-500 dark:text-zinc-400">
        {frontmatter.date ? format(parseISO(frontmatter.date), "PPP") : ""} · {readingTime.text}
      </p>
    </div>
  </Link>
)

export default PostCard
