export interface BlogFrontmatter {
  layout?: string
  title?: string
  comments?: boolean | string
  permalink?: string
  excerpt?: string
  lang?: string
  date?: string
  thumb?: string
  tags?: string[]
}

export interface BlogPost {
  slug: string
  frontmatter: BlogFrontmatter
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  content: string
}

export interface WorkProjectMeta {
  client: string
  logo: string
  role: string
  date: string
  location: string
  country: string
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
