import React, { ChangeEvent, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, FormControlLabel } from '@mui/material';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import { AddVehicleValidationSchema } from './validation';
import { checkboxConfig, formatSave, FormFieldName, formStatusObj, initialFormValues, VehicleAssetFormField } from './config';
import { useAddedCustomerIdStore, useShowConfirmationDialogBoxStore } from '../../../store';
import { ImportIcon } from '../../../assets/icons';
import VehicleSegment from './vehicleSegment';
import { getInputError, getInputHelperText } from '../../../utils/helperFunctions';
import { useAddVehicleAsset, useGetProductGroups } from './queries';
import NonFuelSegment from './nonFuelSegment';
import AddOnSegment from './addOnSegment';
import { getCountryCode } from '../../../navigation/utils';
import FormActionSegment from './formActionSegment';


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

    const handleFormBlur = () => {
        isFormValidated(formik.dirty);
    };

    const handleSaveError = (err: any) => {
        const { data } = err.message;
        formik.setSubmitting(false);
        setFormStatus({ message: data?.error.message || formStatusObj.error.message, type: 'Error' });
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

    const { mutate: addVehicleAsset } = useAddVehicleAsset(getCountryCode() || "", handleSaveSuccess, handleSaveError);

    const { data: productGroupObj } = useGetProductGroups();

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

    const handleInNonFuelChange = (event: ChangeEvent<HTMLInputElement>) => {
        formik.setValues({
            ...formik.values,
            isNonFuel: event.target.checked,
            nonFuelCustomProductName: formik.initialValues.nonFuelCustomProductName
        });
    };

    const handleIsAddOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        formik.setValues({
            ...formik.values,
            isAddOn: event.target.checked,
            addOnCustomProductName: formik.initialValues.addOnCustomProductName
        });
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
                            <FormControlLabel
                                sx={checkboxConfig}
                                control={<Checkbox
                                    checked={Boolean(formik.values.isApplyRule)}
                                    {...formik.getFieldProps('isApplyRule')}
                                />}
                                label={<Typography color={"var(--Darkgray)"} variant="h4" >
                                    {t("addVehicle.vehicleBusinessRule")}
                                </Typography>} />
                        </Grid>

                        <Grid item md={12} mx={4}>
                            <Typography color="var(--Darkgray)" variant="h4"
                                gutterBottom className="fw-bold"
                                mb={1}>
                                {t('addVehicle.generalInfo')}
                            </Typography>
                        </Grid>

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={2}>
                            <FormControlLabel
                                sx={checkboxConfig}
                                className="checkbox-field"
                                control={<Checkbox checked={true} name="isAsset" />}
                                label={<Typography color={"var(--Darkgray)"} variant="h4" >
                                    {t('addVehicle.considerAsAsset')}
                                </Typography>} />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>

                        <VehicleSegment
                            formik={formik}
                            productGroupObj={productGroupObj}
                            lotId={lotId}
                            getFormikProps={getFormikProps}
                        />

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={2}>
                            <FormControlLabel
                                sx={checkboxConfig}
                                className="checkbox-field"
                                control={<Checkbox
                                    name='isNonFuel'
                                    checked={Boolean(formik.values.isNonFuel)}
                                    onChange={handleInNonFuelChange}
                                />}
                                label={<Typography color={"var(--Darkgray)"} variant="h4">
                                    {t('addVehicle.nonFuel')}
                                </Typography>} />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>

                        {formik.values.isNonFuel && <NonFuelSegment
                            formik={formik}
                            productGroupObj={productGroupObj}
                            lotId={lotId}
                            getFormikProps={getFormikProps}
                        />}

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                            <FormControlLabel
                                sx={checkboxConfig}
                                className="checkbox-field"
                                control={<Checkbox
                                    name='isAddOn'
                                    checked={Boolean(formik.values.isAddOn)}
                                    onChange={handleIsAddOnChange}
                                />}
                                label={<Typography color={"var(--Darkgray)"} variant="h4">
                                    Add On Services
                                </Typography>} />
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
