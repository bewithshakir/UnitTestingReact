import * as Yup from 'yup';
const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
// const selectOptional = Yup.object().shape({ label: Yup.string(), value: Yup.string() }).required('Required');
const priceSchema = Yup.string().matches(/^\d+(\.\d+)?$/, 'Invalid Price.');
const inputStrSchema = Yup.string().nullable();

export const AddProductValidationSchema = Yup.object().shape(
    {
        productType: selectOption,
        masterProductName: selectOption,
        pricingModel: selectOption,
        productNm: Yup.string().required('Required'),
        manualPriceAmt: priceSchema.required('Required'),
        addedPriceAmt: priceSchema,
        discountPriceAmt: priceSchema.label('This').when(['manualPriceAmt', 'addedPriceAmt'], (manualPriceAmt: string, addedPriceAmt: any) => {
            return Yup.number().typeError('Invalid Price.').label('This').min(0).max((Number(manualPriceAmt) || 0) + (Number(addedPriceAmt) || 0));
        }),
        city: inputStrSchema,
        cityId: inputStrSchema,
        state: inputStrSchema,
        supplier: Yup.array(),
        branded: Yup.array(),
        actualProduct: Yup.array(),
        supplierPrice: Yup.string(),
        opisName:inputStrSchema,
    }
);
