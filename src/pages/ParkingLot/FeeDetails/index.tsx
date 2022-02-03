import { Fragment, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container, FormControlLabel, Grid, Link, Typography, Box } from "@mui/material";
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { EditIcon, PlusIcon, DeleteIcon } from '../../../assets/icons';
import { AddFeeDetailsValidationSchema } from './validations';
import { useTheme } from '../../../contexts/Theme/Theme.context';
// import { formStatusObj } from '../config';
import { useAddedCustomerNameStore, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore } from '../../../store';
import { useGetDeliveryFeeSchd } from './queries';
import ServiceRule from './serviceRule';
import './FeeDetails.scss';

// interface FormStatusType {
//     message: string
//     type: string
// }

// interface FormStatusProps {
//     [key: string]: FormStatusType
// }

// const formStatusProps: FormStatusProps = formStatusObj;

export default function FeeDetails() {

    const { t } = useTranslation();
    const { theme } = useTheme();
    const { pathname } = useLocation();
    const a = pathname.split('/');
    const lotId = a[5];
    // const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    // const [apiResposneState, setAPIResponse] = useState(false);
    const isFormFieldChange = () => formik.dirty;
    const navigate = useNavigate();
    const [isDisabled, setDisabled] = useState(false);
    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const customerName = useAddedCustomerNameStore((state) => state.customerName);
    const customerId = useAddedCustomerIdStore((state) => state.customerId);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);

    const [feeShed, setFeeShed] = useState([]);
    const { data: delFeeShedList } = useGetDeliveryFeeSchd();
    
    useEffect(() => {
        if (delFeeShedList?.data?.length) {
            setFeeShed(delFeeShedList.data.map((obj: any) => ({ label: obj.feeFrequencyNm.trim(), value: obj.feeFrequencyCd.trim() })));
        }
    }, [delFeeShedList]);

    const onClickBack = () => {
        if (isFormFieldChange()) {
            showDialogBox(true);
        } else {
            navigate(`/customer/${customerId}/parkingLots`, {
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
        salesTaxExcemption: false,
        serviceFeeRules: [{
            serviceFeeRuleId: null,
            serviceFeeCharge: '',
            productType: { label: '', value: '' },
            masterProductType: { label: '', value: '' },
            productName: { label: '', value: '' },
            considerAsset: false,
            assetType: { label: '', value: '' },
            assetTypeDesc: '',
            vehicleType: { label: '', value: '' },
        }
        ]

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
            console.warn(values);
        },
        enableReinitialize: true
    });

    const isAddServiceFeeRuleDisabled = () => {
        if ((formik.values.serviceFeeRules.length < 10 && !isDisabled)) {
            if(formik?.values?.serviceFeeRules[0]?.productType?.value?.toLowerCase() === 'all' && formik?.values?.serviceFeeRules[0]?.vehicleType?.value?.toLowerCase() === 'all' && formik?.values?.serviceFeeRules[0]?.assetType?.value?.toLowerCase() === 'all'){
                return true;
            }else{
                return false;
            }
        }
        return true;
    };

    const addFeeRule = (fieldArr: any) => {
        if (formik.errors.serviceFeeRules && formik.errors.serviceFeeRules.length > 0) {
            // setFormStatus(formStatusProps.orderScheduleError);
            // setAPIResponse(true);
        } else if (!isAddServiceFeeRuleDisabled()) {
            fieldArr.push({
                serviceFeeCharge: '',
                productType: { label: '', value: '' },
                masterProductType: { label: '', value: '' },
                productName: { label: '', value: '' },
                considerAsset: false,
                assetType: { label: '', value: '' },
                assetTypeDesc: '',
                vehicleType: { label: '', value: '' },
            });
        }
    };

    const deleteFeeRule = (index: number, componentArr: any) => {
        componentArr.remove(index);
    };

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
                                            items={feeShed}
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
                                        control={<Checkbox checked={formik.values.salesTaxExcemption} name="salesTaxExcemption" onChange={formik.handleChange} disabled={isDisabled} />}
                                        label={<Typography variant="h3" component="h3" className="fw-bold">
                                            {t("FeeDetails.salesTaxExcemption")}
                                        </Typography>} />
                                </Grid>
                                <FieldArray
                                    name="serviceFeeRules"
                                    render={(arr) => (
                                        <Fragment>
                                            {formik.values.serviceFeeRules.map((feeRule, index) => (
                                                <Fragment key={`em${index}`}>
                                                    <Grid item pt={2.5}>
                                                        <Typography variant="h3" component="h3" gutterBottom className="left-heading fw-bold" mb={1}>
                                                            {t("FeeDetails.serviceFeeRule") +' ' +  (index+1) +' :'}  
                                                            {index !== 0 && (
                                                                <DeleteIcon color="var(--Tertiary)" height={16} onClick={() => (!formik.values.serviceFeeRules[index].serviceFeeRuleId) && deleteFeeRule(index, arr)}
                                                                    className='deleteBtn' />
                                                            )}
                                                        </Typography>
                                                    </Grid>
                                                    <ServiceRule index={index} isDisabled={isDisabled} formik={formik} lotId={lotId}/>
                                                </Fragment>
                                            ))}
                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    className={`add-link  ${isAddServiceFeeRuleDisabled() && "add-link disabled-text-link"}`}
                                                    onClick={() => addFeeRule(arr)}
                                                >
                                                    <span className="add-icon-span"><PlusIcon color={isAddServiceFeeRuleDisabled() ? theme["--Secondary-Background"] : theme["--Primary"]} /></span>
                                                    <Typography variant="h3" component="h3" className="fw-bold disabled-text" mb={1}>
                                                        {t("FeeDetails.addAnotherServiceFee")}
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </Fragment>)}
                                />

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