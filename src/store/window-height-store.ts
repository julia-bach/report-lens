import { create } from "zustand/react";

interface WindowHeightStoreType {
  height: number;
  setHeight: (height: number) => void;
}

const initialState = {
  height: 0
};

export const useWindowHeightStore = create<WindowHeightStoreType>()(
  (set) => ({
    ...initialState,
    setHeight: (height) => set(() => ({ height }))
  })
);