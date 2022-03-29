

import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { VehicleAssetFormField } from './config';

interface Props {
    formik: FormikProps<VehicleAssetFormField>
    toastOpen: boolean
    toastMessageType: string
    toastMessage: string
}
export default function FormActionSegment({ formik, toastOpen, toastMessageType, toastMessage }: Props) {
    const { t } = useTranslation();


    const disableCancelBtn = () => {
        return !formik.dirty;
    };
    const disableSubmitBtn = () => {
        return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
    };

    const handleCancel = () => {
        formik.resetForm();
    };
    return (
        <Grid item container lg={12} md={12} sm={12} xs={12} px={4} py={4} className="lastItem">
            <Grid item lg={12} md={12} sm={12} xs={12} px={4} py={4} textAlign="right">
                <div>
                    <Button
                        types="cancel"
                        aria-label="cancel"
                        onClick={handleCancel}
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
                </div>
                <ToastMessage
                    isOpen={toastOpen}
                    messageType={toastMessageType}
                    onClose={() => { return ""; }}
                    message={toastMessage} />
            </Grid>
        </Grid>
    );
}
