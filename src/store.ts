import create from "zustand";
import { persist } from "zustand/middleware";

export interface HorizontalBarVersionState{
    version: string
    setVersion: (version:string)=>void
}

export const useStore  = create<HorizontalBarVersionState>((persist(
    (set) => ({
      version: "NavLinks",
      setVersion: (version:string) => set((state) => ({ ...state,version })),
    }),
    {
      name: "hortizontalBarVerion"
    }
  ))
);