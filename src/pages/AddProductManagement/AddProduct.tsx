import React, { memo, useCallback, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';

import AutocompleteInput from '../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import Input from '../../components/UIComponents/Input/Input';
import { Button } from '../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import ProductManagementModel, { SelectPropsInt } from '../../models/ProductManagementModel';
import { AddProductValidationSchema } from './validation';
import Select from '../../components/UIComponents/Select/SingleSelect';
import './AddProduct.scss';
import { HorizontalBarVersionState, useShowConfirmationDialogBoxStore, useStore } from '../../store';
import { getCheckBoxDisabledByPaymentType } from '../../utils/helperFunctions';
import { useAddProductManagement, useGetProductColors, useGetProductTypes } from './queries'
import { LoadingIcon } from '../../assets/icons';


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

const initialValues = new ProductManagementModel();
const AddProduct: React.FC = memo(() => {
    const { t } = useTranslation();
    const history = useHistory();
    const { data: productTypesList, isLoading: isLoadingTypes, } = useGetProductTypes('us');
    const { data: productColorsList, isLoading: isLoadingColors } = useGetProductColors('us');
    
    const [productStatusList] = useState([
        { label: 'Enabled', value: 'Y' },
        { label: 'Disabled', value: 'N' },
    ]);
    
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");

    const formik = useFormik({
        initialValues,
        validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            createProductData(values);
        }
    });

    const onSuccessAddProduct = ()=> {
        setFormStatus(formStatusProps.success);
    }
    const onErrorAddProduct = (err: any)=> {
        const { data } = err.response;
        setFormStatus({ message: data?.error?.details[0] || formStatusProps.error.message, type: 'Error' });
    }

    const {mutate: addNewProduct, isSuccess: isSuccessAddProduct,  isError: isErrorAddProduct, isLoading: isLoadingAddProduct } = useAddProductManagement(onSuccessAddProduct, onErrorAddProduct);
    const createProductData = (form: any)=> {
        try {
            const payload = {
                countryCode: 'us',
                productName: form.productName,
                productType: form.productType.value,
                productColor: form.productColor.value,
                productStatus: form.productStatus.value,
                productPricing: +form.productPricing
            
            }
            addNewProduct(payload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    }
    
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);

    const handleFormDataChange = ()=> {
        if (formik.dirty) {
            isFormValidated(true);
        }
    };

    const onClickBack = () => {
        if (formik.dirty) {
            showDialogBox(true);
        } else {
            history.push('/');
        }
    };

    const disableButton = () => {
        if (formik.dirty) {
            return !formik.isValid;
        } else {
            return true;
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
                                        required
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
                                            onClick={onClickBack}
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
                                            {t("buttons.save")} { isLoadingAddProduct && <LoadingIcon className='loading_save_icon' />}
                                        </Button>
                                    </Box>
                                    <ToastMessage isOpen={isErrorAddProduct || isSuccessAddProduct} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Grid>
        </Box>
    )
});

export default AddProduct;