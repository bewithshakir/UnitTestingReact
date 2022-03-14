import { Box, Grid, Link, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import UserModel from "../../../models/UserModel";
import { HorizontalBarVersionState, useAddedCustomerIdStore, useAddedCustomerPaymentTypeStore, useShowConfirmationDialogBoxStore, useStore } from '../../../store';
import { toastSuccessKey } from '../../../utils/constants';
import {
    disableButton, emailHelperText, isEmailErrorExist, isPhoneErrorExist, isUserGroupErrorExist, isUserNameErrorExist, onClickCancel,
    onSuccessVerfyUser, phoneHelperText, renderButtonLoader, renderDSPDOM, renderUserAccessDOM, renderVerficationProcess,
    showToast, userGroupHelperText, userNameHelperText, validateForm
} from './AddUserHelper';
import {
    useAddUser, useEditUserData, useGetUserGroupTypes, useGetUserPermissionList,
    userGetUserDSPList, UserGoupsInt, useUpdateUserData, useVarifyUser
} from './queries';
import { AddUserSchema } from "./validation";

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

    // Verify User
    const { data: verifiedUserData,
        isLoading: userVerificationLoading } = useVarifyUser(userEmail, (response: any) => onSuccessVerfyUser(response, formik, addedCustomerId));

    useEffect(() => {
        setVersion("Breadcrumbs-Many");
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
        setFormStatus({ message: data?.error?.message, type: 'Error' });
    };
    const { mutate: addNewUser, isSuccess: isSuccessAddUser, isError: isErrorAddUser, isLoading: isLoadingAddUser } = useAddUser(onSuccessAddUser, onErrorAddUser);
    const createUserData = (form: UserModel) => {
        addNewUser(form);
    };
    // Add User End

    // Edit User
    const populateDataInAllFields = (formData: any) => {
        formik.resetForm({
            values: { ...formData }
        });
    };

    const onSuccessUserDetail = (responseData: UserModel) => {
        setEditMode(true);
        populateDataInAllFields(responseData);
    };
    const onErrorUserDetail = (error: any) => {
        setEditMode(true);
        setFormStatus({ message: error?.response.data.error?.details[0], type: 'Error' });
    };
    const { isError: isErrorUserData } = useEditUserData(addedCustomerId, userId, onSuccessUserDetail, onErrorUserDetail);

    const handleUpdateUserRepose = (isSuccess: boolean, data?: any) => {
        if (isSuccess) {
            isFormValidated(false);
            setFormStatus({ message: t(toastSuccessKey), type: 'Success' });
        } else {
            setFormStatus({ message: data?.error?.message, type: 'Error' });
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
    const {
        mutate: updateUser,
        isSuccess: isSuccessUpdateUser,
        isError: isErrorUpdateUser,
        isLoading: isLoadingUpdateUser } = useUpdateUserData(
            userId,
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
        validateForm(formik, isFormValidated);
    }, [formik.isValid, formik.dirty]);

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
                                items={userGroupList?.filter((usrGrpObj: UserGoupsInt) => usrGrpObj.type.includes(selectedPaymentType))}
                                helperText={userGroupHelperText(formik)}
                                error={isUserGroupErrorExist(formik)}
                                onChange={formik.setFieldValue}
                                onBlur={() => {
                                    formik.setFieldTouched("userGroup");
                                    formik.validateField("userGroup");
                                }}
                                required
                            />
                        </Grid>
                    </Grid>
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
                    <Grid item xs={12} md={6} pr={2.5} pt={isEmailErrorExist(formik) ? 0 : 3.5} pb={2.5} display="flex" alignItems="center">
                        {
                            showVerifyLink ?
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
                                :
                                <Box>
                                    {renderVerficationProcess(userVerificationLoading, verifiedUserData)}
                                </Box>

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

                    {renderDSPDOM(dspList, formik, t)}

                    {renderUserAccessDOM(userPermissionList, formik, t)}

                    <Grid item xs={12} md={6} />
                    <Grid item md={12} pr={2.5} pb={2.5} mt={4}>
                        <Box className="form-action-section" alignItems="end">
                            <Button
                                id="cancelBtn"
                                types="cancel"
                                aria-label={t("buttons.cancel")}
                                className="mr-4"
                                onClick={() => onClickCancel(formik, addedCustomerId, showDialogBox, navigate)}
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
                                disabled={disableButton(formik, showVerifyLink)}
                            >
                                {t("buttons.save")}
                                {renderButtonLoader(isLoadingAddUser, isLoadingUpdateUser)}
                            </Button>
                        </Box>
                        <ToastMessage
                            isOpen={showToast(isErrorAddUser, isSuccessAddUser, isErrorUpdateUser, isSuccessUpdateUser, isErrorUserData)}
                            messageType={formStatus.type}
                            onClose={() => { return ''; }}
                            message={formStatus.message} />
                    </Grid>

                </Grid>
            </form>
        </Grid>
    );
};
export default AddUser;