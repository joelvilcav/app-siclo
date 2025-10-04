import { LegendItem } from "@/interfaces/legend-item"
import { useState, useMemo, useCallback, useEffect } from "react"

export function useChartLegend(
  data: any[],               
  colors: { stroke: string }[],
  defaultVisible = false
) {
  const [hidden, setHidden] = useState<{ [key: string]: boolean }>({})

  const seriesKeys = useMemo(() => {
    return Object.keys(data[0] || {}).filter((k) => k !== "name")
  }, [data])

  useEffect(() => {
  if (seriesKeys.length === 0) return

  setHidden((prev) => {
    const prevKeys = Object.keys(prev);
    const sameKeys =
      prevKeys.length === seriesKeys.length &&
      prevKeys.every((k) => seriesKeys.includes(k));

    if (sameKeys) return prev;

    const defaultVisibleCount = defaultVisible ? 3 : seriesKeys.length;
    const next: { [key: string]: boolean } = {};

    seriesKeys.forEach((key, index) => {
      next[key] = index >= defaultVisibleCount;
    });

    return next
  })
}, [seriesKeys, defaultVisible])

  const legendItems: LegendItem[] = useMemo(() => {
    return seriesKeys.map((key, index) => ({
      key,
      label: key,
      color: colors[index % colors.length].stroke,
    }))
  }, [seriesKeys, colors])

  const visibleItems = useMemo(() => {
    return new Set(seriesKeys.filter((key) => !hidden[key]))
  }, [seriesKeys, hidden])

  const handleLegendClick = useCallback((o: any) => {
    let dataKey: string
    if (typeof o === "string") {
      dataKey = o
    } else {
      dataKey = o.dataKey || o.value
    }

    setHidden((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }))
  }, [])

  return {
    hidden,
    seriesKeys,
    legendItems,
    visibleItems,
    handleLegendClick,
  }
}