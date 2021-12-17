import * as Yup from 'yup';

const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');

export const AddOpisCitiesValidation = Yup.object().shape({
    state: selectOption,
    city: selectOption,
    cityid: Yup.string().required('Required')
});

export const formStatusObj = {
    success: {
        message: 'Product is successfully added',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
};