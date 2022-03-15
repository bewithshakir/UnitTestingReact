import { Box, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingIcon } from '../../../assets/icons';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import UserModel from "../../../models/UserModel";
import { getCountryCode } from '../../../navigation/utils';
import { HorizontalBarVersionState, useAddedCustomerIdStore, useAddedCustomerPaymentTypeStore, useShowConfirmationDialogBoxStore, useStore } from '../../../store';
import { toastErrorKey, toastSuccessKey } from '../../../utils/constants';
import { userAccessLevelSX, userGroupStr } from '../config';
import { useAddUser, useEditUserData, useGetUserGroupTypes, useGetUserPermissionList, userGetUserDSPList, UserGoupsInt, useUpdateUserData, useVarifyUser } from './queries';
import { AddUserSchema } from "./validation";
import UserVerificationSegment from './UserVerificationSegment';

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
        isLoading: userVerificationLoading, isError: verifyUserError } = useVarifyUser(userEmail, onSuccessVerfyUser);

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
        setEditMode(true);
        populateDataInAllFields(responseData);
    };
    const onErrorUserDetail = (error: any) => {
        setEditMode(true);
        setFormStatus({ message: error?.response.data.error?.details[0] || t(toastErrorKey), type: 'Error' });
    };
    const { isError: isErrorUserData } = useEditUserData(addedCustomerId, userId, onSuccessUserDetail, onErrorUserDetail);

    const handleUpdateUserRepose = (isSuccess: boolean, data?: any) => {
        if (isSuccess) {
            isFormValidated(false);
            setFormStatus({ message: t(toastSuccessKey), type: 'Success' });
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
    const disableButton = () => {
        if (formik.dirty) {
            return !formik.isValid || formik.isSubmitting;
        } else {
            return true;
        }
    };

    // eslint-disable-next-line no-console
    console.log("🚀 ~ file: index.tsx ~ line 396 ~ formik", formik);


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
                                helperText={(formik.touched.userGroup && formik.errors.userGroup) ? formik.errors.userGroup.value : undefined}
                                error={(formik.touched.userGroup && formik.errors.userGroup) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => {
                                    formik.setFieldTouched("userGroup");
                                    formik.validateField("userGroup");
                                }}
                                required
                            />
                        </Grid>
                    </Grid>
                    {/* verify user section */}
                    <UserVerificationSegment
                        userVerificationLoading={userVerificationLoading}
                        formik={formik}
                        showVerifyLink={showVerifyLink}
                        verifyUserError={verifyUserError}
                        verifiedUserData={verifiedUserData}
                        handleEmailChange={handleEmailChange}
                        onClickVerifyUser={onClickVerifyUser}
                    />
                    {(formik.values?.userGroup?.label?.toLowerCase() === userGroupStr.toLowerCase()) && (
                        <Grid item xs={12} md={12}>
                            <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                <Select
                                    id='dsp'
                                    name='dsp'
                                    label={t("addUser.form.dsp")}
                                    placeholder='Choose'
                                    value={formik.values.dsp}
                                    items={dspList}
                                    helperText={(formik.touched.dsp && formik.errors.dsp) ? formik.errors.dsp.value : undefined}
                                    error={(formik.touched.dsp && formik.errors.dsp) ? true : false}
                                    onChange={formik.setFieldValue}
                                    onBlur={() => {
                                        formik.setFieldTouched("dsp");
                                        formik.validateField("dsp");
                                    }}
                                    noOptionsMessage={() => "No data available Please create/add the DSP first to create/add a user"}
                                    required
                                />
                            </Grid>
                        </Grid>
                    )}

                    {userPermissionList &&
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
                        )
                    }
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

                </Grid>
            </form>
        </Grid>
    );
};
export default AddUser;