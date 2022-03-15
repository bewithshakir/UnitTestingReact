import * as Yup from 'yup';

const selectOption = Yup.object().shape({
  label: Yup.string().required('Required'),
  value: Yup.string().required('Required'),
});
const priceSchema = Yup.string().matches(/^\d+(\.\d+)?$/, 'Invalid Price.');

export const AddProductValidationSchema = Yup.object().shape({
  productType: selectOption.nullable().required('Required'),
  masterProductName: selectOption.nullable().required('Required'),
  pricingModel: selectOption.nullable().required('Required'),
  productNm: Yup.string().required('Required'),
  manualPriceAmt: priceSchema.required('Required'),
  addedPriceAmt: priceSchema,
  discountPriceAmt: priceSchema
    .label('This')
    .when(
      ['manualPriceAmt', 'addedPriceAmt'],
      (manualPriceAmt: string, addedPriceAmt: any) => {
        return Yup.number()
          .typeError('Invalid Price.')
          .label('This')
          .min(0)
          .max((Number(manualPriceAmt) || 0) + (Number(addedPriceAmt) || 0));
      }
    ),
  city: Yup.object()
    .nullable()
    .test('pricingModel', function (value: any, context: any) {
      if (context?.parent?.pricingModel?.label?.toLowerCase() === 'opis rack') {
        if (!value || !value.value) {
          return this.createError({
            message: { label: 'Required', value: 'Required' },
          });
        } else {
          return true;
        }
      } else {
        return true;
      }
    }),
  cityId: Yup.string().nullable()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase() === 'opis rack') {
      if (!value) {
        return this.createError({
          message: { label: 'Required', value: 'Required' },
        });
      } else {
        return true;
      }
    } else {
      return true;
    }
  }),
  state: Yup.string().nullable()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase() === 'opis rack') {
      if (!value) {
        return this.createError({
          message: { label: 'Required', value: 'Required' },
        });
      } else {
        return true;
      }
    } else {
      return true;
    }
  }),
  supplier: Yup.array()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase()  === 'opis rack') {
        if (!value || (value && value.length === 0)) {
            return this.createError({
              message: 'Required',
            });
          } else {
            return true;
          }
    } else {
        return true;
      }
  }),
  branded: Yup.array()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase()  === 'opis rack') {
        if (!value || (value && value.length === 0)) {
            return this.createError({
              message: 'Required',
            });
          } else {
            return true;
          }
    } else {
        return true;
      }
  }),
  actualProduct:Yup.array()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase()  === 'opis rack') {
        if (!value || (value && value.length === 0)) {
            return this.createError({
              message: 'Required',
            });
          } else {
            return true;
          }
    } else {
        return true;
      }
  }),
  supplierPrice: Yup.number().nullable()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase() === 'opis rack') {
      if (value === null) {
        return this.createError({
          message: { label: 'Required', value: 'Required' },
        });
      } else {
        return true;
      }
    } else {
      return true;
    }
  }),
  opisName:  Yup.string().nullable()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase() === 'opis rack') {
      if (!value) {
        return this.createError({
          message: { label: 'Required', value: 'Required' },
        });
      } else {
        return true;
      }
    } else {
      return true;
    }
  }),
  taxExemption: Yup.array()
  .test('pricingModel', function (value: any, context: any) {
    if (context?.parent?.pricingModel?.label?.toLowerCase()  === 'opis rack') {
        if (!value) {
            return this.createError({
              message: { label: 'Required', value: 'Required' },
            });
          } else {
            return true;
          }
    } else {
        return true;
      }
  })
});
