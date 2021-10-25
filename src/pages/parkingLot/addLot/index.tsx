import React, { useState, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from "../../../store";
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Container, FormControl, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import { DatePickerInput } from '../../../components/UIComponents/DatePickerInput/DatePickerInput.component';
import Input from '../../../components/UIComponents/Input/Input';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { getCountryCode } from '../../../navigation/utils';
import ParkingLotModel, {AddParkingLotForm} from '../../../models/ParkingLotModel';
// import AddCustomerValidationSchema from './validation';
// import { useCreateCustomer, useGetFrequencies, useGetPaymentTypes } from './queries';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';


import './style.scss';
interface IFormStatus {
    message: string
    type: string
}
interface IFormStatusProps {
    [key: string]: IFormStatus
}

const initialValues = new ParkingLotModel();

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

function AddLot(): React.ReactElement {

    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    // const createNewCustomer = (form: AddParkingLotForm) => {
        
    // }
    
    function handleGoogleAddressChange (addressObj: any) {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('addressLine2', addressObj.addressLine2);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('postalCode', addressObj.postalCode);
    }

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Many");
    const formik = useFormik({
        initialValues,
        // validationSchema: AddCustomerValidationSchema,
        onSubmit: (values) => {
            // createNewCustomer(values);
        },
        enableReinitialize: true,
    });

    const [open, setOpen] = React.useState(false);

    const history = useHistory();

    const isFormFieldChange = () => formik.dirty;

    const onClickBack = () => {
        if (isFormFieldChange()) {
            handleModelToggle();
        } else {
            history.push('/');
        }
    };
  
    const [apiResposneState, setAPIResponse] = useState(false);
    // useEffect(() => {
    //     if (isSuccess) {
    //         setAPIResponse(true);
    //         setFormStatus(formStatusProps.success);
    //     }
    //     if (isError) {
    //         setAPIResponse(true);
    //         setFormStatus(formStatusProps.error);
    //     }
    //     setTimeout(() => {
    //         setAPIResponse(false);
    //     }, 6000);
    //     formik.resetForm({});
    // }, [isSuccess, isError]);


    const handleModelToggle = () => {
        setOpen(prev => !prev);
    };

    const handleModelConfirm = () => {
        setOpen(prev => !prev);
        history.push('/');
    };


    return (
        // <div style={{ display: "block", marginLeft:"80px" }}>{"Added lot"}</div>
        <>
        <Grid item md={10} xs={10}>
            <Container maxWidth="lg" className="page-container">
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container mt={1}>
                            <Grid item md={12} mt={2} mb={1}>
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    General Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                <Input
                                    id='lotName'
                                    label='Lot Name'
                                    type='text'
                                    helperText={(formik.touched.lotName && formik.errors.lotName) ? formik.errors.lotName : undefined}
                                    error={(formik.touched.lotName && formik.errors.lotName) ? true : false}
                                    description=''
                                    required
                                    {...formik.getFieldProps('lotName')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                <Input
                                    id='lotId'
                                    label='Lot ID'
                                    type='text'
                                    helperText={(formik.touched.lotId && formik.errors.lotId) ? formik.errors.lotId : undefined}
                                    error={(formik.touched.lotId && formik.errors.lotId) ? true : false}
                                    description=''
                                    required
                                    {...formik.getFieldProps('lotId')}
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
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                <Input
                                    id='county'
                                    label='County'
                                    type='text'
                                    helperText={(formik.touched.county && formik.errors.county) ? formik.errors.county : undefined}
                                    error={(formik.touched.county && formik.errors.county) ? true : false}
                                    description=''
                                    required
                                    {...formik.getFieldProps('county')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                <Input
                                    id='timeZone'
                                    label='Time Zone'
                                    type='text'
                                    helperText={(formik.touched.lotId && formik.errors.lotId) ? formik.errors.lotId : undefined}
                                    error={(formik.touched.lotId && formik.errors.lotId) ? true : false}
                                    description=''
                                    required
                                    {...formik.getFieldProps('lotId')}
                                />
                            </Grid>
                            <Grid item md={12} mt={2} mb={1}>
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    Customer Contact
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
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
                            </Grid> */}
                            {/* <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
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
                            </Grid> */}
                            <Grid item md={12} mt={2} mb={1}>
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    Payment and Wallet rules
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6} pl={2.5} pb={2.5} />
                            {/* <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                <DatePickerInput
                                    type="single-date"
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
                            </Grid> */}
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
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    Emergency Contact
                                </Typography>
                            </Grid>
                        

                            <Grid item md={12} mt={2} mb={1}>
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    AP Contact
                                </Typography>
                            </Grid>
                        

                            <Grid item md={12} mt={2} mb={1}>
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    Import Contract (Optional)
                                </Typography>
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
                                {/* <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} /> */}
                            </Grid>
                        </Grid>
                    </form>
                </FormikProvider>
            </Container>
        </Grid>
        <DiscardChangesDialog
            title={t("customerManagement.discardchangesdialog.title")}
            content={t("customerManagement.discardchangesdialog.content")}
            open={open}
            handleToggle={handleModelToggle}
            handleConfirm={handleModelConfirm}
        />
    </>
    );
}

export default AddLot;