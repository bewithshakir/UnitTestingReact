import * as Yup from 'yup';

export const AddUserSchema = Yup.object().shape({
    userGroup: Yup.object().shape({
        label: Yup.string().required('Required'), value: Yup.string().required('Required')
    }).required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    userName: Yup.string().required('Required'),
    phone: Yup.string().matches(
        /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
        'Invalid phone number'
    ),
    userAccessLevel: Yup.string().required('Required'),
});

