import React, { useState, useEffect } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../../assets/icons';
import { Add } from "@mui/icons-material";
import { Grid, Typography } from '@mui/material';
import { Button } from '../../components/UIComponents/Button/Button.component';
import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import OpisRackSegment from './OpisRackSegment';
import { formStatusObj, strCustomText, strCustomTextRetail, initFormValues, productFormFields } from './config';
import { useGetProductTypes, useGetProductNames, useGetLotProductDetails, useGetPricingModel, useCreateProduct, useGetOPISRetail, useEditCustomProduct, SupplierPrice } from './queries';
import { useAddedCustomerIdStore, useAddedCustomerNameStore, useShowConfirmationDialogBoxStore, useAddedParkingLotCityNmStore } from '../../store';
import DisclaimerTextBox from "../../components/UIComponents/DisclaimerTextBox/DisclaimerTextBox.component";
import { AddProductValidationSchema } from './validation';
import './ProductManagement.scss';
import { totalPricePerGallon } from '../../utils/helperFunctions';
import { truncateDecimals } from '../../utils/math.utils';

interface FormStatusType {
    message: string
    type: string
}
interface FormStatusProps {
    [key: string]: FormStatusType
}

interface Props {
    lotId: string;
    reloadSibling?: (...args: any) => void;
    productId: string;
    disableAddEditButton: boolean
    isHiddenAddEditRow: boolean
    hideAddEditRow?: (...args: any) => void;
}
const formStatusProps: FormStatusProps = formStatusObj;

