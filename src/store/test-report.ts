import { ReportStatsDTO } from "@/types/generic-types";
import { create } from "zustand/react";

interface TestReportStore {
  reportStats: ReportStatsDTO[];
  setReportStats: (reportStats: ReportStatsDTO[]) => void;
}

const initialState = {
  reportStats: []
};

export const testReportStore = create<TestReportStore>()(
  (set) => ({
    ...initialState,
    setReportStats: (reportStats: ReportStatsDTO[]) => set({ reportStats })
  })
);