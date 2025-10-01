import { ReportResponse } from "@/interfaces/report-response"
import { parseISO, addDays, format } from "date-fns"

type ChartPoint = {
  name: string;
  [key: string]: number | string;
}

export function transformReportResponse(response: ReportResponse): ChartPoint[] {
  const { range, series } = response;
  const fromDate = parseISO(range.from);
  const daysCount = series[0]?.values.length ?? 0;

  const result: ChartPoint[] = [];

  for (let i = 0; i < daysCount; i++) {
    const date = addDays(fromDate, i);
    const formattedDate = format(date, "yyyy-MM-dd");

    const point: ChartPoint = { name: formattedDate };

    for (const s of series) {
      const key = s.group;
      point[key] = s.values[i] ?? 0;
    }

    result.push(point);
  }

  return result;
}