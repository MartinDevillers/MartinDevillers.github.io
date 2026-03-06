import type { Metadata } from "next"
import { projects } from "@/data/projects"
import ProjectCard from "@/components/project-card"

export const metadata: Metadata = {
  title: "Work",
}

export default function WorkRoute() {
  const activeProjects = projects.filter((project) => project.active).length

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl dark:bg-brand-900/35" />

      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-700 dark:text-brand-300">Portfolio</p>
          <h1 className="mt-4 font-heading text-5xl tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl">Work</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            In the past decade, I have passionately worked on projects across industries, building and leading delivery
            of systems used by millions.
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            {projects.length} Projects · {activeProjects} Current
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}
