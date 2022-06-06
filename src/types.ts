import { ReadTimeResults } from "reading-time"

export interface Post {
  frontMatter: FrontMatter
  slug: string
  readingTime: ReadTimeResults
}

export interface FrontMatter {
  layout?: string
  title?: string
  comments?: string
  permalink?: string
  excerpt?: string
  lang?: string
  date?: string
  thumb?: string
  tags?: string[]
}

export interface Project {
  slug: string
  name: string
  role: string
  client: string
  date: string
  description: string
  thumb: string
  icon: string
  active?: boolean
}
