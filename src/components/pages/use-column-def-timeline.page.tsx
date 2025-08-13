import { ColDef } from "ag-grid-community";
import { useMemo } from "react";
import { formatStartTime, formatTestStatsText } from "@/utils/utils";
import AccessReportButton from "@/components/access-report-button";

export const useColumnDefTimelinePage = (): ColDef[] => {
  return useMemo(
    () => [
      {
        field: "startTime",
        headerName: "Test Run",
        flex: 2,
        filter: false,
        valueFormatter: params => formatStartTime(params.value)
      },
      {
        headerName: "Duration",
        field: "duration"
      },
      {
        headerName: "Passed",
        field: "expected",
        valueFormatter: params => formatTestStatsText(params.value)
      },
      {
        headerName: "Failed",
        field: "unexpected",
        valueFormatter: params => formatTestStatsText(params.value)
      },
      {
        headerName: "Flaky",
        field: "flaky",
        valueFormatter: params => formatTestStatsText(params.value)
      },
      {
        headerName: "Skipped",
        field: "skipped",
        valueFormatter: params => formatTestStatsText(params.value)
      },
      {
        headerName: "Total",
        field: "total",
        valueFormatter: params => formatTestStatsText(params.value)
      },
      {
        filter: false,
        sortable: false,
        cellClass: "text-center",
        maxWidth: 50,
        cellRenderer: () => (
          <AccessReportButton/>
        )
      }
    ], []
  );
};
