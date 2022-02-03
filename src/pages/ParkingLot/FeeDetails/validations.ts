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
    serviceFeeRules: Yup.array().of(
        Yup.object().shape({
            serviceFeeCharge: Yup.string().nullable().required('Required'),
            productType:  Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
              }).nullable().required('Required'),
              masterProductType:  Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
              }).nullable().required('Required'),
              productName: Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
              }).nullable().required('Required'),
              considerAsset: Yup.boolean().required('Required'),
              assetType: Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
              }).nullable().required('Required'),
              assetTypeDesc: Yup.string().nullable().required('Required'),
              vehicleType: Yup.object().shape({
                label: Yup.string(),
                value: Yup.string(),
              }).nullable().required('Required')
        })
      ),
});
