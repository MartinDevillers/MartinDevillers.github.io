import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ThemeProvider from "@/components/theme-provider"
import "@fontsource/noto-serif/400.css"
import "@fontsource/noto-serif/700.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devillers.nl"),
  title: {
    default: "Martin Devillers · Software Engineer",
    template: "%s · Martin Devillers",
  },
  description:
    "I am a software engineer that enjoys helping organizations with the design and implementation of elegant yet powerful IT-solutions.",
  keywords: [
    "software engineer",
    "react",
    "typescript",
    "nextjs",
    "graphql",
    "aws",
    "tailwind",
    "blog",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "Martin Devillers · Software Engineer",
    description:
      "I am a software engineer that enjoys helping organizations with the design and implementation of elegant yet powerful IT-solutions.",
    url: "https://www.devillers.nl",
    siteName: "Martin Devillers",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
