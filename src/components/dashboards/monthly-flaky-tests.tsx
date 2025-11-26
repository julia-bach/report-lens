import { ReportStatsDTO } from "@/types/generic-types";
import { AgCartesianChartOptions } from "ag-charts-types";
import { aggregateBy, monthKey } from "@/utils/utils";

export function monthlyFlakyTestsOptions(reportStats: ReportStatsDTO[]): AgCartesianChartOptions {
  const agg = aggregateBy(reportStats, monthKey);
  const data = agg.map((row) => ({
    date: new Date(row.period + "-01"),
    flaky: row.flaky
  }));

  return {
    data,
    series: [
      {
        type: "bar",
        xKey: "date",
        yKey: "flaky",
        yName: "Flaky Tests"
      }
    ],
    axes: [
      { type: "time", position: "bottom" },
      { type: "number", position: "left" }
    ]
  };
}
