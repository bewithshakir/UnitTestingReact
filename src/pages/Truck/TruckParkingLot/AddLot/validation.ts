import * as Yup from 'yup';

export const AddFuelTaxValidationSchema = Yup.object().shape({
    addressLine1: Yup.string(),
    addressLine2: Yup.string().required('Required'),
    cityNm: Yup.string().required('Required'),
    stateNm: Yup.string().required('Required'),
    postalCd: Yup.string().required('Required'),
});

