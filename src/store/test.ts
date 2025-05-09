import { ReportStatsDTO } from "@/types/generic-types";
import { create } from "zustand/react";

interface TestStore {
  reportStats: ReportStatsDTO[];
  setReportStats: (reportStats: ReportStatsDTO[]) => void;
}

const initialState = {
  reportStats: []
}

export const testReportStore = create<TestStore>()(
  (set) => ({
    ...initialState,
    setReportStats: (reportStats: ReportStatsDTO[]) => set({ reportStats })
  })
)