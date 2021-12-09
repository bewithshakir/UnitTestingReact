/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'; 

import { EditIcon } from '../../assets/icons'; 
import { Add } from "@mui/icons-material";
import { Grid, Typography, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { Button } from '../../components/UIComponents/Button/Button.component';
import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import Checkbox from '../../components/UIComponents/Checkbox/Checkbox.component';
// import Divider from '@mui/material/Divider';
// import { useTheme } from '../../contexts/Theme/Theme.context';
import {  stateOptions, cityOptions, cityIdOptions, supplierOptions, brandedOptions, actualProductOptions, formStatusObj } from './config';
import { useGetProductTypes, useGetProductNames, useGetPricingModel } from './queries';
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

    const initialValues = {
        productType:{ label: "" , value: ""},
        masterProductName:{ label: "" , value: ""},
        pricingModel: { label: "" , value: ""},
        productName: "",
        pricePerGallon: "",
        addedPricePerGallon: "",
        discountPerGallon: "",
        timeSlot:{ label: "" , value: ""},

    };
    const formik = useFormik({
        initialValues,
        // validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            createNewProduct(values);
        },
    });


    const { t } = useTranslation();
    const history = useHistory();
    const isFormFieldChange = () => formik.dirty;
    // const { theme } = useTheme();

    // const [editVisible, setEditVisible] = useState(false);
    // const [formSuccess, setFormSuccess] = useState(false);
    const [productTypes, setProductTypes] = useState([]);
    const [pricingModelOptions, setPricingModelOptions] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const { data: pricingModelList } = useGetPricingModel();
    const { data: productTypeList } = useGetProductTypes();
    const { data: productNamesList } = useGetProductNames(formik?.values?.productType?.value);
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

    useEffect(() => {
        if (pricingModelList?.data?.length) {
            setPricingModelOptions(pricingModelList.data.map((obj: any) => ({ label: obj.pricingModelNm.trim(), value: obj.pricingModelCd.trim() })));
        }
    
        if (productNamesList?.data?.length) {
            setProductNames(productNamesList.data.map((obj: any) => ({ label: obj.productName.trim(), value: obj.productId.trim() })));
        }

        if (productTypeList?.data?.length) {
            setProductTypes(productTypeList.data.map((obj: any) => ({ label: obj.productClassNm.trim(), value: obj.productClassCd.trim() })));
        }
    }, [productTypeList, pricingModelList, productNamesList]);

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
// eslint-disable-next-line no-console
console.log('form data:',formik.values);

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="productForm">
                <Grid container direction="column"
                    className="productContainer">
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                        <Grid item lg={6} md={6} sm={8} xs={8} mx={4} my={1} >
                                Add New Product or select the product from the table to edit the details  
                        </Grid>
                        <Grid item lg={4} md={6} sm={8} xs={8} mx={4} my={1} > 
                        <Button
                                types="primary"
                                aria-label="primary"
                                startIcon={<Add />}
                            >
                                {t("Add Product")}
                            </Button>
                            <Button
                            types="edit" 
                            className="editProduct"
                                aria-label="edit"
                                startIcon={<EditIcon />}
                            >
                                {t("Edit")}
                            </Button>
                            </Grid>
                        <Grid item md={12} mx={4} >
                            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>General Information</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr></hr>
                        </Grid>

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='productType'
                                name='productType'
                                label='PRODUCT TYPE'
                                value={formik.values.productType}
                                placeholder='Select one'
                                items={productTypes}
                                // helperText={(formik.touched.productName && formik.errors.productName) ? formik.errors.productName.value : undefined}
                                error={(formik.touched.productName && formik.errors.productName) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='masterProductName'
                                name='masterProductName'
                                label='Master Product Name'
                                value={formik.values.masterProductName}
                                placeholder='Select Master Product Name'
                                items={productNames}
                                // helperText={(formik.touched.pricingModel && formik.errors.pricingModel) ? formik.errors.pricingModel.value : undefined}
                                error={(formik.touched.masterProductName && formik.errors.masterProductName) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("masterProductName"); formik.validateField("masterProductName"); }}
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
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr></hr>
                        </Grid>
                        {formik.values?.pricingModel?.label==="Custom" && (
                            <>
                            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='productName' 
                                label='Product Name'
                                type='text'
                                placeholder='Enter Product Name'
                                // helperText={(formik.touched.opisName && formik.errors.opisName) ? formik.errors.opisName : undefined}
                                error={(formik.touched.productName && formik.errors.productName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('productName')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr></hr>
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='pricePerGallon'
                                label='Price Per Gallon (Including TAX)'
                                type='text'
                                // helperText={(formik.touched.pricePerGallon && formik.errors.pricePerGallon) ? formik.errors.pricePerGallon : undefined}
                                error={(formik.touched.pricePerGallon && formik.errors.pricePerGallon) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('pricePerGallon')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='addedPricePerGallon'
                                label='Added Price Per Gallon (Optional)'
                                type='text'
                                // helperText={(formik.touched.addedPricePerGallon && formik.errors.addedPricePerGallon) ? formik.errors.addedPricePerGallon : undefined}
                                error={(formik.touched.addedPricePerGallon && formik.errors.addedPricePerGallon) ? true : false}
                                description='' 
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
                                {...formik.getFieldProps('discountPerGallon')}
                                disabled={isDisabled}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='totalPrice'
                                label='Total Price Per Gallon (Including TAx, Adder/Discount)'
                                type='text'
                                // helperText={(formik.touched.discountPerGallon && formik.errors.discountPerGallon) ? formik.errors.discountPerGallon : undefined}
                                error={(formik.touched.discountPerGallon && formik.errors.discountPerGallon) ? true : false}
                                description=''
                                {...formik.getFieldProps('discountPerGallon')}
                                disabled={true}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr></hr>
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='timeSlot'
                                name='timeSlot'
                                label='Time Slot (Optional)'
                                value={formik.values.timeSlot}
                                placeholder='Choose Time Slot'
                                items={[]}
                                // helperText={(formik.touched.city && formik.errors.state) ? formik.errors.state : undefined}
                                error={(formik.touched.timeSlot && formik.errors.timeSlot) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("timeSlot"); formik.validateField("timeSlot"); }}
                                required
                                isDisabled={isEditMode ? true : isDisabled}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                           
                        </Grid>
                        </>
                        )}
                    </Grid>
                    <Grid item container lg={12} md={12} sm={12} xs={12} className="lastItem" >
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} textAlign="right">
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