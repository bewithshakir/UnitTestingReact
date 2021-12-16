import * as Yup from 'yup';
const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).required('Required');
const priceSchema = Yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Invalid Price.');
export const AddProductValidationSchema = Yup.object().shape(
    {
        productType: selectOption,
        masterProductName:selectOption,
        pricingModel: selectOption,
        productNm:  Yup.string().required('Required'),
        manualPriceAmt: priceSchema.required('Required'),
        addedPriceAmt:priceSchema,
        discountPriceAmt:priceSchema,
        timeSlot:selectOptional
    }
);