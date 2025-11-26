import { FailureSeriesMode, ReportStatsDTO } from "@/types/generic-types";
import { aggregateBy, monthKey, toDate } from "@/utils/utils";
import { AgChartOptions } from "ag-charts-types";

export function failureObservabilityOptions(reportStats: ReportStatsDTO[], mode: FailureSeriesMode = "monthly"): AgChartOptions {
  let data: any[];
  if (mode === "monthly") {
    const agg = aggregateBy(reportStats, monthKey);
    data = agg.map((row) => ({
      date: new Date(row.period + "-01"),
      failed: row.failed
    }));
  } else {
    data = reportStats.map((r) => ({
      date: toDate(r),
      failed: r.unexpected
    }));
  }

  return {
    data,
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "failed",
        yName: "Failed"
      }
    ],
    axes: [
      { type: "time", position: "bottom" },
      { type: "number", position: "left" }
    ]
  };
}
