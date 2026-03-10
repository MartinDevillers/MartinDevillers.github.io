"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { ResponsiveHeatMap } from "@nivo/heatmap"
import type { HeatMapSerie } from "@nivo/heatmap"

type MonthlyVisit = {
  key: string
  year: number
  month: number
  count: number
  label: string
}

type HeatmapDatum = {
  x: string
  y: number | null
  monthKey: string
  label: string
}

interface StackOverflowVisitedHeatmapProps {
  jsonPath?: string
  windowMonths?: number
  navigationStepMonths?: number
}

const MONTH_COLUMNS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
})

const formatMonthKey = (year: number, month: number): string => `${year}-${String(month).padStart(2, "0")}`

const formatMonthYear = (year: number, month: number): string => monthYearFormatter.format(new Date(Date.UTC(year, month - 1, 1)))

const monthIndexFromYearMonth = (year: number, month: number): number => year * 12 + (month - 1)

const yearMonthFromMonthIndex = (monthIndex: number): { year: number; month: number } => ({
  year: Math.floor(monthIndex / 12),
  month: (monthIndex % 12) + 1,
})

const aggregateMonthlyVisits = (raw: unknown): MonthlyVisit[] => {
  if (!raw || typeof raw !== "object") {
    return []
  }

  const yearlyRecord = raw as Record<string, unknown>
  const monthCounts = new Map<string, number>()
  let minMonthIndex = Number.POSITIVE_INFINITY
  let maxMonthIndex = Number.NEGATIVE_INFINITY

  for (const [yearKey, monthsRaw] of Object.entries(yearlyRecord)) {
    const year = Number(yearKey)
    if (!Number.isInteger(year)) {
      continue
    }

    if (!monthsRaw || typeof monthsRaw !== "object") {
      continue
    }

    const monthsRecord = monthsRaw as Record<string, unknown>
    for (const [monthKey, daysRaw] of Object.entries(monthsRecord)) {
      const month = Number(monthKey)
      if (!Number.isInteger(month) || month < 1 || month > 12) {
        continue
      }

      if (!daysRaw || typeof daysRaw !== "object") {
        continue
      }

      const daysRecord = daysRaw as Record<string, unknown>
      const visitedDays = Object.values(daysRecord).reduce<number>(
        (total, dayValue) => total + (Number(dayValue) > 0 ? 1 : 0),
        0
      )

      const monthKeyValue = formatMonthKey(year, month)
      monthCounts.set(monthKeyValue, visitedDays)

      const monthIndex = monthIndexFromYearMonth(year, month)
      minMonthIndex = Math.min(minMonthIndex, monthIndex)
      maxMonthIndex = Math.max(maxMonthIndex, monthIndex)
    }
  }

  if (!Number.isFinite(minMonthIndex) || !Number.isFinite(maxMonthIndex)) {
    return []
  }

  const months: MonthlyVisit[] = []
  for (let monthIndex = minMonthIndex; monthIndex <= maxMonthIndex; monthIndex += 1) {
    const { year, month } = yearMonthFromMonthIndex(monthIndex)
    const key = formatMonthKey(year, month)
    months.push({
      key,
      year,
      month,
      count: monthCounts.get(key) ?? 0,
      label: formatMonthYear(year, month),
    })
  }

  return months
}

const buildHeatmapSeries = (months: MonthlyVisit[]): HeatMapSerie<HeatmapDatum, Record<string, unknown>>[] => {
  if (!months.length) {
    return []
  }

  const startYear = months[0].year
  const endYear = months[months.length - 1].year
  const monthMap = new Map(months.map((month) => [month.key, month]))

  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index).reverse()

  return years.map((year) => ({
    id: String(year),
    data: MONTH_COLUMNS.map((monthLabel, monthIndex) => {
      const month = monthIndex + 1
      const key = formatMonthKey(year, month)
      const monthValue = monthMap.get(key)

      return {
        x: monthLabel,
        y: monthValue ? monthValue.count : null,
        monthKey: key,
        label: formatMonthYear(year, month),
      }
    }),
  }))
}

const buildFlippedHeatmapSeries = (months: MonthlyVisit[]): HeatMapSerie<HeatmapDatum, Record<string, unknown>>[] => {
  if (!months.length) {
    return []
  }

  const startYear = months[0].year
  const endYear = months[months.length - 1].year
  const monthMap = new Map(months.map((month) => [month.key, month]))
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index)

  return MONTH_COLUMNS.map((monthLabel, monthIndex) => {
    const month = monthIndex + 1
    return {
      id: monthLabel,
      data: years.map((year) => {
        const key = formatMonthKey(year, month)
        const monthValue = monthMap.get(key)

        return {
          x: String(year),
          y: monthValue ? monthValue.count : null,
          monthKey: key,
          label: formatMonthYear(year, month),
        }
      }),
    }
  })
}

