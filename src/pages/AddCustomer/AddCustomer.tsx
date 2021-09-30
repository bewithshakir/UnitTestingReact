import { Add, FileCopy } from '@material-ui/icons';
import { Box, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material';
import { useFormik, FieldArray } from 'formik';
import moment from 'moment';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/UIComponents/Button/Button.component';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
import { DatePicker } from '../../components/UIComponents/DatePicker/DatePicker.component';
import Input from '../../components/UIComponents/Input/Input';
import HorizontalBar from '../../components/UIComponents/NavigationBar/HorizontalBar';
import Select from '../../components/UIComponents/Select/dropdown';
import "./AddCustomer.style.scss";
import Legend from '../Legend/index';
import AddCustomerValidationSchema from './validation';

interface SelectProps {
    label: string,
    value: string,
}

interface EmergencyContact {
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
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
    paymentType: SelectProps[],
    invoiceFrequency: SelectProps[],
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    paymentTerm: string,
    lotLevel: boolean,
    businessLevel: boolean,
    vehicleLevel: boolean,
    // Emergency Contact
    emergencyContact: EmergencyContact[]
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
    paymentType: [],
    invoiceFrequency: [],
    startDate: moment(),
    endDate: moment(),
    paymentTerm: '',
    lotLevel: true,
    businessLevel: false,
    vehicleLevel: false,
    emergencyContact: [],
};



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
        type: 'success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },
}

const AddCustomer: React.FC<{}> = (props: any) => {
    const { t } = useTranslation();
    const [displayFormStatus, setDisplayFormStatus] = useState(false)
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const createNewCustomer = async (data: AddCustomerForm, resetForm: Function) => {
        try {
            // API call integration will be here. Handle success / error response accordingly.
            if (data) {
                setFormStatus(formStatusProps.success)
                resetForm({})
            }
        } catch (error) {
            const response = error.response
            if (
                response.data === 'user already exist' &&
                response.status === 400
            ) {
                setFormStatus(formStatusProps.duplicate)
            } else {
                setFormStatus(formStatusProps.error)
            }
        } finally {
            setDisplayFormStatus(true)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema: AddCustomerValidationSchema,
        onSubmit: (values, actions) => {
            createNewCustomer(values, actions.resetForm);
            alert(JSON.stringify(values, null, 2));
        },
        validateOnBlur: false,
    });

    const initialPaymentTypes = [
        { label: 'Invoice', value: 'Invoice' },
        { label: 'Voyager', value: 'Voyager' },
        { label: 'WEX', value: 'WEX' }
    ]

    const initialInvoiceFrequencies = [
        { label: 'Daily T+1', value: 'Daily T+1' },
        { label: 'Weekly', value: 'Weekly' },
        { label: 'Bi-weekly', value: 'Bi-weekly' },
        { label: 'Monthly', value: 'Monthly' }
    ]

    const history = useHistory()

    function onClickBack () {
        history.goBack()
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
                                    <Input
                                        id='addressLine1'
                                        label='ADDRESS LINE 1'
                                        type='text'
                                        helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                        error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('addressLine1')}
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
                                        items={initialPaymentTypes}
                                        helperText={(formik.touched.paymentType && formik.errors.paymentType) ? formik.errors.paymentType : undefined}
                                        error={(formik.touched.paymentType && formik.errors.paymentType) ? true : false}
                                        onChange={formik.handleChange}
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
                                        helperText={(formik.touched.invoiceFrequency && formik.errors.invoiceFrequency) ? formik.errors.invoiceFrequency : undefined}
                                        error={(formik.touched.invoiceFrequency && formik.errors.invoiceFrequency) ? true : false}
                                        onChange={formik.handleChange}
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
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    {/* <FieldArray name="emergencyContact">
                                        {(fieldArrayProps) => {
                                            console.log("🚀 ~ file: AddCustomer.tsx ~ line 382 ~ AddCustomer ~ fieldArrayProps", fieldArrayProps)
                                            return (<div>s</div>)
                                        }}
                                    </FieldArray> */}
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        description=''
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input name='email'
                                        label='Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='phoneNumber'
                                        label='Phone Number'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={4}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        sx={{ display: "flex", alignItems: "center" }}
                                        onClick={() => {
                                            console.info("I'm a button.");
                                        }}
                                    >
                                        <Add />
                                        <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                            ADD EMERGENCY CONTACT
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        AP Contact
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input name='email'
                                        label='Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='phoneNumber'
                                        label='Phone Number'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={4}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        sx={{ display: "flex", alignItems: "center" }}
                                        onClick={() => {
                                            console.info("I'm a button.");
                                        }}
                                    >
                                        <Add />
                                        <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                            ADD AP CONTACT
                                        </Typography>
                                    </Link>
                                </Grid>

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
                                            onClick={() => { }}
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label="save"
                                            className="ml-4"
                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </Box >
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;