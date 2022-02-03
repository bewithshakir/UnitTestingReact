import * as Yup from 'yup';

const stringInput = Yup.string().nullable().required('Required');
const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
// const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).nullable().required('Required');


export const AddFeeDetailsValidationSchema = Yup.object().shape({
    feeName: stringInput,
    delFee: stringInput,
    delFeeShed: selectOption,
    serviceFeeRules: Yup.array().of(
        Yup.object().shape({
            serviceFeeCharge: stringInput,
            productType:  selectOption,
              masterProductType: selectOption,
              productName: selectOption,
              considerAsset: Yup.boolean().required('Required'),
              assetType: selectOption,
              assetTypeDesc:stringInput,
              vehicleType: selectOption
        })
      ),
});
