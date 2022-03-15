import { Grid, Box } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { LoadingIcon } from '../../../assets/icons';

type props = {
    userVerificationLoading: boolean,
    formik: any,
    showVerifyLink: boolean,
    formStatus: any;
    toastStatues: any;
    onClickCancel: (...args: any[]) => void;
}

export default function FormActionSegment ({
    userVerificationLoading, formik, showVerifyLink, formStatus, toastStatues, onClickCancel
}: props) {

    const { t } = useTranslation();

    const {
        isErrorAddUser, isSuccessAddUser,
        isErrorUpdateUser, isSuccessUpdateUser,
        isErrorUserData, isLoadingUpdateUser, isLoadingAddUser
    } = toastStatues;

    const disableButton = () => {
        if (formik.dirty) {
            return !formik.isValid || formik.isSubmitting;
        } else {
            return true;
        }
    };

    return (
        <Fragment>
            <Grid item xs={12} md={6} />
            <Grid item md={12} pr={2.5} pb={2.5} mt={4}>
                <Box className="form-action-section" alignItems="end">
                    <Button
                        id="cancelBtn"
                        types="cancel"
                        aria-label={t("buttons.cancel")}
                        className="mr-4"
                        onClick={onClickCancel}
                        data-test="cancel"
                    >
                        {t("buttons.cancel")}
                    </Button>
                    <Button
                        id="saveBtn"
                        type="submit"
                        types="save"
                        aria-label={t("buttons.save")}
                        className="ml-4"
                        data-testid="save"
                        disabled={(showVerifyLink || userVerificationLoading) || disableButton()}
                    >
                        {t("buttons.save")}
                        {(isLoadingAddUser || isLoadingUpdateUser) && <LoadingIcon data-testid="loading-spinner" className='loading_save_icon' />}
                    </Button>
                </Box>
                <ToastMessage
                    isOpen={
                        isErrorAddUser || isSuccessAddUser ||
                        isErrorUpdateUser || isSuccessUpdateUser ||
                        isErrorUserData
                    }
                    messageType={formStatus.type}
                    onClose={() => { return ''; }}
                    message={formStatus.message} />
            </Grid>
        </Fragment>
    );
}