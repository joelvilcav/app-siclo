import { LegendItem } from "./legend-item";

export interface InteractiveChartLegendProps {
  category: string;
  items: LegendItem[];
  visibleItems: Set<string>;
  onToggle: (key: string) => void;
  showFinder: boolean;
}