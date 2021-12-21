import React, { memo, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Input from '../../components/UIComponents/Input/Input';
import { Button } from '../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import ProductManagementModel from '../../models/ProductManagementModel';
import { AddProductValidationSchema } from './validation';
import Select from '../../components/UIComponents/Select/SingleSelect';
import './AddProduct.scss';
import { HorizontalBarVersionState, useShowConfirmationDialogBoxStore, useStore } from '../../store';
import { useAddProductManagement, useGetProductColors, useGetProductTypes, useGetProductData, useEditProductManagement } from './queries';
import { LoadingIcon } from '../../assets/icons';


interface IFormStatus {
    message: string
    type: string
}


const initialValues = new ProductManagementModel();
const AddProduct: React.FC = memo(() => {
    const { t } = useTranslation();
    const history = useHistory();
    const match = useRouteMatch<{ productId: string }>();
    const { data: productTypesList, isLoading: isLoadingTypes, } = useGetProductTypes('us');
    const { data: productColorsList, isLoading: isLoadingColors } = useGetProductColors('us');
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const [productGroupCd, setProductGroupCd] = useState("");
    const productStatusList = [
        { label: 'Enabled', value: 'Y', },
        { label: 'Disabled', value: 'N' },
    ];
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");


    // Add section starts
    const onSuccessAddProduct = () => {
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });
    };
    const onErrorAddProduct = (err: any) => {
        const { data } = err.response;
        setFormStatus({ message: data?.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };

    const { mutate: addNewProduct, isSuccess: isSuccessAddProduct, isError: isErrorAddProduct, isLoading: isLoadingAddProduct } = useAddProductManagement(onSuccessAddProduct, onErrorAddProduct);
    const createProductData = (form: any) => {
        try {
            const payload = {
                countryCode: 'us',
                productName: form.productName,
                productType: form.productType.value,
                productColor: form.productColor.value,
                productStatus: form.productStatus.value,
                productPricing: +form.productPricing
            };
            addNewProduct(payload);
        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };
    // Add section ends

    // Edit section starts
    const [isEditMode, setEditMode] = useState(false);

    const populateDataInAllFields = (responseData: any) => {
        formik.setFieldValue('countryCode', 'us');
        formik.setFieldValue('productName', responseData.productName);
        formik.setFieldValue('productType', responseData.productType);
        formik.setFieldValue('productColor', responseData.productColor);
        formik.setFieldValue('productStatus', responseData.productStatus);
        formik.setFieldValue('productPricing', responseData.productPricing);
    };

    const onGetProductSuccess = (response: any) => {
        try {
            if (response?.data) {
                const finalData = {
                    productName: response.data.productName,
                    productType: {
                        value: response.data.productClass.productClassCd,
                        label: response.data.productClass.productClassNm
                    },
                    productColor: {
                        value: response.data.productColor.productColorCd,
                        label: response.data.productColor.productColorNm
                    },
                    productStatus: productStatusList.filter((pObj) => pObj.value === response.data.productServiceInd)[0],
                    productPricing: response.data.manualPricing
                };
                populateDataInAllFields(finalData);
                setProductGroupCd(response.data.productGroupCd);
                setEditMode(true);
            }
        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const onGetProductError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || t("formStatusProps.error.message"), type: 'Error' });
            formik.setSubmitting(false);
        } catch (error) {
            setFormStatus({ message: error?.message || t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    useGetProductData(match.params.productId, onGetProductSuccess, onGetProductError);


    const onEditSaleTaxSuccess = () => {
        isFormValidated(false);
        setFormStatus({ message: t("formStatusProps.updated.message"), type: 'Success' });
    };

    const onEditSaleTaxError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || t("formStatusProps.error.message"), type: 'Error' });
            formik.setSubmitting(false);
        } catch (error) {
            setFormStatus({ message: error?.message || t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const { mutate: editProduct, isSuccess: isSuccessEditProduct, isError: isErrorEditProduct, isLoading: isLoadingEditProduct } = useEditProductManagement(
        match.params.productId,
        onEditSaleTaxSuccess,
        onEditSaleTaxError
    );

    const updateProductData = (form: any) => {
        try {
            const payload = {
                countryCode: form.countryCode,
                productName: form.productName,
                productType: form.productType.value,
                productColor: form.productColor.value,
                productStatus: form.productStatus.value,
                productPricing: +form.productPricing,
                productGroupId: productGroupCd
            };
            editProduct(payload);
        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    // Edit section ends
    const formik = useFormik({
        initialValues,
        validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            if (isEditMode) {
                updateProductData(values);
            } else {
                createProductData(values);
            }
        },
        enableReinitialize: true,
    });

    const handleFormDataChange = () => {
        if (isEditMode) {
            if (formik.dirty) {
                if (formik.initialValues != formik.values) {
                    isFormValidated(false);
                }
            }
        }
        if (formik.dirty && !formik.isSubmitting) {
            isFormValidated(true);
        }
    };

    const onClickCancel = () => {
        if (isEditMode) {
            if (formik.touched && Object.keys(formik.touched).length === 0 && Object.getPrototypeOf(formik.touched) === Object.prototype) {
                if (formik.dirty) {
                    if (formik.initialValues != formik.values) {
                        isFormValidated(false);
                        history.push('/productManagement');
                    }
                }
            } else {
                showDialogBox(true);
            }
        } else {
            if (formik.dirty) {
                showDialogBox(true);
            } else {
                history.push('/productManagement');
            }
        }
    };

    const disableButton = () => {
        if (isEditMode) {
            // eslint-disable-next-line no-console
            console.log("🚀 ~ file: AddProduct.tsx ~ line 238 ~ disableButton ~ formik", formik);
            if (Object.keys(formik.errors).length > 1 && Object.keys(formik.touched).length > 1) {
                return true;
            }
            return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
        } else {
            return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
        }
    };

    return (
        <Box display="flex" className="global_main_wrapper">
            <Grid item md={7} xs={7}>
                <Container maxWidth="lg" className="page-container">
                    <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange}>
                        <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                            {t("productManagement.form.title")} *
                        </Typography>
                        <Grid container mt={1}>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='productName'
                                        label={t("productManagement.form.productName")}
                                        type='text'
                                        helperText={(formik.touched.productName && formik.errors.productName) ? formik.errors.productName : undefined}
                                        error={(formik.touched.productName && formik.errors.productName) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('productName')}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='productType'
                                        name='productType'
                                        label={t("productManagement.form.productType")}
                                        placeholder='Choose'
                                        value={formik.values.productType}
                                        items={productTypesList}
                                        helperText={(formik.touched.productType && formik.errors.productType) ? formik.errors.productType.value : undefined}
                                        error={(formik.touched.productType && formik.errors.productType) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                        required
                                        isLoading={isLoadingTypes}
                                        noOptionsMessage={() => "No data Found"}
                                    />

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='productColor'
                                        name='productColor'
                                        label={t("productManagement.form.productColor")}
                                        placeholder='Choose'
                                        value={formik.values.productColor}
                                        items={productColorsList}
                                        helperText={(formik.touched.productColor && formik.errors.productColor) ? formik.errors.productColor.value : undefined}
                                        error={(formik.touched.productColor && formik.errors.productColor) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("productColor"); formik.validateField("productColor"); }}
                                        required
                                        isLoading={isLoadingColors}
                                        noOptionsMessage={() => "No data Found"}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='productStatus'
                                        name='productStatus'
                                        label={t("productManagement.form.productStatus")}
                                        placeholder='Choose'
                                        value={formik.values.productStatus}
                                        items={productStatusList}
                                        helperText={(formik.touched.productStatus && formik.errors.productStatus) ? formik.errors.productStatus.value : undefined}
                                        error={(formik.touched.productStatus && formik.errors.productStatus) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("productStatus"); formik.validateField("productStatus"); }}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={5.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='productPricing'
                                        label={t("productManagement.form.productPricing")}
                                        type='text'
                                        helperText={(formik.touched.productPricing && formik.errors.productPricing) ? formik.errors.productPricing : undefined}
                                        error={(formik.touched.productPricing && formik.errors.productPricing) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('productPricing')}
                                    />
                                </Grid>
                            </Grid>


                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>

                                    <Box className="form-action-section txt-right">
                                        <Button
                                            types="cancel"
                                            aria-label={t("buttons.cancel")}
                                            className="mr-4"
                                            onClick={onClickCancel}
                                            data-test="cancel"
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label={t("buttons.save")}
                                            className="ml-4"
                                            data-test="save"
                                            disabled={disableButton()}
                                        >
                                            {t("buttons.save")} {(isLoadingAddProduct || isLoadingEditProduct) && <LoadingIcon className='loading_save_icon' />}
                                        </Button>
                                    </Box>
                                    <ToastMessage
                                        isOpen={
                                            isErrorAddProduct || isSuccessAddProduct ||
                                            isErrorEditProduct || isSuccessEditProduct
                                        }
                                        messageType={formStatus.type}
                                        onClose={() => { return ''; }}
                                        message={formStatus.message} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Grid>
        </Box>
    );
});

export default AddProduct;