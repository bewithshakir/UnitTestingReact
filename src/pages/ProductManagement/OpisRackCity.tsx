import { Fragment, useEffect, useState } from "react";
import Select from '../../components/UIComponents/Select/SingleSelect';
import MultiSelect from '../../components/UIComponents/Select/MultiSelect';
import Input from '../../components/UIComponents/Input/Input';
import { useTranslation } from 'react-i18next';
import SupplierRack from './SupplierRackPrice';

import { Grid } from "@mui/material";
import { useGetServedCities, useGetSupplierBrandProducts } from "./queries";

type Props = {
    isDisabled: boolean,
    formik: any,
    editMode: boolean,
    setSupplierPrice: (value: any) => any,
    isSaveCancelShown: boolean,
    productId?:string
}
interface ServedCity {
    city?: string
    cityId?: number
    countryCd?: string
    opisServedCityId?: string
    state?: string
}
interface ServedCityOptions extends ServedCity {
    label: string
    value: string
}
interface GeneralOptions {
    label: string
    value: string
}

const getOptions = (dataArr?: string[]) => {
    return dataArr?.map(item => ({ label: item, value: item })) || [];
};

export default function OpisRackCity({ isDisabled, formik, setSupplierPrice, isSaveCancelShown , productId}: Props) {

    const { t } = useTranslation();
    const [cities, setCities] = useState<ServedCityOptions[]>([]);
    const [suppliers, setSuppliers] = useState<GeneralOptions[]>([]);
    const [brandedList, setbrandedList] = useState<GeneralOptions[]>([]);
    const [viewProductCity, setViewProductCity] = useState<any>(null);
    const [actualProductList, setActualProductList] = useState<GeneralOptions[]>([]);
    const [resetSupplierValue, setResetSupplierValue] = useState<number | null>(null);

    const { data: servedCities } = useGetServedCities();
    const { data: spplierBrandProducts } = useGetSupplierBrandProducts(formik?.values?.city?.cityId || '');

    useEffect(() => {
        setSuppliers(getOptions(spplierBrandProducts?.data?.supplier));
        setbrandedList(getOptions(spplierBrandProducts?.data?.brand));
        setActualProductList(getOptions(spplierBrandProducts?.data?.actualProduct));
        if(!isSaveCancelShown && isDisabled){
            formik.setFieldValue('city',viewProductCity);
        }
    }, [spplierBrandProducts]);

    useEffect(() => {
        setCities(servedCities?.data?.opisCities?.map((c: ServedCity) => ({
            ...c,
            label: c.city,
            value: c.cityId
        })) || []);
    }, [servedCities]);

    const setCityState = () => {
        if(cities && cities.length>0 && !isSaveCancelShown && isDisabled && formik.values.cityId){
            const city = cities.find(c => (c.cityId === formik.values.cityId));
            formik.setFieldValue('city', {label: city?.city , value: city?.cityId, cityId: city?.cityId});
            formik.setFieldValue('state', city?.state);
            setViewProductCity( {label: city?.city , value: city?.cityId, cityId: city?.cityId});
        }
    };

    useEffect(() => {
        setCityState();
    }, [cities]);

    useEffect(() => {
        if(productId) setCityState();
    }, [productId]);


    const handleCityChange = (field: any, value: any) => {
        formik.setFieldValue(field, value);
        formik.setFieldValue('supplier', []);
        formik.setFieldValue('branded', []);
        formik.setFieldValue('actualProduct', []);
        formik.setFieldValue('supplierPrice', 0);
        formik.setFieldValue('manualPriceAmt', 0);
        formik.setFieldValue('opisName', '');
        formik.setFieldValue('state', value?.state);
        formik.setFieldValue('cityId', value?.cityId);
        setResetSupplierValue(Date.now());
    };
    const handleSupplierBrandProductChange = (field: string, value: any) => {
        formik.setFieldValue(field, value);
        setResetSupplierValue(Date.now());
    };

   
    
    return (<Fragment>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Select
                id='city'
                name='city'
                label={t("addProductFormLabels.citylabel")}
                value={formik.values.city}
                placeholder='Select one'
                items={cities}
                helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city.value : undefined}
                error={(formik.touched.city && formik.errors.city) ? true : false}
                onChange={handleCityChange}
                onBlur={() => { formik.setFieldTouched("city"); formik.validateField("city"); }}
                required
                isDisabled={isDisabled}
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='state'
                name='state'
                label={t("addProductFormLabels.statelabel")}
                type='text'
                onClick={(e) => e.preventDefault()}
                helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                error={(formik.touched.state && formik.errors.state) ? true : false}
                description=''
                {...formik.getFieldProps('state')}
                disabled
                required
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='cityId'
                label={t("addProductFormLabels.cityidlabel")}
                type='text'
                helperText={(formik.touched.cityId && formik.errors.cityId) ? formik.errors.cityId : undefined}
                error={(formik.touched.cityId && formik.errors.cityId) ? true : false}
                description=''
                {...formik.getFieldProps('cityId')}
                disabled
                required
            />
        </Grid>

        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <MultiSelect
                id={'supplier'}
                label={t("addProductFormLabels.supplierlabel")}
                placeholder={t("addProductFormLabels.supplierplaceholder")}
                required
                items={suppliers}
                name={'supplier'}
                value={formik.values.supplier}
                disabled={isDisabled}
                onChange={handleSupplierBrandProductChange}
                onBlur={() => { formik.setFieldTouched('supplier'); formik.validateField('supplier'); }}
                helperText={(formik.touched.supplier && formik.errors.supplier) ? JSON.parse(JSON.stringify(formik.errors.supplier)) : undefined}
                error={(formik.touched.supplier && formik.errors.supplier) ? true : false}
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <MultiSelect
                id={'branded'}
                label={t("addProductFormLabels.brandedlabel")}
                placeholder={t("addProductFormLabels.brandedplaceholder")}
                required
                items={brandedList}
                name={'branded'}
                value={formik.values.branded}
                disabled={isDisabled}
                onChange={handleSupplierBrandProductChange}
                onBlur={() => { formik.setFieldTouched('branded'); formik.validateField('branded'); }}
                helperText={(formik.touched.branded && formik.errors.branded) ? JSON.parse(JSON.stringify(formik.errors.branded)) : undefined}
                error={(formik.touched.branded && formik.errors.branded) ? true : false}
            />
        </Grid>

        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <MultiSelect
                id={'actualProduct'}
                label={t("addProductFormLabels.actualproductlabel")}
                placeholder={t("addProductFormLabels.actualproductplaceholder")}
                required
                items={actualProductList}
                name={'actualProduct'}
                value={formik.values.actualProduct}
                disabled={isDisabled}
                onChange={handleSupplierBrandProductChange}
                onBlur={() => { formik.setFieldTouched('actualProduct'); formik.validateField('actualProduct'); }}
                helperText={(formik.touched.actualProduct && formik.errors.actualProduct) ? JSON.parse(JSON.stringify(formik.errors.actualProduct)) : undefined}
                error={(formik.touched.actualProduct && formik.errors.actualProduct) ? true : false}
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <SupplierRack formik={formik} isDisabled={isDisabled} setSupplierPrice={setSupplierPrice} resetSupplierValue={resetSupplierValue} isSaveCancelShown={isSaveCancelShown} />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='opisName'
                name='opisName'
                label={t("addProductFormLabels.addproductopisname")}
                type='text'
                onClick={(e) => e.preventDefault()}
                helperText={(formik.touched.opisName && formik.errors.opisName) ? formik.errors.opisName : undefined}
                error={(formik.touched.opisName && formik.errors.opisName) ? true : false}
                description=''
                {...formik.getFieldProps('opisName')}
                disabled
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='productNm'
                label={t("addProductFormLabels.productnamelabel")}
                type='text'
                placeholder={t("addProductFormLabels.productnameplaceholder")}
                helperText={(formik.touched.productNm && formik.errors.productNm) ? formik.errors.productNm : undefined}
                error={(formik.touched.productNm && formik.errors.productNm) ? true : false}
                description=''
                required
                {...formik.getFieldProps('productNm')}
                disabled={isDisabled}
            />
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
            <hr></hr>
        </Grid>

    </Fragment>);
}