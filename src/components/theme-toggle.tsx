"use client"

import { useTheme } from "next-themes"
import { FaMoon, FaSun } from "react-icons/fa"

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const currentTheme = (theme === "system" ? resolvedTheme : theme) || "light"
  const nextTheme = currentTheme === "dark" ? "light" : "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-zinc-300/80 text-zinc-700 transition hover:border-brand-500 hover:text-brand-600 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
    >
      {currentTheme === "dark" ? <FaSun className="text-sm" aria-hidden="true" /> : <FaMoon className="text-sm" aria-hidden="true" />}
    </button>
  )
}

export default ThemeToggle
