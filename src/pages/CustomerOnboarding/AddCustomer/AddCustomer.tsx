/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Add, FileCopy } from '@material-ui/icons';
import { Box, Container, FormControl, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import { DatePicker } from '../../../components/UIComponents/DatePicker/DatePicker.component';
import Input from '../../../components/UIComponents/Input/Input';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { getCountryCode } from '../../../navigation/utils';
import "./AddCustomer.style.scss";
import AddCustomerValidationSchema from './validation';
import { useCreateCustomer, useGetFrequencies, useGetPaymentTypes } from './queries';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import EditIcon from '@material-ui/icons/Edit';
import axios from "axios";
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
    lotLevel: false,
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

function getTokenApplicable(Obj: any) {
    const temp: any = [];
    Object.entries(Obj).forEach(obj => {
        if (obj[1]) {
            temp.push(obj[0]).toString();
        }
    });
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
};

const AddCustomer: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    
    
    useEffect(() => {
        const selectedCustomerId = location.state; 
        console.log(selectedCustomerId);
        if(selectedCustomerId) {
            getDataForSelectedCustomer("" + selectedCustomerId);
            setDisabled(true);
        } else {
            setEditShown(false);
        }
    }, [location]);

    //below 2 methods to segregate the list of emergency contacts and ap contacts from get api response
    const getEmergencyContacts = (data: any) => {
        const TempData:any = [];
        data.map((obj:any) => { 
            if(obj.customerContactTypeNm === "emergency") {
                TempData.push(obj);
            }
        });
        return TempData;
    };

    const getAPContacts= (data: any) => {
        const TempData: any = [];
        data.map((obj: any) => {
            if (obj.customerContactTypeNm === "ap_contact") {
                TempData.push(obj);
            }
        });
        return TempData;
    };

    //to populate all the data in the form fields
    const populateDataInAllFields = (dataToPopulate: any) => {
        console.log(dataToPopulate.customer.PaymentType.paymentTypeNm + "  ::  " + dataToPopulate.customer.InvoiceFrequency.invoiceFrequencyNm );
        formik.setFieldValue('customerName', dataToPopulate.customer.companyNm);
        formik.setFieldValue('customerId', dataToPopulate.customer.customerInputId);
        formik.setFieldValue('addressLine1', dataToPopulate.customer.addressLine1);
        formik.setFieldValue('addressLine2', dataToPopulate.customer.addressLine2);
        formik.setFieldValue('city', dataToPopulate.customer.cityNm);
        formik.setFieldValue('state', dataToPopulate.customer.stateNm);
        formik.setFieldValue('postalCode', dataToPopulate.customer.postalCd);
        formik.setFieldValue('firstName', dataToPopulate.customer.contactFirstNm);
        formik.setFieldValue('lastName', dataToPopulate.customer.contactLastNm);
        formik.setFieldValue('email', dataToPopulate.customer.contactEmailId);
        formik.setFieldValue('phoneNumber', dataToPopulate.customer.contactPhoneNo);
        formik.setFieldValue("paymentType", dataToPopulate.customer.PaymentType.paymentTypeNm);
        formik.setFieldValue("invoiceFrequency", dataToPopulate.customer.invoiceFrequencyId);
        formik.setFieldValue("firstSettlementDt", dataToPopulate.customer.firstSettlementDt);
        formik.setFieldValue("paymentTerm", dataToPopulate.customer.paymentTerm);
        const emergenyContactList = getEmergencyContacts(dataToPopulate.customerContact);
        const APContactList = getAPContacts(dataToPopulate.customerContact);
              console.log(emergenyContactList);
              console.log(APContactList);
        setDisabled(true);
    };

    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    const [paymentTypes, setpaymentTypes] = useState([]);
    const [initialInvoiceFrequencies, setinitialInvoiceFrequencies] = useState([]);

    const { mutate: addNewCustomer, isSuccess, isError } = useCreateCustomer();
    const { data: frequencyList } = useGetFrequencies();
    const { data: paymentTypeList } = useGetPaymentTypes();

    useEffect(() => {
        if (isSuccess) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.success);
        }
        if (isError) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.error);
        }
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        formik.resetForm({});
    }, [isSuccess, isError]);

    useEffect(() => {
        if (frequencyList?.data.length) {
            setinitialInvoiceFrequencies(frequencyList.data.map((obj: any) => ({ label: obj.invoiceFrequencyNm.trim(), value: obj.invoiceFrequencyId.trim() })));
        }
    }, [frequencyList]);

    useEffect(() => {
        if (paymentTypeList?.data.length) {
            setpaymentTypes(paymentTypeList.data.map((obj: any) => ({ label: obj.paymentTypeNm.trim(), value: obj.paymentTypeId.trim() })));
        }
    }, [paymentTypeList]);


    const [apiResposneState, setAPIResponse] = useState(false);


    const [open, setOpen] = React.useState(false);

    const [isDisabled, setDisabled] = useState(false);

    const [isEditMode, setEditMode] = useState(false);

    const [isEditShown, setEditShown] = useState(true);

    const handleModelToggle = () => {
        setOpen(prev => !prev);
    };

    const handleModelConfirm = () => {
        setOpen(prev => !prev);
        history.push('/');
    };

    const handleEditButtonClick = () => {
        setEditMode(true);
        setDisabled(false);
    };

    const getDataForSelectedCustomer = async (customerId: string) => {
        try {
            axios.get(`http://52.146.63.31/api/customer-service/customers/${customerId}?countryCode=us`)
                .then(response => response.data)
                .then(({ data }) => {
                    if (data) {
                        console.log("%%%%");
                        console.log(data);
                        populateDataInAllFields(data);
                    }
                })
                .catch(function (error: any) {
                    const response = error.response;
                    if (
                        response.data === 'user already exist' &&
                        response.status === 400
                    ) {
                        setFormStatus(formStatusProps.duplicate);
                    } else {
                        setFormStatus(formStatusProps.error);
                    }
                });
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const editCustomerData = async (data: AddCustomerForm, resetForm: Function) => {
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
                    "customerContactId":"",
                    "firstNm": emgcyObj.firstName,
                    "lastNm": emgcyObj.lastName,
                    "email": emgcyObj.email,
                    "phoneNo": emgcyObj.phoneNumber
                })),
                "apContact": data.apContact.map(apObj => ({
                    "customerContactId":"",
                    "firstNm": apObj.firstName,
                    "lastNm": apObj.lastName,
                    "email": apObj.email,
                    "phoneNo": apObj.phoneNumber
                })),
                "tokenApplicabilityLevel": getTokenApplicable({
                    lot: data.lotLevel, business: data.businessLevel, vehicle: data.vehicleLevel
                })
            };
            axios.put(`http://52.146.63.31/api/customer-service/customers/${location.state}`, apiPayload)
                .then(function (response) {
                    setAPIResponse(true);
                    if (response.data) {
                        setFormStatus(formStatusProps.success);
                        setTimeout(() => {
                            setAPIResponse(false);
                        }, 6000);
                        resetForm({});
                    }
                })
                .catch(function (error: any) {
                    console.log(error);
                    setFormStatus(formStatusProps.error);
                });
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const createNewCustomer = async (form: AddCustomerForm) => {
        try {
            const apiPayload = {
                "customerName": form.customerName,
                "customerInputId": form.customerId,
                "addressLine1": form.addressLine1,
                "addressLine2": form.addressLine2,
                "addressLine3": "",
                "cityNm": form.city,
                "stateNm": form.state,
                "postalCd": Number(form.postalCode),
                "contactFirstNm": form.firstName,
                "contactLastNm": form.lastName,
                "contactEmailId": form.email,
                "contactPhoneNo": form.phoneNumber,
                "paymentTypeId": form.paymentType.value,
                "customerTypeId": "f6f0ec11-cd88-455d-9158-8ade75ddfb3b",
                "invoiceFrequencyId": form.invoiceFrequency.value,
                "firstSettlementDt": form.endDate,
                "paymentTerm": Number(form.paymentTerm),
                "countryCd": getCountryCode(),
                "soldToNo": 10,
                "emergencyContact": form.emergencyContact.map(emgcyObj => ({
                    "firstNm": emgcyObj.firstName,
                    "lastNm": emgcyObj.lastName,
                    "email": emgcyObj.email,
                    "phoneNo": emgcyObj.phoneNumber
                })),
                "apContact": form.apContact.map(apObj => ({
                    "firstNm": apObj.firstName,
                    "lastNm": apObj.lastName,
                    "email": apObj.email,
                    "phoneNo": apObj.phoneNumber
                })),
                "tokenApplicabilityLevel": getTokenApplicable({
                    lot: form.lotLevel, business: form.businessLevel, vehicle: form.vehicleLevel
                })
            };
            addNewCustomer(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: AddCustomerValidationSchema,
        onSubmit: (values, actions) => {
            if (isEditMode) {
                editCustomerData(values, actions.resetForm);
            } else {
                createNewCustomer(values);
                getDataForSelectedCustomer("" + location.state);
            }

        },
        enableReinitialize: true,
    });

    const isFormFieldChange = () => formik.dirty;

    function onClickBack() {
        if (isFormFieldChange()) {
            handleModelToggle();
        } else {
            history.push('/');
        }
    }

    function handleGoogleAddressChange (addressObj: any) {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('addressLine2', addressObj.addressLine2);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('postalCode', addressObj.postalCode);
    }

    return (
        <Box>
            <Grid>
                <Grid item md={10} pt={5} xs={10} className="page-area">
                    <Container maxWidth="lg" className="page-container">
                        <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <div style={{ display: "flex" }}>
                                    <Typography variant="h3" component="h3" gutterBottom className="fw-bold" mb={1} style={{ width: "86%" }}>
                                        Customer Profile
                                    </Typography>
                                    {isEditShown && <Button
                                        types="edit"
                                        aria-label="edit"
                                        onClick={handleEditButtonClick}
                                        startIcon={<EditIcon />}
                                    /> }
                                </div>
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            isDisabled={isDisabled}
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
                                            isDisabled={isDisabled}
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
                                            disabled={isDisabled}
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
                                            // disabled={isDisabled}
                                            {...formik.getFieldProps('paymentTerm')}
                                        />
                                    </Grid>
                                    <Grid item md={12} mt={2} mb={1}>
                                        <FormControl sx={{ m: 3 }}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                    control={
                                                        <Checkbox checked={formik.values.lotLevel} onChange={formik.handleChange} name="lotLevel" disabled={isDisabled} />
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
                                                        <Checkbox checked={formik.values.businessLevel} onChange={formik.handleChange} name="businessLevel" disabled={isDisabled} />
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
                                                        <Checkbox checked={formik.values.vehicleLevel} onChange={formik.handleChange} name="vehicleLevel" disabled={isDisabled} />
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
                                                                disabled={isDisabled}
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
                                                                disabled={isDisabled}
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
                                                                disabled={isDisabled}
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
                                                                disabled={isDisabled}
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
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
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
                                                                disabled={isDisabled}
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
                                                                disabled={isDisabled}
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
                                                                disabled={isDisabled}
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
                                                                disabled={isDisabled}
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
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
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
                                                disabled={(!formik.isValid || !formik.dirty) || formik.isSubmitting}
                                            >
                                                {t("buttons.save")}
                                            </Button>
                                        </Box>
                                        <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                    </Grid>
                                </Grid>
                            </form>
                        </FormikProvider>
                    </Container>
                </Grid>
            </Grid>
            <DiscardChangesDialog
                title={t("customerManagement.discardchangesdialog.title")}
                content={t("customerManagement.discardchangesdialog.content")}
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