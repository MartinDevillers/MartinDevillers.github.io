import Image from "next/image"
import Link from "next/link"
import { Project } from "@/lib/types"

const ProjectCard: React.FC<Project> = ({ slug, name, role, client, date, description, thumb, icon, active }) => (
  <Link
    href={`/work/${slug}`}
    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition hover:-translate-y-0.5 hover:border-brand-500 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div className="relative h-52 w-full">
      <Image src={thumb} alt={name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
    </div>
    <div className="flex-1 flex flex-col gap-2 p-5">
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-brand-600 dark:text-brand-300">
        <span>{role}</span>
        {active ? <span className="rounded-full bg-brand-100 px-2 py-0.5 dark:bg-brand-900/40">Current</span> : null}
      </div>
      <h3 className="font-heading text-2xl tracking-tight text-zinc-900 dark:text-zinc-100">{name}</h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{description}</p>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <div className="relative h-11 w-11 rounded-full bg-white">
          <Image src={icon} alt={client} fill className="rounded-full object-contain" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{client}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{date}</p>
        </div>
      </div>
    </div>
  </Link>
)

export default ProjectCard
