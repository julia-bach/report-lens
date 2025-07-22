"use client";

import { apiClient } from "@/services/axios-instance";
import AgGrid from "@/components/wrappers/ag-grid/ag-grid";
import { useShallow } from "zustand/react/shallow";
import useSWRImmutable from "swr/immutable";
import { ReportDTO, ReportStatsDTO } from "@/types/generic-types";
import { formatDuration, getDateTimeFormatted } from "@/utils/utils";
import { testReportStore } from "@/store/test-report";

export default function Test({ hasError }: {hasError?: boolean}) {
  const { reportStats, setReportStats } = testReportStore(useShallow((state) => state));

  const fetchData = async () => {
    const res = await apiClient.get("/api/reports");
    return res?.data;
  };

  useSWRImmutable(hasError ? null : "/api/reports", fetchData, {
    suspense: true,
    onSuccess: (res) => {
      const body: ReportStatsDTO[] = res.data.map((item: ReportDTO) => {
        const startTime = getDateTimeFormatted(item.stats.startTime);
        const duration = formatDuration(item.stats.duration);
        return {
          id: item._id,
          ...item.stats,
          startTime,
          duration
        };
      });
      setReportStats(body);
    }
  });

  if (hasError) {
    return <div>ERROR</div>;
  }

  const columnDefs = [
    { headerName: "Duration", field: "duration" },
    { headerName: "Passed", field: "expected" },
    { headerName: "Flaky", field: "flaky" },
    { headerName: "Skipped", field: "skipped" },
    { headerName: "Start", field: "startTime" },
    { headerName: "Failed", field: "unexpected" }
  ];

  return (
    <div className="w-[1000px]">
      <AgGrid
        columnDefs={columnDefs}
        rowData={reportStats}
        getRowId={(params) => params.data.id.toString()}
        gridHeight={500}
      />
    </div>
  );
}
