import { ColDef, ICellRendererParams } from "ag-grid-community";
import { useMemo } from "react";
import { formatTestStatsText } from "@/utils/utils";
import AccessReportButton from "@/components/access-report-button";
import { GenericObject } from "@/types/generic-types";
import { RoutesEnum } from "@/constant/routes";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useColumnDefTimelinePage = (router: AppRouterInstance, project: string | undefined): ColDef[] => {
  return useMemo(
    () => [
      {
        field: "startTime",
        headerName: "Test Run",
        flex: 2,
        filter: false
      },
      {
        headerName: "Duration",
        field: "duration",
        filter: false
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
        cellRenderer: (params: ICellRendererParams) => (
          <AccessReportButton data={params.data} onClick={(data) => handleClick(data, router, project)}/>
        )
      }
    ], []
  );
};

const handleClick = (data: GenericObject | undefined, router: AppRouterInstance, project: string | undefined) => {
  router.push(`${RoutesEnum.REPORT}?project=${project}&reportId=${data?.id}`);
};