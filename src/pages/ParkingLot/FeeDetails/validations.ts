import * as Yup from 'yup';

const stringInput = Yup.string().nullable().required('Required');
const stringNumInput = Yup.string().nullable().matches(/^\d+$/, 'Fee Should be a number').required('Required');
const selectOption = Yup.object()
  .shape({
    label: Yup.string().required('Required'),
    value: Yup.string().required('Required'),
  })
  .nullable().required('Required');
// const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).nullable().required('Required');

export const AddFeeDetailsValidationSchema = Yup.object().shape({
  feeName: stringInput,
  delFee: stringNumInput,
  delFeeShed: selectOption,
  serviceFeeRules: Yup.array().of(
    Yup.object().shape({
      serviceFeeCharge: stringNumInput,
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
      if (context?.parent?.productType?.value?.toLowerCase() === 'all' || context?.parent?.masterProductType?.value?.toLowerCase() === 'all') {
          return true;
        } else {
            if (!value || !value.value) {
                return this.createError({ message: {label: 'Required', value: 'Required'} });
            }else{
                return true;
            }
        }
      }),
      considerAsset: Yup.boolean(),
      assetType: Yup.object().nullable().test('considerAsset', function (value: any, context: any) {
        if (!(context?.parent?.considerAsset)) {
          return true;
        } else {
          if (!value || !value.value) {
            return this.createError({ message: { label: 'Required', value: 'Required' } });
          } else {
            return true;
          }
        }
      }),
      assetTypeDesc: Yup.string().nullable(),
      vehicleType: Yup.object().nullable().test('considerAsset', function (value: any, context: any) {
        if (context?.parent?.considerAsset) {
          return true;
        } else {
          if (!value || !value.value) {
            return this.createError({ message: { label: 'Required', value: 'Required' } });
          } else {
            return true;
          }
        }
      }),
    })
  ),
});
