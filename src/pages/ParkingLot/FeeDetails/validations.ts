import * as Yup from 'yup';

const stringInput = Yup.string().nullable().required('Required');
const selectOption = Yup.object()
  .shape({
    label: Yup.string().required('Required'),
    value: Yup.string().required('Required'),
  })
  .nullable().required('Required');
// const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).nullable().required('Required');

export const AddFeeDetailsValidationSchema = Yup.object().shape({
  feeName: stringInput,
  delFee: stringInput,
  delFeeShed: selectOption,
  serviceFeeRules: Yup.array().of(
    Yup.object().shape({
      serviceFeeCharge: stringInput,
      productType: selectOption,
    //   masterProductType: selectOption,
        masterProductType: Yup.object().nullable().test('productType', function (value: any, context: any) {
            if (context?.parent?.productType?.value?.toLowerCase() ===  'all') {
              return true;
            } else {
                if (!value || !value.value) {
                    return this.createError({ message: {label: 'Required', value: 'Required'} });
                }else{
                    return true;
                }
            }
          }),
    //   productName: selectOption,
    productName: Yup.object().nullable().test('productType', function (value: any, context: any) {
        if (context?.parent?.productType?.value?.toLowerCase() ===  'all') {
          return true;
        } else {
            if (!value || !value.value) {
                return this.createError({ message: {label: 'Required', value: 'Required'} });
            }else{
                return true;
            }
        }
      }),
      considerAsset: Yup.boolean().nullable(),
      assetType: Yup.object().nullable().test('considerAsset', function (value: any, context: any) {
        if (context?.parent?.considerAsset) {
          return this.createError({ message: { label: 'Required', value: 'Required' } });
        } else {
          return true;
        }
      }),
      assetTypeDesc: Yup.string().nullable(),
      vehicleType: selectOption,
    })
  ),
});
