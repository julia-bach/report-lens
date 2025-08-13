"use client";

import { useColumnDefTimelinePage } from "@/components/pages/use-column-def-timeline.page";
import { apiClient } from "@/services/axios-instance";
import { useShallow } from "zustand/react/shallow";
import { ReportDTO, ReportStatsDTO } from "@/types/generic-types";
import { formatDurationText, getDateTimeFormatted } from "@/utils/utils";
import AgGrid from "@/components/wrappers/ag-grid/ag-grid";
import { useRef, useState } from "react";
import Search from "@/components/search";
import { useWindowHeightStore } from "@/store/window-height-store";
import { useComponentSize } from "@/hook/use-component-size";
import { testReportStore } from "@/store/test-report";
import useSWR from "swr";
import { useProjectNameStore } from "@/store/project-name-store";

export const Timeline = () => {
  const { reportStats, setReportStats } = testReportStore(useShallow((state) => state));
  const { projectName } = useProjectNameStore(useShallow((state) => state));
  const { height } = useWindowHeightStore(useShallow((state) => state));

  const divRef = useRef<HTMLDivElement>(null);
  const columnDef = useColumnDefTimelinePage();
  const { height: alertHeight } = useComponentSize(divRef);

  const [quickFilterText, setQuickFilterText] = useState<string>();

  const fetchData = async () => {
    const res = await apiClient.get(`/api/reports/${projectName}`);
    return res?.data;
  };

  useSWR(`/api/reports/${projectName}`, fetchData, {
    suspense: true,
    onSuccess: (res) => {
      const body: ReportStatsDTO[] = res.data.map((item: ReportDTO) => {
        const startTime = getDateTimeFormatted(item.stats.startTime);
        const duration = formatDurationText(item.stats.duration);
        const total = item.stats.flaky + item.stats.expected + item.stats.skipped + item.stats.unexpected || 0;
        return {
          id: item._id,
          ...item.stats,
          startTime,
          duration,
          total
        };
      });

      setReportStats(body);
    }
  });

  return (
    <div className="w-full items-center justify-center px-16 pt-16">
      <div className="flex flex-row w-[100%] justify-start">
        <Search className="w-[max(20rem,20vw)]"
          onClear={() => setQuickFilterText("")}
          onChange={(e) => setQuickFilterText(e.target.value)}
        />
      </div>
      <AgGrid
        columnDefs={columnDef}
        rowData={reportStats}
        getRowId={(params) => params.data.id.toString()}
        quickFilterText={quickFilterText}
        gridHeight={height - 200 - alertHeight}
      />
    </div>
  );
};