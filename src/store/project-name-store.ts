import { create } from "zustand/react";
import { persist } from "zustand/middleware";

interface ProjectNameStore {
  projectName: string | undefined;
  setProjectName: (projectName: string) => void;
}

const initialState = {
  projectName: undefined
};


export const useProjectNameStore = create<ProjectNameStore>()(
  persist(
    (set) => ({
      ...initialState,
      setProjectName: (projectName: string) => set({ projectName })
    }),
    {
      name: "project-name"
    }
  )
);