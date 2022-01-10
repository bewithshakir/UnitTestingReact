import * as Yup from 'yup';

const stringInput = Yup.string().required('Required');
const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).required('Required');


export const AddFeeDetailsValidationSchema = Yup.object().shape({
    feeName: stringInput,
    delFee: stringInput,
    delFeeShed: selectOption,
    serviceFeeCharge: stringInput,
    productType: selectOption,
    masterProductType: selectOption,
    productName: selectOption,
    assetType: selectOption,
    assetTypeDesc: stringInput,
    vehicleType: selectOptional,
});
