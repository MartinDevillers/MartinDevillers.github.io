import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import CoffeeseedPage from "@/content/work/coffeeseed"
import DediconPage from "@/content/work/dedicon"
import DpgMediaPage from "@/content/work/dpg-media"
import InfosupportPage from "@/content/work/infosupport"
import MillenniumPage from "@/content/work/millennium"
import OvChipkaartPage from "@/content/work/ov-chipkaart"
import PgePage from "@/content/work/pge"
import ScreenconsultPage from "@/content/work/screenconsult"
import TMobilePage from "@/content/work/t-mobile"
import { projects } from "@/data/projects"

interface WorkSlugRouteProps {
  params: Promise<{ slug: string }>
}

const workPages = {
  coffeeseed: { title: "Coffeeseed", Component: CoffeeseedPage },
  dedicon: { title: "Dedicon", Component: DediconPage },
  "dpg-media": { title: "DPG Media", Component: DpgMediaPage },
  infosupport: { title: "Info Support", Component: InfosupportPage },
  millennium: { title: "Millennium", Component: MillenniumPage },
  "ov-chipkaart": { title: "OV-chipkaart", Component: OvChipkaartPage },
  pge: { title: "Pacific Gas and Electric Company", Component: PgePage },
  screenconsult: { title: "ScreenConsult", Component: ScreenconsultPage },
  "t-mobile": { title: "T-Mobile", Component: TMobilePage },
} as const

const workOrder = projects.map((project) => project.slug).filter((slug): slug is keyof typeof workPages => slug in workPages)

export async function generateStaticParams() {
  return Object.keys(workPages).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: WorkSlugRouteProps): Promise<Metadata> {
  const { slug } = await params
  const page = workPages[slug as keyof typeof workPages]

  if (!page) {
    return {}
  }

  return {
    title: page.title,
  }
}

export default async function WorkSlugPage({ params }: WorkSlugRouteProps) {
  const { slug } = await params
  const page = workPages[slug as keyof typeof workPages]

  if (!page) {
    notFound()
  }

  const currentIndex = workOrder.indexOf(slug as keyof typeof workPages)
  if (currentIndex < 0) {
    notFound()
  }

  const previousSlug = workOrder[(currentIndex - 1 + workOrder.length) % workOrder.length]
  const nextSlug = workOrder[(currentIndex + 1) % workOrder.length]
  const previousPage = workPages[previousSlug]
  const nextPage = workPages[nextSlug]

  const Component = page.Component
  return (
    <>
      <Component />
      <nav className="mx-auto mt-[-2rem] w-full max-w-6xl px-4 pb-6 md:mt-[-2.5rem] md:px-8 md:pb-8" aria-label="Project navigation">
        <div className="flex items-center justify-between gap-3 pt-0">
          <Link
            href={`/work/${previousSlug}`}
            className="inline-flex min-w-0 items-center gap-2 rounded-full border border-zinc-300/80 px-4 py-2 text-sm text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <span aria-hidden="true">←</span>
            <span className="sm:hidden">Previous</span>
            <span className="hidden truncate sm:inline">Previous: {previousPage.title}</span>
          </Link>
          <Link
            href={`/work/${nextSlug}`}
            className="inline-flex min-w-0 items-center gap-2 rounded-full border border-zinc-300/80 px-4 py-2 text-sm text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <span className="sm:hidden">Next</span>
            <span className="hidden truncate sm:inline">Next: {nextPage.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
