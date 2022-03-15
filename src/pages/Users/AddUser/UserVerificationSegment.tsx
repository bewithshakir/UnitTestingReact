import { Box, Grid, Icon, Link, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertExclamationIcon, LoadingIcon, PositiveCricleIcon } from '../../../assets/icons';
import Input from '../../../components/UIComponents/Input/Input';
import { isEmailErrorExist, emailHelperText, userNameHelperText, isUserNameErrorExist, isPhoneErrorExist, phoneHelperText } from './AddUserHelper';

type props = {
    userVerificationLoading: boolean,
    formik: any,
    showVerifyLink: boolean,
    verifyUserError: boolean,
    verifiedUserData: any;
    handleEmailChange: (...args: any[]) => void;
    onClickVerifyUser: (...args: any[]) => void;
}

export default function UserVerificationSegment ({
    userVerificationLoading, formik, showVerifyLink, verifyUserError, verifiedUserData,
    handleEmailChange, onClickVerifyUser
}: props) {

    const { t } = useTranslation();

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
                />
            </Grid>
            <Grid item xs={12} md={6} pr={2.5} pt={(formik.touched.email && formik.errors.email) ? 0 : 3.5} pb={2.5} display="flex" alignItems="center">
                {
                    (!showVerifyLink && (verifiedUserData || userVerificationLoading || verifyUserError)) ?
                        <Box>
                            {userVerificationLoading && <LoadingIcon data-testid="loading-spinner" style={{ position: "unset" }} className='loading_save_icon' />}
                            {!userVerificationLoading && verifiedUserData?.data?.verifiedUser && <Icon component={PositiveCricleIcon} />}
                            {((!userVerificationLoading && !verifiedUserData?.data?.verifiedUser) || verifyUserError) &&
                                (
                                    <Box display="flex" alignItems="center">
                                        <Icon sx={{ width: "20px", height: "20px", marginRight: 2 }} component={AlertExclamationIcon} />
                                        <Typography variant="h4" color="var(--Tertiary)" className="fw-bold">
                                            Janrain account doesn&apos;t exist for this email.
                                        </Typography>
                                    </Box>
                                )
                            }
                        </Box>
                        :
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
                }
            </Grid>
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