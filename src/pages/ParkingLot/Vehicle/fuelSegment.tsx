import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { SegmentProps, selectOneText } from './config';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import { getCountryCode } from '../../../navigation/utils';
import { useGetMasterProducts, useGetProducts } from './queries';


export default function FuelSegment({ lotId, formik, getFormikProps, productGroupObj }: SegmentProps) {
    const { t } = useTranslation();

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
                    label={t("addVehicle.productName")}
                    placeholder={t(selectOneText)}
                    required
                    items={fuelProducts || []}
                    {...getFormikProps('fuelProductName', ['fuelCustomProductName'])}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Select
                    label={t("addVehicle.productCustomName")}
                    placeholder={t(selectOneText)}
                    required
                    items={fuelMasterProducts || []}
                    {...getFormikProps('fuelCustomProductName')}
                />
            </Grid>
        </>
    );
}
