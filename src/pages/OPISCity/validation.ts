import * as Yup from 'yup';

const selectOption = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');

export const AddOpisCitiesValidation = Yup.object().shape({
    state: selectOption,
    city: selectOption,
});