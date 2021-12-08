import * as Yup from 'yup';
const selectOption = Yup.object({ label: Yup.string(), value: Yup.string()});
export const AddProductValidationSchema = Yup.object(
    {
        paymentType: selectOption, 
        productType: selectOption,
        masterProductName:selectOption,
        pricingModel: selectOption,
        productName:  Yup.string(),
        pricePerGallon: Yup.number().min(0),
        addedPricePerGallon: Yup.number().min(0),
        discountPerGallon:Yup.number().min(0),
        timeSlot:selectOption
    }
);