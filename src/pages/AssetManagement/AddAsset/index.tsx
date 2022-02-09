import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {useStore, HorizontalBarVersionState, useShowConfirmationDialogBoxStore } from '../../../store';
import AssetManagementModel from '../../../models/AssetManagementModel';
import { AddAssetSchema } from './validation';
import Input from '../../../components/UIComponents/Input/Input';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { useAddAsset } from './queries';
import { LoadingIcon } from '../../../assets/icons';

interface PropsInt {
    version: string
}
interface IFormStatus {
    message: string
    type: string
}

const initialValues = new AssetManagementModel();

const assetStatusList = [
    { label: 'Enabled', value: 'Y', },
    { label: 'Disabled', value: 'N' },
];

const AddAsset: React.FC<PropsInt> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: '' });
    const [isEditMode, setEditMode] = useState(false);

    useEffect(()=> {
        setVersion("Breadcrumbs-Single");
    }, []);


    // ADD Asset
    const onSuccessAddAsset = ()=> {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });

    };
    const onErrorAddAsset = (err: any)=> {
        const { data } = err.response;
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: data?.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };
    const { mutate: addNewAsset,  isSuccess: isSuccessAddAsset, isError: isErrorAddAsset, isLoading: isLoadingAddAsset } = useAddAsset(onSuccessAddAsset, onErrorAddAsset);

    const createAssetData = (form: AssetManagementModel) => {
        try {
            addNewAsset(form);
        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };
    // ADD Asset end

    const formik = useFormik({
        initialValues,
        validationSchema: AddAssetSchema,
        onSubmit: (values: AssetManagementModel) => {
            if (isEditMode) {
                // TODO Edit
            } else {
                createAssetData(values);
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

    const onClickCancel = () => {
        if (!formik.isValid || formik.dirty) {
            showDialogBox(true);
        } else {
            navigate(`/assetManagement`);
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
        <Box display="flex" className="global_main_wrapper">
            <Grid item md={7} xs={7}>
                <Container maxWidth="lg" className="page-container">
                    <form onSubmit={formik.handleSubmit} id="form">
                        <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                            {t("assetManagement.form.title")} *
                        </Typography>
                        <Grid container mt={2}>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='assetType'
                                        label={t("assetManagement.form.assetType")}
                                        type='text'
                                        helperText={(formik.touched.assetType && formik.errors.assetType) ? formik.errors.assetType : undefined}
                                        error={(formik.touched.assetType && formik.errors.assetType) ? true : false}
                                        description=''
                                        placeholder='Enter Asset Type'
                                        {...formik.getFieldProps('assetType')}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6} data-testid="test">
                                    <Select
                                        id='assetStatus'
                                        name='assetStatus'
                                        label={t("assetManagement.form.assetStatus")}
                                        placeholder='Choose'
                                        value={formik.values.assetStatus}
                                        items={assetStatusList}
                                        helperText={(formik.touched.assetStatus && formik.errors.assetStatus) ? formik.errors.assetStatus.value : undefined}
                                        error={(formik.touched.assetStatus && formik.errors.assetStatus) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("assetStatus"); formik.validateField("assetStatus"); }}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} mt={4} mb={4}>
                                <Grid item xs={12} md={6}>
                                    <Box className="form-action-section" sx={{textAlign: 'right'}}>
                                        <Button
                                            id="cancelBtn"
                                            types="cancel"
                                            aria-label={t("buttons.cancel")}
                                            className="mr-4"
                                            onClick={onClickCancel}
                                            data-test="cancel"
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            id="saveBtn"
                                            type="submit"
                                            types="save"
                                            aria-label={t("buttons.save")}
                                            className="ml-4"
                                            data-testid="save"
                                            disabled={disableButton()}
                                        >
                                            {t("buttons.save")} 
                                            {(isLoadingAddAsset) && <LoadingIcon data-testid="loading-spinner" className='loading_save_icon' />}
                                        </Button>
                                    </Box>
                                    <ToastMessage
                                        isOpen={
                                            isErrorAddAsset || isSuccessAddAsset
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
};

export default AddAsset;