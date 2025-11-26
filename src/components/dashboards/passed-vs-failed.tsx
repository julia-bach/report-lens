import { ReportStatsDTO } from "@/types/generic-types";
import { aggregateBy, monthKey, weekKey } from "@/utils/utils";
import { AgChartOptions } from "ag-charts-types";

export function passedVsFailedMonthlyOptions(reportStats: ReportStatsDTO[]): AgChartOptions {
  const agg = aggregateBy(reportStats, monthKey);
  const data = agg.map((row) => ({
    date: new Date(row.period + "-01"),
    passed: row.passed,
    failed: row.failed
  }));

  return {
    data,
    series: [
      {
        type: "line",
        xKey: "date",
        yKey: "passed",
        yName: "Passed"
      },
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

export function passedVsFailedWeeklyOptions(reportStats: ReportStatsDTO[]): AgChartOptions {
  const agg = aggregateBy(reportStats, weekKey);
  const data = agg.map((row) => ({
    weekLabel: row.period,
    passed: row.passed,
    failed: row.failed
  }));

  return {
    data,
    series: [
      {
        type: "line",
        xKey: "weekLabel",
        yKey: "passed",
        yName: "Passed"
      },
      {
        type: "line",
        xKey: "weekLabel",
        yKey: "failed",
        yName: "Failed"
      }
    ],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left" }
    ]
  };
}
