import * as Yup from 'yup';

export const AddAssetSchema = Yup.object().shape({
    assetType: Yup.string().required('Required'),
    assetStatus: Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required')
    
});

