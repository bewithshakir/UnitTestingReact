import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import UserModel from "../../../models/UserModel";
import { AddUserSchema } from "./validation";
import Input from '../../../components/UIComponents/Input/Input';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { HorizontalBarVersionState, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore, useStore } from '../../../store';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { useAddUser, useEditUserData, useUpdateUserData } from './queries';
import "./style.scss";
import { LoadingIcon } from '../../../assets/icons';

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
    const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: '' });
    const [isEditMode, setEditMode] = useState(false);


    useEffect(() => {
        setVersion("Breadcrumbs-Many");
    }, []);

    // Add User
    const onSuccessAddUser = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });
    };
    const onErrorAddUser = (err: any) => {
        const { data } = err.response;
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: data?.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };
    const { mutate: addNewUser, isSuccess: isSuccessAddUser, isError: isErrorAddUser, isLoading: isLoadingAddUser } = useAddUser(onSuccessAddUser, onErrorAddUser);
    const createUserData = (form: UserModel) => {
        try {
            addNewUser(form);
        } catch (error) {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
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
        setFormStatus({ message: error?.response.data.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };
    const { isError: isErrorUserData } = useEditUserData(addedCustomerId, userId, onSuccessUserDetail, onErrorUserDetail);

    const onSuccessUpdateUser = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: t("formStatusProps.success.message"), type: 'Success' });
    };

    const onErrorUpdateUser = (error: any) => {
        const { data } = error.response;
        formik.resetForm({ values: formik.values });
        setFormStatus({ message: data?.error?.details[0] || t("formStatusProps.error.message"), type: 'Error' });
    };
    const { mutate: updateUser, isSuccess: isSuccessUpdateUser, isError: isErrorUpdateUser, isLoading: isLoadingUpdateUser } = useUpdateUserData(userId, onSuccessUpdateUser, onErrorUpdateUser);

    // Edit User End
    const formik = useFormik({
        initialValues,
        validationSchema: AddUserSchema,
        onSubmit: (values: UserModel) => {
            const updatedValues = { ...values, customerId: addedCustomerId } as UserModel;
            if (isEditMode) {
                updateUser(updatedValues);
            } else {
                createUserData(updatedValues);
            }
        },
        enableReinitialize: true,
    });

    function handleGoogleAddressChange (addressObj: any) {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('addressLine2', addressObj.addressLine2);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('postalCode', addressObj.postalCode);
    }

    function handleGoogleAddressBlur () {
        formik.setFieldTouched("addressLine1");
        formik.validateField("addressLine1");
        formik.setFieldTouched("addressLine2");
        formik.validateField("addressLine2");
        formik.setFieldTouched("city");
        formik.validateField("city");
        formik.setFieldTouched("state");
        formik.validateField("state");
        formik.setFieldTouched("postalCode");
        formik.validateField("postalCode");
    }

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
    return (
        <Grid item xl={7} lg={8}>
            <form onSubmit={formik.handleSubmit} id='form'>
                <Grid container>
                    <Grid container item md={12} mb={2}>
                        <Grid item xs={6}>
                            <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold">
                                {t("addUser.form.title")} *
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='userName'
                            label={t("addUser.form.userName")}
                            type='text'
                            helperText={(formik.touched.userName && formik.errors.userName) ? formik.errors.userName : undefined}
                            error={(formik.touched.userName && formik.errors.userName) ? true : false}
                            description=''
                            placeholder='Enter'
                            {...formik.getFieldProps('userName')}
                            required
                        />
                    </Grid>
                    <Grid item md={12} mb={1}>
                        <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={2}>
                            {t("addUser.form.contactForm.title")} :
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='contactNm'
                            label={t("addUser.form.contactForm.contactNm")}
                            type='text'
                            helperText={(formik.touched.contactNm && formik.errors.contactNm) ? formik.errors.contactNm : undefined}
                            error={(formik.touched.contactNm && formik.errors.contactNm) ? true : false}
                            description=''
                            placeholder='Enter'
                            {...formik.getFieldProps('contactNm')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='email'
                            label={t("addUser.form.contactForm.email")}
                            type='text'
                            helperText={(formik.touched.email && formik.errors.email) ? formik.errors.email : undefined}
                            error={(formik.touched.email && formik.errors.email) ? true : false}
                            description=''
                            placeholder='Enter Email ID'
                            {...formik.getFieldProps('email')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                            <Input
                                id='phone'
                                label={t("addUser.form.contactForm.phone")}
                                type='text'
                                helperText={(formik.touched.phone && formik.errors.phone) ? formik.errors.phone : undefined}
                                error={(formik.touched.phone && formik.errors.phone) ? true : false}
                                description=''
                                placeholder='Enter phone number Ex: 787 XXXX XXX'
                                {...formik.getFieldProps('phone')}
                                required
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <AutocompleteInput
                            id="addressLine1"
                            name='addressLine1'
                            label={t("addUser.form.contactForm.addressLine1")}
                            onChange={handleGoogleAddressChange}
                            onBlur={handleGoogleAddressBlur}
                            value={formik.values.addressLine1}
                            helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                            error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                            required
                            disabled={false}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='addressLine2'
                            label={t("addUser.form.contactForm.addressLine2")}
                            type='text'
                            helperText={(formik.touched.addressLine2 && formik.errors.addressLine2) ? formik.errors.addressLine2 : undefined}
                            error={(formik.touched.addressLine2 && formik.errors.addressLine2) ? true : false}
                            description=''
                            placeholder='Type here'
                            {...formik.getFieldProps('addressLine2')}
                            required
                            disabled={false}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='city'
                            label={t("addUser.form.contactForm.city")}
                            type='text'
                            helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                            error={(formik.touched.city && formik.errors.city) ? true : false}
                            description=''
                            placeholder='City name'
                            {...formik.getFieldProps('city')}
                            required
                            disabled={false}
                        />
                    </Grid>

                    <Grid item xs={12} md={3} pr={2.5} pb={2.5}>
                        <Input
                            id='state'
                            label={t("addUser.form.contactForm.state")}
                            type='text'
                            helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                            error={(formik.touched.state && formik.errors.state) ? true : false}
                            description=''
                            required
                            {...formik.getFieldProps('state')}
                        />
                    </Grid>

                    <Grid item xs={12} md={3} pr={2.5} pb={2.5}>
                        <Input
                            id='postalCode'
                            label={t("addUser.form.contactForm.postalCode")}
                            type='text'
                            helperText={(formik.touched.postalCode && formik.errors.postalCode) ? formik.errors.postalCode : undefined}
                            error={(formik.touched.postalCode && formik.errors.postalCode) ? true : false}
                            description=''
                            required
                            {...formik.getFieldProps('postalCode')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} />
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5} mt={4}>
                        <Box className="form-action-section txt-right">
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
                                disabled={disableButton()}
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