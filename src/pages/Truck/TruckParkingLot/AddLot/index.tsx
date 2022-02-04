import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';

import { HorizontalBarVersionState, useStore, useShowConfirmationDialogBoxStore } from '../../../../store';
import Input from '../../../../components/UIComponents/Input/Input';
import { Button } from '../../../../components/UIComponents/Button/Button.component';
import { useTranslation } from 'react-i18next';
import './style.scss';
import { useFormik } from 'formik';
import TruckLotModel from '../../../../models/TruckLotModel';
import { AddTruckParkingLotValidationSchema } from './validation';
import AutocompleteInput from '../../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { useAddTruckParkingLot } from './queries';
import ToastMessage from '../../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { useNavigate } from 'react-router-dom';

const initialValues = new TruckLotModel();

interface IFormStatus {
    message: string
    type: string
}
interface IFormStatusProps {
    [key: string]: IFormStatus
}

interface AddTruckParkingLotProps {
    version: string
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Success.',
        type: 'Success',
    },
    updated: {
        message: 'Data updated successfully.',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
};


const AddLot: React.FC<AddTruckParkingLotProps> = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const navigate = useNavigate();
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    const onAddTruckLotSuccess = () => {        
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });
    };
    const onAddTruckLotError = (err: any) => {
        const { data } = err.response;
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: data?.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };

    const { mutate: createNewTruckParkingLot, isSuccess: isSuccessAddLot, isError: isErrorAddLot, } = useAddTruckParkingLot(onAddTruckLotSuccess, onAddTruckLotError);

    const createNewTruckLot = (form: TruckLotModel) => {
        try {
            const apiPayload = {
                "parkingLocationNm": form.parkingLocationNm,
                "addressLine1": form.addressLine1 || 'tezt',
                "addressLine2": form.addressLine2,
                "stateNm": form.stateNm,
                "cityNm": form.cityNm,
                "postalCd": form.postalCd,
                "countryCode": form.countryCode || 'us',
            };
            createNewTruckParkingLot(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: AddTruckParkingLotValidationSchema,
        onSubmit: (values) => {
            createNewTruckLot(values);
        },
    });

    const handleGoogleAddressChange = (addressObj: any) => {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('addressLine2', addressObj.addressLine2);
        formik.setFieldValue('cityNm', addressObj.city);
        formik.setFieldValue('stateNm', addressObj.state);
        formik.setFieldValue('postalCd', addressObj.postalCode);
        formik.setFieldValue('countryCode', 'us');
    };

    function handleGoogleAddressBlur() {
        formik.setFieldTouched("addressLine1");
        formik.validateField("addressLine1");
        formik.setFieldTouched("addressLine2");
        formik.validateField("addressLine2");
        formik.setFieldTouched("cityNm");
        formik.validateField("cityNm");
        formik.setFieldTouched("stateNm");
        formik.validateField("stateNm");
        formik.setFieldTouched("postalCd");
        formik.validateField("postalCd");
    }

    useEffect(() => {
        if (!formik.isValid || formik.dirty) {
            isFormValidated(true);
        } else {
            isFormValidated(false);
        }
    }, [formik.isValid, formik.dirty]);

    const disableButton = () => {
        if (formik.dirty) {
            return !formik.isValid || formik.isSubmitting;
        } else {
            return true;
        }
    };

    const onClickBack = () => {
        if (!formik.isValid || formik.dirty) {
            showDialogBox(true);
        } else {
            navigate(`/truckParkingLot`);
        }
    };
    
    return (
        <>
            <Box display="flex" mt={10} ml={16}>
                <Grid item md={10} xs={10}>
                    <Container maxWidth="lg" className="page-container">
                        <form id="form" onSubmit={formik.handleSubmit} data-testid="component-AddFuelTax">
                            <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={2} pt={3}>
                                {t('addTruckParkingLot.form.title')}
                            </Typography>
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5} mt={3}>
                                <Input
                                    id='parkingLocationNm'
                                    label={t('addTruckParkingLot.form.parkingLocationNm')}
                                    type='text'
                                    description=''
                                    placeholder='Type here'
                                    helperText={(formik.touched.parkingLocationNm && formik.errors.parkingLocationNm) ? formik.errors.parkingLocationNm : undefined}
                                    error={(formik.touched.parkingLocationNm && formik.errors.parkingLocationNm) ? true : false}
                                    {...formik.getFieldProps('parkingLocationNm')}
                                    data-testid="parkingLocationNm"
                                />
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5} data-testid="testaddress">

                                    <AutocompleteInput
                                        id="addressLine1"
                                        name='addressLine1'
                                        label={t('addTruckParkingLot.form.addressLine1')}
                                        onChange={handleGoogleAddressChange}
                                        onBlur={handleGoogleAddressBlur}
                                        value={formik.values.addressLine1}
                                        helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                        error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                        data-testid="addressLine1"
                                        required
                                        disabled={false}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='addressLine2'
                                        label={t('addTruckParkingLot.form.addressLine2')}
                                        type='text'
                                        helperText={(formik.touched.addressLine2 && formik.errors.addressLine2) ? formik.errors.addressLine2 : undefined}
                                        error={(formik.touched.addressLine2 && formik.errors.addressLine2) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('addressLine2')}
                                        data-testid="addressLine2"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='stateNm'
                                        label={t('addTruckParkingLot.form.state')}
                                        type='text'
                                        helperText={(formik.touched.stateNm && formik.errors.stateNm) ? formik.errors.stateNm : undefined}
                                        error={(formik.touched.stateNm && formik.errors.stateNm) ? true : false}
                                        description=''
                                        placeholder='State'
                                        {...formik.getFieldProps('stateNm')}
                                        data-testid="state"
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='cityNm'
                                        label={t('addTruckParkingLot.form.city')}
                                        type='text'
                                        helperText={(formik.touched.cityNm && formik.errors.cityNm) ? formik.errors.cityNm : undefined}
                                        error={(formik.touched.cityNm && formik.errors.cityNm) ? true : false}
                                        description=''
                                        placeholder='City'
                                        {...formik.getFieldProps('cityNm')}
                                        data-testid="cityNm"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='postalCode'
                                        label={t('addTruckParkingLot.form.postalCode')}
                                        type='text'
                                        helperText={(formik.touched.postalCd && formik.errors.postalCd) ? formik.errors.postalCd : undefined}
                                        error={(formik.touched.postalCd && formik.errors.postalCd) ? true : false}
                                        description=''
                                        placeholder='Type here'
                                        {...formik.getFieldProps('postalCd')}
                                        data-testid="postalCd"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={12} mt={2} mb={4}>
                                <Box className="form-action-section">
                                    <Button
                                        types="cancel"
                                        aria-label="cancel"
                                        className="mr-4"
                                        onClick={onClickBack}
                                    >
                                        {t("buttons.cancel")}
                                    </Button>
                                    <Button
                                        id="saveBtn"
                                        type="submit"
                                        types="save"
                                        aria-label="save"
                                        className="ml-4"
                                        disabled={disableButton()}
                                    >
                                        {t("buttons.save")}
                                    </Button>
                                </Box>
                                <ToastMessage isOpen={isErrorAddLot || isSuccessAddLot} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                            </Grid>
                        </form>
                    </Container>
                </Grid>
            </Box>
        </>
    );
};

export default AddLot;