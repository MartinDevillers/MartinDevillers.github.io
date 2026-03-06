import type { Metadata } from "next"
import { FaGithub, FaLinkedinIn, FaStackOverflow } from "react-icons/fa"

export const metadata: Metadata = {
  title: "About",
}

const linkClass =
  "text-brand-700 underline decoration-brand-300 underline-offset-4 transition hover:text-brand-500 dark:text-brand-300 dark:decoration-brand-700 dark:hover:text-brand-200"

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devillers", Icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/MartinDevillers", Icon: FaGithub },
  { label: "StackOverflow", href: "https://stackoverflow.com/users/546967/martin-devillers", Icon: FaStackOverflow },
]

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-2xl border border-zinc-200/80 bg-white/90 p-6 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-900/85 md:p-8">
    <h2 className="font-heading text-3xl tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
    <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</div>
  </section>
)

export default function AboutRoute() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-brand-300/25 blur-3xl dark:bg-brand-900/35" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-brand-200/20 blur-3xl dark:bg-brand-950/40" />

      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-brand-700 dark:text-brand-300">About</p>
          <h1 className="mt-5 font-heading text-5xl leading-tight tracking-tight text-zinc-900 dark:text-zinc-100 md:text-6xl">
            Hi, I&apos;m Martin.
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-2xl">
            Software engineer, team leader, and lifelong learner focused on building resilient systems and helping
            engineers do their best work.
          </p>
        </header>

        <section className="mt-12 grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/85">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Location</p>
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">Miami, FL</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/85">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Role</p>
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">Software Engineer · Team Lead</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/85">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Focus</p>
              <p className="mt-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">Artificial Intelligence</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/80 bg-white/90 p-5 dark:border-zinc-800/80 dark:bg-zinc-900/85">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Social</p>
              <div className="mt-3 flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300/80 text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
                  >
                    <social.Icon className="text-base" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <Card title="Background">
              <p>
                I&rsquo;m a quirky software engineer with 15 years of professional software development experience, a
                life-long passion for technology, solving problems and helping people. The systems I&rsquo;ve created are
                used by millions of people each day and have some meaningful impact on the world.
              </p>
              <p>
                On{" "}
                <a className={linkClass} href="https://stackoverflow.com/users/546967/martin-devillers" target="_blank" rel="noopener noreferrer">
                  StackOverflow
                </a>{" "}
                I&rsquo;ve received over 15,000 reputation by unstucking my fellow coders (and they&rsquo;ve unstucked me many
                times in return).
              </p>
              <p>
                I hold a master&rsquo;s and bachelor&rsquo;s in the field of{" "}
                <a className={linkClass} href="https://www.ru.nl/icis/" target="_blank" rel="noopener noreferrer">
                  Computer and Information Science
                </a>
                , with a specialization in{" "}
                <a className={linkClass} href="https://www.ru.nl/dis/" target="_blank" rel="noopener noreferrer">
                  cryptography
                </a>
                ,{" "}
                <a className={linkClass} href="https://sws.cs.ru.nl" target="_blank" rel="noopener noreferrer">
                  formal verification
                </a>{" "}
                and{" "}
                <a
                  className={linkClass}
                  href="https://www.ru.nl/icis/about_icis/research_sections/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  model-based development
                </a>
                . I graduated with Latin Honors (Cum Laude).
              </p>
            </Card>

            <Card title="What I Stand For">
              <p>
                I feel responsible for the code I write, the products I develop and the engineers I lead. I choose
                features over estimates, results over deadlines, evidence over speculation, simple over simplistic,
                complex over complicated, quality over quantity, architecture over being-an-architect and perseverance
                over brilliance (also because I&rsquo;m not brilliant).
              </p>
              <p>
                My typical workweek involves coffee, whiteboards, sticky notes, keyboards and a very enthusiastic crowd
                that is eager to deliver.
              </p>
            </Card>

            <Card title="What I Believe In">
              <p>
                As a self-taught engineer, I firmly believe the internet, free access to information and public
                collaboration on explicit knowledge (e.g. open-source software) are what we need to move humanity
                forward.
              </p>
              <p>
                Through these means, we can ultimately break away from backroom politics and instead reshape our world
                so that the mechanisms we need to ensure a stable, prosperous and safe society are completely open and
                visible to the public.
              </p>
            </Card>

            <Card title="Other Interests">
              <p>
                Besides being a passionate engineer, I also enjoy 360° photography (5 million views on StreetView),
                cycling (I&rsquo;m Dutch ey), traveling (34 countries and counting), dancing and cooking.
              </p>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
