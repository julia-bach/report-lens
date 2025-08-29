import { create } from "zustand/react";

interface TimeRangeStore {
  timeRange: string;
  setTimeRange: (timeRange: string) => void;
}

const initialState = {
  timeRange: "7d"
};

export const timeRangeStore = create<TimeRangeStore>()(
  (set) => ({
    ...initialState,
    setTimeRange: (timeRange: string) => set({ timeRange })
  })
);