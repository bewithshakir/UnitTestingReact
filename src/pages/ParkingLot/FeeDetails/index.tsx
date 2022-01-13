import { Fragment, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Container, FormControlLabel, Grid, Link, Typography, Box } from "@mui/material";
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { EditIcon, PlusIcon} from '../../../assets/icons';
import { AddFeeDetailsValidationSchema } from './validations';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useAddedCustomerNameStore, useAddedCustomerIdStore } from '../../../store';
import './FeeDetails.scss';

export default function FeeDetails() {

    const { t } = useTranslation();
    const { theme } = useTheme();
    const navigate = useNavigate();
    const [isDisabled, setDisabled] = useState(false);
    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const customerName = useAddedCustomerNameStore((state) => state.customerName);
    const customerId = useAddedCustomerIdStore((state) => state.customerId);

    const onClickBack = () => {
        navigate( `/customer/${customerId}/parkingLots` ,{
            state: {
              customerId: customerId,
              customerName: customerName
            }});
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
        assetType: { label: '', value: '' },
        assetTypeDesc: '',
        vehicleType: { label: '', value: '' },
    });

    const handleEditButtonClick = () => {
        setSaveCancelShown(true);
        setDisabled(false);
    };



    const formik = useFormik({
        initialValues: initialFormikValues,
        validationSchema: AddFeeDetailsValidationSchema,
        onSubmit: (values) => {
            // eslint-disable-next-line no-console
            console.log('values',values);
        },
        enableReinitialize: true
    });

    return (
        <Fragment>
            <FormikProvider value={formik}>
                <Grid item md={12} xs={12}>
                    <Container maxWidth="lg" className="page-container fee-details">
                        <Grid container mt={1}>
                            <Grid container item md={12} mt={2} mb={1}>
                                <Grid item xs={6}>
                                    <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                        {'Add Fee Details to fulfil the requirements'}
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
                                        label='Fee Name'
                                        type='text'
                                        placeholder='Enter Fee Name'
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
                                    {'Delivery Fee'}
                                </Typography>
                            </Grid>
                            <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='delFee'
                                        label='Delivery Fee'
                                        type='text'
                                        placeholder='Enter Fee'
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
                                        id='delFee'
                                        name='delFeeShed'
                                        label='Delivery Fee Schedule'
                                        description=''
                                        items={[]}
                                        placeholder='Enter Fee'
                                        helperText={(formik.touched.delFeeShed && formik.errors.delFeeShed) ? formik.errors.delFeeShed.value : undefined}
                                        error={(formik.touched.delFeeShed && formik.errors.delFeeShed) ? true : false}
                                        onBlur={() => { formik.setFieldTouched("delFeeShed"); formik.validateField("delFeeShed"); }}
                                        onChange={() => null}
                                        disabled={isDisabled}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item pt={2.5} md={12} mt={2} mb={1}>
                                <FormControlLabel
                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                    className="checkbox-field"
                                    control={<Checkbox checked={false} name="salesTaxExcemption" />}
                                    label={<Typography variant="h3" component="h3" className="fw-bold">
                                        {'Sales Tax Excemption'}
                                    </Typography>} />
                            </Grid>
                            <Grid item pt={2.5}>
                                <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                    {'Service Fee rule 1 :'}
                                </Typography>
                            </Grid>
                            <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='serviceFeeCharge'
                                        label='Service Fee Charge'
                                        type='text'
                                        placeholder='Enter Fee Charge'
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
                                        id='productType'
                                        name='productType'
                                        label='Product Type'
                                        description=''
                                        items={[]}
                                        placeholder='Select Product Type'
                                        helperText={(formik.touched.productType && formik.errors.productType) ? formik.errors.productType.value : undefined}
                                        error={(formik.touched.productType && formik.errors.productType) ? true : false}
                                        onChange={() => null}
                                        onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                        disabled={isDisabled}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5}>
                                    <Select
                                        id='masterProductType'
                                        name='masterProductType'
                                        label='Master Product Type'
                                        description=''
                                        items={[]}
                                        placeholder='Select Product Type'
                                        onChange={() => null}
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
                                        id='productName'
                                        name='productName'
                                        label='Product Name'
                                        description=''
                                        items={[]}
                                        placeholder='Select Product Name'
                                        onChange={() => null}
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
                                    control={<Checkbox checked={false} name="salesTaxExcemption" />}
                                    label={<Typography variant="h4" component="h4" className="fw-bold">
                                        {'Consider this as an asset'}
                                    </Typography>} />
                            </Grid>
                            <Grid container item md={12} mt={1} mb={1}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='assetType'
                                        name='assetType'
                                        label='Asset Type'
                                        description=''
                                        items={[]}
                                        placeholder='Select Asset Type'
                                        onChange={() => null}
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
                                        placeholder='Enter Asset Description'
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
                                        id='vehicleType'
                                        name='vehicleType'
                                        label='Vehicle Type'
                                        description=''
                                        items={[]}
                                        placeholder='Select Vehicle Type'
                                        onChange={() => null}
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
                                        ADD ANOTHER SERVICE FEE
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
                                    >
                                        {t("buttons.save")}
                                    </Button>
                                </Box>}
                                <ToastMessage isOpen={false} messageType={''} onClose={() => null} message={''} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </FormikProvider>
        </Fragment>
    );
}