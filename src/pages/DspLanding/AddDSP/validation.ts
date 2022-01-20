import * as Yup from 'yup';

export const AddDSPSchema = Yup.object().shape({
    dspName: Yup.string().required('Required'),
    contactNm: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
    .matches(
      /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
      'Invalid phone number'
    ).required('Required'),
    addressLine1: Yup.string().required('Required'),
    addressLine2: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    postalCode: Yup.string()
      .matches(/^[0-9]{1,9}$/, 'Invalid postal code.')
      .required('Required')
});

