import { Fragment, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Container, FormControlLabel, Grid, Typography } from "@mui/material";
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { EditIcon } from '../../../assets/icons';
import { AddFeeDetailsValidationSchema } from './validations';
import './FeeDetails.scss';

export default function FeeDetails() {

    const { t } = useTranslation();

    const [initialFormikValues, setInitialFormikValues] = useState({
        feeName: '',
        delFee: '',
        delFeeShed: { label: '', value: '' },
        serviceFeeCharge: '',
        productType: { label: '', value: '' },
        masterProductType: { label: '', value: '' },
        productName: { label: '', value: '' }
    });

    setInitialFormikValues({
        feeName: '',
        delFee: '',
        delFeeShed: { label: '', value: '' },
        serviceFeeCharge: '',
        productType: { label: '', value: '' },
        masterProductType: { label: '', value: '' },
        productName: { label: '', value: '' }
    });

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
                                {true && <Grid item xs={6} sx={{ justifyContent: 'flex-end' }}>
                                    <Button
                                        types="save"
                                        aria-label="edit"
                                        className="edit-button"
                                    //onClick={handleEditButtonClick}
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
                                        onChange={() => null}
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
                        </Grid>
                    </Container>
                </Grid>
            </FormikProvider>
        </Fragment>
    );
}