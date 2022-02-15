import create from "zustand";
import { persist } from "zustand/middleware";
import { DateRange } from '@mui/lab/DateRangePicker';

type DatePickerRange = DateRange<Date>;

export interface HorizontalBarVersionState {
  version: string
  setVersion: (version: string) => void
}

interface customerFilterFormObj {
  state?: any[],
  city?: any[],
  paymentType?: any[],
  date: DatePickerRange
}

interface customerFilterState {
  filterFormData: customerFilterFormObj | null,
  setFormData: (...args: any) => void,
  removeFormData: (...args: any) => void,
}

interface IFilterState {
  filterFormData: { [k: string]: any } | null,
  setFormData: (...args: any) => void,
  removeFormData: (...args: any) => void,
}

export interface addedCustomerIdState {
  customerId: string,
  setCustomerId: (...args: any) => void,
  removeCustomerId: (...args: any) => void,
}
export interface addedCustomerPaymentTypeState {
  paymentType: string,
  setCustomerPaymentType: (...args: any) => void,
  removePaymentType: (...args: any) => void,
}
export interface addedParkingLotIdState {
  parkingLotId: string,
  setParkingLotId: (...args: any) => void,
  removeParkingLotId: (...args: any) => void,
}
export interface addedParkingLotCityNmState {
  parkingLotCityNm: string,
  setParkingLotCityNm: (...args: any) => void,
  removeParkingLotCityNm: (...args: any) => void,
}
export interface addedCustomerNameState {
  customerName: string,
  setCustomerName: (...args: any) => void,
  removeCustomerName: (...args: any) => void,
}

interface showConfirmationDialogBox {
  showConfirmationDialogBox: any,
  isFormFieldChange: any,
  showDialogBox: (...args: any) => void,
  hideDialogBox: (...args: any) => void,
  setFormFieldValue: (...args: any) => void,
  resetFormFieldValue: (...args: any) => void,
}

export const useStore = create<HorizontalBarVersionState>((persist(
  (set) => ({
    version: "NavLinks",
    setVersion: (version: string) => set((state) => ({ ...state, version })),
  }),
  {
    name: "hortizontalBarVerion"
  }
))
);

/** @deprecated use filterStore instead */
export const useCustomerFilterStore = create<customerFilterState>((set) => ({
  filterFormData: null,
  setFormData: (filterFormData: customerFilterFormObj | null) => set(() => ({ filterFormData })),
  removeFormData: () => set(() => ({ filterFormData: null })),
}));


export const filterStore = create<IFilterState>((set) => ({
  filterFormData: null,
  setFormData: (filterFormData: { [k: string]: any } | null) => set(() => ({ filterFormData })),
  removeFormData: () => set(() => ({ filterFormData: null })),
}));


export const useAddedCustomerIdStore = create<addedCustomerIdState>(persist((set) => ({
  customerId: '',
  setCustomerId: (customerId: string) => set(() => ({ customerId })),
  removeCustomerId: () => set(() => ({ customerId: '' })),
}),
{
  name: 'customerId'
}));

export const useAddedCustomerPaymentTypeStore = create<addedCustomerPaymentTypeState>(persist((set) => ({
  paymentType: '',
  setCustomerPaymentType: (paymentType: string) => set(() => ({ paymentType })),
  removePaymentType: () => set(() => ({ paymentType: '' })),
}),
{
  name: 'paymentType'
}));

export const useAddedParkingLotIdStore = create<addedParkingLotIdState>(persist((set) => ({
  parkingLotId: '',
  setParkingLotId: (parkingLotId: string) => set(() => ({ parkingLotId })),
  removeParkingLotId: () => set(() => ({ parkingLotId: '' })),
}),
  {
    name: 'parkingLotId'
  }));

  export const useAddedParkingLotCityNmStore = create<addedParkingLotCityNmState>(persist((set) => ({
    parkingLotCityNm: '',
    setParkingLotCityNm: (parkingLotCityNm: string) => set(() => ({ parkingLotCityNm })),
    removeParkingLotCityNm: () => set(() => ({ parkingLotCityNm: '' })),
  }),
    {
      name: 'parkingLotCityNm'
    }));

export const useAddedCustomerNameStore = create<addedCustomerNameState>(persist((set) => ({
  customerName: '',
  setCustomerName: (customerName: string) => set(() => ({ customerName })),
  removeCustomerName: () => set(() => ({ customerName: '' })),
}),
{
  name: 'customerName'
}));

export const useShowConfirmationDialogBoxStore = create<showConfirmationDialogBox>((set) => ({
  showConfirmationDialogBox: false,
  isFormFieldChange: false,
  showDialogBox: (showConfirmationDialogBox: boolean) => set(() => ({ showConfirmationDialogBox })),
  hideDialogBox: () => set(() => ({ showConfirmationDialogBox: false })),
  setFormFieldValue: (isFormFieldChange: boolean) => set(() => ({ isFormFieldChange })),
  resetFormFieldValue: () => set(() => ({ isFormFieldChange: false })),
}));
