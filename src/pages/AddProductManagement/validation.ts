import * as Yup from 'yup';

export const AddProductValidationSchema = Yup.object().shape({
    productName: Yup.string().required('Required'),
    productType: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required'),
    productColor: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required'),
    productStatus: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required'),
    productPricing: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid manual pricing')
});

