import * as Yup from 'yup';

export const AddTruckParkingLotValidationSchema = Yup.object().shape({
    parkingLocationNm: Yup.string().required('Required'),
    addressLine1: Yup.string().required('Required'),
    addressLine2: Yup.string().required('Required').max(100, 'Address line2 must be at most 100 chars'),
    cityNm: Yup.string().required('Required'),
    stateNm: Yup.string().required('Required'),
    postalCd: Yup.string().required('Required'),
});

