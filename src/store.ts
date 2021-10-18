import create from "zustand";
import { persist } from "zustand/middleware";
import { DateRange } from '@mui/lab/DateRangePicker';

type DatePickerRange = DateRange<Date>;

export interface HorizontalBarVersionState{
    version: string
    setVersion: (version:string)=>void
}

interface customerFilterFormObj {
    state?: any[],
    city?: any[],
    paymentType?: any[],
    // fromDate: moment.Moment | null,
    // toDate: moment.Moment | null,
    date: DatePickerRange
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
);

export const useCustomerFilterStore  = create<customerFilterState>((set) => ({
    filterFormData: null,
    setFormData: (filterFormData:customerFilterFormObj|null) =>set(() => ({filterFormData})),
    removeFormData:  () =>set(() => ({filterFormData:null})),
}));
