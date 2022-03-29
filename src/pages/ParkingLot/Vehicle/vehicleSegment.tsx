import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormikProps } from 'formik';
import { Grid } from '@mui/material';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import Input from '../../../components/UIComponents/Input/FormikInput';
import { FormFieldName, VehicleAssetFormField } from './config';
import { useGetLotVehicleTypes } from '../FeeDetails/queries';
import { ProductGroupObj, useGetMasterProducts, useGetProducts, useGetVehicleColors } from './queries';
import { getCountryCode } from '../../../navigation/utils';


interface Props {
    lotId: string
    formik: FormikProps<VehicleAssetFormField>
    productGroupObj?: ProductGroupObj
    getFormikProps: (
        name: FormFieldName,
        clearFields?: FormFieldName[]
    ) => {
        name: string; onChange: any; onBlur: any
    }
}
const getVehicleTypes = (vehicleData: any) => {
    return vehicleData?.data?.map((vd: any) => ({
        label: vd.vehicleTypeNm,
        value: vd.vehicleTypeCd
    })) || [];
};

export default function VehicleSegment({ lotId, formik, productGroupObj, getFormikProps }: Props) {
    const { t } = useTranslation();
    const { data: vehicleTypes } = useGetLotVehicleTypes();
    const { data: vehicleColors } = useGetVehicleColors();
    const { data: fuelProducts } = useGetProducts({
        countryCode: getCountryCode(),
        productGroupCd: productGroupObj ? productGroupObj["Fuel"] : '',
        skipPagination: true
    });
    const { data: fuelMasterProducts } = useGetMasterProducts(
        lotId,
        {
            countryCode: getCountryCode(),
            skipPagination: true,
            productCd: formik.values.fuelProductName?.value
        }
    );
    return (
        <>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Select
                    id='vehicleType'
                    label={t('addVehicle.vehicleType')}
                    placeholder={t('addVehicle.selectOne')}
                    required
                    items={getVehicleTypes(vehicleTypes)}
                    {...getFormikProps('vehicleType')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t("addVehicle.licencePlate")}
                    type='text'
                    placeholder='123456C'
                    required
                    {...formik.getFieldProps('licenceNo')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t('addVehicle.vin')}
                    type='text'
                    placeholder='WD4PF1CD1KP147378'
                    required
                    {...formik.getFieldProps('vin')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t("addVehicle.year")}
                    type='text'
                    placeholder='2013'
                    required
                    {...formik.getFieldProps('year')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t('addVehicle.make')}
                    type='text'
                    placeholder='FORD'
                    required
                    {...formik.getFieldProps('make')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t('addVehicle.model')}
                    type='text'
                    placeholder='TRANSIT'
                    required
                    {...formik.getFieldProps('model')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Select
                    label={t("addVehicle.color")}
                    placeholder={t('addVehicle.selectOne')}
                    required
                    items={vehicleColors || []}
                    {...getFormikProps('color')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Select
                    label={t("addVehicle.productName")}
                    placeholder={t('addVehicle.selectOne')}
                    required
                    items={fuelProducts || []}
                    {...getFormikProps('fuelProductName', ['fuelCustomProductName'])}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Select
                    label={t("addVehicle.productCustomName")}
                    placeholder={t('addVehicle.selectOne')}
                    required
                    items={fuelMasterProducts || []}
                    {...getFormikProps('fuelCustomProductName')}
                />
            </Grid>
        </>
    );
}
