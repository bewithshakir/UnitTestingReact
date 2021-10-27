import { Box, Grid, Container, Typography } from '@mui/material';
import React, { memo } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import Input from '../../components/UIComponents/Input/Input';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { useTranslation } from 'react-i18next';
import './style.scss';
import Select from '../../components/UIComponents/Select/SingleSelect';
import { useFormik } from 'formik';
import TaxModel from '../../models/TaxModel';
import AddFuelTaxValidationSchema from './validation';
import AutocompleteInput from '../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';

const initialValues = new TaxModel();

const AddFuelTax = memo(() => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Fuel-Tax-Single");
    const { t } = useTranslation();

    const fuelTypes = [
        { label: "Regular", value: "Regular" },
        { label: "Premium", value: "Premium" },
        { label: "Diesel", value: "Diesel" },
        { label: "Midgrade", value: "Midgrade" },
        { label: "DEF", value: "DEF" }
    ];


    const createNewCustomer = (form: TaxModel) => {
        try {
            const apiPayload = {
                "state": form.state,
                "city": form.city,
                "federalRate": form.federalRate,
                "localRate": form.localRate,
                "salesFuelRate": form.salesFuelRate,
                "stateFuelRate": form.stateFuelRate,
                "cityFuelRate": form.cityFuelRate,
                "countryFuelRate": form.countryFuelRate,
                "InspFuelRate": form.InspFuelRate,
                "miscLocalFuelRate": form.miscLocalFuelRate,
                "loadFuel": form.loadFuel,
                "searchInput": form.searchInput
            };
            alert(apiPayload);
        } catch (error) {
            alert('error');
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: AddFuelTaxValidationSchema,
        onSubmit: (values) => {
            createNewCustomer(values);
        }
    });

    function handleGoogleAddressChange (addressObj: any) {
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
    }

    const handleFuelTypeChange = () => {
        return 0;
    };

    return (
        <>
            <Box display="flex" mt={10} ml={16}>
                <Grid item md={10} xs={10}>
                    <Container maxWidth="lg" className="page-container">
                        <form onSubmit={formik.handleSubmit}>
                            <Typography variant="h3" component="h3" gutterBottom className="fw-bold" mb={1}>
                                Fill all the Mandatory fields *
                            </Typography>
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                <AutocompleteInput
                                    name='searchInput'
                                    label='SEARCH LOCATION'
                                    onChange={handleGoogleAddressChange}
                                    onBlur={() => { formik.setFieldTouched("searchInput"); formik.validateField("searchInput"); }}
                                    value={formik.values.searchInput}
                                    helperText={(formik.touched.searchInput && formik.errors.searchInput) ? formik.errors.searchInput : undefined}
                                    error={(formik.touched.searchInput && formik.errors.searchInput) ? true : false}
                                />
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='state'
                                        label='STATE'
                                        type='text'
                                        disabled
                                        helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                                        error={(formik.touched.state && formik.errors.state) ? true : false}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='city'
                                        label='CITY'
                                        type='text'
                                        disabled
                                        helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                        error={(formik.touched.city && formik.errors.city) ? true : false}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='fuelType'
                                        name='fuelType'
                                        label='FUEL TYPE'
                                        placeholder='Choose'
                                        items={fuelTypes}
                                        onChange={handleFuelTypeChange}
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                    <Input
                                        id='startDate'
                                        label='EFFECTIVE DATE'
                                        type='text'
                                        placeholder='Enter Start Date'
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5}>
                                    <Input
                                        id='endDate'
                                        label='END DATE'
                                        type='text'
                                        placeholder='Enter End Date'
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
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='localRate'
                                        label='REVENUE FUEL RATE (%)'
                                        type='text'
                                        placeholder='Enter Local Rate'
                                        helperText={(formik.touched.localRate && formik.errors.localRate) ? formik.errors.localRate : undefined}
                                        error={(formik.touched.localRate && formik.errors.localRate) ? true : false}
                                        {...formik.getFieldProps('localRate')}
                                    />
                                </Grid>


                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='salesFuelRate'
                                        label='SALES FUEL RATE (%)'
                                        type='text'
                                        placeholder='Enter'
                                        helperText={(formik.touched.salesFuelRate && formik.errors.salesFuelRate) ? formik.errors.salesFuelRate : undefined}
                                        error={(formik.touched.salesFuelRate && formik.errors.salesFuelRate) ? true : false}
                                        {...formik.getFieldProps('salesFuelRate')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='stateFuelRate'
                                        label='STATE FUEL TAX ($)'
                                        type='text'
                                        placeholder='Enter'
                                        helperText={(formik.touched.stateFuelRate && formik.errors.stateFuelRate) ? formik.errors.stateFuelRate : undefined}
                                        error={(formik.touched.stateFuelRate && formik.errors.stateFuelRate) ? true : false}
                                        {...formik.getFieldProps('stateFuelRate')}
                                    />
                                </Grid>


                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='cityFuelRate'
                                        label='CITY FUEL TAX ($)'
                                        type='text'
                                        placeholder='Enter'
                                        helperText={(formik.touched.cityFuelRate && formik.errors.cityFuelRate) ? formik.errors.cityFuelRate : undefined}
                                        error={(formik.touched.cityFuelRate && formik.errors.cityFuelRate) ? true : false}
                                        {...formik.getFieldProps('cityFuelRate')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='countryFuelRate'
                                        label='COUNTY FUEL TAX ($)'
                                        type='text'
                                        placeholder='Enter'
                                        helperText={(formik.touched.countryFuelRate && formik.errors.countryFuelRate) ? formik.errors.countryFuelRate : undefined}
                                        error={(formik.touched.countryFuelRate && formik.errors.countryFuelRate) ? true : false}
                                        {...formik.getFieldProps('countryFuelRate')}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='InspFuelRate'
                                        label='MISC. INSP. FUEL TAX ($)'
                                        type='text'
                                        helperText={(formik.touched.InspFuelRate && formik.errors.InspFuelRate) ? formik.errors.InspFuelRate : undefined}
                                        error={(formik.touched.InspFuelRate && formik.errors.InspFuelRate) ? true : false}
                                        {...formik.getFieldProps('InspFuelRate')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='miscLocalFuelRate'
                                        label='MISC. LOCAL FUEL TAX ($)'
                                        type='text'
                                        placeholder='Enter'
                                        helperText={(formik.touched.miscLocalFuelRate && formik.errors.miscLocalFuelRate) ? formik.errors.miscLocalFuelRate : undefined}
                                        error={(formik.touched.miscLocalFuelRate && formik.errors.miscLocalFuelRate) ? true : false}
                                        {...formik.getFieldProps('miscLocalFuelRate')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='loadFuel'
                                        label='MISC. LOAD FUEL TAX ($))'
                                        type='text'
                                        placeholder='Enter'
                                        helperText={(formik.touched.loadFuel && formik.errors.loadFuel) ? formik.errors.loadFuel : undefined}
                                        error={(formik.touched.loadFuel && formik.errors.loadFuel) ? true : false}
                                        {...formik.getFieldProps('loadFuel')}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Box className="info-section" pl={2.7} pb={1.8} pt={2.0} pr={20} >
                                        *Certain markets require a combined Revenue (%) and Sales (%) Tax on the Price per Gallon with or without Adder/Discount.
                                </Box>
                                </Grid>

                            </Grid>
                            <Grid item md={12} mt={2} mb={1}>
                                <Box className="form-action-section">
                                    <Button
                                        types="cancel"
                                        aria-label="cancel"
                                        className="mr-4"
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

                        </form>
                    </Container>
                </Grid>
            </Box>
        </>
    );
});

export default AddFuelTax;