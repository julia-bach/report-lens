import { create } from "zustand/react";

interface CredentialsStore {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const initialState = {
  username: "",
  password: ""
};

export const useCredentialsStore = create<CredentialsStore>()(
  (set) => ({
    ...initialState,
    setUsername: (username: string) => set({ username }),
    setPassword: (password: string) => set({ password })
  })
);