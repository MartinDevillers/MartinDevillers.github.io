import Link from "next/link"
import Image from "next/image"
import { FaGithub, FaLinkedinIn, FaStackOverflow } from "react-icons/fa"

const sections = [
  {
    href: "/work",
    title: "Work",
    description: "Case studies, projects, and the systems I have built.",
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Engineering notes, lessons learned, and technical deep-dives.",
  },
  {
    href: "/about",
    title: "About",
    description: "Background, values, and what I stand for as an engineer.",
  },
]

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devillers", Icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/MartinDevillers", Icon: FaGithub },
  { label: "StackOverflow", href: "https://stackoverflow.com/users/546967/martin-devillers", Icon: FaStackOverflow },
]

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-800/35" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-brand-200/20 blur-3xl dark:bg-brand-900/40" />

      <main className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <section className="flex flex-col gap-8 md:flex-row-reverse md:items-start md:justify-between">
          <div className="mx-auto md:mx-0 md:shrink-0">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-zinc-200/80 bg-zinc-100 shadow-lg shadow-brand-900/10 dark:border-zinc-700/80 dark:bg-zinc-900 md:h-56 md:w-56">
              <Image
                src="/assets/about-me-profile.jpg"
                alt="Martin Devillers"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 224px"
                priority
              />
            </div>
          </div>
          <div className="max-w-3xl">
            <h1 className="mt-6 font-heading text-5xl leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-7xl">
              Hi, I&apos;m Martin.
            </h1>
            <p className="mt-3 text-xs uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">
              Software Engineer · Miami, FL
            </p>
            <p className="mt-8 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-2xl">
              For over two decades, I’ve built software used by millions and led engineers to do the same. I focus on
              clarity, quality, and building things that last.
            </p>
          </div>
        </section>

        <nav aria-label="Primary sections" className="mt-14 grid gap-4 sm:grid-cols-3 md:mt-16">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-zinc-200/80 bg-white/85 p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-500 hover:bg-white dark:border-zinc-800/80 dark:bg-zinc-900/85 dark:hover:border-brand-400 dark:hover:bg-zinc-900"
            >
              <p className="font-heading text-3xl tracking-tight text-zinc-900 dark:text-zinc-100">{section.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{section.description}</p>
              <p className="mt-5 text-sm font-medium text-brand-700 transition group-hover:text-brand-500 dark:text-brand-300 dark:group-hover:text-brand-200">
                Explore {section.title} →
              </p>
            </Link>
          ))}
        </nav>

        <section className="mt-10 md:mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Elsewhere</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300/80 px-4 py-2 text-sm text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
              >
                <social.Icon className="text-base" aria-hidden="true" />
                {social.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
