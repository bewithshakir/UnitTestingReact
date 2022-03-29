import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { SegmentProps } from './config';
import { getCountryCode } from '../../../navigation/utils';
import { useGetMasterProducts } from './queries';
import MultiSelect from '../../../components/UIComponents/Select/MultiSelect';


export default function NonFuelSegment({ lotId, getFormikProps, productGroupObj }: SegmentProps) {
    const { t } = useTranslation();

    const { data: nonFuelMasterProducts } = useGetMasterProducts(
        lotId,
        {
            countryCode: getCountryCode(),
            skipPagination: true,
            productGroupCd: productGroupObj?.['Non-Fuel']
        });
    return (
        <>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4}>
                <MultiSelect
                    id='nonFuelCustomProductName'
                    label={t("addVehicle.nonFuelProductName")}
                    placeholder={t('addVehicle.select')}
                    required
                    items={nonFuelMasterProducts || []}
                    {...getFormikProps('nonFuelCustomProductName')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4}></Grid>
        </>
    );
}
