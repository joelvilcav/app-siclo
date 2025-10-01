export interface ReportResponse {
   range: {
    from: string;
    to: string;
  };
  timeUnit: string;
  series: {
    group: string;
    values: number[];
  }[];
}