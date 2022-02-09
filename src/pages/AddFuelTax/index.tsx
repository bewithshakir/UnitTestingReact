import { Box, Grid, Container, Typography } from '@mui/material';
import React, { memo, useState, useEffect } from 'react';
import { HorizontalBarVersionState, useStore, useShowConfirmationDialogBoxStore } from '../../store';
import Input from '../../components/UIComponents/Input/Input';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { useTranslation } from 'react-i18next';
import './style.scss';
import Select from '../../components/UIComponents/Select/SingleSelect';
import { useFormik } from 'formik';
import TaxModel from '../../models/TaxModel';
import { AddFuelTaxValidationSchema, EditFuelTaxValidationSchema } from './validation';
import AutocompleteInput from '../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { useAddFuelTax, useGetFuelTax, useEditFuelTax, useGetFuelTypeList } from './queries';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import { DatePickerInput } from '../../components/UIComponents/DatePickerInput/DatePickerInput.component';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';

const initialValues = new TaxModel();

interface IFormStatus {
    message: string
    type: string
}
interface IFormStatusProps {
    [key: string]: IFormStatus
}

interface AddFuelTaxProps {
    version: string
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Success.',
        type: 'Success',
    },
    updated: {
        message: 'Data updated successfully.',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
};


const AddFuelTax: React.FC<AddFuelTaxProps> = memo(() => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const navigate = useNavigate();
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });


    // Add section starts
    const onAddFuelTaxSuccess = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus(formStatusProps.updated);
    };
    const onAddFuelTaxError = (err: any) => {
        const { data } = err.response;
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        formik.setSubmitting(false);
    };

    const { mutate: createNewFuelTaxData, isSuccess: isSuccessAddTax, isError: isErrorAddTax } = useAddFuelTax(onAddFuelTaxSuccess, onAddFuelTaxError);

    const createNewFuelTax = (form: TaxModel) => {
        try {
            const apiPayload = {
                "state": form.state,
                "city": form.city,
                "countryCd": form.countryCd,
                "fuelType": form.productType.value,
                "startDate": moment(form.startDate).format("MM-DD-YYYY"),
                "endDate": moment(form.endDate).format("MM-DD-YYYY"),
                "fedFuelTax": parseFloat(form.federalRate),
                "revenueFuelRate": parseFloat(form.localRate),
                "salesFuelRate": parseFloat(form.salesFuelRate),
                "stateFuelTax": parseFloat(form.stateFuelRate),
                "cityFuelTax": parseFloat(form.cityFuelRate),
                "countyFuelTax": parseFloat(form.countryFuelRate),
                "miscInspFuelTax": parseFloat(form.InspFuelRate),
                "miscLocalFuelTax": parseFloat(form.miscLocalFuelRate),
                "miscLoadFuelTax": parseFloat(form.loadFuel),
                "ppdSalesTax": parseFloat(form.ppdSalesTax),
            };
            createNewFuelTaxData(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };


    const onEditFuelTaxSuccess = () => {
        isFormValidated(false);
        setFormStatus(formStatusProps.updated);
        formik.resetForm({ values: formik.values });
    };
    const onEditFuelTaxError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };


    const { mutate: updateFuelTaxData, isSuccess: isSuccessEditTax, isError: isErrorEditTax } = useEditFuelTax(onEditFuelTaxSuccess, onEditFuelTaxError);


    const updateFuelTax = (form: TaxModel) => {
        try {
            const apiPayload = {
                "state": form.state,
                "city": form.city,
                "countryCd": form.countryCd,
                "fuelType": form.productType.value,
                "startDate": moment(form.startDate).format("MM-DD-YYYY"),
                "endDate": moment(form.endDate).format("MM-DD-YYYY"),
                "fedFuelTax": parseFloat(form.federalRate),
                "revenueFuelRate": parseFloat(form.localRate),
                "salesFuelRate": parseFloat(form.salesFuelRate),
                "stateFuelTax": parseFloat(form.stateFuelRate),
                "cityFuelTax": parseFloat(form.cityFuelRate),
                "countyFuelTax": parseFloat(form.countryFuelRate),
                "miscInspFuelTax": parseFloat(form.InspFuelRate),
                "miscLocalFuelTax": parseFloat(form.miscLocalFuelRate),
                "miscLoadFuelTax": parseFloat(form.loadFuel),
                "ppdSalesTax": parseFloat(form.ppdSalesTax),
            };
            updateFuelTaxData(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    // edit section
    const [isEditMode, setEditMode] = useState(false);
    const location = useLocation();
    const { data: fuelTypes } = useGetFuelTypeList();



    const populateDataInAllFields = (responseData: any) => {
        formik.resetForm({
            values: { ...responseData }
        });
    };


    const onGetSaleTaxSuccess = (response: any) => {

        try {
            if (response?.data) {
                const finalData = {
                    city: response.data.data.city,
                    state: response.data.data.state,
                    federalRate: response.data.data.fedFuelTax,
                    localRate: response.data.data.revenueFuelRate,
                    salesFuelRate: response.data.data.salesFuelRate,
                    stateFuelRate: response.data.data.stateFuelTax,
                    cityFuelRate: response.data.data.cityFuelTax,
                    countryFuelRate: response.data.data.countyFuelTax,
                    InspFuelRate: response.data.data.miscInspFuelTax,
                    miscLocalFuelRate: response.data.data.miscLocalFuelTax,
                    loadFuel: response.data.data.miscLoadFuelTax,
                    productType: { label: response.data.data.productNm, value: response.data.data.productCd },
                    startDate: response.data.data.startDate,
                    endDate: response.data.data.endDate,
                    countryCd: 'us',
                    ppdSalesTax: response.data.data.ppdSalesTax
                };

                populateDataInAllFields(finalData);
                setEditMode(true);
            }
        } catch {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };
    const onGetSaleTaxError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    useGetFuelTax(location.search, onGetSaleTaxSuccess, onGetSaleTaxError);


    const handleGoogleAddressChange = (addressObj: any) => {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('countryCd', 'us');
    };

    function handleGoogleAddressBlur () {
        formik.setFieldTouched("addressLine1");
        formik.validateField("addressLine1");
        formik.setFieldTouched("city");
        formik.validateField("city");
        formik.setFieldTouched("state");
        formik.validateField("state");
    }

    const formik = useFormik({
        initialValues,
        validationSchema: isEditMode ? EditFuelTaxValidationSchema : AddFuelTaxValidationSchema,
        onSubmit: (values) => {
            if (isEditMode) {
                updateFuelTax(values);
            } else {
                createNewFuelTax(values);
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (!formik.isValid || formik.dirty) {
            isFormValidated(true);
        } else {
            isFormValidated(false);
        }
    }, [formik.isValid, formik.dirty]);


    const onClickBack = () => {
        if (!formik.isValid || formik.dirty) {
            showDialogBox(true);
        } else {
            navigate('/taxes');
        }
    };

    const disableButton = () => {
        if (formik.dirty) {
            return !formik.isValid || formik.isSubmitting;
        } else {
            return true;
        }
    };


    return (
        <>
            <Box display="flex" mt={10} ml={16}>
                <Grid item md={10} xs={10}>
                    <Container maxWidth="lg" className="page-container">
                        <form id="addFuelTaxForm" onSubmit={formik.handleSubmit} data-test="component-AddFuelTax">

                            <Grid item xs={12} md={12}>
                                <Box className="info-section" pl={2.7} pb={1.8} pt={2.0} pr={20} >
                                    *Certain markets require a combined Revenue (%) and Sales (%) Tax on the Price per Gallon with or without Adder/Discount.
                                </Box>
                            </Grid>
                            <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                                Fill all the Mandatory fields *
                            </Typography>
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
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
                            <Grid container mt={1}>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
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
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='city'
                                        label='CITY'
                                        type='text'
                                        helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                        error={(formik.touched.city && formik.errors.city) ? true : false}
                                        description=''
                                        disabled
                                        {...formik.getFieldProps('city')}
                                        data-test="city"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pr={2.5} pb={2.5} data-testid="temp">
                                    <Select
                                        id='productType'
                                        name='productType'
                                        label='PRODUCT NAME'
                                        placeholder='Choose'
                                        items={fuelTypes}
                                        value={formik.values.productType}
                                        onChange={formik.setFieldValue}
                                        helperText={(formik.touched.productType && formik.errors.productType) ? formik.errors.productType.value : undefined}
                                        error={(formik.touched.productType && formik.errors.productType) ? true : false}
                                        onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                        isDisabled={isEditMode ? true : false}
                                        data-test="productType"
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                    <DatePickerInput
                                        type="single-date"
                                        id="startDate"
                                        name="startDate"
                                        value={formik.values.startDate}
                                        label='EFFECTIVE DATE'
                                        onChange={formik.setFieldValue}
                                        onClose={() => { formik.setFieldTouched("startDate"); formik.validateField("startDate"); }}
                                        disableBeforeDate={formik.values.startDate}
                                        helperText={(formik.touched.startDate && formik.errors.startDate) ? formik.errors.startDate : undefined}
                                        error={(formik.touched.startDate && formik.errors.startDate) ? true : false}
                                        data-test="startDate"
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5}>
                                    <DatePickerInput
                                        type="single-date"
                                        id="endDate"
                                        name="endDate"
                                        value={formik.values.endDate}
                                        label={t("taxes.fuelTax.form.endDate")}
                                        onChange={formik.setFieldValue}
                                        onClose={() => { formik.setFieldTouched("endDate"); formik.validateField("endDate"); }}
                                        disableBeforeDate={formik.values.endDate}
                                        helperText={(formik.touched.endDate && formik.errors.endDate) ? formik.errors.endDate : undefined}
                                        error={(formik.touched.endDate && formik.errors.endDate) ? true : false}
                                        data-test="endDate"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='federalRate'
                                        label='FED FUEL TAX ($)'
                                        type='text'
                                        placeholder='Enter Federal Rate'
                                        helperText={(formik.touched.federalRate && formik.errors.federalRate) ? formik.errors.federalRate : undefined}
                                        error={(formik.touched.federalRate && formik.errors.federalRate) ? true : false}
                                        {...formik.getFieldProps('federalRate')}
                                        data-test="federalRate"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='localRate'
                                        label='REVENUE FUEL RATE (%)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.revenueFuelRate")}
                                        helperText={(formik.touched.localRate && formik.errors.localRate) ? formik.errors.localRate : undefined}
                                        error={(formik.touched.localRate && formik.errors.localRate) ? true : false}
                                        {...formik.getFieldProps('localRate')}
                                        data-test="localRate"
                                    />
                                </Grid>


                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='salesFuelRate'
                                        label='SALES FUEL RATE (%)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.salesFuelTax")}
                                        helperText={(formik.touched.salesFuelRate && formik.errors.salesFuelRate) ? formik.errors.salesFuelRate : undefined}
                                        error={(formik.touched.salesFuelRate && formik.errors.salesFuelRate) ? true : false}
                                        {...formik.getFieldProps('salesFuelRate')}
                                        data-test="salesFuelRate"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='stateFuelRate'
                                        label='STATE FUEL TAX ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.stateFuelTax")}
                                        helperText={(formik.touched.stateFuelRate && formik.errors.stateFuelRate) ? formik.errors.stateFuelRate : undefined}
                                        error={(formik.touched.stateFuelRate && formik.errors.stateFuelRate) ? true : false}
                                        {...formik.getFieldProps('stateFuelRate')}
                                        data-test="stateFuelRate"
                                    />
                                </Grid>


                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='cityFuelRate'
                                        label='CITY FUEL TAX ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.cityFuelTax")}
                                        helperText={(formik.touched.cityFuelRate && formik.errors.cityFuelRate) ? formik.errors.cityFuelRate : undefined}
                                        error={(formik.touched.cityFuelRate && formik.errors.cityFuelRate) ? true : false}
                                        {...formik.getFieldProps('cityFuelRate')}
                                        data-test="cityFuelRate"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='countryFuelRate'
                                        label='COUNTY FUEL TAX ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.countyFuelTax")}
                                        helperText={(formik.touched.countryFuelRate && formik.errors.countryFuelRate) ? formik.errors.countryFuelRate : undefined}
                                        error={(formik.touched.countryFuelRate && formik.errors.countryFuelRate) ? true : false}
                                        {...formik.getFieldProps('countryFuelRate')}
                                        data-test="countryFuelRate"
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='InspFuelRate'
                                        label='MISC. INSP. FUEL TAX ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.miscInspFuelTax")}
                                        helperText={(formik.touched.InspFuelRate && formik.errors.InspFuelRate) ? formik.errors.InspFuelRate : undefined}
                                        error={(formik.touched.InspFuelRate && formik.errors.InspFuelRate) ? true : false}
                                        {...formik.getFieldProps('InspFuelRate')}
                                        data-test="InspFuelRate"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='miscLocalFuelRate'
                                        label='MISC. LOCAL FUEL TAX ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.miscLcalFuelTax")}
                                        helperText={(formik.touched.miscLocalFuelRate && formik.errors.miscLocalFuelRate) ? formik.errors.miscLocalFuelRate : undefined}
                                        error={(formik.touched.miscLocalFuelRate && formik.errors.miscLocalFuelRate) ? true : false}
                                        {...formik.getFieldProps('miscLocalFuelRate')}
                                        data-test="miscLocalFuelRate"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='loadFuel'
                                        label='MISC. LOAD FUEL TAX ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.miscLoadFuelTax")}
                                        helperText={(formik.touched.loadFuel && formik.errors.loadFuel) ? formik.errors.loadFuel : undefined}
                                        error={(formik.touched.loadFuel && formik.errors.loadFuel) ? true : false}
                                        {...formik.getFieldProps('loadFuel')}
                                        data-test="loadFuel"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='ppdSalesTax'
                                        label='PPD SALES TAX (PREPAID) ($)'
                                        type='text'
                                        placeholder={t("taxes.fuelTax.form.ppdSalesTax")}
                                        helperText={(formik.touched.ppdSalesTax && formik.errors.ppdSalesTax) ? formik.errors.ppdSalesTax : undefined}
                                        error={(formik.touched.ppdSalesTax && formik.errors.ppdSalesTax) ? true : false}
                                        {...formik.getFieldProps('ppdSalesTax')}
                                        data-test="ppdsalestax"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={12} mt={2} mb={4}>
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
                                        disabled={disableButton()}
                                    >
                                        {t("buttons.save")}
                                    </Button>

                                </Box>
                                <ToastMessage
                                    isOpen={
                                        isErrorAddTax || isSuccessAddTax || isSuccessEditTax || isErrorEditTax
                                    }
                                    messageType={formStatus.type}
                                    onClose={() => { return ''; }}
                                    message={formStatus.message} />
                            </Grid>

                        </form>
                    </Container>
                </Grid>
            </Box>
        </>
    );
});

export default AddFuelTax;