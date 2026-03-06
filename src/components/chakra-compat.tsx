import { cn } from "@/lib/cn"

type AnyProps = Record<string, unknown> & { children?: React.ReactNode; className?: string }

type Breakpoint = "base" | "sm" | "md" | "lg"

const gridBaseMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
}

const gridBpMap: Record<Exclude<Breakpoint, "base">, Record<number, string>> = {
  sm: { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" },
  md: { 1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" },
  lg: { 1: "lg:grid-cols-1", 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" },
}

const resolveGridCols = (columns: unknown): string => {
  if (Array.isArray(columns)) {
    const [, sm, md, lg] = columns
    return cn(
      "grid-cols-1",
      typeof sm === "number" ? gridBpMap.sm[sm] : "",
      typeof md === "number" ? gridBpMap.md[md] : "",
      typeof lg === "number" ? gridBpMap.lg[lg] : ""
    )
  }

  if (typeof columns === "number") {
    return gridBaseMap[columns] || "grid-cols-1"
  }

  if (columns && typeof columns === "object") {
    const record = columns as Partial<Record<Breakpoint, number>>
    return cn(
      record.base ? gridBaseMap[record.base] : "grid-cols-1",
      record.sm ? gridBpMap.sm[record.sm] : "",
      record.md ? gridBpMap.md[record.md] : "",
      record.lg ? gridBpMap.lg[record.lg] : ""
    )
  }

  return "grid-cols-1"
}

export const useColorModeValue = <T,>(light: T, dark?: T): T => {
  void dark
  return light
}

export const Box: React.FC<AnyProps & { as?: React.ElementType }> = ({ as, children, className }) => {
  const Tag = as || "div"
  return <Tag className={className}>{children}</Tag>
}

export const Heading: React.FC<AnyProps & { as?: React.ElementType }> = ({ as, children, className }) => {
  const Tag = as || "h2"
  const sizeClass =
    Tag === "h1"
      ? "text-4xl md:text-5xl"
      : Tag === "h2"
        ? "text-3xl md:text-4xl"
        : Tag === "h3"
          ? "text-2xl md:text-3xl"
          : "text-xl md:text-2xl"

  return (
    <Tag className={cn("font-heading tracking-tight text-zinc-900 dark:text-zinc-100", sizeClass, className)}>
      {children}
    </Tag>
  )
}

export const SimpleGrid: React.FC<AnyProps & { columns?: unknown; templateColumns?: unknown }> = ({
  columns,
  templateColumns,
  children,
  className,
}) => {
  const templateClass =
    Array.isArray(templateColumns) && typeof templateColumns[2] === "string" ? "md:grid-cols-2" : ""

  return <div className={cn("grid gap-6", resolveGridCols(columns), templateClass, className)}>{children}</div>
}

export const AspectRatio: React.FC<AnyProps & { ratio?: number }> = ({ ratio = 16 / 9, children, className }) => (
  <div className={cn("relative my-6 w-full overflow-hidden rounded-xl", className)} style={{ aspectRatio: ratio }}>
    <div className="h-full w-full [&>*]:h-full [&>*]:w-full">{children}</div>
  </div>
)

export const Stat: React.FC<AnyProps> = ({ children, className }) => (
  <div className={cn("rounded-xl border border-zinc-300/80 p-5 dark:border-zinc-700/80", className)}>{children}</div>
)

export const StatLabel: React.FC<AnyProps> = ({ children, className }) => (
  <p className={cn("text-sm font-medium text-zinc-500 dark:text-zinc-400", className)}>{children}</p>
)

export const StatNumber: React.FC<AnyProps> = ({ children, className }) => (
  <p className={cn("mt-1 text-2xl font-semibold text-zinc-900 dark:text-zinc-100", className)}>{children}</p>
)

export const StatHelpText: React.FC<AnyProps> = ({ children, className }) => (
  <p className={cn("mt-1 text-sm text-zinc-600 dark:text-zinc-300", className)}>{children}</p>
)

export const StatArrow: React.FC<{ type: "increase" | "decrease" }> = ({ type }) => (
  <span className={cn("mr-1", type === "increase" ? "text-emerald-500" : "text-red-500")}>{type === "increase" ? "↑" : "↓"}</span>
)
