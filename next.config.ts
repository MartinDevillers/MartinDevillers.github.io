import fs from "node:fs"
import path from "node:path"
import type { NextConfig } from "next"

const redirectsFile = path.join(process.cwd(), "redirects.csv")

const parseRedirectsCsv = () => {
  if (!fs.existsSync(redirectsFile)) {
    return []
  }

  const lines = fs.readFileSync(redirectsFile, "utf-8").split("\n")

  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [source, destination] = line.split(",")
      return {
        source: source?.trim(),
        destination: destination?.trim(),
      }
    })
    .filter((row): row is { source: string; destination: string } => Boolean(row.source && row.destination))
    .map((row) => ({
      source: row.source,
      destination: row.destination,
      permanent: false,
    }))
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return parseRedirectsCsv()
  },
}

export default nextConfig
