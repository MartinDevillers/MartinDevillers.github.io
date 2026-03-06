import { FaGithub, FaLinkedinIn, FaStackOverflow } from "react-icons/fa"

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/devillers", Icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/MartinDevillers", Icon: FaGithub },
  { label: "StackOverflow", href: "https://stackoverflow.com/users/546967/martin-devillers", Icon: FaStackOverflow },
]

const Footer: React.FC = () => (
  <footer className="border-t border-zinc-200/80 py-8 dark:border-zinc-800/80">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-zinc-600 dark:text-zinc-400 md:flex-row md:items-center md:justify-between md:px-8">
      <p>© {new Date().getFullYear()} Martin Devillers.</p>
      <div className="flex items-center gap-2 md:justify-end">
        {socialLinks.map((social) => (
          <a
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            title={social.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300/80 text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
          >
            <social.Icon className="text-sm" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  </footer>
)

export default Footer
