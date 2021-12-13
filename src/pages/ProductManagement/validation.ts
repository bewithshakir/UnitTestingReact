import * as Yup from 'yup';
const selectOption = Yup.object({ label: Yup.string(), value: Yup.string() }).required('Required');
const priceSchema = Yup.string().matches(/^\d+(\.\d+)?$/, 'Invailid Price.');
export const AddProductValidationSchema = Yup.object(
    {
        paymentType: selectOption.required('Required'),
        productType: selectOption.required('Required'),
        masterProductName: selectOption.required('Required'),
        pricingModel: selectOption,
        productNm: Yup.string().required('Required'),
        manualPriceAmt: priceSchema.required('Required'),
        addedPriceAmt: priceSchema,
        discountPriceAmt: priceSchema.label('this').when(['manualPriceAmt', 'addedPriceAmt'], (manualPriceAmt: string, addedPriceAmt: any) => {
            return Yup.number().label('this').max(Number(manualPriceAmt) + Number(addedPriceAmt));
        }),
        timeSlot: selectOption
    }
);