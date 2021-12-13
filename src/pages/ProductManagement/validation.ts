import * as Yup from 'yup';
<<<<<<< HEAD
const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).required('Required');
const priceSchema = Yup.string().matches(/^\d+(\.\d+)?$/, 'Invalid Price.');
export const AddProductValidationSchema = Yup.object().shape(
    {
        productType: selectOption,
        masterProductName: selectOption,
=======
const selectOption = Yup.object({ label: Yup.string(), value: Yup.string() }).required('Required');
const priceSchema = Yup.string().matches(/^\d+(\.\d+)?$/, 'Invailid Price.');
export const AddProductValidationSchema = Yup.object(
    {
        paymentType: selectOption.required('Required'),
        productType: selectOption.required('Required'),
        masterProductName: selectOption.required('Required'),
>>>>>>> d91bdc4 (enh: solve decimal/validation issue)
        pricingModel: selectOption,
        productNm: Yup.string().required('Required'),
        manualPriceAmt: priceSchema.required('Required'),
        addedPriceAmt: priceSchema,
        discountPriceAmt: priceSchema.label('this').when(['manualPriceAmt', 'addedPriceAmt'], (manualPriceAmt: string, addedPriceAmt: any) => {
            return Yup.number().label('this').max(Number(manualPriceAmt) + Number(addedPriceAmt));
        }),
<<<<<<< HEAD
        timeSlot: selectOptional
=======
        timeSlot: selectOption
>>>>>>> d91bdc4 (enh: solve decimal/validation issue)
    }
);