const colorForValue = (value: number | null, maxValue: number): string => {
  if (value === null) {
    return "rgba(103, 42, 123, 0.08)"
  }

  if (value <= 0) {
    return "#f3ebf6"
  }

  if (maxValue <= 0) {
    return "#e9d8f0"
  }

  const ratio = value / maxValue
  if (ratio <= 0.2) {
    return "#e9d8f0"
  }
  if (ratio <= 0.4) {
    return "#d6b9e3"
  }
  if (ratio <= 0.6) {
    return "#b985cc"
  }
  if (ratio <= 0.8) {
    return "#8f4ba8"
  }
  return "#672a7b"
}

const StackOverflowVisitedHeatmap: React.FC<StackOverflowVisitedHeatmapProps> = ({
  jsonPath = "/assets/2026-03-09-stackoverflow-visited.json",
  windowMonths = 60,
  navigationStepMonths = 12,
}) => {
  const [monthlyVisits, setMonthlyVisits] = useState<MonthlyVisit[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [isSmallViewport, setIsSmallViewport] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setError(null)
        const response = await fetch(jsonPath, { cache: "force-cache" })
        if (!response.ok) {
          throw new Error(`Failed to fetch visit JSON (${response.status})`)
        }

        const raw = (await response.json()) as unknown
        const monthly = aggregateMonthlyVisits(raw)

        if (!cancelled) {
          setMonthlyVisits(monthly)
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
  }, [jsonPath])

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)")
    const onChange = (event: MediaQueryListEvent) => {
      setIsSmallViewport(event.matches)
    }

    setIsSmallViewport(media.matches)
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

  const windowSize = Math.max(1, windowMonths)
  const displayYearRows = Math.max(1, Math.floor(windowSize / 12) + 1)

  const alignToYearStart = useCallback(
    (index: number): number => {
      if (!monthlyVisits.length) {
        return 0
      }

      const boundedIndex = Math.max(0, Math.min(index, monthlyVisits.length - 1))
      const month = monthlyVisits[boundedIndex]?.month ?? 1
      return Math.max(0, boundedIndex - (month - 1))
    },
    [monthlyVisits]
  )

  const newestStartIndex = useMemo(() => {
    if (!monthlyVisits.length) {
      return 0
    }

    const latestYear = monthlyVisits[monthlyVisits.length - 1]?.year ?? monthlyVisits[0].year
    const targetStartYear = latestYear - (displayYearRows - 1)
    const targetYearIndex = monthlyVisits.findIndex((month) => month.year === targetStartYear && month.month === 1)
    if (targetYearIndex >= 0) {
      return targetYearIndex
    }

    const fallbackStart = Math.max(0, monthlyVisits.length - windowSize)
    return alignToYearStart(fallbackStart)
  }, [monthlyVisits, windowSize, displayYearRows, alignToYearStart])

  useEffect(() => {
    setStartIndex(newestStartIndex)
  }, [newestStartIndex])

  const safeStart = alignToYearStart(Math.min(startIndex, newestStartIndex))
  const visibleEndExclusive = useMemo(() => {
    if (!monthlyVisits.length) {
      return 0
    }

    const startYear = monthlyVisits[safeStart]?.year ?? monthlyVisits[0].year
    const endYearInclusive = startYear + (displayYearRows - 1)
    const outOfRangeIndex = monthlyVisits.findIndex(
      (month, index) => index >= safeStart && month.year > endYearInclusive
    )

    if (outOfRangeIndex >= 0) {
      return outOfRangeIndex
    }

    return monthlyVisits.length
  }, [monthlyVisits, safeStart, displayYearRows])

  const visibleMonths = useMemo(
    () => monthlyVisits.slice(safeStart, visibleEndExclusive),
    [monthlyVisits, safeStart, visibleEndExclusive]
  )

  const heatmapData = useMemo(
    () => (isSmallViewport ? buildFlippedHeatmapSeries(visibleMonths) : buildHeatmapSeries(visibleMonths)),
    [isSmallViewport, visibleMonths]
  )
  const maxCount = useMemo(() => Math.max(0, ...monthlyVisits.map((month) => month.count)), [monthlyVisits])

  const visibleStart = visibleMonths[0]
  const visibleEnd = visibleMonths[visibleMonths.length - 1]
  const canGoOlder = safeStart > 0
  const canGoNewer = safeStart < newestStartIndex
  const rowHeight = isSmallViewport ? 34 : 40
  const minHeight = isSmallViewport ? 460 : 220
  const heatmapHeight = Math.max(minHeight, heatmapData.length * rowHeight + 70)
  const innerPadding = isSmallViewport ? 0.14 : 0.18
  const outerPadding = isSmallViewport ? 0.035 : 0.04
  const axisTextColor = isDarkMode ? "#e4e4e7" : "#3f3f46"
  const cellBorderColor = isDarkMode ? "rgba(244,244,245,0.14)" : "rgba(39,39,42,0.12)"
  const cellBorderRadius = isSmallViewport ? 6 : 5
  const tooltipBackground = isDarkMode ? "rgba(24,24,27,0.82)" : "rgba(250,250,252,0.5)"
  const tooltipTextColor = isDarkMode ? "#f4f4f5" : "#18181b"
  const tooltipBorder = isDarkMode ? "1px solid rgba(244,244,245,0.16)" : "1px solid rgba(39,39,42,0.18)"

  const legendValues = [0, 0.2, 0.4, 0.6, 0.8].map((ratio) => Math.round(maxCount * ratio))

  if (error) {
    return (
      <div className="mb-8 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
        Could not render visit heatmap: {error}
      </div>
    )
  }

  if (!monthlyVisits.length) {
    return (
      <div className="mb-8 rounded-xl border border-zinc-200/80 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-900 dark:text-zinc-300">
        Loading Stack Overflow visit data...
      </div>
    )
  }

  return (
    <figure className="mb-10">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-3 dark:border-zinc-800/80 dark:bg-zinc-950/40">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-zinc-600 dark:text-zinc-300">
            Showing <strong>{visibleStart.label}</strong> to <strong>{visibleEnd.label}</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setStartIndex((current) => alignToYearStart(Math.max(0, current - Math.max(1, navigationStepMonths))))
              }
              disabled={!canGoOlder}
              className="cursor-pointer rounded-md border border-zinc-300 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Previous Year
            </button>
            <button
              type="button"
              onClick={() =>
                setStartIndex((current) =>
                  alignToYearStart(Math.min(newestStartIndex, current + Math.max(1, navigationStepMonths)))
                )
              }
              disabled={!canGoNewer}
              className="cursor-pointer rounded-md border border-zinc-300 px-3 py-1 text-xs text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
            >
              Next Year
            </button>
          </div>
        </div>

        <div style={{ height: `${heatmapHeight}px` }} className="w-full text-zinc-700 dark:text-zinc-200">
          <ResponsiveHeatMap<HeatmapDatum, Record<string, unknown>>
            data={heatmapData}
            margin={isSmallViewport ? { top: 8, right: 8, bottom: 24, left: 40 } : { top: 8, right: 18, bottom: 36, left: 54 }}
            valueFormat={(value) => String(value ?? 0)}
            forceSquare
            xInnerPadding={innerPadding}
            xOuterPadding={outerPadding}
            yInnerPadding={innerPadding}
            yOuterPadding={outerPadding}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: isSmallViewport ? 6 : 8,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: isSmallViewport ? 6 : 8,
              tickRotation: 0,
            }}
            colors={(cell) => colorForValue(cell.value, maxCount)}
            emptyColor="rgba(103, 42, 123, 0.08)"
            borderWidth={1}
            borderRadius={cellBorderRadius}
            borderColor={cellBorderColor}
            enableGridX={false}
            enableGridY={false}
            enableLabels={false}
            hoverTarget="cell"
            activeOpacity={1}
            inactiveOpacity={0.78}
            animate={false}
            role="img"
            ariaLabel="Stack Overflow monthly visit heatmap"
            theme={{
              background: "transparent",
              text: { fill: axisTextColor, fontSize: 12 },
              axis: {
                ticks: {
                  line: { stroke: "transparent" },
                  text: { fill: axisTextColor, fontSize: 12 },
                },
              },
              tooltip: {
                container: {
                  background: tooltipBackground,
                  color: tooltipTextColor,
                  borderRadius: "10px",
                  border: tooltipBorder,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  fontSize: "12px",
                  minWidth: "156px",
                  whiteSpace: "nowrap",
                  padding: "0",
                },
              },
            }}
            tooltip={({ cell }) => {
              const value = cell.value ?? 0
              return (
                <div
                  className="min-w-[156px] whitespace-nowrap px-2.5 py-1.5 leading-tight"
                  style={{
                    background: tooltipBackground,
                    color: tooltipTextColor,
                    border: tooltipBorder,
                    borderRadius: "10px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  <div className="font-semibold">{cell.data.label}</div>
                  <div className="mt-0.5">
                    {value} day{value === 1 ? "" : "s"} visited
                  </div>
                </div>
              )
            }}
          />
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
          <span>Less</span>
          {legendValues.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="inline-block h-3 w-3 rounded-sm border border-zinc-300/70 dark:border-zinc-700/70"
              style={{ backgroundColor: colorForValue(value, Math.max(1, maxCount)) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </figure>
  )
}

export default StackOverflowVisitedHeatmap
