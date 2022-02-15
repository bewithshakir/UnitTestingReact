export const formStatusObj = {
  success: {
    message: 'Product is successfully added',
    type: 'Success',
  },
  editSuccess: {
    message: 'Product is successfully edited',
    type: 'Success',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'Error',
  },
};

export const productOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const productTypes = [
  { label: 'Fuel', value: 'fuel' },
  { label: 'Non- Fuel', value: 'nonFuel' },
  { label: 'Add on Service', value: 'addon' },
];

export const masterProducts = [{ label: 'Regular', value: 'regular' }];

export const pricingModelOptions = [
  { label: 'OPIS Retail', value: 'OpisRegail' },
  { label: 'OPIS RACK', value: 'OpisRack' },
  { label: 'Custom', value: 'Custom' },
];

export const stateOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const cityOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const cityIdOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const supplierOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const brandedOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const actualProductOptions = [
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
];

export const strCustomText = 'custom';
export const strCustomTextRetail = 'opis retail';

export interface SelectProps {
  label: string;
  value: string;
}

// export interface fuelTaxExemptionsFormat {
//   field: string;
//   label: string;
//   value: boolean;
// }

export const checkBoxList = [
    { field: 'stateFuelTax', label: 'State Fuel Tax', value: false },
    { field: 'stateFuelRate', label: 'State Fuel Rate', value: false },
    { field: 'cityFuelTax', label: 'City Fuel Tax', value: false },
    { field: 'countyFuelTax', label: 'County Fuel Tax', value: false },
    { field: 'fedFuelTax', label: 'Federal Fuel Tax', value: false },
    { field: 'revenueFuelRate', label: 'Revenue Fuel Rate', value: false },
    { field: 'miscLocalFuelTax', label: 'Misc. Local Fuel Tax', value: false },
    { field: 'miscInspFuelTax', label: 'Misc. Insp. Fuel Tax', value: false },
    { field: 'miscLoadFuelTax', label: 'Misc. Load Fuel Tax', value: false },
    { field: 'ppdSalesTax', label: 'PPD Sales Tax(Prepaid)', value: false },
  ];

export interface productFormFields{
    productType: SelectProps,
    masterProductName: SelectProps,
    pricingModel: SelectProps,
    productNm: string,
    manualPriceAmt: number,
    addedPriceAmt: number,
    discountPriceAmt: number,
    city?: string;
    cityId?: string;
    state?: string;
    supplier?: Array<SelectProps>;
    branded?: Array<SelectProps>;
    actualProduct?: Array<SelectProps>;
    supplierPrice?: number;
    opisName?: string;
    // stateFuelTax?:boolean,
    // stateFuelRate?: boolean,
    // cityFuelTax?: boolean,
    // countyFuelTax?: boolean, 
    // fedFuelTax?: boolean,
    // revenueFuelRate?: boolean,  
    // miscLocalFuelTax?: boolean, 
    // miscInspFuelTax?: boolean, 
    // miscLoadFuelTax?: boolean, 
    // ppdSalesTax?: boolean,
    // fuelTaxExemptions?: Array<fuelTaxExemptionsFormat>,
    taxExemption?:Array<any>
    TaxExObj?:any
}  

export const initFormValues = {
    productType: { label: '', value: '' },
    masterProductName: { label: '', value: '' },
    pricingModel: { label: '', value: '' },
    productNm: '',
    manualPriceAmt: 0,
    addedPriceAmt: 0,
    discountPriceAmt: 0,
    city: '',
    cityId: '',
    state: '',
    supplier: [],
    branded: [],
    actualProduct: [],
    supplierPrice: 0,
    opisName: '',
    taxExemption:[],
    TaxExObj: {}
  };

 export const checkboxConfig =  { margin: "0px", marginBottom: "1rem", fontWeight: "bold" };
  