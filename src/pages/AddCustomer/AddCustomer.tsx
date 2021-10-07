import React, { useState, useEffect } from 'react';
import { Add, FileCopy } from '@material-ui/icons';
import { Box, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material';
import axios from 'axios';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/UIComponents/Button/Button.component';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import { DatePicker } from '../../components/UIComponents/DatePicker/DatePicker.component';
import Input from '../../components/UIComponents/Input/Input';
import HorizontalBar from '../../components/UIComponents/NavigationBar/HorizontalBar';
import Select from '../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import { getCountryCode } from '../../navigation/utils';
import Legend from '../Legend/index';
import "./AddCustomer.style.scss";
import AddCustomerValidationSchema from './validation';
import DiscardChangesDialog from '../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AutocompleteInput from '../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';

interface SelectProps {
    label: string,
    value: string,
}

interface EmergencyContact {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

interface ApContact {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
}

interface AddCustomerForm {
    // General Information
    customerName: string,
    customerId: string,
    addressLine1: string,
    addressLine2: string,
    city: string,
    state: string,
    postalCode: string,
    // Customer Contact
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    // Payment and Wallet rules
    paymentType: SelectProps,
    invoiceFrequency: SelectProps,
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    paymentTerm: string,
    lotLevel: boolean,
    businessLevel: boolean,
    vehicleLevel: boolean,
    // Emergency Contact
    emergencyContact: EmergencyContact[]
    apContact: ApContact[],
}

const initialValues: AddCustomerForm = {
    customerName: '',
    customerId: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    paymentType: { label: '', value: '' },
    invoiceFrequency: { label: '', value: '' },
    startDate: moment(),
    endDate: moment(),
    paymentTerm: '',
    lotLevel: true,
    businessLevel: false,
    vehicleLevel: false,
    emergencyContact: [{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    }],
    apContact: [{
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    }],
};

function getTokenApplicable (Obj: any) {
    const temp: any = [];
    Object.entries(Obj).forEach(obj => {
        if (obj[1]) {
            temp.push(obj[0]).toString();
        }
    })
    return temp;
}

interface IFormStatus {
    message: string
    type: string
}
interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Signed up successfully.',
        type: 'Success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'Error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
}

const AddCustomer: React.FC<{}> = (props: any) => {
    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const [paymentTypes, setpaymentTypes] = useState([]);
    const [initialInvoiceFrequencies, setinitialInvoiceFrequencies] = useState([]);

    const [apiResposneState, setAPIResponse] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleModelToggle = () => {
        setOpen(prev => !prev);
    };

    const handleModelConfirm = () => {
        setOpen(prev => !prev);
        history.push('/')
    };

    const createNewCustomer = async (data: AddCustomerForm, resetForm: Function) => {
        try {
            const apiPayload = {
                "customerName": data.customerName,
                "customerInputId": data.customerId,
                "addressLine1": data.addressLine1,
                "addressLine2": data.addressLine2,
                "addressLine3": "",
                "cityNm": data.city,
                "stateNm": data.state,
                "postalCd": Number(data.postalCode),
                "contactFirstNm": data.firstName,
                "contactLastNm": data.lastName,
                "contactEmailId": data.email,
                "contactPhoneNo": data.phoneNumber,
                "paymentTypeId": data.paymentType.value,
                "customerTypeId": "f6f0ec11-cd88-455d-9158-8ade75ddfb3b",
                "invoiceFrequencyId": data.invoiceFrequency.value,
                "firstSettlementDt": data.endDate,
                "paymentTerm": Number(data.paymentTerm),
                "countryCd": getCountryCode(),
                "soldToNo": 10,
                "emergencyContact": data.emergencyContact.map(emgcyObj => ({
                    "firstNm": emgcyObj.firstName,
                    "lastNm": emgcyObj.lastName,
                    "email": emgcyObj.email,
                    "phoneNo": emgcyObj.phoneNumber
                })),
                "apContact": data.apContact.map(apObj => ({
                    "firstNm": apObj.firstName,
                    "lastNm": apObj.lastName,
                    "email": apObj.email,
                    "phoneNo": apObj.phoneNumber
                })),
                "tokenApplicabilityLevel": getTokenApplicable({
                    lot: data.lotLevel, business: data.businessLevel, vehicle: data.vehicleLevel
                })
            }
            axios.post('http://20.81.30.168:4001/api/customer-service/customers', apiPayload)
                .then(function (response) {
                    setAPIResponse(true);
                    if (response.data) {
                        setFormStatus(formStatusProps.success)
                        setTimeout(() => {
                            setAPIResponse(false);
                        }, 6000);
                        resetForm({})
                    }
                })
                .catch(function (error) {
                    const response = error.response
                    if (
                        response.data === 'user already exist' &&
                        response.status === 400
                    ) {
                        setFormStatus(formStatusProps.duplicate)
                    } else {
                        setFormStatus(formStatusProps.error)
                    }
                });
        } catch (error) {
            setFormStatus(formStatusProps.error)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: AddCustomerValidationSchema,
        onSubmit: (values, actions) => {
            createNewCustomer(values, actions.resetForm);
        },
        enableReinitialize: true,
    });

    const fetchList = (listof: string, fieldName: string) => {
        axios.get(`http://20.81.30.168:4001/api/customer-service/customers/${listof}?countryCode=us`)
            .then(response => response.data)
            .then(({ data }) => {
                if (data) {
                    if (fieldName === 'paymentTypes') {
                        setpaymentTypes(data.map((obj: any) => ({ label: obj[`${listof}Nm`].trim(), value: obj[`${listof}Id`].trim() })));
                    } else {
                        setinitialInvoiceFrequencies(data.map((obj: any) => ({ label: obj[`${listof}Nm`].trim(), value: obj[`${listof}Id`].trim() })));
                    }
                }
            })
            .catch(error => {
                setFormStatus(formStatusProps.error)
            });
    }

    useEffect(() => {
        fetchList('paymentType', 'paymentTypes');
        fetchList('invoiceFrequency', 'initialInvoiceFrequencies');
    }, [])

    const history = useHistory()

    const isFormFieldChange = () => formik.dirty

    function onClickBack () {
        if (isFormFieldChange()) {
            handleModelToggle();
        } else {
            history.push('/')
        }
    }

    function handleGoogleAddressChange (addressObj: any) {
        formik.setFieldValue('addressLine1', addressObj.addressLine1)
        formik.setFieldValue('addressLine2', addressObj.addressLine2)
        formik.setFieldValue('city', addressObj.city)
        formik.setFieldValue('state', addressObj.state)
        formik.setFieldValue('postalCode', addressObj.postalCode)
    }

    return (
        <Box display="flex" mt={8}>
            <CssBaseline />
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />

            <Grid container pl={6.25} className="main-area">
                <Grid item md={2} pt={5} xs={2} className="legend-area">
                    <Legend />
                </Grid>
                <Grid item md={10} pt={5} xs={10} className="page-area">
                    <Container maxWidth="lg" className="page-container">
                        <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <Typography variant="h3" component="h3" gutterBottom className="fw-bold" mb={1}>
                                    Customer Profile
                                </Typography>
                                <Grid container mt={1}>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                            General Information
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <Input
                                            id='customerName'
                                            label='Customer Name'
                                            type='text'
                                            helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                            error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('customerName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                        <Input
                                            id='customerId'
                                            label='Customer ID'
                                            type='text'
                                            helperText={(formik.touched.customerId && formik.errors.customerId) ? formik.errors.customerId : undefined}
                                            error={(formik.touched.customerId && formik.errors.customerId) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('customerId')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <AutocompleteInput
                                            name='addressLine1'
                                            label='ADDRESS LINE 1'
                                            onChange={handleGoogleAddressChange}
                                            onBlur={() => { formik.setFieldTouched("addressLine1"); formik.validateField("addressLine1"); }}
                                            value={formik.values.addressLine1}
                                            helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                            error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                            required
                                        />

                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                        <Input
                                            id='addressLine2'
                                            label='ADDRESS LINE 2'
                                            type='text'
                                            helperText={(formik.touched.addressLine2 && formik.errors.addressLine2) ? formik.errors.addressLine2 : undefined}
                                            error={(formik.touched.addressLine2 && formik.errors.addressLine2) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('addressLine2')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <Input
                                            id='city'
                                            label='City'
                                            type='text'
                                            helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                            error={(formik.touched.city && formik.errors.city) ? true : false}
                                            description=''
                                            disabled
                                            required
                                            {...formik.getFieldProps('city')}
                                        />
                                    </Grid>
                                    <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                        <Input
                                            id='state'
                                            label='STATE / PROVINCE'
                                            type='text'
                                            helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                                            error={(formik.touched.state && formik.errors.state) ? true : false}
                                            description=''
                                            disabled
                                            required
                                            {...formik.getFieldProps('state')}
                                        />
                                    </Grid>
                                    <Grid item md={3} pl={2.5}>
                                        <Input
                                            id='postalCode'
                                            label='POSTAL CODE'
                                            type='text'
                                            helperText={(formik.touched.postalCode && formik.errors.postalCode) ? formik.errors.postalCode : undefined}
                                            error={(formik.touched.postalCode && formik.errors.postalCode) ? true : false}
                                            description=''
                                            disabled
                                            required
                                            {...formik.getFieldProps('postalCode')}
                                        />
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                            Customer Contact
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <Input
                                            id='firstName'
                                            label='First Name'
                                            type='text'
                                            helperText={(formik.touched.firstName && formik.errors.firstName) ? formik.errors.firstName : undefined}
                                            error={(formik.touched.firstName && formik.errors.firstName) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('firstName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                        <Input
                                            id="lastName"
                                            label='Last Name'
                                            type='text'
                                            helperText={(formik.touched.lastName && formik.errors.lastName) ? formik.errors.lastName : undefined}
                                            error={(formik.touched.lastName && formik.errors.lastName) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('lastName')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <Input
                                            id='email'
                                            label='Email'
                                            helperText={(formik.touched.email && formik.errors.email) ? formik.errors.email : undefined}
                                            error={(formik.touched.email && formik.errors.email) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('email')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                        <Input
                                            id='phoneNumber'
                                            label='Phone Number'
                                            type='text'
                                            helperText={(formik.touched.phoneNumber && formik.errors.phoneNumber) ? formik.errors.phoneNumber : undefined}
                                            error={(formik.touched.phoneNumber && formik.errors.phoneNumber) ? true : false}
                                            description=''
                                            required
                                            {...formik.getFieldProps('phoneNumber')}
                                        />
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                            Payment and Wallet rules
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <Select
                                            id='paymentType'
                                            name='paymentType'
                                            label='PAYMENT TYPE'
                                            value={formik.values.paymentType}
                                            placeholder='Choose'
                                            items={paymentTypes}
                                            helperText={(formik.touched.paymentType && formik.errors.paymentType) ? formik.errors.paymentType.value : undefined}
                                            error={(formik.touched.paymentType && formik.errors.paymentType) ? true : false}
                                            onChange={formik.setFieldValue}
                                            onBlur={() => { formik.setFieldTouched("paymentType"); formik.validateField("paymentType"); }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5} />
                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                        <Select
                                            id='invoiceFrequency'
                                            name='invoiceFrequency'
                                            label='INVOICE FREQUENCY'
                                            value={formik.values.invoiceFrequency}
                                            placeholder='Choose'
                                            items={initialInvoiceFrequencies}
                                            helperText={(formik.touched.invoiceFrequency && formik.errors.invoiceFrequency) ? formik.errors.invoiceFrequency.value : undefined}
                                            error={(formik.touched.invoiceFrequency && formik.errors.invoiceFrequency) ? true : false}
                                            onChange={formik.setFieldValue}
                                            onBlur={() => { formik.setFieldTouched("invoiceFrequency"); formik.validateField("invoiceFrequency"); }}
                                            required
                                        />
                                    </Grid>
                                    <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                        <DatePicker
                                            id="endDate"
                                            name="endDate"
                                            value={formik.values.endDate}
                                            label='CUSTOMER START DATE'
                                            onChange={formik.setFieldValue}
                                            onClose={() => { formik.setFieldTouched("endDate"); formik.validateField("endDate"); }}
                                            disableBeforeDate={formik.values.startDate}
                                            helperText={(formik.touched.endDate && formik.errors.endDate) ? formik.errors.endDate : undefined}
                                            error={(formik.touched.endDate && formik.errors.endDate) ? true : false}
                                            required
                                        />
                                    </Grid>
                                    <Grid item md={3} pl={2.5}>
                                        <Input
                                            id='paymentTerm'
                                            label='PAYMENT TERM'
                                            type='text'
                                            helperText={(formik.touched.paymentTerm && formik.errors.paymentTerm) ? formik.errors.paymentTerm : undefined}
                                            error={(formik.touched.paymentTerm && formik.errors.paymentTerm) ? true : false}
                                            description=''
                                            {...formik.getFieldProps('paymentTerm')}
                                        />
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <FormControl sx={{ m: 3 }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                    control={
                                                        <Checkbox checked={formik.values.lotLevel} onChange={formik.handleChange} name="lotLevel" />
                                                    }
                                                    label={
                                                        <Typography variant="h4" component="h4" className="fw-bold">
                                                            Apply at Lot level
                                                        </Typography>
                                                    }
                                                />
                                                <FormControlLabel
                                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                    control={
                                                        <Checkbox checked={formik.values.businessLevel} onChange={formik.handleChange} name="businessLevel" />
                                                    }
                                                    label={
                                                        <Typography variant="h4" component="h4" className="fw-bold">
                                                            Apply at Busines level
                                                        </Typography>
                                                    }
                                                />
                                                <FormControlLabel
                                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                    control={
                                                        <Checkbox checked={formik.values.vehicleLevel} onChange={formik.handleChange} name="vehicleLevel" />
                                                    }
                                                    label={
                                                        <Typography variant="h4" component="h4" className="fw-bold">
                                                            Apply at Vehicle level
                                                        </Typography>
                                                    }
                                                />
                                            </FormGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                            Emergency Contact
                                        </Typography>
                                    </Grid>
                                    <FieldArray
                                        name="emergencyContact"
                                        render={(arrayHelpers) => (
                                            <React.Fragment>
                                                {formik.values.emergencyContact.map((contactList, index) => (
                                                    <Grid container key={index}>
                                                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                            <Input
                                                                id={`emergencyContact[${index}].firstName`}
                                                                label='First Name'
                                                                type='text'
                                                                helperText={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.firstName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.firstName))
                                                                        ?
                                                                        (formik.errors.emergencyContact[index] as EmergencyContact).firstName : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.firstName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.firstName))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                required
                                                                {...formik.getFieldProps(`emergencyContact[${index}].firstName`)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                            <Input
                                                                id={`emergencyContact[${index}].lastName`}
                                                                label='Last Name'
                                                                type='text'
                                                                helperText={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.lastName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.lastName))
                                                                        ?
                                                                        (formik.errors.emergencyContact[index] as EmergencyContact).lastName : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.lastName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.lastName))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                required
                                                                {...formik.getFieldProps(`emergencyContact[${index}].lastName`)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                            <Input
                                                                id={`emergencyContact[${index}].email`}
                                                                label='Email'
                                                                type="text"
                                                                helperText={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.email && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.email))
                                                                        ?
                                                                        (formik.errors.emergencyContact[index] as EmergencyContact).email : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.email && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.email))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                required
                                                                {...formik.getFieldProps(`emergencyContact[${index}].email`)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                            <Input
                                                                id={`emergencyContact[${index}].phoneNumber`}
                                                                label='Phone Number'
                                                                type='text'
                                                                helperText={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.phoneNumber && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                        ?
                                                                        (formik.errors.emergencyContact[index] as EmergencyContact).phoneNumber : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                        (formik.touched?.emergencyContact?.[index]?.phoneNumber && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                {...formik.getFieldProps(`emergencyContact[${index}].phoneNumber`)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                ))}

                                                <Grid item md={12} mt={2} mb={4}>
                                                    <Link
                                                        variant="body2"
                                                        sx={{ display: "flex", alignItems: "center" }}
                                                        onClick={() => {
                                                            if (formik.values.emergencyContact.length < 5) {
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" })
                                                            }
                                                        }}
                                                    >
                                                        <Add />
                                                        <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                                            ADD EMERGENCY CONTACT
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                            </React.Fragment>
                                        )}
                                    />

                                    <Grid item md={12} mt={2} mb={1}>
                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                            AP Contact
                                        </Typography>
                                    </Grid>
                                    <FieldArray
                                        name="apContact"
                                        render={(arrayHelpers) => (
                                            <React.Fragment>
                                                {formik.values.apContact.map((apContactList, index) => (
                                                    <Grid container key={index}>
                                                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                            <Input
                                                                id={`apContact[${index}].firstName`}
                                                                label='First Name'
                                                                type='text'
                                                                helperText={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.firstName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.firstName))
                                                                        ?
                                                                        (formik.errors.apContact[index] as EmergencyContact).firstName : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.firstName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.firstName))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                required
                                                                {...formik.getFieldProps(`apContact[${index}].firstName`)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                            <Input
                                                                id={`apContact[${index}].lastName`}
                                                                label='Last Name'
                                                                type='text'
                                                                helperText={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.lastName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.lastName))
                                                                        ?
                                                                        (formik.errors.apContact[index] as EmergencyContact).lastName : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.lastName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.lastName))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                required
                                                                {...formik.getFieldProps(`apContact[${index}].lastName`)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                            <Input
                                                                id={`apContact[${index}].email`}
                                                                label='Email'
                                                                type="text"
                                                                helperText={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.email && ((formik.errors?.apContact?.[index] as EmergencyContact)?.email))
                                                                        ?
                                                                        (formik.errors.apContact[index] as EmergencyContact).email : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.email && ((formik.errors?.apContact?.[index] as EmergencyContact)?.email))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                required
                                                                {...formik.getFieldProps(`apContact[${index}].email`)}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                            <Input
                                                                id={`apContact[${index}].phoneNumber`}
                                                                label='Phone Number'
                                                                type='text'
                                                                helperText={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.phoneNumber && ((formik.errors?.apContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                        ?
                                                                        (formik.errors.apContact[index] as EmergencyContact).phoneNumber : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                        (formik.touched?.apContact?.[index]?.phoneNumber && ((formik.errors?.apContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                        ? true : false
                                                                }
                                                                description=''
                                                                {...formik.getFieldProps(`apContact[${index}].phoneNumber`)}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                ))}

                                                <Grid item md={12} mt={2} mb={4}>
                                                    <Link
                                                        variant="body2"
                                                        sx={{ display: "flex", alignItems: "center" }}
                                                        onClick={() => {
                                                            if (formik.values.apContact.length < 5) {
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" })
                                                            }
                                                        }}
                                                    >
                                                        <Add />
                                                        <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                                            ADD AP CONTACT
                                                        </Typography>
                                                    </Link>
                                                </Grid>

                                            </React.Fragment>
                                        )}
                                    />

                                    <Grid item md={12} mt={2} mb={1}>
                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                            Import Contract (Optional)
                                        </Typography>
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <Box className="import-file">
                                            <FileCopy />

                                            <Typography variant="h4" component="h4" display={"inline-flex"} className="fw-bold pl-3" mb={1}>
                                                Import Contract (Optional)
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <Box className="form-action-section">
                                            <Button
                                                types="cancel"
                                                aria-label="cancel"
                                                className="mr-4"
                                                onClick={onClickBack}
                                            >
                                                {t("buttons.cancel")}
                                            </Button>
                                            <Button
                                                type="submit"
                                                types="save"
                                                aria-label="save"
                                                className="ml-4"
                                                disabled={!formik.isValid || formik.isSubmitting}
                                            >
                                                {t("buttons.save")}
                                            </Button>
                                        </Box>
                                        <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { }} message={formStatus.message} />
                                    </Grid>
                                </Grid>
                            </form>
                        </FormikProvider>
                    </Container>
                </Grid>
            </Grid>
            <DiscardChangesDialog
                title="Discard the changes ?"
                content="You have unsaved data which will be lost once you select discard or select cancel to save the data."
                open={open}
                handleToggle={handleModelToggle}
                handleConfirm={handleModelConfirm}
            />
        </Box>
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;