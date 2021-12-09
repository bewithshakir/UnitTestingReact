import * as Yup from 'yup';
const selectOption = Yup.object({ label: Yup.string(), value: Yup.string()});
export const AddProductValidationSchema = Yup.object(
    {
        paymentType: selectOption, 
        productType: selectOption,
        masterProductName:selectOption,
        pricingModel: selectOption,
        productNm:  Yup.string().required(),
        manualPriceAmt: Yup.number().min(0),
        addedPriceAmt: Yup.number().min(0),
        discountPriceAmt:Yup.number().min(0),
        timeSlot:selectOption
    }
);