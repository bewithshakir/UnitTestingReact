import { Fragment, useState, useEffect, ChangeEvent } from 'react';
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { FormControlLabel, Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useGetLotProductTypes, useGetLotProductNames, useGetLotVehicleTypes, useGetLotAssetTypes, useGetLotMasterProductNames } from './queries';
import { all } from '../config';

type props = {
    index: number,
    isDisabled: boolean,
    formik: any,
    lotId: string
}

export default function ServiceRule({ index, isDisabled, formik, lotId }: props) {

    const { t } = useTranslation();

    const [vehicleTypes, setVehicleTypes] = useState<any>([]);
    const { data: vehicleTypeList } = useGetLotVehicleTypes();

    const [assetTypes, setAssetTypes] = useState<any>([]);
    const { data: assetTypeList } = useGetLotAssetTypes();

    const [productTypes, setProductTypes] = useState<any>([]);
    const { data: productTypeList } = useGetLotProductTypes(lotId);

    const [masterProductNames, setMasterProductNames] = useState<any>([]);
    const { data: masterProductNamesList } = useGetLotMasterProductNames(formik?.values?.serviceFeeRules?.[index]?.productType?.value);

    const [productNames, setProductNames] = useState([]);
    const { data: productNameList } = useGetLotProductNames(lotId, formik?.values?.serviceFeeRules?.[index]?.masterProductType?.value);

    useEffect(() => {
        if (vehicleTypeList?.data) {
            const arr = vehicleTypeList.data.map((obj: any) => ({ label: obj.vehicleTypeNm.trim(), value: obj.vehicleTypeCd.trim() }));
            setVehicleTypes([all, ...arr]);
        }
        if (assetTypeList?.data?.assets) {
            const arr = assetTypeList.data.assets.map((obj: any) => ({ label: obj.assetNm.trim(), value: obj.assetId.trim() }));
            setAssetTypes([all, ...arr]);
        }
        if (productTypeList?.data?.lotProductTypes) {
            const arr = productTypeList.data.lotProductTypes.map((obj: any) => ({ label: obj.productGroupNm.trim(), value: obj.productGroupCd.trim() }));
            setProductTypes([all, ...arr]);
        }
        if (masterProductNamesList?.data?.products) {
            const arr = masterProductNamesList.data.products.map((obj: any) => ({ label: obj.productNm.trim(), value: obj.productCd.trim() }));
            setMasterProductNames([all, ...arr]);
        }
        if (productNameList?.data?.lotProducts) {
            setProductNames(productNameList.data.lotProducts.map((obj: any) => ({ label: obj.productNm.trim(), value: obj.applicableProductId.trim() })));
        }
    }, [vehicleTypeList, assetTypeList, productTypeList, productNameList, masterProductNamesList]);

    const handleProductTypeChange = (fieldName: string, value: any) => {
        formik.setFieldValue(fieldName, value);
        formik.setFieldValue(`serviceFeeRules[${index}].masterProductType`, { label: "", value: "" });
        formik.setFieldValue(`serviceFeeRules[${index}].productName`, { label: "", value: "" });
        if (value.value == "all") {
            formik.setFieldValue(`serviceFeeRules[${index}].masterProductType`, { label: "All", value: "all" });
            formik.setFieldValue(`serviceFeeRules[${index}].productName`, { label: "All", value: "all" });
        }
    };

    const handleMasterProductTypeChange = (fieldName: string, value: any) => {
        formik.setFieldValue(fieldName, value);
        formik.setFieldValue(`serviceFeeRules[${index}].productName`, { label: "", value: "" });
        if (value.value === 'all') {
            formik.setFieldValue(`serviceFeeRules[${index}].productName`, { ...all });
        }

    };

    const handleIsAssetChange = (event: ChangeEvent<HTMLInputElement>) => {
        formik.setFieldValue(`serviceFeeRules[${index}].considerAsset`, event.target.checked);
        formik.setFieldValue(`serviceFeeRules[${index}].vehicleType`, { label: "", value: "" });
        formik.setFieldValue(`serviceFeeRules[${index}].assetType`, { label: "", value: "" });
        formik.setFieldValue(`serviceFeeRules[${index}].assetTypeDesc`, "");
    };

    return (
        <Fragment>
            <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                <Grid item xs={12} md={6}>
                    <Input
                        id={`serviceFeeRules[${index}].serviceFeeCharge`}
                        label={t("FeeDetails.serviceFeeCharge")}
                        type='text'
                        placeholder={t("FeeDetails.enterFeeCharge")}
                        helperText={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.serviceFeeCharge
                                    && ((formik.errors?.serviceFeeRules?.[index])?.serviceFeeCharge))
                                ? (formik.errors.serviceFeeRules[index]).serviceFeeCharge : undefined
                        }
                        error={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.serviceFeeCharge
                                    && ((formik.errors?.serviceFeeRules?.[index])?.serviceFeeCharge))
                                ? true : false
                        }
                        description=''
                        required
                        disabled={isDisabled}
                        {...formik.getFieldProps(`serviceFeeRules[${index}].serviceFeeCharge`)}
                    />
                </Grid>
            </Grid>
            <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                <Grid item xs={12} md={6}>
                    <Select
                        id={`serviceFeeRules[${index}].productType`}
                        name={`serviceFeeRules[${index}].productType`}
                        label={t("FeeDetails.productType")}
                        description=''
                        items={productTypes}
                        placeholder={t("FeeDetails.productTypePlaceholder")}
                        helperText={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.productType
                                    && ((formik.errors?.serviceFeeRules?.[index])?.productType))
                                ? (formik.errors.serviceFeeRules[index]).productType.value : undefined
                        }
                        error={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.productType
                                    && ((formik.errors?.serviceFeeRules?.[index])?.productType))
                                ? true : false
                        }
                        onChange={handleProductTypeChange}
                        onBlur={() => {
                            formik.setFieldTouched(`serviceFeeRules[${index}].productType`);
                            formik.validateField(`serviceFeeRules[${index}].productType`);
                        }}
                        isDisabled={isDisabled}
                        required
                        value={formik.values.serviceFeeRules[index].productType}
                    />
                </Grid>
                <Grid item xs={12} md={6} pl={2.5}>
                    <Select
                        id={`serviceFeeRules[${index}].masterProductType`}
                        name={`serviceFeeRules[${index}].masterProductType`}
                        label={t("FeeDetails.masterProductType")}
                        description=''
                        items={masterProductNames}
                        placeholder={t("FeeDetails.masterProductTypePlaceholder")}
                        onChange={handleMasterProductTypeChange}
                        helperText={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.masterProductType
                                    && ((formik.errors?.serviceFeeRules?.[index])?.masterProductType))
                                ?
                                (formik.errors.serviceFeeRules[index]).masterProductType.value : undefined
                        }
                        error={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.masterProductType
                                    && ((formik.errors?.serviceFeeRules?.[index])?.masterProductType))
                                ? true : false
                        }
                        onBlur={() => {
                            formik.setFieldTouched(`serviceFeeRules[${index}].masterProductType`);
                            formik.validateField(`serviceFeeRules[${index}].masterProductType`);
                        }}
                        isDisabled={(formik?.values?.serviceFeeRules?.[index]?.productType?.value?.toLowerCase() === 'all') ? true : isDisabled}
                        required={(formik?.values?.serviceFeeRules?.[index]?.productType?.value?.toLowerCase() === 'all') ? false : true}
                        value={formik.values.serviceFeeRules[index].masterProductType}
                    />
                </Grid>
            </Grid>
            <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                <Grid item xs={12} md={6}>
                    <Select
                        id={`serviceFeeRules[${index}].productName`}
                        name={`serviceFeeRules[${index}].productName`}
                        label={t("FeeDetails.productName")}
                        description=''
                        items={productNames}
                        placeholder={t("FeeDetails.productNamePlaceholder")}
                        onChange={formik.setFieldValue}
                        helperText={
                            formik?.errors?.serviceFeeRules
                                && formik?.touched?.serviceFeeRules
                                && (formik.touched?.serviceFeeRules?.[index]?.productName
                                    && ((formik.errors?.serviceFeeRules?.[index])?.productName))
                                ? (formik.errors.serviceFeeRules[index]).productName.value
                                : undefined
                        }
                        error={
                            formik?.errors?.serviceFeeRules
                                && formik?.touched?.serviceFeeRules
                                && (formik.touched?.serviceFeeRules?.[index]?.productName
                                    && ((formik.errors?.serviceFeeRules?.[index])?.productName))
                                ? true
                                : false
                        }
                        onBlur={() => {
                            formik.setFieldTouched(`serviceFeeRules[${index}].productName`);
                            formik.validateField(`serviceFeeRules[${index}].productName`);
                        }}
                        isDisabled={(formik?.values?.serviceFeeRules?.[index]?.productType?.value?.toLowerCase() === 'all') || (formik?.values?.serviceFeeRules?.[index]?.masterProductType?.value?.toLowerCase() === 'all') ? true : isDisabled}
                        required={(formik?.values?.serviceFeeRules?.[index]?.productType?.value?.toLowerCase() === 'all') ? false : true}
                        value={formik.values.serviceFeeRules[index].productName}
                    />
                </Grid>
            </Grid>
            <Grid item pt={2.5} md={12} mt={2} mb={1}>
                <FormControlLabel
                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                    className="checkbox-field"
                    control={
                        <Checkbox name={`serviceFeeRules[${index}].considerAsset`}
                            checked={formik.values.serviceFeeRules[index].considerAsset}
                            onChange={handleIsAssetChange} disabled={isDisabled}
                        />}
                    label={<Typography variant="h4" component="h4" className="fw-bold">
                        {t("FeeDetails.considerAsset")}
                    </Typography>} />
            </Grid>
            {
                formik.values.serviceFeeRules[index].considerAsset &&
                <>
                    <Grid container item md={12} mt={1} mb={1}>
                        <Grid item xs={12} md={6}>
                            <Select
                                id={`serviceFeeRules[${index}].assetType`}
                                name={`serviceFeeRules[${index}].assetType`}
                                label={t("FeeDetails.assetType")}
                                description=''
                                items={assetTypes}
                                placeholder={t("FeeDetails.assetTypePlaceholder")}
                                onChange={formik.setFieldValue}
                                helperText={
                                    formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                        (formik.touched?.serviceFeeRules?.[index]?.assetType && ((formik.errors?.serviceFeeRules?.[index])?.assetType))
                                        ? (formik.errors.serviceFeeRules[index]).assetType.value : undefined
                                }
                                error={
                                    formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                        (formik.touched?.serviceFeeRules?.[index]?.assetType
                                            && ((formik.errors?.serviceFeeRules?.[index])?.assetType))
                                        ? true : false
                                }
                                onBlur={() => {
                                    formik.setFieldTouched(`serviceFeeRules[${index}].assetType`);
                                    formik.validateField(`serviceFeeRules[${index}].assetType`);
                                }}
                                isDisabled={isDisabled}
                                required
                                value={formik.values.serviceFeeRules[index].assetType}
                            />
                        </Grid>
                    </Grid>
                    <Grid container item md={12} mt={2} mb={1} pt={0.5}>
                        <Grid item xs={12} md={6}>
                            <Input
                                id={`serviceFeeRules[${index}].assetTypeDesc`}
                                label=''
                                type='text'
                                placeholder={t("FeeDetails.assetTypeDescPlaceholder")}
                                helperText={
                                    formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                        (formik.touched?.serviceFeeRules?.[index]?.assetTypeDesc
                                            && ((formik.errors?.serviceFeeRules?.[index])?.assetTypeDesc))
                                        ? (formik.errors.serviceFeeRules[index]).assetTypeDesc : undefined
                                }
                                error={
                                    formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                        (formik.touched?.serviceFeeRules?.[index]?.assetTypeDesc
                                            && ((formik.errors?.serviceFeeRules?.[index])?.assetTypeDesc))
                                        ? true : false
                                }
                                description=''
                                disabled={isDisabled}
                                {...formik.getFieldProps(`serviceFeeRules[${index}].assetTypeDesc`)}
                            />
                        </Grid>
                    </Grid>
                </>
            }
            {!(formik.values.serviceFeeRules[index].considerAsset) && <Grid container item md={12} mt={1} mb={1}>
                <Grid item xs={12} md={6}>
                    <Select
                        id={`serviceFeeRules[${index}].vehicleType`}
                        name={`serviceFeeRules[${index}].vehicleType`}
                        label={t("FeeDetails.vehicleType")}
                        description=''
                        items={vehicleTypes}
                        placeholder={t("FeeDetails.vehicleTypePlaceholder")}
                        onChange={formik.setFieldValue}
                        required
                        helperText={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.vehicleType
                                    && ((formik.errors?.serviceFeeRules?.[index])?.vehicleType))
                                ? (formik.errors.serviceFeeRules[index]).vehicleType.value : undefined
                        }
                        error={
                            formik?.errors?.serviceFeeRules && formik?.touched?.serviceFeeRules &&
                                (formik.touched?.serviceFeeRules?.[index]?.vehicleType
                                    && ((formik.errors?.serviceFeeRules?.[index])?.vehicleType))
                                ? true : false
                        }
                        onBlur={() => {
                            formik.setFieldTouched(`serviceFeeRules[${index}].vehicleType`);
                            formik.validateField(`serviceFeeRules[${index}].vehicleType`);
                        }}
                        isDisabled={isDisabled}
                        value={formik.values.serviceFeeRules[index].vehicleType}
                    />
                </Grid>
            </Grid>
            }
        </Fragment>
    );
}