import create from "zustand";
import { persist } from "zustand/middleware"

export interface HorizontalBarVersionState{
    version: string
    setVersion: (version:string)=>void
}

interface customerFilterFormObj {
    state?: any[],
    city?: any[],
    paymentType?: any[],
    fromDate: moment.Moment | null,
    toDate: moment.Moment | null
}

interface customerFilterState{
    filterFormData: customerFilterFormObj | null,
    setFormData: (...args: any) => void,
    removeFormData: (...args: any) => void,
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
)

export const useCustomerFilterStore  = create<customerFilterState>((set) => ({
    filterFormData: null,
    setFormData: (filterFormData:customerFilterFormObj|null) =>set((state) => ({filterFormData})),
    removeFormData:  () =>set((state) => ({filterFormData:null})),
}))
