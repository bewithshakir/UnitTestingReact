import * as Yup from 'yup';
export const AddProductValidationSchema = Yup.object(
    {
        state: Yup.string().required('Required'),
        paymentType: Yup.object()
    }
);