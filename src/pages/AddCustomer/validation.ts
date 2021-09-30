import * as Yup from 'yup';

const AddCustomerValidationSchema = Yup.object().shape({
    customerName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    customerId: Yup.string().matches(/^[0-9]{8}$/, 'Invalid customer id.').required('Required'),
    addressLine1: Yup.string().required('Required'),
    addressLine2: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    postalCode: Yup.string().matches(/^[0-9]{8}$/, 'Invalid postal code.').required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    paymentType: Yup.array().min(1, 'Required'),
    invoiceFrequency: Yup.array().min(1, 'Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phoneNumber: Yup.string().matches(/^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/, 'Invalid phone number').required('Required'),
    endDate: Yup.object().required('Required'),
    paymentTerm: Yup.string().matches(/^[0-9]{1,2}$/, 'Invalid payment term.'),
});

export default AddCustomerValidationSchema;