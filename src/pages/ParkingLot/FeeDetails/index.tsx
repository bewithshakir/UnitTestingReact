import { Fragment, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container, FormControlLabel, Grid, Link, Typography, Box } from "@mui/material";
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { EditIcon, PlusIcon } from '../../../assets/icons';
import { AddFeeDetailsValidationSchema } from './validations';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useAddedCustomerNameStore, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore } from '../../../store';
import './FeeDetails.scss';

export default function FeeDetails() {

    const { t } = useTranslation();
    const { theme } = useTheme();
    const isFormFieldChange = () => formik.dirty;
    const navigate = useNavigate();
    const [isDisabled, setDisabled] = useState(false);
    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const customerName = useAddedCustomerNameStore((state) => state.customerName);
    const customerId = useAddedCustomerIdStore((state) => state.customerId);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);

    const onClickBack = () => {
        if (isFormFieldChange()) {
            showDialogBox(true);
        } else {
            navigate( `/customer/${customerId}/parkingLots`, {
                state: {
                    customerId: customerId,
                    customerName: customerName
                }
            });
        }
    };

    const handleSave = () => {
        setSaveCancelShown(false);
        setDisabled(true);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [initialFormikValues, setInitialFormikValues] = useState({
        feeName: '',
        delFee: '',
        delFeeShed: { label: '', value: '' },
        serviceFeeCharge: '',
        productType: { label: '', value: '' },
        masterProductType: { label: '', value: '' },
        productName: { label: '', value: '' },
        salesTaxExcemption: false,
        considerAsset: false,
        assetType: { label: '', value: '' },
        assetTypeDesc: '',
        vehicleType: { label: '', value: '' },
    });

    const handleEditButtonClick = () => {
        setSaveCancelShown(true);
        setDisabled(false);
    };

    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };

    const disableSubmitBtn = () => {
        return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
    };

    const formik = useFormik({
        initialValues: initialFormikValues,
        validationSchema: AddFeeDetailsValidationSchema,
        onSubmit: (values) => {
            // eslint-disable-next-line no-console
            console.log('values', values);
        },
        enableReinitialize: true
    });

    return (
        <Fragment>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange} >
                    <Grid item md={12} xs={12}>
                        <Container maxWidth="lg" className="page-container fee-details">
                            <Grid container mt={1}>
                                <Grid container item md={12} mt={2} mb={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                            {t("FeeDetails.head1")}
                                        </Typography>
                                    </Grid>
                                    {(!isSavCancelShown) && <Grid item xs={6} sx={{ justifyContent: 'flex-end' }}>
                                        <Button
                                            types="save"
                                            aria-label="edit"
                                            className="edit-button"
                                            onClick={handleEditButtonClick}
                                        >
                                            <EditIcon /> <span>{t("buttons.edit")}</span>
                                        </Button>
                                    </Grid>}
                                </Grid>
                                <Grid container item md={12} mt={2} mb={1}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            id='feeName'
                                            label={t("FeeDetails.feeName")}
                                            type='text'
                                            placeholder={t("FeeDetails.feeNamePlaceholder")}
                                            helperText={(formik.touched.feeName && formik.errors.feeName) ? formik.errors.feeName : undefined}
                                            error={(formik.touched.feeName && formik.errors.feeName) ? true : false}
                                            description=''
                                            required
                                            disabled={isDisabled}
                                            {...formik.getFieldProps('feeName')}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item pt={2.5}>
                                    <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                        {t("FeeDetails.deliveryFee")}
                                    </Typography>
                                </Grid>
                                <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            id='delFee'
                                            label={t("FeeDetails.deliveryFee")}
                                            type='text'
                                            placeholder={t("FeeDetails.enterFee")}
                                            helperText={(formik.touched.delFee && formik.errors.delFee) ? formik.errors.delFee : undefined}
                                            error={(formik.touched.delFee && formik.errors.delFee) ? true : false}
                                            description=''
                                            disabled={isDisabled}
                                            required
                                            {...formik.getFieldProps('delFee')}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5}>
                                        <Select
                                            name='delFeeShed'
                                            label={t("FeeDetails.delFeeShed")}
                                            description=''
                                            items={[]}
                                            placeholder={t("FeeDetails.selectFee")}
                                            helperText={(formik.touched.delFeeShed && formik.errors.delFeeShed) ? formik.errors.delFeeShed.value : undefined}
                                            error={(formik.touched.delFeeShed && formik.errors.delFeeShed) ? true : false}
                                            onBlur={() => { formik.setFieldTouched("delFeeShed"); formik.validateField("delFeeShed"); }}
                                            onChange={formik.setFieldValue}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item pt={2.5} md={12} mt={2} mb={1}>
                                    <FormControlLabel
                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                        className="checkbox-field"
                                        control={<Checkbox checked={formik.values.salesTaxExcemption} name="salesTaxExcemption" onChange={formik.handleChange} disabled={isDisabled}/>}
                                        label={<Typography variant="h3" component="h3" className="fw-bold">
                                            {t("FeeDetails.salesTaxExcemption")}
                                        </Typography>} />
                                </Grid>
                                <Grid item pt={2.5}>
                                    <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                        {t("FeeDetails.serviceFeeRule") +' 1 :'}
                                    </Typography>
                                </Grid>
                                <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            id='serviceFeeCharge'
                                            label={t("FeeDetails.serviceFeeCharge")}
                                            type='text'
                                            placeholder={t("FeeDetails.enterFeeCharge")}
                                            helperText={(formik.touched.serviceFeeCharge && formik.errors.serviceFeeCharge) ? formik.errors.serviceFeeCharge : undefined}
                                            error={(formik.touched.serviceFeeCharge && formik.errors.serviceFeeCharge) ? true : false}
                                            description=''
                                            required
                                            disabled={isDisabled}
                                            {...formik.getFieldProps('serviceFeeCharge')}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                    <Grid item xs={12} md={6}>
                                        <Select
                                            name='productType'
                                            label={t("FeeDetails.productType")}
                                            description=''
                                            items={[]}
                                            placeholder={t("FeeDetails.productTypePlaceholder")}
                                            helperText={(formik.touched.productType && formik.errors.productType) ? formik.errors.productType.value : undefined}
                                            error={(formik.touched.productType && formik.errors.productType) ? true : false}
                                            onChange={formik.setFieldValue}
                                            onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} pl={2.5}>
                                        <Select
                                            name='masterProductType'
                                            label={t("FeeDetails.masterProductType")}
                                            description=''
                                            items={[]}
                                            placeholder={t("FeeDetails.productTypePlaceholder")}
                                            onChange={formik.setFieldValue}
                                            helperText={(formik.touched.masterProductType && formik.errors.masterProductType) ? formik.errors.masterProductType.value : undefined}
                                            error={(formik.touched.masterProductType && formik.errors.masterProductType) ? true : false}
                                            onBlur={() => { formik.setFieldTouched("masterProductType"); formik.validateField("masterProductType"); }}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                    <Grid item xs={12} md={6}>
                                        <Select
                                            name='productName'
                                            label={t("FeeDetails.productName")}
                                            description=''
                                            items={[]}
                                            placeholder={t("FeeDetails.productNamePlaceholder")}
                                            onChange={formik.setFieldValue}
                                            helperText={(formik.touched.productName && formik.errors.productName) ? formik.errors.productName.value : undefined}
                                            error={(formik.touched.productName && formik.errors.productName) ? true : false}
                                            onBlur={() => { formik.setFieldTouched("productName"); formik.validateField("productName"); }}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item pt={2.5} md={12} mt={2} mb={1}>
                                    <FormControlLabel
                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                        className="checkbox-field"
                                        control={<Checkbox name="considerAsset" checked={formik.values.considerAsset} onChange={formik.handleChange} disabled={isDisabled}/>}
                                        label={<Typography variant="h4" component="h4" className="fw-bold">
                                            {t("FeeDetails.considerAsset")}
                                        </Typography>} />
                                </Grid>
                                <Grid container item md={12} mt={1} mb={1}>
                                    <Grid item xs={12} md={6}>
                                        <Select
                                            name='assetType'
                                            label={t("FeeDetails.assetType")}
                                            description=''
                                            items={[]}
                                            placeholder={t("FeeDetails.assetTypePlaceholder")}
                                            onChange={formik.setFieldValue}
                                            helperText={(formik.touched.assetType && formik.errors.assetType) ? formik.errors.assetType.value : undefined}
                                            error={(formik.touched.assetType && formik.errors.assetType) ? true : false}
                                            onBlur={() => { formik.setFieldTouched("assetType"); formik.validateField("assetType"); }}
                                            disabled={isDisabled}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                    <Grid item xs={12} md={6}>
                                        <Input
                                            id='assetTypeDesc'
                                            label=''
                                            type='text'
                                            placeholder={t("FeeDetails.assetTypeDescPlaceholder")}
                                            helperText={(formik.touched.assetTypeDesc && formik.errors.assetTypeDesc) ? formik.errors.assetTypeDesc : undefined}
                                            error={(formik.touched.assetTypeDesc && formik.errors.assetTypeDesc) ? true : false}
                                            description=''
                                            required
                                            disabled={isDisabled}
                                            {...formik.getFieldProps('assetTypeDesc')}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container item md={12} mt={1} mb={1}>
                                    <Grid item xs={12} md={6}>
                                        <Select
                                            name='vehicleType'
                                            label={t("FeeDetails.vehicleType")}
                                            description=''
                                            items={[]}
                                            placeholder={t("FeeDetails.vehicleTypePlaceholder")}
                                            onChange={formik.setFieldValue}
                                            helperText={(formik.touched.vehicleType && formik.errors.vehicleType) ? formik.errors.vehicleType.value : undefined}
                                            error={(formik.touched.vehicleType && formik.errors.vehicleType) ? true : false}
                                            onBlur={() => { formik.setFieldTouched("vehicleType"); formik.validateField("vehicleType"); }}
                                            disabled={isDisabled}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item md={12} mt={2} mb={4}>
                                    <Link
                                        variant="body2"
                                        className={'add-link disabled-text-link'}
                                        onClick={() => null}
                                    >
                                        <span className="add-icon-span"><PlusIcon color={theme["--Secondary-Background"]} /></span>
                                        <Typography variant="h3" component="h3" className="fw-bold disabled-text" mb={1}>
                                            {t("FeeDetails.addAnotherServiceFee")}
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    {isSavCancelShown && <Box className="form-action-section">
                                        <Button
                                            types="cancel"
                                            aria-label="cancel"
                                            className="mr-4"
                                            onClick={onClickBack}
                                            disabled={isDisabled}
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label="save"
                                            className="ml-4"
                                            onClick={handleSave}
                                            disabled={disableSubmitBtn()}
                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>}
                                    <ToastMessage isOpen={false} messageType={''} onClose={() => null} message={''} />
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </form>
            </FormikProvider>
        </Fragment >
    );
}