import * as Yup from 'yup';
const selectOption = Yup.object({ label: Yup.string(), value: Yup.string()}).required('Required');
const priceSchema = Yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Invailid Price.');
export const AddProductValidationSchema = Yup.object(
    {
        paymentType: selectOption, 
        productType: selectOption,
        masterProductName:selectOption,
        pricingModel: selectOption,
        productNm:  Yup.string().required('Required'),
        manualPriceAmt: priceSchema.required('Required'),
        addedPriceAmt:priceSchema,
        discountPriceAmt:priceSchema,
        timeSlot:selectOption
    }
);