export default function AddProduct({ lotId, reloadSibling, productId, disableAddEditButton, isHiddenAddEditRow, hideAddEditRow }: Props) {

    const { t } = useTranslation();
    const navigate = useNavigate();
    const isFormFieldChange = () => formik.dirty;
    const [productTypes, setProductTypes] = useState([]);
    const [pricingModelOptions, setPricingModelOptions] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const { data: pricingModelList } = useGetPricingModel();
    const { data: productTypeList } = useGetProductTypes();
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);
    const parkingLotCityNm = useAddedParkingLotCityNmStore((state) => state.parkingLotCityNm);
    const [fuelTaxError, setFuelTaxError] = useState('');
    const [fetchTaxList, updateFetchTaxList] = useState(false);
    const [supplierPriceRowObj, setSupplierPriceRowObj] = useState<null | SupplierPrice>(null);
    const [getProductKey, saveGetProductKey] = useState('');
    const [fetchOPISRetail, setFetchOPISRetail] = useState(false);
    const [isSaveCancelShown, setSaveCancelShown] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [applicableProductId, setApplicableProductId] = useState('');
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    const [apiResposneState, setAPIResponse] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const customerId = useAddedCustomerIdStore((state) => state.customerId);
    const customerName = useAddedCustomerNameStore((state) => state.customerName);

    const [initialFormikValues, setInitialFormikValues] = useState<productFormFields>(initFormValues);

    const formik = useFormik({
        initialValues: initialFormikValues,
        validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            saveProduct(values);
        },
        enableReinitialize: true
    });

    const { data: productNamesList } = useGetProductNames(formik?.values?.productType?.value);

    const onAddProductError = (err: any) => {
        resetFormFieldValue(false);
        formik.setSubmitting(false);
        const { data } = err.response;
        setAPIResponse(true);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);

    };

    const onAddProductSuccess = (data: any) => {
        if (editMode && data?.data) {
            const lotProduct = data.data;
            setApplicableProductId(lotProduct?.applicableProductId);
            const obj: productFormFields = {
                productType: initialFormikValues.productType,
                masterProductName: initialFormikValues.masterProductName,
                pricingModel: initialFormikValues.pricingModel,
                productNm: lotProduct.productNm,
                manualPriceAmt: lotProduct.manualPriceAmt ? lotProduct.manualPriceAmt : 0,
                addedPriceAmt: lotProduct.addedPriceAmt ? lotProduct.addedPriceAmt : 0,
                discountPriceAmt: lotProduct.discountPriceAmt ? lotProduct.discountPriceAmt : 0,
            };

            if (formik.values.pricingModel?.label.toLowerCase() === 'opis rack') {
                obj.cityId = formik.values.cityId;
                obj.city = formik.values.city;
                obj.state = formik.values.state;
                obj.supplier = formik.values.supplier;
                obj.branded = formik.values.branded;
                obj.actualProduct = formik.values.actualProduct;
                obj.taxExemption = formik.values.taxExemption;
                obj.supplierPrice = formik.values.supplierPrice;
                obj.manualPriceAmt = formik.values.manualPriceAmt;
                obj.opisName = formik.values.opisName;

            }
            updateFetchTaxList(true);
            setInitialFormikValues(obj);
        }
        setIsDisabled(true);
        setSaveCancelShown(false);

        hideDialogBox(false);
        setAPIResponse(true);
        if (editMode) {
            setFormStatus(formStatusProps.editSuccess);
        } else {
            setFormStatus(formStatusProps.success);
        }

        setProductNames([]);
        reloadSibling && reloadSibling(new Date());
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        resetFormFieldValue(false);
        formik.resetForm();
    };

    const { mutate: addNewProduct } = useCreateProduct(lotId, onAddProductError, onAddProductSuccess);
    const { mutate: editCustomProduct } = useEditCustomProduct(lotId, applicableProductId, onAddProductSuccess, onAddProductError);


    const onGetOPISRetailSuccess = (data: any) => {
        if (data?.data?.fuelPrice !== undefined) {
            formik.setFieldValue('manualPriceAmt', data.data.fuelPrice);
            setFetchOPISRetail(false);
        }
    };

    const onGetOPISRetailError = (err: any) => {
        const { data } = err.response;
        setAPIResponse(false);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };


    useGetOPISRetail(fetchOPISRetail, lotId, formik.values?.masterProductName?.label, onGetOPISRetailSuccess, onGetOPISRetailError);


    useEffect(() => {
        if (productTypeList?.data?.length) {
            setProductTypes(productTypeList.data.map((obj: any) => ({ label: obj.productGroupNm.trim(), value: obj.productGroupCd.trim() })));
        }
        if (productNamesList?.data?.products?.length) {
            setProductNames(productNamesList.data.products.filter((product: any) => product.activeInactiveInd === 'Y').map((obj: any) => ({ label: obj.productNm.trim(), value: obj.productCd.trim() })));
        }
        if (pricingModelList?.data?.length) {
            setPricingModelOptions(pricingModelList.data.map((obj: any) => ({ label: obj.pricingModelNm.trim(), value: obj.pricingModelCd.trim() })));
        }

    }, [productTypeList, pricingModelList, productNamesList]);

    const clearCustomRelatedFormValues = () => {
        formik.setFieldValue('productNm', '');
        formik.setFieldValue('manualPriceAmt', 0);
        formik.setFieldValue('addedPriceAmt', 0);
        formik.setFieldValue('discountPriceAmt', 0);
    };

    const disableSubmitBtn = () => {
        return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
    };
    const disableCancelBtn = () => {
        return isDisabled;
    };

    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };

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

    const saveProduct = (form: any) => {
        try {
            const payloadObj = {
                ...(form && form.addedPriceAmt && { addedPriceAmt: form.addedPriceAmt }),
                ...(form && form.discountPriceAmt && { discountPriceAmt: form.discountPriceAmt }),
                productNm: form.productNm,
                manualPriceAmt: form.manualPriceAmt,
                productId: form.masterProductName?.value,
                pricingModelCd: form.pricingModel?.value
            };

            if (form.pricingModel?.label.toLowerCase() === 'opis rack') {
                payloadObj.pricingCityId = supplierPriceRowObj?.cityId ? supplierPriceRowObj?.cityId : formik.values.cityId;
                payloadObj.pricingProductKey = supplierPriceRowObj?.productKey ? supplierPriceRowObj?.productKey : getProductKey;
                payloadObj.taxExemption = [...form.taxExemption];
            }

            if (editMode) {
                editCustomProduct(payloadObj);
            } else {
                addNewProduct(payloadObj);
            }
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const onGetProductSuccess = (data: any) => {
        if (data) {
            if (data?.data?.lotProduct) {
                const lotProduct = data.data.lotProduct;
                const obj: productFormFields = {
                    productType: { label: lotProduct?.productType?.productGroupNm, value: lotProduct?.productType?.productGroupCd },
                    masterProductName: { label: lotProduct?.masterProduct?.productName, value: lotProduct?.masterProduct?.productId },
                    pricingModel: { label: lotProduct?.pricingModel?.pricingModelNm, value: lotProduct?.pricingModel?.pricingModelCd },
                    productNm: lotProduct.productNm,
                    manualPriceAmt: lotProduct.manualPriceAmt ? lotProduct.manualPriceAmt : 0,
                    addedPriceAmt: lotProduct.addedPriceAmt ? lotProduct.addedPriceAmt : 0,
                    discountPriceAmt: lotProduct.discountPriceAmt ? lotProduct.discountPriceAmt : 0,
                };
                if (lotProduct?.pricingModel?.pricingModelNm?.toLowerCase() === 'opis rack') {
                    obj.cityId = lotProduct?.opisRackInfo?.cityId;
                    obj.state = lotProduct?.opisRackInfo?.state;
                    obj.supplier = [{ label: lotProduct?.opisRackInfo?.supplier, value: lotProduct?.opisRackInfo?.supplier }];
                    obj.branded = [{ label: lotProduct?.opisRackInfo?.brand, value: lotProduct?.opisRackInfo?.brand }];
                    obj.actualProduct = [{ label: lotProduct?.opisRackInfo?.actualProduct, value: lotProduct?.opisRackInfo?.actualProduct }];
                    obj.taxExemption = JSON.parse(JSON.stringify(lotProduct?.opisRackInfo?.taxExemption));
                    obj.supplierPrice = truncateDecimals((lotProduct?.opisRackInfo?.grossPrice * .01), 4);
                    obj.manualPriceAmt = truncateDecimals((lotProduct?.opisRackInfo?.grossPrice * .01), 4);
                    obj.opisName = lotProduct?.opisRackInfo?.opisProductName;
                    saveGetProductKey(lotProduct?.opisRackInfo?.productKey);
                    setFuelTaxError('');
                }

                setInitialFormikValues(obj);
                setApplicableProductId(lotProduct?.applicableProductId);
                setIsDisabled(true);
                setSaveCancelShown(false);
                updateFetchTaxList(true);
            }
        }
    };

    const onGetProductError = (err: any) => {
        resetFormFieldValue(false);
        const { data } = err.response;
        setAPIResponse(true);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    useGetLotProductDetails(lotId, productId, onGetProductSuccess, onGetProductError);

    const handleProductTypeChange = (fieldName: string, value: any) => {
        if (formik.values?.pricingModel?.label === '') {
            formik.resetForm({});
            formik.setFieldValue(fieldName, value);
        } else {
            formik.setFieldValue(fieldName, value);
            formik.setFieldValue('masterProductName', { label: "", value: "" });
        }
        if (value.label == "Non-Fuel") {
            setProductNames([]);
        } else if (value.label == "Fuel") {
            if (pricingModelList?.data?.length) {
                setPricingModelOptions(pricingModelList.data.map((obj: any) => ({ label: obj.pricingModelNm.trim(), value: obj.pricingModelCd.trim() })));
            }
        }
    };

    const handlePricingModelChange = (fieldName: string, value: any) => {
        formik.setFieldValue(fieldName, value);
        setFuelTaxError('');

        if (value?.label?.toLowerCase() != strCustomText || value?.label?.toLowerCase() != strCustomTextRetail) {
            clearCustomRelatedFormValues();
        }
        if (value?.label?.toLowerCase() === strCustomTextRetail) {
            if (formik.values?.masterProductName?.label) {
                setFetchOPISRetail(true);
                formik.setFieldValue('productNm', [formik.values?.masterProductName?.label + ' ' + 'Retail'].join(''));
            }
        }
        if (value?.label?.toLowerCase() === 'opis rack') {
            if (formik.values?.masterProductName?.label) {
                updateFetchTaxList(true);
            }

        }

    };

    const handleMasterProductNameChange = (fieldName: string, value: any) => {
        formik.setFieldValue(fieldName, value);
        setFuelTaxError('');
        if (formik.values?.pricingModel?.label?.toLowerCase() === strCustomTextRetail) {
            formik.setFieldValue('productNm', [value?.label + ' ' + 'Retail'].join(''));
            setFetchOPISRetail(true);
        }
        if (formik.values?.pricingModel?.label?.toLowerCase() === 'opis rack') {
            updateFetchTaxList(true);
        }
    };

    const handleEditButtonClick = () => {
        setIsDisabled(false);
        setEditMode(true);
        setSaveCancelShown(true);
    };

    const handleAddButtonClick = () => {
        hideAddEditRow && hideAddEditRow();
        formik.resetForm({});
        setEditMode(false);
        setIsDisabled(false);
        setSaveCancelShown(true);
        setInitialFormikValues(initFormValues);
    };

    const showFuelTaxError = (val: boolean) => {
        if (val) {
            setFuelTaxError(`Please configure the tax components for ${parkingLotCityNm}`);
        } else {
            setFuelTaxError('');
        }
    };

    const setFetchTaxList = (val: boolean) => {
        updateFetchTaxList(val);
    };

    const getFormFieldError = (name: string) => {
        if ((formik.touched as any)[name] && (formik.errors as any)[name]) {
            return true;
        }
        return false;
    };

    const getFormFieldHelperText = (name: string, fieldType: string) => {
        if ((formik.touched as any)[name] && (formik.errors as any)[name]) {
            if (fieldType === 'select') {
                return (formik.errors as any)[name]?.value;
            }
            if (fieldType === 'input') {
                return (formik.errors as any)[name];
            }
            return undefined;
        }
        return undefined;
    };

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="productForm" id='saveProductFrom' onBlur={handleFormDataChange}>
                <Grid container direction="column"
                    className="productContainer">
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                        <>

                            <Grid item lg={12} md={6} sm={8} xs={8} mx={4} my={1} >
                                <b>{t("addProductFormLabels.addproductactiontext")}</b>
                            </Grid>

                            <Grid item lg={12} md={6} sm={8} xs={8} mx={4} my={1} mb={3} >
                                <DisclaimerTextBox text={t("addProductFormLabels.addproductopistext")}/>
                            </Grid>
                        </>
                        {!isHiddenAddEditRow && (
                            <>
                                <Grid item lg={6} md={6} sm={8} xs={8} mx={4} my={1} >

                                </Grid>

                                <Grid item lg={4} md={6} sm={8} xs={8} mx={4} my={1} >
                                    <Button
                                        className='addProductBtn'
                                        types="primary"
                                        aria-label="primary"
                                        startIcon={<Add />}
                                        disabled={disableAddEditButton}
                                        onClick={() => handleAddButtonClick()}
                                    >
                                        {t("Add Product")}
                                    </Button>
                                    <Button
                                        types="edit"
                                        className="editProduct"
                                        aria-label="edit"
                                        startIcon={<EditIcon />}
                                        disabled={disableAddEditButton}
                                        onClick={handleEditButtonClick}
                                    >
                                        {t("Edit")}
                                    </Button>

                                </Grid>
                            </>

                        )}

                        <Grid item md={12} mx={4} >
                            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>General Information</Typography>
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='productType'
                                name='productType'
                                label={t("addProductFormLabels.producttypelabel")}
                                value={formik.values.productType}
                                placeholder='Select one'
                                items={productTypes}
                                helperText={getFormFieldHelperText('productType', 'select')}
                                error={getFormFieldError('productType')}
                                onChange={handleProductTypeChange}
                                onBlur={() => { formik.setFieldTouched("productType"); formik.validateField("productType"); }}
                                required
                                isDisabled={isDisabled || editMode}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='masterProductName'
                                name='masterProductName'
                                label={t("addProductFormLabels.masterproductnamelabel")}
                                value={formik.values.masterProductName}
                                placeholder='Select Master Product Name'
                                items={productNames}
                                helperText={getFormFieldHelperText('masterProductName', 'select')}
                                error={getFormFieldError('masterProductName')}
                                onChange={handleMasterProductNameChange}
                                onBlur={() => { formik.setFieldTouched("masterProductName"); formik.validateField("masterProductName"); }}
                                required
                                isDisabled={isDisabled || editMode}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='pricingModel'
                                name='pricingModel'
                                label={t("addProductFormLabels.pricingmodellabel")}
                                value={formik.values.pricingModel}
                                placeholder='Select one'
                                items={pricingModelOptions}
                                helperText={getFormFieldHelperText('pricingModel', 'select')}
                                error={getFormFieldError('pricingModel')}
                                onChange={handlePricingModelChange}
                                onBlur={() => { formik.setFieldTouched("pricingModel"); formik.validateField("pricingModel"); }}
                                required
                                isDisabled={isDisabled || editMode}
                            />
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr />
                        </Grid>
                        {(formik.values?.pricingModel?.label?.toLowerCase() === strCustomText || formik.values?.pricingModel?.label?.toLowerCase() === strCustomTextRetail) && (
                            <>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='productNm'
                                        label={t("addProductFormLabels.productnamelabel")}
                                        type='text'
                                        placeholder='Enter Product Name'
                                        helperText={getFormFieldHelperText('productNm', 'input')}
                                        error={getFormFieldError('productNm')}
                                        description=''
                                        required
                                        {...formik.getFieldProps('productNm')}
                                        disabled={isDisabled || (formik.values?.pricingModel?.label?.toLowerCase() === strCustomTextRetail)}
                                    />
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                                    <hr></hr>
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='manualPriceAmt'
                                        label={t("addProductFormLabels.pricelabel")}
                                        type='text'
                                        helperText={getFormFieldHelperText('manualPriceAmt', 'input')}
                                        error={getFormFieldError('manualPriceAmt')}
                                        description=''
                                        required
                                        {...formik.getFieldProps('manualPriceAmt')}
                                        disabled={isDisabled || (formik.values?.pricingModel?.label?.toLowerCase() === strCustomTextRetail)}
                                    />
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='addedPriceAmt'
                                        label={t("addProductFormLabels.adderlabel")}
                                        type='text'
                                        helperText={getFormFieldHelperText('addedPriceAmt', 'input')}
                                        error={getFormFieldError('addedPriceAmt')}
                                        description=''
                                        {...formik.getFieldProps('addedPriceAmt')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='discountPriceAmt'
                                        label={t("addProductFormLabels.discountlabel")}
                                        type='text'
                                        helperText={getFormFieldHelperText('discountPriceAmt', 'input')}
                                        error={getFormFieldError('discountPriceAmt')}
                                        description=''
                                        {...formik.getFieldProps('discountPriceAmt')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                                    <Input
                                        id='totalPrice'
                                        label={t("addProductFormLabels.totalpricelabel")}
                                        type='text'
                                        description=''
                                        value={totalPricePerGallon(formik.values.manualPriceAmt, formik.values.addedPriceAmt, formik.values.discountPriceAmt, 4)}
                                        disabled={true}
                                    />
                                </Grid>
                            </>
                        )}
                        {(formik.values?.pricingModel?.label?.toLowerCase() === 'opis rack') && !fuelTaxError && formik.values?.masterProductName?.label &&
                            <OpisRackSegment
                                isDisabled={isDisabled}
                                isSaveCancelShown={isSaveCancelShown}
                                formik={formik}
                                editMode={editMode}
                                fetchTaxList={fetchTaxList}
                                showFuelTaxError={showFuelTaxError}
                                setFetchTaxList={setFetchTaxList}
                                setSupplierPrice={setSupplierPriceRowObj}
                                productId={productId} />
                        }
                        {(formik.values?.pricingModel?.label?.toLowerCase() === 'opis rack') && fuelTaxError &&
                            <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                                {fuelTaxError}</Grid>}
                    </Grid>
                    <Grid item container lg={12} md={12} sm={12} xs={12} px={4} py={4} className="lastItem" >
                        <Grid item lg={12} md={12} sm={12} xs={12} px={4} py={4} textAlign="right">
                            {isSaveCancelShown && <div>
                                <Button
                                    types="cancel"
                                    aria-label="cancel"
                                    onClick={onClickBack}
                                    className="mr-4"
                                    id="cancel-btn"
                                    disabled={disableCancelBtn()}
                                >
                                    {t("buttons.cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    types="save"
                                    aria-label="save"
                                    className="mr-4 ml-4 saveProduct"
                                    disabled={disableSubmitBtn()}
                                    id="save-btn"
                                >
                                    {t("buttons.save")}
                                </Button>
                            </div>}
                            <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </FormikProvider>
    );
}
