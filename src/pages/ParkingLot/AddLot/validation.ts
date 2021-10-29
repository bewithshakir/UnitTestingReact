import * as Yup from 'yup';

const AddParkingLotValidationSchema = Yup.object().shape({
    lotName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    lotId: Yup.string().max(10, 'Lot Id should have maximum of 10 digits').matches(/^\d{1,10}$/, 'Invalid Lot Id').required('Required'),
    addressLine1: Yup.string().required('Required'),
    addressLine2: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'), 
    county: Yup.string().required('Required'), 
    postalCode: Yup.string().matches(/^[0-9]{1,9}$/, 'Invalid postal code.').required('Required'),
    jurisdictionId: Yup.string().min(13, 'Should be minimum 13 characters long').required('Required'),
    productDelFreq: Yup.object().shape({ label: Yup.string(), value: Yup.string() }),
    timeZone: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }),
    locationContact: Yup.array()
        .of(
            Yup.object().shape({
                firstName: Yup.string().required('Required'),
                lastName: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email').required('Required'),
                phoneNumber: Yup.string().matches(/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, 'Invalid phone number').required('Required'),
            })
        )
        .required('Must have emergency contact') 
        .min(1, 'Minimum of 1 emergency contact'),
    // orderScheduleDel: Yup.array()
    //     .of(
    //         Yup.object().shape({
    //             fromDate: Yup.object().required('Required'),
    //             toDate: Yup.object().required('Required'),
    //             startTime: Yup.string().required('Required'),
    //             endTime: Yup.string().required('Required'),
    //             productDelDays: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') })
    //         })
    //     )
        // .required('Must have cp contact') 
        // .min(1, 'Minimum of 1 cp contact'),
});

export default AddParkingLotValidationSchema;