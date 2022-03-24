import { Box, Grid, Icon, Link, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertExclamationIcon, LoadingIcon, PositiveCricleIcon } from '../../../assets/icons';
import Input from '../../../components/UIComponents/Input/Input';
import { isEmailErrorExist, emailHelperText, userNameHelperText, isUserNameErrorExist, isPhoneErrorExist, phoneHelperText } from "./validation";

type props = {
    formStatus: {
        isEditMode: boolean,
        isLoadingUserDetails: boolean,
        showVerifyLink: boolean,
        userVerificationLoading: boolean,
        isVerifyUserFailed: boolean,
    },
    formik: any,
    verifiedUserData: any;
    handleEmailChange: (...args: any[]) => void;
    onClickVerifyUser: (...args: any[]) => void;
}

// User Verification Status Handler
export const renderVerficationStatus = (userVerificationLoading: boolean, verifiedUserData: any) => {
    if (userVerificationLoading) {
        return <LoadingIcon data-testid="loading-spinner" style={{ position: "unset" }} className='loading_save_icon' />;
    }
    if (verifiedUserData?.data?.verifiedUser) {
        return <Icon component={PositiveCricleIcon} />;
    }
    return (
        <Box display="flex" alignItems="center" >
            <Icon sx={{ width: "20px", height: "20px", marginRight: 2 }} component={AlertExclamationIcon} />
            <Typography variant="h4" color="var(--Tertiary)" className="fw-bold" >
                Janrain account doesn&apos;t exist for this email.
            </Typography>
        </Box>
    );
};

// User Verification Process Handler
export const renderVerficationProcess = (showVerifyLink: boolean, isVerifyUserFailed: boolean, userVerificationLoading: boolean, verifiedUserData: any, onClickVerifyUser: any) => {
    if (!showVerifyLink && (verifiedUserData || userVerificationLoading || isVerifyUserFailed)) {
        return (<Box>{renderVerficationStatus(userVerificationLoading, verifiedUserData)}</Box>);
    }
    return (
        <Link
            variant="body2"
            id="verify-user-link"
            className="add-link"
            onClick={onClickVerifyUser}
            sx={{ cursor: "pointer", color: "var(--Primary)" }}
        >
            <Typography variant="h4" color="var(--Primary)" className="fw-bold" mb={1}>
                Verify
            </Typography>
        </Link>
    );
};


export default function UserVerificationSegment ({
    formStatus, formik, verifiedUserData,
    handleEmailChange, onClickVerifyUser
}: props) {

    const { isEditMode, isLoadingUserDetails, showVerifyLink, userVerificationLoading, isVerifyUserFailed } = formStatus;
    const { t } = useTranslation();

    const topPadding = isEmailErrorExist(formik) ? 0 : 3.5;

    return (
        <Fragment>
            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                <Input
                    id='email'
                    name='email'
                    label={t("addUser.form.email")}
                    type='text'
                    value={formik.values.email}
                    helperText={emailHelperText(formik)}
                    error={isEmailErrorExist(formik)}
                    description=''
                    placeholder='Enter Email'
                    onChange={handleEmailChange}
                    onBlur={() => {
                        formik.setFieldTouched("email");
                        formik.validateField("email");
                    }}
                    required
                    disabled={isEditMode || isLoadingUserDetails}
                />
            </Grid>
            {(isEditMode || isLoadingUserDetails) ?
                <Grid item xs={12} md={6} pr={2.5} />
                :
                <Grid item xs={12} md={6} pr={2.5} pt={topPadding} pb={2.5} display="flex" alignItems="center">
                    {
                        renderVerficationProcess(showVerifyLink, isVerifyUserFailed, userVerificationLoading, verifiedUserData, onClickVerifyUser)
                    }
                </Grid>
            }
            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                <Input
                    id='userName'
                    label={t("addUser.form.userGroupAccessLevel.userName")}
                    type='text'
                    helperText={userNameHelperText(formik)}
                    error={isUserNameErrorExist(formik)}
                    description=''
                    placeholder='User Name'
                    {...formik.getFieldProps('userName')}
                    disabled={true}
                    required
                />
            </Grid>
            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                <Input
                    id='phone'
                    label={t("addUser.form.userGroupAccessLevel.phone")}
                    type='text'
                    helperText={phoneHelperText(formik)}
                    error={isPhoneErrorExist(formik)}
                    description=''
                    placeholder='Phone Number Ex: 787 XXXX XXX'
                    disabled={true}
                    {...formik.getFieldProps('phone')}
                />
            </Grid>
        </Fragment>
    );
}