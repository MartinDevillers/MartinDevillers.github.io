/** @type {import('next').NextConfig} */
import MDX from "@next/mdx"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "./plugins/remark-mdx-frontmatter-nextjs.mjs"
// import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import remarkGfm from "remark-gfm"
import rehypeMetaAsProperties from "./plugins/rehype-mdx-code-meta.mjs"
import fs from "fs"

const withMDX = MDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
    rehypePlugins: [rehypeMetaAsProperties],
    providerImportSource: "@mdx-js/react",
  },
})

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    domains: ["images.unsplash.com"],
  },
  redirects: async () => {
    const data = fs.readFileSync("redirects.csv").toLocaleString()
    const rows = data.split("\n")
    const redirects = rows.map((row) => {
      const columns = row.split(",")
      return {
        source: columns[0],
        destination: columns[1],
        permanent: false,
      }
    })
    return redirects
  },
}

export default withMDX(nextConfig)
