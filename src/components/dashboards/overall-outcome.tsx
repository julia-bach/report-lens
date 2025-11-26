import { ReportStatsDTO } from "@/types/generic-types";
import { AgPolarChartOptions } from "ag-charts-types";

export function overallOutcomeOptions(reportStats: ReportStatsDTO[]): AgPolarChartOptions {
  const totals = reportStats.reduce(
    (acc, r) => {
      acc.passed += r.expected;
      acc.failed += r.unexpected;
      acc.flaky += r.flaky;
      acc.skipped += r.skipped;
      return acc;
    },
    { passed: 0, failed: 0, flaky: 0, skipped: 0 }
  );

  const data = [
    { status: "Passed", value: totals.passed },
    { status: "Failed", value: totals.failed },
    { status: "Flaky", value: totals.flaky },
    { status: "Skipped", value: totals.skipped }
  ];

  const totalValue = totals.passed + totals.failed + totals.flaky + totals.skipped || 1;

  return {
    data,
    series: [
      {
        type: "pie",
        angleKey: "value",
        legendItemKey: "status",
        tooltip: {
          renderer: (params) => {
            const value = params.datum.value as number;
            const pct = ((value / totalValue) * 100).toFixed(1);

            return {
              title: params.datum.status,
              content: `${value} tests (${pct}%)`
            };
          }
        }
      }
    ]
  };
}
