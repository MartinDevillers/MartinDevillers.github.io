import fs from "fs"
import path from "path"
import matter from "gray-matter"
import calculateReadingTime from "reading-time"
import { Post } from "types"

const postsPath = path.join(process.cwd(), "src/pages/blog")

export const loadAllPosts = (): Post[] => {
  const files = fs.readdirSync(path.join(postsPath))
  const posts = files
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => {
      const markdownWithMeta = fs.readFileSync(path.join(postsPath, filename), "utf-8")
      const { data: frontMatter, content } = matter(markdownWithMeta)
      return {
        frontMatter,
        readingTime: calculateReadingTime(content),
        slug: filename.split(".")[0],
      }
    })
  posts.sort((x, y) => y.frontMatter.date.localeCompare(x.frontMatter.date))
  return posts
}
