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
import { all, formStatusObjFeeDetails } from '../config';
import { useAddedCustomerNameStore, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore } from '../../../store';
import { useGetDeliveryFeeSchd, useAddFeeDetails, useProductsDetailsByLotId, useGetFeeDetailsByLotid, useGetLotVehicleTypes, useGetLotAssetTypes, useEditFeeDetails } from './queries';
import ServiceRule from './serviceRule';
import { pageDataLimit } from '../../../utils/constants';
import NoDataFound from '../../../components/UIComponents/DataGird/Nodata';
import { Loader } from '../../../components/UIComponents/Loader';
import './FeeDetails.scss';

interface FormStatusType {
    message: string
    type: string
}

interface FeeDetailsFormik {
    feeName: string
    delFeeRuleId?: string
    delFee: number | string
    delFeeShed: { label: string; value: string }
    salesTaxExcemption: boolean
    serviceFeeRules: {
        misc?: { applicableFeeMiscId?: string },
        serviceFeeRuleId: string | null
        serviceFeeCharge: string | number
        productType: { label: string; value: string }
        masterProductType: { label: string, value: string }
        productName: { label: string; value: string }
        considerAsset: boolean
        assetType: { label: string; value: string }
        assetTypeDesc: string
        vehicleType: { label: string; value: string }
    }[]
}


const getApiPayload = (formValues: FeeDetailsFormik, lotId: string, productIds: string[]) => {
    const apiPayload = {
        parkingLotId: lotId,
        feeName: formValues.feeName,
        deliveryFee: {
            ...(formValues.delFeeRuleId ? { applicableFeeId: formValues.delFeeRuleId } : {}),
            fee: formValues.delFee,
            feeSchedule: formValues.delFeeShed.value,
            salesTaxExemption: formValues.salesTaxExcemption ? 'Y' : 'N'
        },
        serviceFee: [] as any
    };

    formValues.serviceFeeRules.forEach((rule) => {
        apiPayload.serviceFee.push({
            ...(rule.serviceFeeRuleId ? { applicableFeeId: rule.serviceFeeRuleId } : {}),
            misc: {
                ...(rule.misc?.applicableFeeMiscId ? { applicableFeeMiscId: rule.misc.applicableFeeMiscId } : {}),

                isAllProductType: rule?.productType?.value?.toLowerCase() === 'all' ? 'Y' : 'N',
                isAllMasterProduct: rule?.masterProductType?.value?.toLowerCase() === 'all' ? 'Y' : 'N',
                isAllVehicleType: rule?.vehicleType?.value?.toLowerCase() === 'all' ? 'Y' : 'N',
                isAllAssetType: rule?.assetType?.value?.toLowerCase() === 'all' ? 'Y' : 'N',
                productNameId: (rule?.productType?.value?.toLowerCase() === 'all' || rule?.masterProductType?.value?.toLowerCase() === 'all') ? productIds : []
            },
            fee: rule.serviceFeeCharge,
            ...(((rule?.masterProductType?.value?.toLowerCase() !== 'all') && (rule?.productType?.value?.toLowerCase() !== 'all')) ? { applicableProduct: rule?.productName?.value } : null),
            ...(rule?.assetType?.value && rule?.assetType?.value?.toLowerCase() !== 'all' && { asseType: rule?.assetType?.value }),
            ...(rule?.assetTypeDesc && { assetInput: rule?.assetTypeDesc }),
            ...(rule?.vehicleType?.value && rule?.vehicleType?.value?.toLowerCase() !== 'all' && { vehicleType: rule?.vehicleType?.value }),

            isAsset: rule?.considerAsset ? 'Y' : 'N',
        });
    });
    return apiPayload;

};


