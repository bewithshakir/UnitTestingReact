import { Box, FormControl, FormControlLabel, Grid, Link, RadioGroup, Typography, Radio } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingIcon } from '../../../assets/icons';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import UserModel from "../../../models/UserModel";
import { HorizontalBarVersionState, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore, useStore } from '../../../store';
import { useAddUser, useEditUserData, useUpdateUserData } from './queries';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import "./style.scss";
import { AddUserSchema } from "./validation";

const initialValues = new UserModel();

const userGroupList = [
    { label: 'Customer', value: 'Customer', },
    { label: 'DSP', value: 'DSP' },
];
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
    console.log('formik.values.userAccessLevel', formik.values);

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
                                items={userGroupList}
                                helperText={(formik.touched.userGroup && formik.errors.userGroup) ? formik.errors.userGroup.value : undefined}
                                error={(formik.touched.userGroup && formik.errors.userGroup) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("userGroup"); formik.validateField("userGroup"); }}
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='email'
                            label={t("addUser.form.email")}
                            type='text'
                            helperText={(formik.touched.email && formik.errors.email) ? formik.errors.email : undefined}
                            error={(formik.touched.email && formik.errors.email) ? true : false}
                            description=''
                            placeholder='Enter Email'
                            {...formik.getFieldProps('email')}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5} pt={2.5} display="flex" alignItems="center">
                        <Link
                            variant="body2"
                            className="add-link"
                            sx={{ cursor: "pointer", color: "var(--Primary)" }}
                        >
                            <Typography variant="h4" color="var(--Primary)" className="fw-bold" mb={1}>
                                Verify
                            </Typography>
                        </Link>
                    </Grid>

                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <Input
                            id='userName'
                            label={t("addUser.form.userGroupAccessLevel.userName")}
                            type='text'
                            helperText={(formik.touched.userName && formik.errors.userName) ? formik.errors.userName : undefined}
                            error={(formik.touched.userName && formik.errors.userName) ? true : false}
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
                            helperText={(formik.touched.phone && formik.errors.phone) ? formik.errors.phone : undefined}
                            error={(formik.touched.phone && formik.errors.phone) ? true : false}
                            description=''
                            placeholder='Phone Number Ex: 787 XXXX XXX'
                            disabled={true}
                            {...formik.getFieldProps('phone')}
                        />
                    </Grid>

                    <Grid item md={12} mt={2} mb={2}>
                        <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold">
                            {t("addUser.form.userGroupAccessLevel.title")}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                aria-label="gender"
                                defaultValue="female"
                                name="userAccessLevel"
                                value={formik.values.userAccessLevel}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="View & Edit" sx={{ margin: 0 }} control={<Radio />} label="View & Edit" />
                                <FormControlLabel value="View only" sx={{ marginLeft: 0 }} control={<Radio />} label="View only" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

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