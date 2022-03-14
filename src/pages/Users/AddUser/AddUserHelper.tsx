import { Box, FormControl, FormControlLabel, Grid, Icon, Radio, RadioGroup, Typography } from '@mui/material';
import { AlertExclamationIcon, LoadingIcon, PositiveCricleIcon } from '../../../assets/icons';
import { getCountryCode } from '../../../navigation/utils';
import { userAccessLevelSX } from '../config';

export const onSuccessVerfyUser = (response: any, formik: any, addedCustomerId: string) => {
    formik.setFieldValue('countryCd', getCountryCode());
    formik.setFieldValue('customerId', addedCustomerId);
    if (response?.data?.verifiedUser) {
        formik.setFieldValue('userId', response.data?.userProfile.uuid);
        formik.setFieldValue('email', response.data?.userProfile.email);
        formik.setFieldValue('phone', response.data?.userProfile.mobile || "");
        formik.setFieldValue('userName', `${response.data?.userProfile.firstName} ${response.data?.userProfile.lastName}`);
    } else {
        formik.setFieldValue('userId', '');
        formik.setFieldValue('email', '');
        formik.setFieldValue('phone', '');
        formik.setFieldValue('userName', '');
    }
};

export const onClickCancel = (formik: any, addedCustomerId: string, showDialogBox: any, navigate: any) => {
    if (!formik.isValid || formik.dirty) {
        showDialogBox(true);
    } else {
        navigate(`/customer/${addedCustomerId}/users`);
    }
};

export const disableButton = (formik: any, showVerifyLink: boolean) => {
    if (formik.dirty) {
        return !formik.isValid || formik.isSubmitting || showVerifyLink;
    } else {
        return true;
    }
};

export const showToast = (isErrorAddUser: boolean, isSuccessAddUser: boolean,
    isErrorUpdateUser: boolean, isSuccessUpdateUser: boolean, isErrorUserData: boolean) =>
    (isErrorAddUser || isSuccessAddUser || isErrorUpdateUser || isSuccessUpdateUser || isErrorUserData);

export const isUserNameErrorExist = (formik: any) => !!(formik.touched.userName && formik.errors.userName);
export const isPhoneErrorExist = (formik: any) => !!(formik.touched.phone && formik.errors.phone);
export const isEmailErrorExist = (formik: any) => !!(formik.touched.email && formik.errors.email);
export const isUserGroupErrorExist = (formik: any) => !!(formik.touched.userGroup && formik.errors.userGroup);
export const isDSPErrorExist = (formik: any) => !!(formik.touched.dsp && formik.errors.dsp);


export const renderVerficationProcess = (userVerificationLoading: boolean, verifiedUserData: any) => {
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
                Janrain account doesn & apos; t exist for this email.
            </Typography>
        </Box>
    );
};

export const renderButtonLoader = (isLoadingAddUser: boolean, isLoadingUpdateUser: boolean) =>
    (isLoadingAddUser || isLoadingUpdateUser) && <LoadingIcon data-testid="loading-spinner" className='loading_save_icon' />;



export const renderUserAccessDOM = (userPermissionList: any, formik: any, t: any) =>
    userPermissionList &&
    (<>
        <Grid item md={12} mt={3} mb={2}>
            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold">
                {t("addUser.form.userGroupAccessLevel.title")}
            </Typography>
        </Grid>
        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label="user-access-permission"
                    defaultValue=""
                    id="userAccessLevel"
                    name="userAccessLevel"
                    value={formik.values.userAccessLevel}
                    onChange={formik.handleChange}
                >
                    {userPermissionList?.map((perObj: any, index: any) => (
                        <FormControlLabel
                            key={perObj.value}
                            value={perObj.value}
                            sx={{ ...userAccessLevelSX }}
                            control={<Radio
                                role="radio"
                                id={`userAccessLevel-${index}`}
                                sx={{
                                    '&.Mui-checked': {
                                        color: "var(--Gray)",
                                    },
                                }}
                                aria-label={perObj.label} />}
                            label={
                                <Typography color="var(--Darkgray)" variant="h4" pl={2.5} className="fw-bold">
                                    {perObj.label}
                                </Typography>
                            } />
                    ))}
                </RadioGroup>
            </FormControl>
        </Grid>
    </>
    );
