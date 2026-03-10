"use client"

import { useEffect, useMemo, useState } from "react"
import { ResponsiveLine } from "@nivo/line"

type MonthlyRow = {
  month: string
  questions: number
  answers: number
  total: number
}

type MonthlySeries = {
  id: "Questions" | "Answers"
  color: string
  data: { x: string; y: number }[]
}

const parseCsv = (csv: string): MonthlyRow[] => {
  const lines = csv.trim().split(/\r?\n/)
  if (lines.length < 2) {
    return []
  }

  return lines
    .slice(1)
    .map((line) => {
      const match = line.match(/^"([^"]+)","(\d+)","(\d+)"$/)
      if (!match) {
        return null
      }

      const month = match[1].slice(0, 7)
      const questions = Number(match[2])
      const answers = Number(match[3])
      return {
        month,
        questions,
        answers,
        total: questions + answers,
      }
    })
    .filter((row): row is MonthlyRow => row !== null)
}

const formatCompact = (value: number): string => {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `${Math.round(value / 1_000)}k`
  }
  return String(value)
}

interface StackOverflowTimeseriesChartProps {
  csvPath?: string
}

const StackOverflowTimeseriesChart: React.FC<StackOverflowTimeseriesChartProps> = ({
  csvPath = "/assets/2026-03-09-stackoverflow-monthly-post-counts.csv",
}) => {
  const [rows, setRows] = useState<MonthlyRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch(csvPath, { cache: "force-cache" })
        if (!response.ok) {
          throw new Error(`Failed to fetch CSV (${response.status})`)
        }
        const csv = await response.text()
        if (!cancelled) {
          setRows(parseCsv(csv))
        }
      } catch (fetchError) {
        if (!cancelled) {
          const message = fetchError instanceof Error ? fetchError.message : "Unknown error"
          setError(message)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [csvPath])

  useEffect(() => {
    const media = window.matchMedia("(max-width: 430px)")
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    setIsMobile(media.matches)
    media.addEventListener("change", onChange)

    return () => {
      media.removeEventListener("change", onChange)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const updateTheme = () => {
      setIsDarkMode(root.classList.contains("dark"))
    }

    updateTheme()
    const observer = new MutationObserver(updateTheme)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    return () => {
      observer.disconnect()
    }
  }, [])

  const analysis = useMemo(() => {
    if (!rows.length) {
      return null
    }

    const latest = rows[rows.length - 1]
    const now = new Date()
    const currentMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`
    const hasPartialCurrentMonth = latest.month === currentMonth

    const completeRows = hasPartialCurrentMonth && rows.length > 1 ? rows.slice(0, -1) : rows
    if (!completeRows.length) {
      return null
    }
    const latestComplete = completeRows[completeRows.length - 1]
    const peak = completeRows.reduce((best, row) => (row.total > best.total ? row : best), completeRows[0])
    const declinePct = peak.total > 0 ? ((peak.total - latestComplete.total) / peak.total) * 100 : 0

    return {
      completeRows,
      latestComplete,
      peak,
      declinePct,
    }
  }, [rows])

  if (error) {
    return (
      <div className="mb-8 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
        Could not render chart: {error}
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="mb-8 rounded-xl border border-zinc-200/80 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-300">
        Loading or processing Stack Overflow monthly Q/A data...
      </div>
    )
  }

  const { completeRows } = analysis

  const chartData: MonthlySeries[] = [
    {
      id: "Questions",
      color: "#2563eb",
      data: completeRows.map((row) => ({ x: row.month, y: row.questions })),
    },
    {
      id: "Answers",
      color: "#f97316",
      data: completeRows.map((row) => ({ x: row.month, y: row.answers })),
    },
  ]

  const desiredTicks = isMobile ? 3 : 8
  const step = Math.max(1, Math.floor((completeRows.length - 1) / desiredTicks))
  const xTickValues = Array.from({ length: desiredTicks + 1 }, (_, index) => Math.min(completeRows.length - 1, index * step))
    .map((index) => completeRows[index]?.month)
    .filter((month): month is string => Boolean(month))
  const axisTextColor = isDarkMode ? "#e4e4e7" : "#3f3f46"

  const legends = isMobile
    ? []
    : [
        {
          anchor: "top-left" as const,
          direction: "row" as const,
          justify: false,
          translateX: 0,
          translateY: -20,
          itemsSpacing: 12,
          itemDirection: "left-to-right" as const,
          itemWidth: 90,
          itemHeight: 18,
          itemOpacity: 0.9,
          symbolSize: 10,
          symbolShape: "circle" as const,
        },
      ]

  return (
    <figure className="mb-10">
      <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-white p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
        <h3 className="mb-2 text-center text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          Stack Overflow Monthly Post Counts (Questions vs Answers, Including Deleted)
        </h3>
        <div className="h-[280px] w-full min-w-0 text-zinc-700 dark:text-zinc-200 sm:h-[460px]">
          <ResponsiveLine
            data={chartData}
            margin={isMobile ? { top: 10, right: 8, bottom: 34, left: 44 } : { top: 28, right: 24, bottom: 58, left: 70 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", min: 0, max: "auto" }}
            curve="linear"
            colors={({ color }) => color}
            lineWidth={isMobile ? 2 : 2.5}
            enablePoints={false}
            useMesh
            enableGridX={false}
            enableGridY
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickValues: xTickValues,
              tickSize: 4,
              tickPadding: isMobile ? 4 : 8,
              tickRotation: 0,
              format: (value) => String(value).slice(0, 4),
              legend: isMobile ? undefined : "Month",
              legendOffset: isMobile ? 0 : 44,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickValues: isMobile ? 3 : 6,
              tickSize: 4,
              tickPadding: isMobile ? 4 : 8,
              tickRotation: 0,
              format: (value) => formatCompact(Number(value)),
              legend: isMobile ? undefined : "Monthly posts",
              legendOffset: isMobile ? 0 : -54,
              legendPosition: "middle",
            }}
            theme={{
              background: "transparent",
              text: { fill: axisTextColor, fontSize: 12 },
              axis: {
                domain: { line: { stroke: "rgba(113, 113, 122, 0.35)", strokeWidth: 1 } },
                ticks: {
                  line: { stroke: "rgba(113, 113, 122, 0.35)", strokeWidth: 1 },
                  text: { fill: axisTextColor, fontSize: 12 },
                },
                legend: {
                  text: { fill: axisTextColor, fontSize: 12 },
                },
              },
              grid: {
                line: { stroke: "rgba(113, 113, 122, 0.25)", strokeWidth: 1 },
              },
              crosshair: { line: { stroke: "rgba(113, 113, 122, 0.45)", strokeWidth: 1 } },
              legends: { text: { fill: axisTextColor } },
              tooltip: {
                container: {
                  background: "rgba(24,24,27,0.94)",
                  color: "#f4f4f5",
                  borderRadius: "8px",
                  fontSize: "12px",
                },
              },
            }}
            legends={legends}
            layers={isMobile ? ["grid", "axes", "lines", "crosshair", "mesh"] : ["grid", "axes", "lines", "crosshair", "mesh", "legends"]}
            role="img"
            ariaLabel="Stack Overflow monthly questions and answers over time"
          />
        </div>
      </div>

    </figure>
  )
}

export default StackOverflowTimeseriesChart
