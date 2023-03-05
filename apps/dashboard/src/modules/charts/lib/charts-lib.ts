export type BaseChartProps = {
  title: string;
  labels: string[];
  data: unknown[];
  tooltipFormat: (value: string) => string;
  animate?: boolean;
};
