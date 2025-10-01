import { ReportResponse } from "./report-response";

export interface UseReportsResult {
  dataStudio: ReportResponse | null;
  dataInstructor: ReportResponse | null;
  dataDiscipline: ReportResponse | null;
  loading: boolean;
  error: string | null;
  fetchReports: (from: string, to: string) => Promise<void>;
}