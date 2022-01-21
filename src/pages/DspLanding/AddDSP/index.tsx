import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import DSPModel from "../../../models/DSPModel";
import { AddDSPSchema } from "./validation";
import Input from '../../../components/UIComponents/Input/Input';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import { lotHeaderBoxSx } from '../../ParkingLot/config';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { HorizontalBarVersionState, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore, useStore } from '../../../store';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { useAddDsp } from './queries';
import "./style.scss";
import { LoadingIcon } from '../../../assets/icons';

const initialValues = new DSPModel();
interface AddDSPProps {
    version: string
}
interface IFormStatus {
    message: string
    type: string
}
const AddDSP: React.FC<AddDSPProps> = () => {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: '' });
    const [isEditMode] = useState(false);

    useEffect(()=> {
        setVersion("Breadcrumbs-Many");
    }, []);

    // Add DSP
    const onSuccessAddDsp = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });
    };
    const onErrorAddDsp = (err: any) => {
        const { data } = err.response;
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: data?.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };
    const { mutate: addNewDsp, isSuccess: isSuccessAddDsp, isError: isErrorAddDsp, isLoading: isLoadingAddDsp } = useAddDsp(onSuccessAddDsp, onErrorAddDsp);
    const createDspData = (form: DSPModel) => {
        try {
            addNewDsp(form);
        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: AddDSPSchema,
        onSubmit: (values: DSPModel) => {
            const updatedValues = {...values, customerId: addedCustomerId} as DSPModel;
            if (isEditMode) {
                // updateProductData(values);
            } else {
                createDspData(updatedValues);
            }
        },
        enableReinitialize: true,
    });

    function handleGoogleAddressChange(addressObj: any) {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('addressLine2', addressObj.addressLine2);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('postalCode', addressObj.postalCode);
    }

    function handleGoogleAddressBlur() {
        formik.setFieldTouched("addressLine1");
        formik.validateField("addressLine1");
        formik.setFieldTouched("addressLine2");
        formik.validateField("addressLine2");
        formik.setFieldTouched("city");
        formik.validateField("city");
        formik.setFieldTouched("state");
        formik.validateField("state");
        formik.setFieldTouched("postalCode");
        formik.validateField("postalCode");
    }

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
            navigate(`/customer/${addedCustomerId}/dsps`);
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
        <Grid item md={9} xs={9} sx={lotHeaderBoxSx}>
            <Container maxWidth="lg" className="page-container lot-container">
                <form onSubmit={formik.handleSubmit} id='form'>
                    <Grid container mt={1}>
                        <Grid container item md={12} mt={2} mb={1}>
                            <Grid item xs={6}>
                                <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                                    {t("addDSP.form.title")} *
                                </Typography>
                            </Grid>
                            
                        </Grid>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Input
                                id='dspName'
                                label={t("addDSP.form.dspName")}
                                type='text'
                                helperText={(formik.touched.dspName && formik.errors.dspName) ? formik.errors.dspName : undefined}
                                error={(formik.touched.dspName && formik.errors.dspName) ? true : false}
                                description=''
                                placeholder='Enter'
                                {...formik.getFieldProps('dspName')}
                                required
                            />
                        </Grid>
                        <Grid item md={12} mb={1}>
                            <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={2}>
                                {t("addDSP.form.contactForm.title")} :
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Input
                                id='contactNm'
                                label={t("addDSP.form.contactForm.contactNm")}
                                type='text'
                                helperText={(formik.touched.contactNm && formik.errors.contactNm) ? formik.errors.contactNm : undefined}
                                error={(formik.touched.contactNm && formik.errors.contactNm) ? true : false}
                                description=''
                                placeholder='Enter'
                                {...formik.getFieldProps('contactNm')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Input
                                id='email'
                                label={t("addDSP.form.contactForm.email")}
                                type='text'
                                helperText={(formik.touched.email && formik.errors.email) ? formik.errors.email : undefined}
                                error={(formik.touched.email && formik.errors.email) ? true : false}
                                description=''
                                placeholder='Enter Email ID'
                                {...formik.getFieldProps('email')}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                <Input
                                    id='phone'
                                    label={t("addDSP.form.contactForm.phone")}
                                    type='text'
                                    helperText={(formik.touched.phone && formik.errors.phone) ? formik.errors.phone : undefined}
                                    error={(formik.touched.phone && formik.errors.phone) ? true : false}
                                    description=''
                                    placeholder='Enter phone number Ex: 787 XXXX XXX'
                                    {...formik.getFieldProps('phone')}
                                    required
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <AutocompleteInput
                                id="addressLine1"
                                name='addressLine1'
                                label={t("addDSP.form.contactForm.addressLine1")}
                                onChange={handleGoogleAddressChange}
                                onBlur={handleGoogleAddressBlur}
                                value={formik.values.addressLine1}
                                helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                required
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Input
                                id='addressLine2'
                                label={t("addDSP.form.contactForm.addressLine2")}
                                type='text'
                                helperText={(formik.touched.addressLine2 && formik.errors.addressLine2) ? formik.errors.addressLine2 : undefined}
                                error={(formik.touched.addressLine2 && formik.errors.addressLine2) ? true : false}
                                description=''
                                placeholder='Type here'
                                {...formik.getFieldProps('addressLine2')}
                                required
                                disabled={false}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Input
                                id='city'
                                label={t("addDSP.form.contactForm.city")}
                                type='text'
                                helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                error={(formik.touched.city && formik.errors.city) ? true : false}
                                description=''
                                placeholder='City name'
                                {...formik.getFieldProps('city')}
                                required
                                disabled={false}
                            />
                        </Grid>

                        <Grid item xs={12} md={3} pr={2.5} pb={2.5}>
                            <Input
                                id='state'
                                label={t("addDSP.form.contactForm.state")}
                                type='text'
                                helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                                error={(formik.touched.state && formik.errors.state) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('state')}
                            />
                        </Grid>

                        <Grid item xs={12} md={3} pr={2.5} pb={2.5}>
                            <Input
                                id='postalCode'
                                label={t("addDSP.form.contactForm.postalCode")}
                                type='text'
                                helperText={(formik.touched.postalCode && formik.errors.postalCode) ? formik.errors.postalCode : undefined}
                                error={(formik.touched.postalCode && formik.errors.postalCode) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('postalCode')}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}/>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5} mt={4}>
                            <Box className="form-action-section txt-right">
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
                                    {t("buttons.save")} {(isLoadingAddDsp) && <LoadingIcon data-testid="loading-spinner" className='loading_save_icon' />}
                                </Button>
                            </Box>
                            <ToastMessage
                                isOpen={
                                    isErrorAddDsp || isSuccessAddDsp
                                }
                                messageType={formStatus.type}
                                onClose={() => { return ''; }}
                                message={formStatus.message} />
                        </Grid>


                    </Grid>
                </form>
            </Container>
        </Grid>
    );
};
export default AddDSP;