import { Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import UserModel from "../../../models/UserModel";
import { getCountryCode } from '../../../navigation/utils';
import { HorizontalBarVersionState, useAddedCustomerIdStore, useAddedCustomerPaymentTypeStore, useShowConfirmationDialogBoxStore, useStore } from '../../../store';
import { toastErrorKey, toastSuccessKey, toastEditSuccessKey } from '../../../utils/constants';
import DSPUserListSegment from './DSPUserListSegment';
import FormActionSegment from './FormActionSegment';
import { useAddUser, useEditUserData, useGetUserGroupTypes, useGetUserPermissionList, userGetUserDSPList, UserGoupsInt, useUpdateUserData, useVarifyUser } from './queries';
import UserAccessLevelSegment from './UserAccessLevelSegment';
import UserVerificationSegment from './UserVerificationSegment';
import { AddUserSchema, isUserGroupErrorExist, userGroupHelperText } from "./validation";

const initialValues = new UserModel();
interface AddUserProps {
    version: string
}
interface IFormStatus {
    message: string
    type: string
}
const AddUser: React.FC<AddUserProps> = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { userId } = useParams();
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    const selectedPaymentType = useAddedCustomerPaymentTypeStore((state) => state.paymentType);
    const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: '' });
    const [isEditMode, setEditMode] = useState(false);

    const [showVerifyLink, setVerifyUserClicked] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    const { data: userGroupList } = useGetUserGroupTypes('us');
    const { data: dspList } = userGetUserDSPList(addedCustomerId, 'us');
    const { data: userPermissionList } = useGetUserPermissionList('us');

    const setVerfiedUserDetails = (data: any, verifiedUser: boolean) => {
        if (verifiedUser) {
            formik.setFieldValue('countryCd', getCountryCode());
            formik.setFieldValue('customerId', addedCustomerId);
            formik.setFieldValue('userId', data?.userProfile.uuid);
            formik.setFieldValue('email', data?.userProfile.email);
            formik.setFieldValue('phone', data?.userProfile.mobile || '');
            formik.setFieldValue('userName', `${data?.userProfile.firstName} ${data?.userProfile.lastName}`);
        } else {
            formik.setFieldValue('userId', '');
            formik.setFieldValue('phone', '');
            formik.setFieldValue('userName', '');
        }
    };

    // Verify User
    const onSuccessVerfyUser = (response: any) => {
        if (response?.data) {
            const { data } = response;
            setVerfiedUserDetails(data, data.verifiedUser);
        }
    };

    const { data: verifiedUserData,
        isLoading: userVerificationLoading, isError: isVerifyUserFailed } = useVarifyUser(userEmail, onSuccessVerfyUser);

    useEffect(() => {
        setVersion("Breadcrumbs-Many");
        if (userId) {
            setEditMode(true);
        }
    }, []);


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
        setVerifyUserClicked(true);
    };

    const onClickVerifyUser = () => {
        if (formik.values.email && !formik.errors.email) {
            setVerifyUserClicked(false);
            setUserEmail(formik.values.email);
        }
    };

    // Add User
    const onSuccessAddUser = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t(toastSuccessKey), type: 'Success' });
    };
    const onErrorAddUser = (err: any) => {
        const { data } = err.response;
        formik.setSubmitting(false);
        setFormStatus({ message: data?.error?.message || t(toastErrorKey), type: 'Error' });
    };
    const { mutate: addNewUser, isSuccess: isSuccessAddUser, isError: isErrorAddUser, isLoading: isLoadingAddUser } = useAddUser(onSuccessAddUser, onErrorAddUser);
    const createUserData = (form: UserModel) => {
        try {
            addNewUser(form);
        } catch (error) {
            setFormStatus({ message: t(toastErrorKey), type: 'Error' });
        }
    };

    // Add User End

    // Edit User
    const populateDataInAllFields = (formData: any) => {
        formik.resetForm({
            values: { ...formData }
        });
    };

    const onSuccessUserDetail = (responseData: UserModel) => {
        populateDataInAllFields(responseData);
    };
    const onErrorUserDetail = (error: any) => {
        setFormStatus({ message: error?.response.data.error?.details[0] || t(toastErrorKey), type: 'Error' });
    };

    const { isError: isErrorUserData, isLoading: isLoadingUserDetails } = useEditUserData(selectedPaymentType, userGroupList, dspList, userId, onSuccessUserDetail, onErrorUserDetail);

    const handleUpdateUserRepose = (isSuccess: boolean, data?: any) => {
        if (isSuccess) {
            isFormValidated(false);
            setFormStatus({ message: t(toastEditSuccessKey), type: 'Success' });
        } else {
            setFormStatus({ message: data?.error?.details[0] || t(toastErrorKey), type: 'Error' });
        }
        formik.resetForm({ values: formik.values });
    };

    const onSuccessUpdateUser = () => {
        handleUpdateUserRepose(true);
    };

    const onErrorUpdateUser = (error: any) => {
        const { data } = error.response;
        handleUpdateUserRepose(false, data);
    };
    const { mutate: updateUser, isSuccess: isSuccessUpdateUser, isError: isErrorUpdateUser, isLoading: isLoadingUpdateUser } = useUpdateUserData(
        userId || '',
        onSuccessUpdateUser,
        onErrorUpdateUser
    );

    // Edit User End
    const formik = useFormik({
        initialValues,
        validationSchema: AddUserSchema,
        onSubmit: (values: UserModel) => {
            const updatedValues = { ...values, customerId: addedCustomerId, countryCd: 'us' } as UserModel;
            if (isEditMode) {
                updateUser(updatedValues);
            } else {
                createUserData(updatedValues);
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (!formik.isValid || formik.dirty) {
            isFormValidated(true);
        } else {
            isFormValidated(false);
        }
    }, [formik.isValid, formik.dirty]);

    const onClickCancel = () => {
        if (!formik.isValid || formik.dirty) {
            showDialogBox(true);
        } else {
            navigate(`/customer/${addedCustomerId}/users`);
        }
    };

    return (
        <Grid item xl={7} lg={8}>
            <form onSubmit={formik.handleSubmit} id='form'>
                <Grid container>
                    <Grid container item md={12} mb={2}>
                        <Grid item xs={6}>
                            <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold">
                                {t("addUser.form.title")}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Select
                                id='userGroup'
                                name='userGroup'
                                label={t("addUser.form.userGroup")}
                                placeholder='Choose'
                                value={formik.values.userGroup}
                                items={userGroupList?.filter((usrGrpObj: UserGoupsInt) => usrGrpObj.type.includes(selectedPaymentType)) || []}
                                helperText={userGroupHelperText(formik)}
                                error={isUserGroupErrorExist(formik)}
                                onChange={formik.setFieldValue}
                                onBlur={() => {
                                    formik.setFieldTouched("userGroup");
                                    formik.validateField("userGroup");
                                }}
                                required
                                isDisabled={isEditMode || isLoadingUserDetails}
                            />
                        </Grid>
                    </Grid>

                    <UserVerificationSegment
                        formStatus={{
                            isEditMode,
                            isLoadingUserDetails,
                            showVerifyLink,
                            userVerificationLoading,
                            isVerifyUserFailed,
                        }}
                        formik={formik}
                        verifiedUserData={verifiedUserData}
                        handleEmailChange={handleEmailChange}
                        onClickVerifyUser={onClickVerifyUser}
                    />

                    <DSPUserListSegment formik={formik} dspList={dspList} />

                    <UserAccessLevelSegment formik={formik} userPermissionList={userPermissionList} />

                    <FormActionSegment
                        userVerificationLoading={userVerificationLoading}
                        formik={formik}
                        showVerifyLink={showVerifyLink}
                        formStatus={formStatus}
                        toastStatues={{
                            isEditMode,
                            isErrorAddUser,
                            isSuccessAddUser,
                            isErrorUpdateUser,
                            isSuccessUpdateUser,
                            isErrorUserData,
                            isLoadingUpdateUser,
                            isLoadingAddUser,
                        }}
                        onClickCancel={onClickCancel}
                    />
                </Grid>
            </form>
        </Grid>
    );
};
export default AddUser;