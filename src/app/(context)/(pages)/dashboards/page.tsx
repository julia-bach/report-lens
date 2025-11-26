"use client";

import { testReportStore } from "@/store/test-report";
import { useShallow } from "zustand/react/shallow";
import { apiClient } from "@/services/axios-instance";
import useSWR from "swr";
import { FailureSeriesMode, PassFailMode, ReportDTO, ReportStatsDTO } from "@/types/generic-types";
import { formatDurationText, formatStartTime, getDateTimeFormatted } from "@/utils/utils";
import { useProjectNameStore } from "@/store/project-name-store";
import { overallOutcomeOptions } from "@/components/dashboards/overall-outcome";
import { useMemo, useState } from "react";
import { failureObservabilityOptions } from "@/components/dashboards/failure-observability";
import { monthlyFlakyTestsOptions } from "@/components/dashboards/monthly-flaky-tests";
import { passedVsFailedMonthlyOptions, passedVsFailedWeeklyOptions } from "@/components/dashboards/passed-vs-failed";
import { AgCharts } from "ag-charts-react";
import { capitalize } from "@heroui/shared-utils";
import { Card, Select, SelectItem } from "@heroui/react";
import { CardHeader } from "@heroui/card";

export default function DashboardsPage() {
  const { reportStats, setReportStats } = testReportStore(useShallow((state) => state));
  const { projectName } = useProjectNameStore(useShallow((state) => state));
  const [failureMode, setFailureMode] = useState<FailureSeriesMode>("monthly");
  const [passFailMode, setPassFailMode] = useState<PassFailMode>("monthly");

  const fetchData = async () => {
    const res = await apiClient.get(`/api/reports/${projectName}`);
    return res?.data;
  };

  useSWR(`/api/reports/${projectName}`, fetchData, {
    suspense: true,
    onSuccess: (res) => {
      const body: ReportStatsDTO[] = res.data.map((item: ReportDTO) => {
        const startTimeMs = new Date(item.stats.startTime).getTime();
        const startTime = getDateTimeFormatted(item.stats.startTime);
        const duration = formatDurationText(item.stats.duration);
        const total =
          item.stats.flaky +
          item.stats.expected +
          item.stats.skipped +
          item.stats.unexpected || 0;

        return {
          id: item._id,
          ...item.stats,
          startTime: formatStartTime(startTime),
          startTimeMs,
          duration,
          total
        };
      });

      setReportStats(body);
    }
  });

  const outcomeOptions = useMemo(() => overallOutcomeOptions(reportStats), [reportStats]);
  const failureOptions = useMemo(() => failureObservabilityOptions(reportStats, failureMode), [reportStats, failureMode]);
  const flakyOptions = useMemo(() => monthlyFlakyTestsOptions(reportStats), [reportStats]);
  const passFailOptions = useMemo(() =>
    passFailMode === "monthly" ? passedVsFailedMonthlyOptions(reportStats) : passedVsFailedWeeklyOptions(reportStats),
  [reportStats, passFailMode]
  );

  return (
    <div className="min-h-screen bg-slate-50 px-3 pt-6 mb-3 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Dashboards</h1>
            <p className="text-sm text-slate-500">
              Test Outcomes and Quality Metrics -{" "}
              <span className="font-medium text-slate-700">{projectName && capitalize(projectName)}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full bg-slate-100 px-2 py-1">Latest reports</span>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <Card className="flex flex-col shadow-sm shadow-slate-200/60 border border-slate-100 p-2 pb-6">
            <CardHeader className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Overview</p>
                <h2 className="text-sm font-semibold text-slate-800">Test Distribution</h2>
              </div>
            </CardHeader>

            <div className="h-72 md:h-80">
              <AgCharts options={outcomeOptions} />
            </div>
          </Card>

          <Card className="flex flex-col shadow-sm shadow-slate-200/60 border border-slate-100 p-2 pb-6 pr-4">
            <CardHeader className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quality</p>
                <h2 className="text-sm font-semibold text-slate-800">Tests Failures</h2>
              </div>
              <Select
                size="sm"
                selectedKeys={[failureMode]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as FailureSeriesMode;
                  setFailureMode(value);
                }}
                className="max-w-[160px] text-xs"
              >
                <SelectItem key="monthly">Monthly</SelectItem>
                <SelectItem key="all">Raw timeline</SelectItem>
              </Select>
            </CardHeader>

            <div className="h-56 md:h-64">
              <AgCharts options={failureOptions} />
            </div>
          </Card>

          <Card className="flex flex-col shadow-sm shadow-slate-200/60 border border-slate-100 p-2 pb-6 pr-4">
            <CardHeader className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Stability</p>
                <h2 className="text-sm font-semibold text-slate-800">Flaky Tests</h2>
              </div>
            </CardHeader>

            <div className="h-72 md:h-80">
              <AgCharts options={flakyOptions} />
            </div>
          </Card>

          <Card className="flex flex-col shadow-sm shadow-slate-200/60 border border-slate-100 p-2 pb-6 pr-4">
            <CardHeader className="mb-4 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Trend</p>
                <h2 className="text-sm font-semibold text-slate-800">Passed vs Failed</h2>
              </div>
              <Select
                size="sm"
                aria-label="Passed vs Failed view mode"
                selectedKeys={[passFailMode]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0] as PassFailMode;
                  setPassFailMode(value);
                }}
                className="max-w-[160px] text-xs"
              >
                <SelectItem key="monthly">Monthly</SelectItem>
                <SelectItem key="weekly">Weekly</SelectItem>
              </Select>
            </CardHeader>

            <div className="h-64 md:h-80">
              <AgCharts options={passFailOptions} />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
