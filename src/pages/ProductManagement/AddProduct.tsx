/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { Button } from '../../components/UIComponents/Button/Button.component';
import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
// import Divider from '@mui/material/Divider';
// import { useTheme } from '../../contexts/Theme/Theme.context';
import { productOptions, pricingModelOptions, stateOptions, cityOptions, cityIdOptions, supplierOptions, brandedOptions, actualProductOptions, formStatusObj } from './config';
import { useAddedCustomerIdStore, useShowConfirmationDialogBoxStore } from '../../store';
// interface props { 

// }

interface FormStatusType {
    message: string
    type: string
}
interface FormStatusProps {
    [key: string]: FormStatusType
}

const formStatusProps: FormStatusProps = formStatusObj;

export default function AddProduct() {

    const { t } = useTranslation();
    const history = useHistory();
    const isFormFieldChange = () => formik.dirty;
    // const { theme } = useTheme();

    // const [editVisible, setEditVisible] = useState(false);
    // const [formSuccess, setFormSuccess] = useState(false);
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const [isDisabled, setDisabled] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    // const [isSavCancelVisible, setSaveCancelVisible] = useState(true);
    const [apiResposneState] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    // const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    // const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);


    // useEffect(() => {
    //     resetFormFieldValue(false);
    //     hideDialogBox(false);
    //     if (isSuccess) {
    //         setAPIResponse(true);
    //         setFormStatus(formStatusProps.success);
    //         setFormSuccess(true);
    //     }
    //     if (isError) {
    //         setAPIResponse(true);
    //         setFormStatus(formStatusProps.error);
    //     }
    //     setTimeout(() => {
    //         setAPIResponse(false);
    //     }, 6000);

    // }, [isSuccess, isError]);

    const disableSubmitBtn = () => {
        if (isEditMode) {
            if (formik.touched && Object.keys(formik.touched).length === 0 && Object.getPrototypeOf(formik.touched) === Object.prototype) {
                if (formik.dirty) {
                    if (formik.initialValues != formik.values) {
                        return false;
                    }
                }
            } else {
                return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
            }
        } else {
            return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
        }
    };

    const onClickBack = () => {
        if (isFormFieldChange()) {
            showDialogBox(true);
        } else {
            history.push('/customer/parkingLots');
        }
    };

    // const createProductPayload = (form: addProductForm) => {
    //     const apiPayload = {

    //     };
    //     return apiPayload;
    // };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createNewProduct = (form: any) => {
        try {
            // addNewProduct(createProductPayload(form));
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const initialValues = {} as any;
    const formik = useFormik({
        initialValues,
        // validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            createNewProduct(values);
        },
    });

    // const handleFormDataChange = () => {
    //     if (isFormFieldChange()) {
    //         isFormValidated(true);
    //     }
    // };

    // const handleEditBtnClick = () => {
    //     setEditMode(true);
    //     setSaveCancelVisible(true);
    //     setDisabled(false);
    // };


    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="productForm">
                <Grid container direction="column"
                    className="productContainer">
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                        <Grid item md={12} my={4} mx={4}>
                            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" >Add New Product or select the product from the table to edit the details</Typography>
                        </Grid>
                        <Grid item md={12} mx={4} >
                            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>General Information</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr></hr>
                        </Grid>

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='productName'
                                name='productName'
                                label='Product'
                                value={formik.values.productName}
                                placeholder='Select one'
                                items={productOptions}
                                // helperText={(formik.touched.productName && formik.errors.productName) ? formik.errors.productName.value : undefined}
                                error={(formik.touched.productName && formik.errors.productName) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("productName"); formik.validateField("productName"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='pricingModel'
                                name='pricingModel'
                                label='Pricing Model'
                                value={formik.values.pricingModel}
                                placeholder='Select one'
                                items={pricingModelOptions}
                                // helperText={(formik.touched.pricingModel && formik.errors.pricingModel) ? formik.errors.pricingModel.value : undefined}
                                error={(formik.touched.pricingModel && formik.errors.pricingModel) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("pricingModel"); formik.validateField("pricingModel"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='state'
                                name='state'
                                label='State'
                                value={formik.values.state}
                                placeholder='Select one'
                                items={stateOptions}
                                // helperText={(formik.touched.city && formik.errors.state) ? formik.errors.state : undefined}
                                error={(formik.touched.state && formik.errors.state) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("state"); formik.validateField("state"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='city'
                                name='city'
                                label='City'
                                value={formik.values.city}
                                placeholder='Select one'
                                items={cityOptions}
                                // helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                error={(formik.touched.city && formik.errors.city) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("city"); formik.validateField("city"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='cityId'
                                name='cityId'
                                label='City Id'
                                value={formik.values.cityId}
                                placeholder='Select one'
                                items={cityIdOptions}
                                // helperText={(formik.touched.cityId && formik.errors.cityId) ? formik.errors.cityId : undefined}
                                error={(formik.touched.cityId && formik.errors.cityId) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("cityId"); formik.validateField("cityId"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='supplier'
                                name='supplier'
                                label='Supplier'
                                value={formik.values.supplier}
                                placeholder='Select one'
                                items={supplierOptions}
                                // helperText={(formik.touched.supplier && formik.errors.supplier) ? formik.errors.supplier : undefined}
                                error={(formik.touched.supplier && formik.errors.supplier) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("supplier"); formik.validateField("supplier"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='branded'
                                name='branded'
                                label='Branded'
                                value={formik.values.branded}
                                placeholder='Select one'
                                items={brandedOptions}
                                // helperText={(formik.touched.branded && formik.errors.branded) ? formik.errors.branded : undefined}
                                error={(formik.touched.branded && formik.errors.branded) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("branded"); formik.validateField("branded"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='branded'
                                name='branded'
                                label='Branded'
                                value={formik.values.branded}
                                placeholder='Select one'
                                items={brandedOptions}
                                // helperText={(formik.touched.branded && formik.errors.branded) ? formik.errors.branded : undefined}
                                error={(formik.touched.branded && formik.errors.branded) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("branded"); formik.validateField("branded"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='actualProduct'
                                name='actualProduct'
                                label='Actual Product'
                                value={formik.values.actualProduct}
                                placeholder='Select one'
                                items={actualProductOptions}
                                // helperText={(formik.touched.actualProduct && formik.errors.actualProduct) ? formik.errors.actualProduct : undefined}
                                error={(formik.touched.actualProduct && formik.errors.actualProduct) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("actualProduct"); formik.validateField("actualProduct"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='opisName'
                                label='OPIS Name'
                                type='text'
                                // helperText={(formik.touched.opisName && formik.errors.opisName) ? formik.errors.opisName : undefined}
                                error={(formik.touched.opisName && formik.errors.opisName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('firstName')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id="customName"
                                label='Custom Name'
                                type='text'
                                // helperText={(formik.touched.customName && formik.errors.customName) ? formik.errors.customName : undefined}
                                error={(formik.touched.customName && formik.errors.customName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customName')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='pricePerGallon'
                                label='pricePerGallon'
                                type='text'
                                // helperText={(formik.touched.pricePerGallon && formik.errors.pricePerGallon) ? formik.errors.pricePerGallon : undefined}
                                error={(formik.touched.pricePerGallon && formik.errors.pricePerGallon) ? true : false}
                                description=''
                                {...formik.getFieldProps('pricePerGallon')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='addedPricePerGallon'
                                label='Added Price Per Gallon'
                                type='text'
                                // helperText={(formik.touched.addedPricePerGallon && formik.errors.addedPricePerGallon) ? formik.errors.addedPricePerGallon : undefined}
                                error={(formik.touched.addedPricePerGallon && formik.errors.addedPricePerGallon) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('addedPricePerGallon')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='discountPerGallon'
                                label='Discount Per Gallon (Optional)'
                                type='text'
                                // helperText={(formik.touched.discountPerGallon && formik.errors.discountPerGallon) ? formik.errors.discountPerGallon : undefined}
                                error={(formik.touched.discountPerGallon && formik.errors.discountPerGallon) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('discountPerGallon')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <FormControl sx={{ m: 3 }}>
                                <FormGroup>
                                    <FormControlLabel
                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                        className="checkbox-field"
                                        control={
                                            <Checkbox checked={formik.values.stateTax} onChange={formik.handleChange} name="stateTax" disabled={isDisabled} />
                                        }
                                        label={
                                            <Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                                State Tax
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                        className="checkbox-field"
                                        control={
                                            <Checkbox checked={formik.values.miscLocalTax} onChange={formik.handleChange} name="miscLocalTax" disabled={isDisabled} />
                                        }
                                        label={
                                            <Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                                Misc Local tax
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                        className="checkbox-field"
                                        control={
                                            <Checkbox checked={formik.values.cityTax} onChange={formik.handleChange} name="cityTax" disabled={isDisabled} />
                                        }
                                        label={
                                            <Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                                City Tax
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                        className="checkbox-field"
                                        control={
                                            <Checkbox checked={formik.values.countyTax} onChange={formik.handleChange} name="countyTax" disabled={isDisabled} />
                                        }
                                        label={
                                            <Typography color={isDisabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                                County Tax
                                            </Typography>
                                        }
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                // helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container lg={12} md={12} sm={12} xs={12} className="lastItem" >
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4}>
                            <Button
                                types="cancel"
                                aria-label="cancel"
                                className="mr-4"
                                onClick={onClickBack}
                            >
                                {t("buttons.cancel")}
                            </Button>

                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={4} textAlign="right">
                            <Button
                                type="submit"
                                types="save"
                                aria-label="save"
                                className="ml-4"
                                disabled={disableSubmitBtn()}

                            >
                                {t("buttons.save")}
                            </Button>
                            <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </FormikProvider>
    );
}