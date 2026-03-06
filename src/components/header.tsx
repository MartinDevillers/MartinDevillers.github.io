import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
]

const Header: React.FC = () => (
  <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-zinc-50/85 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/85">
    <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-8">
      <Link href="/" className="font-heading text-xl tracking-tight text-zinc-900 dark:text-zinc-100">
        Martin <span className="text-brand-600 dark:text-brand-300">Devillers</span>
      </Link>
      <div className="flex items-center gap-5 md:gap-7">
        <nav className="flex items-center gap-4 text-sm font-medium tracking-wide text-zinc-700 dark:text-zinc-200 md:gap-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-600 dark:hover:text-brand-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
)

export default Header
