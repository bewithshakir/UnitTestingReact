import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './style.scss';

import SalesTaxModel from '../../models/SalesTaxModel';
import AutocompleteInput from '../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import Input from '../../components/UIComponents/Input/Input';
import { Button } from '../../components/UIComponents/Button/Button.component';
import {useAddSalesTax, useEditSalesTax, useGetSaleTax} from './queries';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import { HorizontalBarVersionState, useStore } from '../../store';
import {AddSalesTaxValidationSchema, AddSalesTaxValidationSchemaEdit} from './validation';


const initialValues = new SalesTaxModel();

interface IFormStatus {
    message: string
    type: string
}
interface IFormStatusProps {
    [key: string]: IFormStatus
}


const formStatusProps: IFormStatusProps = {
    editsuccess: {
        message: 'Data updated successfully',
        type: 'Success',
    },
    success: {
        message: 'Data added successfully.',
        type: 'Success',
    },
    updated: {
        message: 'Data updated successfully.',
        type: 'Success',
    },
    duplicate: {
        message: 'Customer Id already exist. Please use different Customer Id.',
        type: 'Error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    }
};

const AddSalesTax: React.FC = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const [apiResposneState, setAPIResponse] = useState(false);
    // const [isDisabled, setDisabled] = useState(false);
    
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();

    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    

    // edit section
    const [isEditMode, setEditMode] = useState(false);
    

    const populateDataInAllFields = (formData: any)=> {
        formik.setFieldValue('addressLine1', formData.addressLine1);
        formik.setFieldValue('city', formData.city);
        formik.setFieldValue('state', formData.state);
        formik.setFieldValue('countryCd', 'us');
        formik.setFieldValue('federalRate', formData.federalRate || 0);
        formik.setFieldValue('stateRate', formData.stateRate);
        formik.setFieldValue('localRate', formData.localRate);
    };

    const onGetSaleTaxSuccess = (response: any)=> {
        populateDataInAllFields(response.data.data);
        setEditMode(true);
    };
    const onGetSaleTaxError = (err: any)=> {
        try {
            const { data } = err.response;
            setAPIResponse(true);
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
        } catch(error) {
            //
        }

    };
    
    useGetSaleTax(location.search, onGetSaleTaxSuccess, onGetSaleTaxError);
    

    const onEditSaleTaxSuccess = ()=> {
        setAPIResponse(true);
        setFormStatus(formStatusProps.updated);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };
    const onEditSaleTaxError = (err: any)=> {
        try {
            const { data } = err.response;
            setAPIResponse(true);
            // setDisabled(false);
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
        } catch (error) {
            // console.log(error);
        }
    };

    const { mutate: editSaleTax } = useEditSalesTax(onEditSaleTaxSuccess, onEditSaleTaxError);

    const updateSaleTax = (form: SalesTaxModel)=> {
        try {
            const payload = {
                "countryCode": form.countryCd,
                "city": form.city,
                "state": form.state,
                "stateRate": parseFloat(form.stateRate),
                "federalRate": form.federalRate ? parseFloat(form.federalRate) : 0,
                "localRate": parseFloat(form.localRate)
            };
            editSaleTax(payload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    // Edit end


    const onAddSalesTaxSuccess = () => {
        setAPIResponse(true);
        // setDisabled(true);
        setFormStatus(formStatusProps.success);
        // formik.resetForm({});
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };
    const onAddSalesTaxError = (err: any) => {
        try {
            const { data } = err.response;
            setAPIResponse(true);
            // setDisabled(false);
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
        } catch (error) {
            // console.log(error);
        }
    };

    const { mutate: addNewSalesTax } = useAddSalesTax(onAddSalesTaxError, onAddSalesTaxSuccess);

    const createNewSalesTax = (form: SalesTaxModel) => {
        try {
            const apiPayload = {
                "countryCode": form.countryCd,
                "city": form.city,
                "state": form.state,
                "stateRate": parseFloat(form.stateRate),
                "federalRate": form.federalRate ? parseFloat(form.federalRate): 0,
                "localRate": parseFloat(form.localRate)
            };
            addNewSalesTax(apiPayload);
            
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: isEditMode ? AddSalesTaxValidationSchemaEdit: AddSalesTaxValidationSchema,
        onSubmit: (values) => {
            if(isEditMode) {
                updateSaleTax(values);
            } else {
                createNewSalesTax(values);
            }
        }
    });
    

    const handleGoogleAddressChange = (addressObj: any) => {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('countryCd', 'us');
    };
    const handleGoogleAddressBlur = () => {
        formik.setFieldTouched("addressLine1");
        formik.validateField("addressLine1");

        formik.setFieldTouched("city");
        formik.validateField("city");

        formik.setFieldTouched("state");
        formik.validateField("state");

        // formik.setFieldTouched("federalRate");
        // formik.validateField("federalRate");

        formik.setFieldTouched("stateRate");
        formik.validateField("stateRate");

        formik.validateField("localRate");
        formik.validateField("localRate");
    };
    

    function onClickBack () {
        history.push('/salesTax');
    }
    const disableButton = () => {
        if (isEditMode) {
            if (Object.keys(formik.errors).length > 1) {
                return true;
            } 
            else if ((formik.touched.stateRate && formik.errors.stateRate) ||
            (formik.touched.localRate && formik.errors.localRate)) {
                return true;
            }
            else if (Object.keys(formik.touched).length) {
                return false;
            }
        } else {
            if ((formik.touched.stateRate && formik.errors.stateRate) ||
            (formik.touched.localRate && formik.errors.localRate)) {
                return true;
            }
            else if (formik.values.addressLine1 && 
                formik.values.city && 
                formik.values.state && 
                formik.values.stateRate &&
                formik.values.localRate
                ){
                return false;
            } else {
                return true;
            }
        }
    };

    
    /* const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const isFormFieldChange = () => formik.dirty; */

    /* function onClickBack () {
        if ((isFormFieldChange() && !isEditShown) || (isFormFieldChange() && isEditMode)) {
            showDialogBox(true);
        } else {
            history.push('/salesTax');
        }
    } */
    /* const handleFormDataChange = () => {
        if (isEditMode) {
            if (formik.touched && Object.keys(formik.touched).length === 0 && Object.getPrototypeOf(formik.touched) === Object.prototype) {
                if (formik.dirty) {
                    if (formik.initialValues != formik.values) {
                        isFormValidated(false);
                    }
                }
            }
        } 
        if (isFormFieldChange()) {
            isFormValidated(true); 
        }
    }; */
    return (
        <Box display="flex" className="global_main_wrapper">
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container">
                   
                    <form onSubmit={formik.handleSubmit} data-test="component-AddSalesTax" >
                        <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                            Fill all the Mandatory fields *
                        </Typography>
                        <Grid container mt={1}>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <AutocompleteInput
                                        name='addressLine1'
                                        label='SEARCH LOCATION'
                                        onChange={handleGoogleAddressChange}
                                        onBlur={handleGoogleAddressBlur}
                                        value={formik.values.addressLine1}
                                        helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                        error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                        disabled={isEditMode}
                                        data-test="auto-complete-input"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='city'
                                        label='CITY'
                                        type='text'
                                        disabled
                                        helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                        error={(formik.touched.city && formik.errors.city) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('city')}
                                        data-test="city"
                                        required
                                    />

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='state'
                                        label='STATE'
                                        type='text'
                                        description=''
                                        disabled
                                        helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                                        error={(formik.touched.state && formik.errors.state) ? true : false}
                                        {...formik.getFieldProps('state')}
                                        data-test="state"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='stateRate'
                                        label='STATE RATE (%)'
                                        type='text'
                                        placeholder='State Rate'
                                        helperText={(formik.touched.stateRate && formik.errors.stateRate) ? formik.errors.stateRate : undefined}
                                        error={(formik.touched.stateRate && formik.errors.stateRate) ? true : false}
                                        {...formik.getFieldProps('stateRate')}
                                        required
                                        data-test="stateRate"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='localRate'
                                        label='LOCAL RATE (%)'
                                        type='text'
                                        placeholder='Local Rate'
                                        helperText={(formik.touched.localRate && formik.errors.localRate) ? formik.errors.localRate : undefined}
                                        error={(formik.touched.localRate && formik.errors.localRate) ? true : false}
                                        {...formik.getFieldProps('localRate')}
                                        required
                                        data-test="localRate"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container mt={1} justifyContent="flex-end">
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                <Box className="form-action-section">
                                    <Button
                                        types="cancel"
                                        aria-label="cancel"
                                        className="mr-4"
                                        onClick={onClickBack}
                                        data-test="cancel"
                                    >
                                        {t("buttons.cancel")}
                                    </Button>
                                    <Button
                                        type="submit"
                                        types="save"
                                        aria-label="save"
                                        className="ml-4"
                                        data-test="save"
                                        disabled={disableButton()}
                                    >
                                        {t("buttons.save")}
                                    </Button>
                                    
                                </Box>
                                <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Grid>
        </Box>
    );
};
export default AddSalesTax;