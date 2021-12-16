import * as Yup from 'yup';

const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');

export const AddOpisCitiesValidationSchema = Yup.object().shape({
    state: selectOption,
    city: selectOption,
    cityid: Yup.string().required('Required')
});