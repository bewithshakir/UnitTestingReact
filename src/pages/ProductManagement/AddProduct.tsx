import React, { useState, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { EditIcon } from '../../assets/icons';
import { Add } from "@mui/icons-material";
import { Grid, Typography } from '@mui/material';
import { Button } from '../../components/UIComponents/Button/Button.component';
import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import { formStatusObj } from './config';
import { useGetProductTypes, useGetProductNames, useGetLotProductDetails, useGetPricingModel, useCreateProduct } from './queries';
import { useShowConfirmationDialogBoxStore } from '../../store';
import { AddProductValidationSchema } from './validation';
import { totalPricePerGallon } from '../../utils/math.utils';
interface FormStatusType {
    message: string
    type: string
}
interface FormStatusProps {
    [key: string]: FormStatusType
}

interface Props {
    lotId: string;
    reloadSibling?: any;
    productId: string;
    disableAddEditButton: boolean
}
const formStatusProps: FormStatusProps = formStatusObj;

export default function AddProduct({ lotId, reloadSibling, productId, disableAddEditButton }: Props) {

    const { t } = useTranslation();
    const history = useHistory();
    const isFormFieldChange = () => formik.dirty;
    const [productTypes, setProductTypes] = useState([]);
    const [pricingModelOptions, setPricingModelOptions] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const { data: pricingModelList } = useGetPricingModel();
    const { data: productTypeList } = useGetProductTypes();
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);

    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    const [formSuccess, setFormSuccess] = useState(false);
    const [apiResposneState, setAPIResponse] = useState(false);

    const [isDisabled, setIsDisabled] = useState(false);
    const isEditMode = false;

    const initialValues = {
        productType: { label: "", value: "" },
        masterProductName: { label: "", value: "" },
        pricingModel: { label: "", value: "" },
        productNm: "",
        manualPriceAmt: 0,
        addedPriceAmt: 0,
        discountPriceAmt: 0,
        timeSlot: { label: "", value: "" },

    };
    const formik = useFormik({
        initialValues,
        validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            createNewProduct(values);
        },
        enableReinitialize: true
    });

    const { data: productNamesList } = useGetProductNames(formik?.values?.productType?.value);

    const onAddProductError = (err: any) => {
        resetFormFieldValue(false);
        const { data } = err.response;
        setAPIResponse(true);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);

    };

    const onAddProductSuccess = () => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        setAPIResponse(true);
        setFormStatus(formStatusProps.success);
        setFormSuccess(true);
        reloadSibling && reloadSibling(new Date());
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        formik.resetForm();
    };

    const { mutate: addNewProduct } = useCreateProduct(lotId, onAddProductError, onAddProductSuccess);

    useEffect(() => {
        if (productTypeList?.data?.length) {
            setProductTypes(productTypeList.data.map((obj: any) => ({ label: obj.productClassNm.trim(), value: obj.productClassCd.trim() })));
            if (productNamesList?.data?.length) {
                setProductNames(productNamesList.data.map((obj: any) => ({ label: obj.productName.trim(), value: obj.productId.trim() })));
                if (pricingModelList?.data?.length) {
                    setPricingModelOptions(pricingModelList.data.map((obj: any) => ({ label: obj.pricingModelNm.trim(), value: obj.pricingModelCd.trim() })));
                }
            }

        }
    }, [productTypeList, pricingModelList, productNamesList]);

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


    const createNewProduct = (form: any) => {
        try {
            addNewProduct({
                productNm: form.productNm,
                addedPriceAmt: form.addedPriceAmt,
                discountPriceAmt: form.discountPriceAmt,
                manualPriceAmt: form.manualPriceAmt,
                productId: form.masterProductName?.value,
                pricingModelCd: form.pricingModel?.value
            });
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const onGetProductSuccess = (data: any) => {
        if (data) {
            if (data?.data?.lotProduct) {
                const lotProduct = data.data.lotProduct;
                formik.setFieldValue('productType', { label: lotProduct?.productType?.productClassNm, value: lotProduct?.productType?.productClassCd });
                formik.setFieldValue('masterProductName', { label: lotProduct?.masterProduct?.productName, value: lotProduct?.masterProduct?.productId });
                formik.setFieldValue('pricingModel', { label: lotProduct?.pricingModel?.pricingModelNm, value: lotProduct?.pricingModel?.pricingModelCd });
                formik.setFieldValue('productNm', lotProduct.productNm);
                formik.setFieldValue('manualPriceAmt', lotProduct.manualPriceAmt);
                formik.setFieldValue('addedPriceAmt', lotProduct.addedPriceAmt);
                formik.setFieldValue('discountPriceAmt', lotProduct.discountPriceAmt);
                formik.setFieldValue('timeSlot', { label: "", value: "" });
                setIsDisabled(true);
            }
        }
    };

    const onGetProductError = (err: any) => {
        resetFormFieldValue(false);
        const { data } = err.response;
        setAPIResponse(true);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    useGetLotProductDetails(lotId, productId, onGetProductSuccess, onGetProductError);


    const totalPrice = totalPricePerGallon(formik.values.manualPriceAmt, formik.values.addedPriceAmt, formik.values.discountPriceAmt, 4);

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="productForm">
                <Grid container direction="column"
                    className="productContainer">
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                        {!disableAddEditButton && (
                            <>
                                <Grid item lg={6} md={6} sm={8} xs={8} mx={4} my={1} >
                                    Add New Product or select the product from the table to edit the details
                                </Grid>
                                <Grid item lg={4} md={6} sm={8} xs={8} mx={4} my={1} >


                                    <Button
                                        className='addProductBtn'
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
                            </>
                        )}

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
                                helperText={(formik.touched.productType && formik.errors.productType) ? formik.errors.productType.value : undefined}
                                error={(formik.touched.productType && formik.errors.productType) ? true : false}
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
                                helperText={(formik.touched.pricingModel && formik.errors.pricingModel) ? formik.errors.pricingModel.value : undefined}
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
                                helperText={(formik.touched.pricingModel && formik.errors.pricingModel) ? formik.errors.pricingModel.value : undefined}
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
                        {formik.values?.pricingModel?.label === "Custom" && (
                            <>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='productNm'
                                        label='Product Name'
                                        type='text'
                                        placeholder='Enter Product Name'
                                        helperText={(formik.touched.productNm && formik.errors.productNm) ? formik.errors.productNm : undefined}
                                        error={(formik.touched.productNm && formik.errors.productNm) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('productNm')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                                    <hr></hr>
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='manualPriceAmt'
                                        label='Price Per Gallon (Including TAX)'
                                        type='text'
                                        helperText={(formik.touched.manualPriceAmt && formik.errors.manualPriceAmt) ? formik.errors.manualPriceAmt : undefined}
                                        error={(formik.touched.manualPriceAmt && formik.errors.manualPriceAmt) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('manualPriceAmt')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='addedPriceAmt'
                                        label='Added Price Per Gallon (Optional)'
                                        type='text'
                                        helperText={(formik.touched.addedPriceAmt && formik.errors.addedPriceAmt) ? formik.errors.addedPriceAmt : undefined}
                                        error={(formik.touched.addedPriceAmt && formik.errors.addedPriceAmt) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('addedPriceAmt')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='discountPriceAmt'
                                        label='Discount Per Gallon (Optional)'
                                        type='text'
                                        helperText={(formik.touched.discountPriceAmt && formik.errors.discountPriceAmt) ? formik.errors.discountPriceAmt : undefined}
                                        error={(formik.touched.discountPriceAmt && formik.errors.discountPriceAmt) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('discountPriceAmt')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='totalPrice'
                                        label='Total Price Per Gallon (Including TAx, Adder/Discount)'
                                        type='text'
                                        description=''
                                        value={totalPrice}
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
                                        helperText={(formik.touched.timeSlot && formik.errors.timeSlot) ? formik.errors.timeSlot : undefined}
                                        error={(formik.touched.timeSlot && formik.errors.timeSlot) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("timeSlot"); formik.validateField("timeSlot"); }}
                                        isDisabled={isEditMode ? true : isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>

                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Grid item container lg={12} md={12} sm={12} xs={12} px={4} py={4} className="lastItem" >
                        <Grid item lg={12} md={12} sm={12} xs={12} px={4} py={4} textAlign="right">
                            <Button
                                types="cancel"
                                aria-label="cancel"
                                onClick={onClickBack}
                                className="mr-4"
                                disabled={formSuccess}
                            >
                                {t("buttons.cancel")}
                            </Button>
                            <Button
                                type="submit"
                                types="save"
                                aria-label="save"
                                className="mr-4 ml-4 saveProduct"
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
