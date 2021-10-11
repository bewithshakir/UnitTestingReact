import create from "zustand";

interface state{
    query: string
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


export const useStore  = create<state>((set) => ({
    query: "",
    setQuery: () => set((state):state => ({ query: state.query })),
  }))


export const useCustomerFilterStore  = create<customerFilterState>((set) => ({
    filterFormData: null,
    setFormData: (filterFormData:customerFilterFormObj|null) =>set((state) => ({filterFormData})),
    removeFormData:  () =>set((state) => ({filterFormData:null})),
}))
  