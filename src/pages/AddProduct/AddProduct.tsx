import React, { useCallback, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

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
const AddProduct: React.FC = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const [apiResposneState, setAPIResponse] = useState(false);
    const [productTypes, setProductTypes] = useState([
        { label: 'one', value: 'One' },
        { label: 'two', value: 'Two' },
    ]);
    const [productColors, setProductColors] = useState([
        { label: 'color1', value: 'Color1' },
        { label: 'color2', value: 'Color2' },
    ]);
    const [productStatus, setProductStatus] = useState([
        { label: 'status1', value: 'Status1' },
        { label: 'status2', value: 'Status2' },
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
            console.log('values---', values)
        }
    });
    
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
                                        label='PRODUCT TYPE'
                                        placeholder='Choose'
                                        items={productTypes}
                                        helperText={(formik.touched.productType && formik.errors.productType) ? formik.errors.productType.value : undefined}
                                        error={(formik.touched.productType && formik.errors.productType) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                        required
                                        isDisabled={false}
                                    />

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='productColor'
                                        name='productColor'
                                        label='PRODUCT COLOR'
                                        placeholder='Choose'
                                        items={productColors}
                                        helperText={(formik.touched.productColor && formik.errors.productColor) ? formik.errors.productColor.value : undefined}
                                        error={(formik.touched.productColor && formik.errors.productColor) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("productColor"); formik.validateField("productColor"); }}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='status'
                                        name='status'
                                        label='PRODUCT COLOR'
                                        placeholder='Choose'
                                        items={productStatus}
                                        helperText={(formik.touched.status && formik.errors.status) ? formik.errors.status.value : undefined}
                                        error={(formik.touched.status && formik.errors.status) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("status"); formik.validateField("status"); }}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={5.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='manualPricing'
                                        label={t("productManagement.form.manualPricing")}
                                        type='text'
                                        helperText={(formik.touched.manualPricing && formik.errors.manualPricing) ? formik.errors.manualPricing : undefined}
                                        error={(formik.touched.manualPricing && formik.errors.manualPricing) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('manualPricing')}
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
                                            {t("buttons.save")}
                                        </Button>

                                    </Box>
                                    <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid container mt={1} justifyContent="flex-end">
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                {/* <Box className="form-action-section">
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
                                        {t("buttons.save")}
                                    </Button>
                                    
                                </Box>
                                <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} /> */}
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Grid>
        </Box>
    )
};

export default AddProduct;