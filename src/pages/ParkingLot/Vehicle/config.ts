import { FormikProps } from "formik";
import { ProductGroupObj } from "./queries";

export const formStatusObj = {
    success: {
        message: 'addVehicle.addSuccessMsg',
        type: 'Success',
    },
    editSuccess: {
        message: 'addVehicle.editSuccessMsg',
        type: 'Success',
    },
    error: {
        message: 'addVehicle.error',
        type: 'Error',
    },
};

export interface SelectProps {
    label: string;
    value: string;
    [k: string]: any
}

export interface VehicleAssetFormField {
    isApplyRule: boolean
    isAsset: boolean

    /** Vehicle section */
    vehicleType: SelectProps
    licenceNo: string
    vin: string
    year: string | number
    make: string
    model: string
    color: SelectProps

    /** Asset section */
    assetType: SelectProps
    assetId: string
    assetNote: string

    fuelProductName: SelectProps
    fuelCustomProductName: SelectProps

    isNonFuel: boolean
    nonFuelCustomProductName: SelectProps[]

    isAddOn: boolean
    addOnCustomProductName: SelectProps[]
}

export type FormFieldName = Extract<keyof VehicleAssetFormField, string>;

export const emptyOption = { label: '', value: '' };

export const initialFormValues: VehicleAssetFormField = {
    isApplyRule: false,
    isAsset: false,

    /** Vehicle section */
    vehicleType: { ...emptyOption },
    licenceNo: "",
    vin: "",
    year: "",
    make: "",
    model: "",
    color: { label: '', value: '' },
    /** Asset section */

    assetType: { ...emptyOption },
    assetId: "",
    assetNote: "",

    fuelProductName: { ...emptyOption },
    fuelCustomProductName: { ...emptyOption },

    isNonFuel: false,
    nonFuelCustomProductName: [],

    isAddOn: false,
    addOnCustomProductName: []
};

export interface SegmentProps {
    lotId: string
    formik: FormikProps<VehicleAssetFormField>
    productGroupObj?: ProductGroupObj
    getFormikProps: (
        name: FormFieldName,
        clearFields?: FormFieldName[]
    ) => {
        name: string;
        onChange: any;
        onBlur: any
    }
}

export const checkboxConfig = { marginLeft: "-0.5rem", marginBottom: "1rem", fontWeight: "bold" };

export const labelColor = "var(--Darkgray)";
export const selectOneText = 'addVehicle.selectOne';

export const formatSave = (customerId: string, lotId: string, formData: VehicleAssetFormField) => {
    const products = [formData.fuelCustomProductName.value];
    if (formData.isNonFuel) {
        formData.nonFuelCustomProductName.forEach(item => {
            products.push(item.value);
        });
    }
    if (formData.isAddOn) {
        formData.addOnCustomProductName.forEach(item => {
            products.push(item.value);
        });
    }
    const commonData = {
        isAsset: formData.isAsset ? "Y" : "N",
        customerId,
        deliveryLocationId: lotId,
        isApplyRule: formData.isApplyRule ? "Y" : "N",
        isNonFuel: formData.isNonFuel ? "Y" : "N",
        isAddOn: formData.isAddOn ? "Y" : "N",
        products: products
    };
    const assetData: { [k: string]: any } = {
        assetType: formData.assetType.value,
        assetIdNo: formData.assetId
    };
    if (formData.assetNote) {
        assetData.assetNotes = formData.assetNote;
    }
    const vehicleData = {
        vehicleType: formData.vehicleType.value,
        licenceNo: formData.licenceNo,
        vinNo: formData.vin,
        year: Number(formData.year),
        make: formData.make,
        model: formData.model,
        vehicleColor: formData.color.value,
        isFuel: "Y",
    };

    return {
        ...commonData,
        ...(formData.isAsset ? assetData : vehicleData)
    };
};
