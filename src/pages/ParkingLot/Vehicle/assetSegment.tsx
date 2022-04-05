
import { Grid } from '@mui/material';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import Input from '../../../components/UIComponents/Input/FormikInput';
import { SegmentProps, selectOneText } from './config';
import { useTranslation } from 'react-i18next';
import { useGetAssetTypes } from './queries';
import { getCountryCode } from '../../../navigation/utils';
export default function AssetSection({ formik, getFormikProps }: SegmentProps) {
    const { t } = useTranslation();
    const { data: assetTypes } = useGetAssetTypes({ countryCode: getCountryCode() || "", skipPagination: true });
    return (
        <>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Select
                    label={t("addVehicle.assetType")}
                    placeholder={t(selectOneText)}
                    required
                    items={assetTypes || []}
                    {...getFormikProps('assetType')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t('addVehicle.identificationNumber')}
                    type='text'
                    placeholder='AF54HH'
                    required
                    {...formik.getFieldProps('assetId')}
                />
            </Grid>
            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}>
                <Input
                    label={t('addVehicle.DESCRIPTION')}
                    type='text'
                    placeholder={t('addVehicle.17GalRedTank')}
                    required
                    {...formik.getFieldProps('assetNote')}
                />
            </Grid>

            <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1}></Grid>
        </>
    );
}