export default function FeeDetails() {

    const { t } = useTranslation();
    const { theme } = useTheme();
    const { pathname } = useLocation();
    const a = pathname.split('/');

    const lotId = a[5];
    const { data: productListData, isLoading }: any = useProductsDetailsByLotId(lotId, pageDataLimit);
    const { data: feeDetails } = useGetFeeDetailsByLotid(lotId);

    const { data: vehicleTypeList } = useGetLotVehicleTypes();
    const { data: assetTypeList } = useGetLotAssetTypes();

    const [productCount, setProductCount] = useState(0);
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const [apiResposneState, setAPIResponse] = useState(false);
    const isFormFieldChange = () => formik.dirty;
    const navigate = useNavigate();
    const [isDisabled, setDisabled] = useState(false);
    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const customerName = useAddedCustomerNameStore((state) => state.customerName);
    const customerId = useAddedCustomerIdStore((state) => state.customerId);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);

    const [feeShed, setFeeShed] = useState([]);
    const { data: delFeeShedList } = useGetDeliveryFeeSchd();
    const [productIds, setProductIds] = useState([]);
    const { data: productData }: any = useProductsDetailsByLotId(lotId, productCount);


    useEffect(() => {
        if (delFeeShedList?.data) {
            setFeeShed(delFeeShedList.data.map((obj: any) => ({ label: obj.feeFrequencyNm.trim(), value: obj.feeFrequencyCd.trim() })));
        }
        if (productListData) {
            setProductCount(productListData.data?.pagination?.totalCount);
        }
        if (productData?.data?.lotProducts) {
            setProductIds(productData.data.lotProducts.map((obj: any) => obj.applicableProductId));
        }
    }, [delFeeShedList, productListData, productData]);

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

    const onAddEditFeeError = (err: any) => {
        const { data } = err.response;
        resetFormFieldValue(false);
        isFormValidated(false);
        hideDialogBox(false);
        setAPIResponse(true);
        setFormStatus({ message: data?.error?.message || formStatusObjFeeDetails.error.message, type: 'Error' });
        formik.setSubmitting(false);
        setDisabled(false);
        setSaveCancelShown(true);
    };

    const onAddFeeSuccess = () => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusObjFeeDetails.success);
        setSaveCancelShown(false);
        setDisabled(true);
        formik.setSubmitting(false);
    };
    const onEditFeeSuccess = () => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusObjFeeDetails.editsuccess);
        setSaveCancelShown(false);
        setDisabled(true);
        formik.setSubmitting(false);
    };

    const { mutate: addFeeDetails } = useAddFeeDetails(onAddFeeSuccess, onAddEditFeeError);
    const { mutate: editFeeDetails } = useEditFeeDetails(onEditFeeSuccess, onAddEditFeeError);

    const [initialFormikValues, setInitialFormikValue] = useState<FeeDetailsFormik>({
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
        }]
    });

    useEffect(() => {
        if (feeDetails && feeDetails.data) {
            setSaveCancelShown(false);
            setDisabled(true);
            const feeDetailsData = feeDetails.data;
            const serviceFeeRules = [];
            for (const serviceFee of feeDetailsData.serviceFee) {
                // Here distructure is required in {...all} 
                const assetType = serviceFee.assetInd === "Y" ? { ...all } : { label: "", value: "" };
                const vehicleType = serviceFee.assetInd !== "Y" ? { ...all } : { label: "", value: "" };

                const productType = { ...all };
                const masterProductType = { ...all };
                const productName = { ...all };
                if (serviceFee.misc.isAllProductType === "N") {
                    productType.label = serviceFee.misc?.lotProduct?.productType?.productGroupNm;
                    productType.value = serviceFee.misc?.lotProduct?.productType?.productGroupCd;

                    if (serviceFee.misc.isAllMasterProduct === "N") {
                        masterProductType.label = serviceFee.misc?.lotProduct?.masterProduct?.productName;
                        masterProductType.value = serviceFee.misc?.lotProduct?.masterProduct?.productId;
                        productName.label = serviceFee.misc?.lotProduct?.productNm;
                        productName.value = serviceFee.misc?.lotProduct?.applicableProductId;
                    }
                }

                if (serviceFee.misc?.isAllAssetType === "N" && serviceFee.assetInd === "Y") {
                    assetType.value = serviceFee.assetTypeCd || "";
                    assetType.label = (assetTypeList?.data?.assets?.find((asset: any) => asset.assetId === serviceFee.assetTypeCd)?.assetNm || "").trim();
                }

                if (serviceFee.misc?.isAllVehicleType === "N" && serviceFee.assetInd !== "Y") {
                    vehicleType.value = serviceFee.vehicleTypeCd || "";
                    vehicleType.label = (vehicleTypeList?.data?.find((vehicle: any) => vehicle.vehicleTypeCd === serviceFee.vehicleTypeCd)?.vehicleTypeNm || "").trim();
                }
                serviceFeeRules.push({
                    misc: { applicableFeeMiscId: serviceFee.misc.applicableFeeMiscId },
                    serviceFeeRuleId: serviceFee.applicableFeeId,
                    serviceFeeCharge: serviceFee.feeAmt,

                    productType,
                    masterProductType,
                    productName,

                    assetTypeDesc: serviceFee.assetTypeOtherText,
                    considerAsset: serviceFee.assetInd === "Y",
                    assetType,
                    vehicleType
                });
            }
            setInitialFormikValue({
                feeName: feeDetailsData.feeName,
                delFeeRuleId: feeDetailsData.deliveryFee.applicableFeeId,
                delFee: feeDetailsData.deliveryFee.feeAmt,
                delFeeShed: { label: feeDetailsData.deliveryFee.feeFrequency.feeFrequencyNm, value: feeDetailsData.deliveryFee.feeFrequency.feeFrequencyCd },
                salesTaxExcemption: feeDetailsData.deliveryFee.salesTaxExemptInd === 'Y',
                serviceFeeRules
            });
        }
    }, [feeDetails, vehicleTypeList, assetTypeList]);

    const handleEditButtonClick = () => {
        // For Edit only
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

    const saveFeeDetails = (formValues: any) => {
        try {
            if (feeDetails && feeDetails.data) {
                editFeeDetails(getApiPayload(formValues, lotId, productIds));
            } else {
                addFeeDetails(getApiPayload(formValues, lotId, productIds));
            }
        } catch (error) {
            setFormStatus(formStatusObjFeeDetails.error);
        }
    };

    const formik = useFormik({
        initialValues: initialFormikValues,
        validationSchema: AddFeeDetailsValidationSchema,
        onSubmit: (values) => {
            saveFeeDetails(values);
        },
        enableReinitialize: true
    });

    const isAddServiceFeeRuleDisabled = () => {
        if ((formik.values.serviceFeeRules.length < 10 && !isDisabled)) {
            if (formik?.values?.serviceFeeRules[0]?.productType?.value?.toLowerCase() === 'all'
                && formik?.values?.serviceFeeRules[0]?.vehicleType?.value?.toLowerCase() === 'all') {
                return true;
            } else {
                return false;
            }
        }
        return true;
    };

    const addFeeRule = (event: any, fieldArr: any) => {
        if (!isAddServiceFeeRuleDisabled()) {
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
        } else {
            event.preventDefault();
        }
    };

    const deleteFeeRule = (index: number, componentArr: any) => {
        componentArr.remove(index);
    };

    return (
        <Fragment>
            {isLoading && <Loader />}
            {!isLoading && (productCount === 0 ? (<Grid item md={12} xs={12}>
                <Container maxWidth="lg" className="page-container fee-details">
                    <Grid container mt={1}>
                        <NoDataFound msgLine2={t("FeeDetails.noDataMsg")} />
                    </Grid>
                </Container>
            </Grid>) : (
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange} id="form">
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
                                            {t("FeeDetails.deliveryFeehead")}
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
                                                id='delFeeShed'
                                                name='delFeeShed'
                                                label={t("FeeDetails.delFeeShed")}
                                                description=''
                                                items={feeShed}
                                                placeholder={t("FeeDetails.selectFee")}
                                                helperText={(formik.touched.delFeeShed && formik.errors.delFeeShed) ? formik.errors.delFeeShed.value : undefined}
                                                error={(formik.touched.delFeeShed && formik.errors.delFeeShed) ? true : false}
                                                onBlur={() => { formik.setFieldTouched("delFeeShed"); formik.validateField("delFeeShed"); }}
                                                onChange={formik.setFieldValue}
                                                isDisabled={isDisabled}
                                                required
                                                value={formik.values.delFeeShed}
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
                                                                {t("FeeDetails.serviceFeeRule") + ' ' + (index + 1) + ' :'}
                                                                {index !== 0 && (
                                                                    <DeleteIcon color="var(--Tertiary)" height={16} onClick={() => (!formik.values.serviceFeeRules[index].serviceFeeRuleId) && deleteFeeRule(index, arr)} className={`deleteBtn${isDisabled ? "" : " enabled"}`} />
                                                                )}
                                                            </Typography>
                                                        </Grid>
                                                        <ServiceRule index={index} isDisabled={isDisabled} formik={formik} lotId={lotId} />
                                                    </Fragment>
                                                ))}
                                                <Grid item md={12} mt={2} mb={4}>
                                                    <Link
                                                        variant="body2"

                                                        className={`add-link  ${isAddServiceFeeRuleDisabled() && "add-link disabled-text-link"}`}
                                                        onClick={(event: any) => addFeeRule(event, arr)}
                                                    >
                                                        <span className="add-icon-span"><PlusIcon color={isAddServiceFeeRuleDisabled() ? theme["--Secondary-Background"] : theme["--Primary"]} /></span>
                                                        <Typography variant="h3" component="h3" className="fw-bold" mb={1}>
                                                            {t("FeeDetails.addAnotherServiceFee")}
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                            </Fragment>)}
                                    />

                                    <Grid item md={12} mt={2} mb={1}>
                                        {isSavCancelShown && <Box className="form-action-section">
                                            <Button
                                                id="cancelBtn"
                                                types="cancel"
                                                aria-label="cancel"
                                                className="mr-4"
                                                onClick={onClickBack}
                                                disabled={isDisabled}
                                            >
                                                {t("buttons.cancel")}
                                            </Button>
                                            <Button
                                                id="saveBtn"
                                                type="submit"
                                                types="save"
                                                aria-label="save"
                                                className="ml-4"
                                                disabled={disableSubmitBtn()}
                                            >
                                                {t("buttons.save")}
                                            </Button>
                                        </Box>}
                                        <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => setAPIResponse(false)} message={formStatus.message} />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Grid>
                    </form>
                </FormikProvider>
            ))}
        </Fragment >
    );
}