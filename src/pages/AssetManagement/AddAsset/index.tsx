import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { useStore, HorizontalBarVersionState, useShowConfirmationDialogBoxStore } from '../../../store';
import AssetManagementModel from '../../../models/AssetManagementModel';
import { AddAssetSchema } from './validation';
import Input from '../../../components/UIComponents/Input/Input';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { useAddAsset, useEditAsset, useGetAssetDetails } from './queries';
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
    const { assetId }: any = useParams();

    useEffect(() => {
        setVersion("Breadcrumbs-Single");
    }, []);

    // GET Asset Detail Start --------------
    const populateDataInAllFields = (responseData: any) => {
        formik.resetForm({
            values: { ...responseData }
        });
    };

    const onGetAssetSuccess = (response: any) => {
        try {
            if (response?.data) {
                const finalData = {
                    countryCode: 'us',
                    assetType: response.data.assetNm,
                    assetStatus: assetStatusList.filter((aObj) => aObj.value === response.data.activeInactiveInd)[0],
                };
                populateDataInAllFields(finalData);
                setEditMode(true);
            }
        } catch {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const onGetAssetError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || t("formStatusProps.error.message"), type: 'Error' });
            formik.setSubmitting(false);
        } catch (error: any) {
            setFormStatus({ message: error?.message || t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const { isError: isErrorGetAsset } = useGetAssetDetails(assetId, onGetAssetSuccess, onGetAssetError);
    // -------------- GET Asset Detail End



    // ADD Asset Start -------------- 
    const onSuccessAddAsset = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });

    };

    const onErrorAddAsset = (err: any) => {
        const { data } = err.response;
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: data?.error?.message || t("formStatusProps.error.message"), type: 'Error' });
    };

    const { mutate: addNewAsset, isSuccess: isSuccessAddAsset, isError: isErrorAddAsset, isLoading: isLoadingAddAsset } = useAddAsset(onSuccessAddAsset, onErrorAddAsset);

    const createAssetData = (form: AssetManagementModel) => {
        try {
            addNewAsset(form);

        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };
    // -------------- ADD Asset End



    // Edit Asset Start -------------- 
    const onEditAssetSuccess = () => {
        isFormValidated(false);
        setFormStatus({ message: t("formStatusProps.updated.message"), type: 'Success' });
        formik.resetForm({ values: formik.values });
    };

    const onEditAssetError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || t("formStatusProps.error.message"), type: 'Error' });
            formik.setSubmitting(false);
        } catch (error: any) {
            setFormStatus({ message: error?.message || t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const { mutate: editProduct, isSuccess: isSuccessEditAsset, isError: isErrorEditAsset, isLoading: isLoadingEditAsset } = useEditAsset(
        assetId,
        onEditAssetSuccess,
        onEditAssetError
    );

    const updateAssetData = (form: AssetManagementModel) => {
        try {
            editProduct(form);
        } catch {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };
    // --------------  Edit Asset End

    const formik = useFormik({
        initialValues,
        validationSchema: AddAssetSchema,
        onSubmit: (values: AssetManagementModel) => {
            if (isEditMode) {
                //  Edit Asset
                updateAssetData(values);
            } else {
                // Add Asset
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
        <Box mt={10} ml={8}>
            <Grid pl={8} pr={8} className="main-area">
                <form onSubmit={formik.handleSubmit} id="form">
                    <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                        {t("assetManagement.form.title")} *
                    </Typography>
                    <Grid container mt={2}>
                        <Grid item xs={12} md={7} pr={2.5}>
                            <Grid item xs={12} md={6} pb={2.5}>
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

                            <Grid item xs={12} md={6} pb={2.5} data-testid="test">
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

                            <Grid item xs={12} md={6} mt={4}>
                                <Box className="form-action-section">
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
                                        data-test="save"
                                        disabled={disableButton()}
                                    >
                                        {t("buttons.save")}
                                        {(isLoadingAddAsset || isLoadingEditAsset) && <LoadingIcon data-testid="loading-spinner" className='loading_save_icon' />}
                                    </Button>
                                </Box>
                                <ToastMessage
                                    isOpen={
                                        isErrorAddAsset || isSuccessAddAsset || isErrorEditAsset || isSuccessEditAsset || isErrorGetAsset
                                    }
                                    messageType={formStatus.type}
                                    onClose={() => { return ''; }}
                                    message={formStatus.message} />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Box>
    );
};

export default AddAsset;