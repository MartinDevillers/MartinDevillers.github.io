/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from "mdx/types"
import Prism from "prismjs"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-java"
import "prismjs/components/prism-json"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-typescript"
import { Children, isValidElement } from "react"
import { cn } from "@/lib/cn"

interface BaseProps {
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

interface LinkProps extends BaseProps {
  href?: string
}

interface SimpleGridProps extends BaseProps {
  minChildWidth?: string
}

interface CodeElementProps {
  className?: string
  children?: React.ReactNode
}

const LANGUAGE_ALIASES: Record<string, string> = {
  csharp: "csharp",
  "c#": "csharp",
  console: "bash",
  shell: "bash",
  sh: "bash",
  terminal: "bash",
  ts: "typescript",
  tsx: "tsx",
  xml: "markup",
}

const escapeHtml = (value: string): string =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")

const flattenText = (node: React.ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((child) => flattenText(child)).join("")
  }

  if (isValidElement<CodeElementProps>(node)) {
    return flattenText(node.props.children)
  }

  return ""
}

const getLanguageFromClassName = (className?: string): string | null => {
  if (!className) {
    return null
  }

  const match = className.match(/language-([A-Za-z0-9#+-]+)/)
  if (!match?.[1]) {
    return null
  }

  const rawLanguage = match[1].toLowerCase()
  return LANGUAGE_ALIASES[rawLanguage] || rawLanguage
}

export const MdxText: React.FC<BaseProps> = ({ children, className }) => (
  <p className={cn("mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300", className)}>{children}</p>
)

export const MdxLink: React.FC<LinkProps> = ({ children, href, className }) => (
  <a
    href={href}
    className={cn("text-brand-700 underline decoration-brand-300 underline-offset-4 hover:text-brand-500 dark:text-brand-300", className)}
    target={href?.startsWith("http") ? "_blank" : undefined}
    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
  >
    {children}
  </a>
)

export const MdxHeading1: React.FC<BaseProps> = ({ children, className }) => (
  <h2 className={cn("mb-5 mt-12 font-heading text-3xl tracking-tight text-zinc-900 dark:text-zinc-100", className)}>{children}</h2>
)

export const MdxHeading2: React.FC<BaseProps> = ({ children, className }) => (
  <h3 className={cn("mb-4 mt-10 font-heading text-2xl tracking-tight text-zinc-900 dark:text-zinc-100", className)}>{children}</h3>
)

export const MdxHeading3: React.FC<BaseProps> = ({ children, className }) => (
  <h4 className={cn("mb-4 mt-8 font-heading text-xl tracking-tight text-zinc-900 dark:text-zinc-100", className)}>{children}</h4>
)

export const MdxCenterQuote: React.FC<BaseProps> = ({ children, className }) => (
  <p className={cn("my-8 text-center text-lg italic text-zinc-600 dark:text-zinc-300", className)}>{children}</p>
)

export const MdxBlockQuote: React.FC<BaseProps> = ({ children, className }) => (
  <blockquote className={cn("mb-6 border-l-4 border-brand-500 pl-4 italic text-zinc-700 dark:text-zinc-300", className)}>{children}</blockquote>
)

export const MdxUnorderedList: React.FC<BaseProps> = ({ children, className }) => {
  const hasTrophyItems = Children.toArray(children).some((child) => isValidElement(child) && child.type === MdxListItemTrophy)

  return (
    <ul
      className={cn(
        "mb-6 space-y-2 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300",
        hasTrophyItems ? "list-none pl-0" : "list-disc pl-6",
        className
      )}
    >
      {children}
    </ul>
  )
}

export const MdxOrderedList: React.FC<BaseProps> = ({ children, className }) => (
  <ol className={cn("mb-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300", className)}>{children}</ol>
)

export const MdxListItem: React.FC<BaseProps> = ({ children, className }) => <li className={className}>{children}</li>

export const MdxListItemTrophy: React.FC<BaseProps> = ({ children, className }) => (
  <li className={cn("relative list-none pl-8", className)}>
    <span className="absolute left-0 top-1 text-brand-600 dark:text-brand-300">🏆</span>
    {children}
  </li>
)

export const MdxImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ className, alt, ...props }) => (
  <img
    className={cn("mb-6 mt-4 w-full rounded-xl border border-zinc-200/80 dark:border-zinc-800/80", className)}
    alt={alt || ""}
    {...props}
  />
)

const MdxCodeBlock: React.FC<React.HTMLAttributes<HTMLPreElement>> = ({ className, children, ...props }) => {
  const codeNode = isValidElement<CodeElementProps>(children) ? children : null
  const rawCode = flattenText(codeNode?.props.children ?? children)
  const parsedLanguage = getLanguageFromClassName(codeNode?.props.className)
  const language = parsedLanguage || "text"
  const grammar = parsedLanguage ? Prism.languages[language] : undefined
  const highlighted = grammar ? Prism.highlight(rawCode, grammar, language) : escapeHtml(rawCode)

  return (
    <pre
      className={cn(
        "mb-6 overflow-x-auto rounded-xl border border-zinc-200/80 bg-zinc-100 p-4 font-mono text-sm leading-relaxed dark:border-zinc-800/80 dark:bg-zinc-900",
        className
      )}
      {...props}
    >
      <code className={cn("language-" + language, codeNode?.props.className)} dangerouslySetInnerHTML={{ __html: highlighted }} />
    </pre>
  )
}

const MdxInlineCode: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, children, ...props }) => {
  if (className?.includes("language-")) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  return (
    <code className={cn("rounded bg-zinc-100 px-1.5 py-0.5 text-sm dark:bg-zinc-900", className)} {...props}>
      {children}
    </code>
  )
}

const SimpleGrid: React.FC<SimpleGridProps> = ({ children }) => <div className="mb-6 grid gap-4 md:grid-cols-2">{children}</div>

const mdxComponents: MDXComponents = {
  p: MdxText,
  a: MdxLink,
  h1: MdxHeading1,
  h2: MdxHeading2,
  h3: MdxHeading3,
  h4: MdxCenterQuote,
  blockquote: MdxBlockQuote,
  ul: MdxUnorderedList,
  ol: MdxOrderedList,
  li: MdxListItem,
  img: MdxImage,
  pre: MdxCodeBlock,
  code: MdxInlineCode,
  SimpleGrid,
}

export default mdxComponents
