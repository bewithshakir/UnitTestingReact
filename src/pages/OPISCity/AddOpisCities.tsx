import { Fragment, useState, useEffect } from 'react';
import { Box, Grid, Container, Typography } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import { Button } from '../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import { HorizontalBarVersionState, useStore, useShowConfirmationDialogBoxStore } from '../../store';
import { useGetStates, useGetCity, useAddCity } from './queries';
import { AddOpisCitiesValidation } from './validation';
import { formStatusObj } from './config';

interface FormStatusType {
    message: string
    type: string
}
interface FormStatusProps {
    [key: string]: FormStatusType
}

const formStatusProps: FormStatusProps = formStatusObj;

export default function AddOpis() {

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const { t } = useTranslation();
    const history = useHistory();
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const [apiResposneState, setAPIResponse] = useState(false);

    const initialValues = {
        state: { label: "", value: "" },
        city: { label: "", value: "" },
    };

    const createNew = (form: any) => {
        try {
            addNewCity({
                state: form.state.value,
                city: form.city.label,
                cityId: form.city.value,
                countryCd: form.state.countryCode
            });
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: AddOpisCitiesValidation,
        onSubmit: (values) => {
            createNew(values);
        },
        enableReinitialize: true
    });

    const disableSubmitBtn = () => (!formik.isValid || !formik.dirty) || formik.isSubmitting;
    const isFormFieldChange = () => formik.dirty;
    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };
    const onClickBack = () => {
        if (isFormFieldChange()) {
            showDialogBox(true);
        } else {
            history.push('/opisCities');
        }
    };

    const onAddCityError = (err: any) => {
        try {
            const { data } = err.response;
            setAPIResponse(true);
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const onAddCitySuccess = () => {
        setAPIResponse(true);
        resetFormFieldValue(false);
        setFormStatus(formStatusProps.success);
        formik.resetForm({});
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const { mutate: addNewCity } = useAddCity(onAddCityError, onAddCitySuccess);

    const { data: stateList } = useGetStates();
    const { data: citiesList } = useGetCity(formik?.values?.state?.value);

    useEffect(() => {
        if (stateList?.data?.states?.length) {
            setStates(stateList.data.states.map((obj: any) => ({ label: obj.state.trim(), value: obj.state.trim(), countryCode: obj.countryCode.trim() })));
        }
        if (citiesList?.data?.cities?.length) {
            setCities(citiesList.data.cities.map((obj: any) => ({ label: obj.city.trim(), value: obj.cityId })));
        }

    }, [stateList, citiesList]);

    return (
        <Fragment>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange}>
                    <Box display="flex" mt={10} ml={16}>
                        <Grid item md={8} xs={8}>
                            <Container maxWidth="lg" className="page-container">
                                <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                                    {t("taxes.opisCities.form.fill msg")}
                                </Typography>
                                <Grid container mt={1}>
                                    <Grid item xs={8} md={10} pr={2.5} pb={2.5}>
                                        <Grid item xs={12} md={6}>
                                            <Select
                                                id='state'
                                                name='state'
                                                label={t("taxes.opisCities.form.state")}
                                                value={formik.values.state}
                                                placeholder={t("taxes.opisCities.form.select state")}
                                                items={states}
                                                helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state.value : undefined}
                                                error={(formik.touched.state && formik.errors.state) ? true : false}
                                                onChange={formik.setFieldValue}
                                                onBlur={() => { formik.setFieldTouched("state"); formik.validateField("state"); }}
                                                required
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={8} md={10} pr={2.5} pb={2.5}>
                                        <Grid item xs={12} md={6}>
                                            <Select
                                                id='city'
                                                name='city'
                                                label={t("taxes.opisCities.form.city")}
                                                value={formik.values.city}
                                                placeholder={t("taxes.opisCities.form.select city")}
                                                items={cities}
                                                helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city.label : undefined}
                                                error={(formik.touched.city && formik.errors.city) ? true : false}
                                                onChange={formik.setFieldValue}
                                                onBlur={() => { formik.setFieldTouched("city"); formik.validateField("city"); }}
                                                required
                                            />

                                        </Grid>
                                    </Grid>

                                    <Grid item xs={8} md={10} pr={2.5} pb={2.5}>
                                        <Grid item xs={12} md={6}>
                                            <Input
                                                id='CITYID'
                                                name='cityid'
                                                label={t("taxes.opisCities.form.city id")}
                                                type='text'
                                                placeholder={t("taxes.opisCities.form.city id")}
                                                // helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city.value : undefined}
                                                // error={(formik.touched.city && formik.errors.city) ? true : false}
                                                description=''
                                                value={formik?.values?.city?.value}
                                                required
                                                disabled={true}
                                                data-test="cityid"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container mt={1} justifyContent="flex-start">
                                    <Grid item xs={6} md={8} pr={2.5} pt={2.5}>
                                        <Box className="form-action-section">
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
                                                disabled={disableSubmitBtn()}
                                            >
                                                {t("buttons.save")}
                                            </Button>

                                        </Box>
                                        <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </Box>
                </form>
            </FormikProvider>
        </Fragment>
    );
}