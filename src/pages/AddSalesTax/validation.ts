import * as Yup from 'yup';

export const AddSalesTaxValidationSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    stateRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    localRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required')
});


export const AddSalesTaxValidationSchemaEdit = Yup.object().shape({
    addressLine1: Yup.string(),
    state: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    stateRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    localRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required')
});
