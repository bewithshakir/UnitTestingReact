import { Fragment, useEffect, useState } from "react";
import Select from '../../components/UIComponents/Select/SingleSelect';
import MultiSelect from '../../components/UIComponents/Select/MultiSelect';
import Input from '../../components/UIComponents/Input/Input';
import { useTranslation } from 'react-i18next';
import SupplierRack from './SupplerRackPrice';

import { Grid } from "@mui/material";
import { useGetServedCities, useGetSupplierBrandProducts } from "./queries";

type Props = {
    isDisabled: boolean,
    formik: any,
    editMode: boolean,
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

export default function OpisRackCity({ isDisabled, formik, editMode, }: Props) {

    const { t } = useTranslation();
    const [cities, setCities] = useState<ServedCityOptions[]>([]);
    const [suppliers, setSuppliers] = useState<GeneralOptions[]>([]);
    const [brandedList, setbrandedList] = useState<GeneralOptions[]>([]);
    const [actualProductList, setActualProductList] = useState<GeneralOptions[]>([]);
    const { data: servedCities } = useGetServedCities();
    const { data: spplierBrandProducts } = useGetSupplierBrandProducts(formik?.values?.city?.cityId || '');


    useEffect(() => {
        console.warn(isDisabled);
        console.warn(formik);
        console.warn(setCities);
        console.warn(setSuppliers);
        console.warn(setbrandedList);
        console.warn(setActualProductList);
    }, []);

    useEffect(() => {
        setSuppliers(getOptions(spplierBrandProducts?.data?.actualProduct));
        setbrandedList(getOptions(spplierBrandProducts?.data?.brand));
        setActualProductList(getOptions(spplierBrandProducts?.data?.supplier));
    }, [spplierBrandProducts]);

    useEffect(() => {
        setCities(servedCities?.data?.opisCities?.map((c: ServedCity) => ({
            ...c,
            label: c.city,
            value: c.cityId
        })) || []);
    }, [servedCities]);

    const handleCityChange = (field: any, value: any) => {
        formik.setFieldValue(field, value);
    };

    return (<Fragment>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Select
                id='city'
                name='city'
                label={'City'}
                value={formik.values.city}
                placeholder='Select one'
                items={cities}
                helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city.value : undefined}
                error={(formik.touched.city && formik.errors.city) ? true : false}
                onChange={handleCityChange}
                onBlur={() => { formik.setFieldTouched("city"); formik.validateField("city"); }}
                required
                isDisabled={isDisabled || editMode}
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='state'
                name='state'
                label={'State'}
                type='text'
                onClick={(e) => e.preventDefault()}
                helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                error={(formik.touched.state && formik.errors.state) ? true : false}
                description=''
                {...formik.getFieldProps('state')}
                value={formik.values?.city?.state}
                disabled
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='cityId'
                label={'City Id'}
                type='text'
                helperText={(formik.touched.cityId && formik.errors.cityId) ? formik.errors.cityId : undefined}
                error={(formik.touched.cityId && formik.errors.cityId) ? true : false}
                description=''
                {...formik.getFieldProps('cityId')}
                value={formik.values?.city?.cityId}
                disabled
            />
        </Grid>

        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <MultiSelect
                id={'supplier'}
                label='Supplier'
                placeholder='Choose Suppliers'
                required
                items={suppliers}
                name={'supplier'}
                value={formik.values.supplier}
                disabled={isDisabled}
                onChange={formik.setFieldValue}
                onBlur={() => { formik.setFieldTouched('supplier'); formik.validateField('supplier'); }}
                helperText={(formik.touched.supplier && formik.errors.supplier) ? JSON.parse(JSON.stringify(formik.errors.supplier)) : undefined}
                error={(formik.touched.supplier && formik.errors.supplier) ? true : false}
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <MultiSelect
                id={'branded'}
                label='Branded'
                placeholder='Choose Branded'
                required
                items={brandedList}
                name={'branded'}
                value={formik.values.branded}
                disabled={isDisabled}
                onChange={formik.setFieldValue}
                onBlur={() => { formik.setFieldTouched('branded'); formik.validateField('branded'); }}
                helperText={(formik.touched.branded && formik.errors.branded) ? JSON.parse(JSON.stringify(formik.errors.branded)) : undefined}
                error={(formik.touched.branded && formik.errors.branded) ? true : false}
            />
        </Grid>

        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <MultiSelect
                id={'actualProduct'}
                label='Actual Product'
                placeholder='Choose Actual Product'
                required
                items={actualProductList}
                name={'actualProduct'}
                value={formik.values.actualProduct}
                disabled={isDisabled}
                onChange={formik.setFieldValue}
                onBlur={() => { formik.setFieldTouched('actualProduct'); formik.validateField('actualProduct'); }}
                helperText={(formik.touched.suppactualProductlier && formik.errors.actualProduct) ? JSON.parse(JSON.stringify(formik.errors.actualProduct)) : undefined}
                error={(formik.touched.actualProduct && formik.errors.actualProduct) ? true : false}
            />
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <SupplierRack formik={formik} isDisabled={isDisabled} />
            {/* <Input
                id='supplierPrice'
                name='supplierPrice'
                label={'SUPPLIER PRICE * (Fill all the Mandatory fields to select the price from the filtered list)'}
                type='text'
                onClick={(e) => e.preventDefault()}
                description=''
                {...formik.getFieldProps('state')}
                disabled={isDisabled}
            /> */}
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
        </Grid>
        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
            <Input
                id='opisName'
                name='opisName'
                label={'OPIS Name'}
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
                placeholder='Enter Product Name'
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