import { getCountryCode } from '../../../navigation/utils';

export const onSuccessVerfyUser = (response: any, formik: any, addedCustomerId: string) => {
    formik.setFieldValue('countryCd', getCountryCode());
    formik.setFieldValue('customerId', addedCustomerId);
    if (response?.data?.verifiedUser) {
        formik.setFieldValue('userId', response.data?.userProfile.uuid);
        formik.setFieldValue('email', response.data?.userProfile.email);
        formik.setFieldValue('phone', response.data?.userProfile.mobile);
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

export const isEmailErrorExist = (formik: any) => !!(formik.touched.email && formik.errors.email);
export const isUserGroupErrorExist = (formik: any) => !!(formik.touched.userGroup && formik.errors.userGroup);