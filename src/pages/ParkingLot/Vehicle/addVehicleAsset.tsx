import React, { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import CheckboxControl from '../../../components/UIComponents/Checkbox/CheckboxControl.component';
import { formatSave, FormFieldName, formStatusObj, initialFormValues, labelColor, VehicleAssetFormField } from './config';
import { useAddedCustomerIdStore, useShowConfirmationDialogBoxStore } from '../../../store';
import { ImportIcon } from '../../../assets/icons';
import VehicleSegment from './vehicleSegment';
import AssetSegment from './assetSegment';
import NonFuelSegment from './nonFuelSegment';
import AddOnSegment from './addOnSegment';
import FormActionSegment from './formActionSegment';
import { getInputError, getInputHelperText } from '../../../utils/helperFunctions';
import { useAddVehicleAsset, useGetProductGroups } from './queries';
import { AddVehicleValidationSchema } from './validation';
import { getCountryCode } from '../../../navigation/utils';
import FuelSegment from './fuelSegment';


interface Props {
    lotId: string
    customerId: string
    selectedVehicleId?: string
    reloadSibling: (...args: any) => void
    disableAddEditButton: boolean
    isHiddenAddEditRow: boolean
    hideAddEditRow?: (...args: any) => void;
}

export default function AddVehicleAsset({ lotId }: Props) {
    const { t } = useTranslation();
    const customerId = useAddedCustomerIdStore((state) => state.customerId);
    const [initialFormikValues] = useState<VehicleAssetFormField>(initialFormValues);
    const [apiResposneState, setAPIResponse] = useState(false);

    const [formStatus, setFormStatus] = useState({ message: '', type: '' });

    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);
    const countryCode = getCountryCode() || "";

    const handleFormBlur = () => {
        isFormValidated(formik.dirty);
    };

    const handleSaveError = (err: any) => {
        const errResp = err?.response?.data?.error;
        formik.setSubmitting(false);
        setFormStatus({ message: errResp?.message || formStatusObj.error.message, type: 'Error' });
        setAPIResponse(true);
        hideDialogBox();
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const handleSaveSuccess = () => {
        formik.setSubmitting(false);
        setFormStatus(formStatusObj.success);
        setAPIResponse(true);
        hideDialogBox();
        formik.resetForm();
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const { mutate: addVehicleAsset } = useAddVehicleAsset(countryCode, handleSaveSuccess, handleSaveError);

    const { data: productGroupObj } = useGetProductGroups(countryCode);

    const saveVehicle = (values: VehicleAssetFormField) => {
        addVehicleAsset(formatSave(customerId, lotId, values));
    };
    const formik = useFormik({
        initialValues: initialFormikValues,
        validationSchema: AddVehicleValidationSchema,
        onSubmit: (values) => {
            saveVehicle(values);
        },
        enableReinitialize: true,
    });
    const getFormikProps = (name: FormFieldName, clearFields?: FormFieldName[]) => {
        return {
            id: name,
            name,
            value: formik.values[name],
            helperText: getInputHelperText(formik, name),
            error: getInputError(formik, name),
            onBlur: () => {
                formik.setFieldTouched(name);
            },
            onChange: (fName: string, value: any) => {
                if (clearFields) {
                    clearFields.forEach(field => {
                        formik.setFieldValue(String(field), formik.initialValues[field]);
                    });
                }
                formik.setFieldValue(fName, value);
            }
        };
    };
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="vehicleForm" id='saveVehicleForm' onBlur={handleFormBlur}>
                <Grid container direction="column"
                    className="addVehicleContainer">
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                        <Grid item lg={8} md={6} sm={8} xs={8} mx={4} my={1}>
                            <b>{t("addVehicle.addVehicleText")}</b>
                        </Grid>
                        <Grid item lg={2} md={6} sm={2} xs={2} mx={4} my={1}>
                            <Button
                                className='addVehicle'
                                types="primary"
                                aria-label="primary"
                                startIcon={<ImportIcon />}
                            >
                                {t("buttons.import")}
                            </Button>
                        </Grid>

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                            <CheckboxControl
                                label={t("addVehicle.vehicleBusinessRule")}
                                {...getFormikProps('isApplyRule')}
                            />
                        </Grid>

                        <Grid item md={12} mx={4}>
                            <Typography color={labelColor} variant="h4"
                                gutterBottom className="fw-bold"
                                mb={1}>
                                {t('addVehicle.generalInfo')}
                            </Typography>
                        </Grid>

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={2}>
                            <CheckboxControl
                                label={t("addVehicle.considerAsAsset")}
                                {...getFormikProps('isAsset')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>
                        {formik.values.isAsset ? (
                            <AssetSegment formik={formik} productGroupObj={productGroupObj} lotId={lotId} getFormikProps={getFormikProps} />
                        ) : (
                            <VehicleSegment
                                formik={formik}
                                productGroupObj={productGroupObj}
                                lotId={lotId}
                                getFormikProps={getFormikProps}
                            />
                        )}

                        <FuelSegment
                            formik={formik}
                            productGroupObj={productGroupObj}
                            lotId={lotId}
                            getFormikProps={getFormikProps}
                        />
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={2}>
                            <CheckboxControl
                                label={t('addVehicle.nonFuel')}
                                {...getFormikProps('isNonFuel', ['nonFuelCustomProductName'])}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>

                        {formik.values.isNonFuel && <NonFuelSegment
                            formik={formik}
                            productGroupObj={productGroupObj}
                            lotId={lotId}
                            getFormikProps={getFormikProps}
                        />}

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                            <CheckboxControl
                                label={t('addVehicle.addOnService')}
                                {...getFormikProps('isAddOn', ['addOnCustomProductName'])}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>
                        {formik.values.isAddOn && <AddOnSegment
                            formik={formik}
                            productGroupObj={productGroupObj}
                            lotId={lotId}
                            getFormikProps={getFormikProps}
                        />}
                    </Grid>

                    <FormActionSegment
                        formik={formik}
                        toastOpen={apiResposneState}
                        toastMessageType={formStatus.type}
                        toastMessage={t(formStatus.message)}
                    />
                </Grid>
            </form>
        </FormikProvider>
    );
}
