import React, { useState, useEffect } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
// orderSchDel
import { AddParkingLotForm, addLotFormInitialValues, lotContact } from '../../../models/ParkingLotModel';
import AddParkingLotValidationSchema from './validation';
import { timeZones, productDelFreq, useCreateLot, useGetContactTypes } from './queries';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { PlusIcon, EditIcon } from '../../../assets/icons';
// import MultiSelect from '../../../components/UIComponents/Select/MultiSelect';
// import { DatePickerInput } from '../../../components/UIComponents/DatePickerInput/DatePickerInput.component';
// import { TimePicker } from '../../../components/UIComponents/TimePicker/TimePicker.component';
// import { AddLotHeaderMenu } from '../../../components/UIComponents/AddLotHeaderMenu/AddLotHeaderMenu.component';

import { useAddedCustomerIdStore } from '../../../store';


import './style.scss';

interface FormStatusType {
    message: string
    type: string
}
interface FormStatusProps {
    [key: string]: FormStatusType
}

const formStatusProps: FormStatusProps = {
    success: {
        message: 'Lot Name is successfully added and Please add other details.',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
};



function AddLot(): React.ReactElement {

    const { t } = useTranslation();
    const history = useHistory();
    const isFormFieldChange = () => formik.dirty;
    const { mutate: addNewLot, isSuccess, isError } = useCreateLot();
    const { data: contactTypeList } = useGetContactTypes();
    const [primaryContactType, setPrimaryContactType] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const [secondaryContactType, setSecondaryContactType] = useState('');
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const [open, setOpen] = React.useState(false);
    const [apiResposneState, setAPIResponse] = useState(false);
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);

    useEffect(() => {
        if (isSuccess) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.success);
            setFormSuccess(true);
        }
        if (isError) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.error);
        }
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);

    }, [isSuccess, isError]);

    // useEffect(() => {
        // data: newLotData
    // }, [newLotData]);

    useEffect(() => {
        if (contactTypeList?.data.length) {
            const primaryContactObj = contactTypeList.data.find((contactType: any) => contactType.locationContactNm.toLowerCase() === 'primary');
            const secContactObj = contactTypeList.data.find((contactType: any) => contactType.locationContactNm.toLowerCase() === 'secondary');
            setPrimaryContactType(primaryContactObj?.locationContactCd);
            setSecondaryContactType(secContactObj?.locationContactCd);

        }
    }, [contactTypeList]);

    const onClickBack = () => {
        if (isFormFieldChange()) {
            handleModelToggle();
        } else {
            history.push('/customer/parkingLots');
        }
    };

    const handleModelToggle = () => {
        setOpen(prev => !prev);
    };

    const handleModelConfirm = () => {
        setOpen(prev => !prev);
        history.push('/customer/parkingLots');
    };

    const createAddLotPayload = (form: AddParkingLotForm) => {
        const apiPayload = {
            customer_id: addedCustomerId ? addedCustomerId : "37632a0d-7ab8-4b3d-9606-ee1d6f089557",
            lot_name: form.lotName,
            lot_id: form.lotId,
            jurisdiction_id: form.jurisdictionId,
            address_1: form.addressLine1,
            address_2: form.addressLine2,
            address_3: form.county,
            city: form.city,
            state: form.state,
            postal_code: form.postalCode,
            timezone_cd: form.timeZone.value,
            country: form.country,
            location_contact: form.locationContact.map((contactObj: any, index) => ({
                location_contact_type_cd: index === 0 ? primaryContactType : secondaryContactType,
                contact_first_name: contactObj.firstName,
                contact_last_name: contactObj.lastName,
                contact_email: contactObj.email,
                contact_phone: contactObj.phoneNumber
            })),
            // productDelFreq: form.productDelFreq.value,
            // orderScheduleDel: form.orderScheduleDel.map((orderSchDelObj: any) => ({
            //     fromDate: orderSchDelObj.fromDate,
            //     toDate: orderSchDelObj.toDate,
            //     startTime: orderSchDelObj.startTime,
            //     endTime: orderSchDelObj.endTime,
            //     productDelDays: orderSchDelObj.productDelDays,
            // }))
        };
        return apiPayload;
    };

    const createNewLot = (form: AddParkingLotForm) => {
        try {
            addNewLot(createAddLotPayload(form));
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    function handleGoogleAddressChange(addressObj: any) {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('addressLine2', addressObj.addressLine2);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('postalCode', addressObj.postalCode);
        formik.setFieldValue('country', addressObj.country);
    }

    const formik = useFormik({
        initialValues: addLotFormInitialValues,
        validationSchema: AddParkingLotValidationSchema,
        onSubmit: (values) => {
            createNewLot(values);
        },
    });

    return (
        <>
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container lot-container">
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container mt={1}>
                                <Grid container item md={12} mt={2} mb={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="h4" component="h4" gutterBottom className="left-heading fw-bold" mb={1}>
                                            General Information
                                        </Typography>
                                    </Grid>
                                    {formSuccess && <Grid item xs={6}>
                                        <Button
                                            types="save"
                                            aria-label="save"
                                            className="edit-button"
                                        >
                                            <EditIcon /> <span>{t("buttons.edit")}</span>
                                        </Button>
                                    </Grid>}
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='lotName'
                                        label='Lot Name'
                                        type='text'
                                        helperText={(formik.touched.lotName && formik.errors.lotName) ? formik.errors.lotName : undefined}
                                        error={(formik.touched.lotName && formik.errors.lotName) ? true : false}
                                        description=''
                                        disabled={formSuccess}
                                        required
                                        {...formik.getFieldProps('lotName')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='lotId'
                                        label='Lot ID'
                                        type='text'
                                        helperText={(formik.touched.lotId && formik.errors.lotId) ? formik.errors.lotId : undefined}
                                        error={(formik.touched.lotId && formik.errors.lotId) ? true : false}
                                        description=''
                                        disabled={formSuccess}
                                        required
                                        {...formik.getFieldProps('lotId')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <AutocompleteInput
                                        name='addressLine1'
                                        label='ADDRESS LINE 1'
                                        onChange={handleGoogleAddressChange}
                                        onBlur={() => { formik.setFieldTouched("addressLine1"); formik.validateField("addressLine1"); }}
                                        value={formik.values.addressLine1}
                                        helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                        error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                        required
                                        disabled={formSuccess}
                                    />

                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='addressLine2'
                                        label='ADDRESS LINE 2'
                                        type='text'
                                        helperText={(formik.touched.addressLine2 && formik.errors.addressLine2) ? formik.errors.addressLine2 : undefined}
                                        error={(formik.touched.addressLine2 && formik.errors.addressLine2) ? true : false}
                                        description=''
                                        required
                                        disabled={formSuccess}
                                        {...formik.getFieldProps('addressLine2')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='city'
                                        label='City'
                                        type='text'
                                        helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                                        error={(formik.touched.city && formik.errors.city) ? true : false}
                                        description=''
                                        disabled
                                        required
                                        {...formik.getFieldProps('city')}
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                    <Input
                                        id='state'
                                        label='STATE / PROVINCE'
                                        type='text'
                                        helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                                        error={(formik.touched.state && formik.errors.state) ? true : false}
                                        description=''
                                        disabled
                                        required
                                        {...formik.getFieldProps('state')}
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5}>
                                    <Input
                                        id='postalCode'
                                        label='POSTAL CODE'
                                        type='text'
                                        helperText={(formik.touched.postalCode && formik.errors.postalCode) ? formik.errors.postalCode : undefined}
                                        error={(formik.touched.postalCode && formik.errors.postalCode) ? true : false}
                                        description=''
                                        disabled
                                        required
                                        {...formik.getFieldProps('postalCode')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='county'
                                        label='County'
                                        type='text'
                                        helperText={(formik.touched.county && formik.errors.county) ? formik.errors.county : undefined}
                                        error={(formik.touched.county && formik.errors.county) ? true : false}
                                        description=''
                                        required
                                        disabled={formSuccess}
                                        {...formik.getFieldProps('county')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Select
                                        id='timeZone'
                                        name='timeZone'
                                        label='Time Zone'
                                        value={formik.values.timeZone}
                                        placeholder='Choose'
                                        items={timeZones}
                                        helperText={(formik.touched.timeZone && formik.errors.timeZone) ? formik.errors.timeZone.value : undefined}
                                        error={(formik.touched.timeZone && formik.errors.timeZone) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("timeZone"); formik.validateField("timeZone"); }}
                                        disabled={formSuccess}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='country'
                                        label='Country'
                                        type='text'
                                        helperText={(formik.touched.country && formik.errors.country) ? formik.errors.country : undefined}
                                        error={(formik.touched.country && formik.errors.country) ? true : false}
                                        description=''
                                        required
                                        disabled={formSuccess}
                                        {...formik.getFieldProps('country')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='jurisdictionId'
                                        label='Tax Jurisdiction'
                                        type='text'
                                        helperText={(formik.touched.jurisdictionId && formik.errors.jurisdictionId) ? formik.errors.jurisdictionId : undefined}
                                        error={(formik.touched.jurisdictionId && formik.errors.jurisdictionId) ? true : false}
                                        description=''
                                        disabled={formSuccess}
                                        {...formik.getFieldProps('jurisdictionId')}
                                    />
                                </Grid>

                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Product Delivery Info
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='productDelFreq'
                                        name='productDelFreq'
                                        label='PRODUCT DELIVERY FREQUENCY (OPTIONAL)'
                                        value={formik.values.productDelFreq}
                                        placeholder='Choose'
                                        items={productDelFreq}
                                        helperText={(formik.touched.productDelFreq && formik.errors.productDelFreq) ? formik.errors.productDelFreq.value : undefined}
                                        error={(formik.touched.timeZone && formik.errors.timeZone) ? true : false}
                                        onChange={formik.setFieldValue}
                                        disabled={formSuccess}
                                        onBlur={() => { formik.setFieldTouched("productDelFreq"); formik.validateField("productDelFreq"); }}
                                    />
                                </Grid>
                                {/* <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Order Schedule Delivery info (Max 10)
                                    </Typography>
                                </Grid> */}
                                {/* <FieldArray
                                    name="orderScheduleDel"
                                    render={(arrayHelpers) => (
                                        <React.Fragment>
                                            {formik.values.orderScheduleDel.map((index) => (
                                                <Grid container key={index}>

                                                    <Grid item md={3} pl={2.5}>
                                                        <DatePickerInput
                                                            type="single-date"
                                                            label='FROM DATE'
                                                            name={`orderScheduleDel[${index}].fromDate`}
                                                            value={formik.values.orderScheduleDel[index].fromDate}
                                                            onChange={formik.setFieldValue}
                                                            onClose={() => { formik.setFieldTouched(`orderScheduleDel[${index}].fromDate`); formik.validateField(`orderScheduleDel[${index}].fromDate`); }}
                                                            id={`orderScheduleDel[${index}].fromDate`}
                                                            helperText={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.fromDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.fromDate))
                                                                    ?
                                                                    (formik.errors.orderScheduleDel[index] as orderSchDel).fromDate : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.fromDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.fromDate))
                                                                    ? true : false
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                                        <DatePickerInput
                                                            type="single-date"
                                                            label='TO DATE'
                                                            id={`orderScheduleDel[${index}].toDate`}
                                                            name={`orderScheduleDel[${index}].toDate`}
                                                            value={formik.values.orderScheduleDel[index].toDate}
                                                            onChange={formik.setFieldValue}
                                                            onClose={() => { formik.setFieldTouched(`orderScheduleDel[${index}].toDate`); formik.validateField(`orderScheduleDel[${index}].toDate`); }}
                                                            helperText={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.toDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.toDate))
                                                                    ?
                                                                    (formik.errors.orderScheduleDel[index] as orderSchDel).toDate : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.toDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.toDate))
                                                                    ? true : false
                                                            }
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <MultiSelect
                                                            id={`orderScheduleDel[${index}].productDelDays`}
                                                            label='SELECT DAYS TO DELIVER PRODUCT'
                                                            placeholder='Select Multiple Days'
                                                            items={productDelFreq}
                                                            name={`orderScheduleDel[${index}].productDelDays`}
                                                            value={formik.values.orderScheduleDel[index].productDelDays}
                                                            onChange={formik.setFieldValue}
                                                            onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].productDelDays`); formik.validateField(`orderScheduleDel[${index}].productDelDays`); }}
                                                            // helperText={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.productDelDays && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDays))
                                                            //         ?
                                                            //         (formik.errors.orderScheduleDel[index] as orderSchDel).productDelDays : undefined
                                                            // }
                                                            error={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.productDelDays && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDays))
                                                                    ? true : false
                                                            }

                                                        />
                                                    </Grid>

                                                    <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                                        <TimePicker
                                                            label='START TIME'
                                                            id={`orderScheduleDel[${index}].startTime`}
                                                            name={`orderScheduleDel[${index}].startTime`}
                                                            value={formik.values.orderScheduleDel[index].startTime}
                                                            onChange={formik.setFieldValue}
                                                            helperText={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.startTime && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.startTime))
                                                                    ?
                                                                    (formik.errors.orderScheduleDel[index] as orderSchDel).startTime : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.startTime && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.startTime))
                                                                    ? true : false
                                                            }
                                                        // {...formik.getFieldProps(`orderScheduleDel[${index}].startTime`)}
                                                        />

                                                    </Grid>
                                                    <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                                        <TimePicker
                                                            label='END TIME'
                                                            id={`orderScheduleDel[${index}].endTime`}
                                                            name={`orderScheduleDel[${index}].endTime`}
                                                            value={formik.values.orderScheduleDel[index].endTime}
                                                            onChange={formik.setFieldValue}
                                                            helperText={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.endTime && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.endTime))
                                                                    ?
                                                                    (formik.errors.orderScheduleDel[index] as orderSchDel).startTime : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                    (formik.touched?.orderScheduleDel?.[index]?.endTime && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.endTime))
                                                                    ? true : false
                                                            }
                                                        // {...formik.getFieldProps(`orderScheduleDel[${index}].endTime`)}
                                                        />

                                                    </Grid>

                                                </Grid>
                                            ))}
                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                    onClick={() => {
                                                        if (formik.values.locationContact.length < 5) {
                                                            arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                        }
                                                    }}
                                                >
                                                    <PlusIcon />
                                                    <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                                        ADD ANOTHER SCHEDULE CONTACT
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                /> */}
                                <FieldArray
                                    name="locationContact"
                                    render={(arrayHelpers) => (
                                        <React.Fragment>
                                            {formik.values.locationContact.map((contactList, index) => (
                                                <Grid container key={index}>
                                                    <Grid item md={12} mt={2} mb={1}>
                                                        <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                                            {index < 1 ? 'Primary Lot Contact' : 'Secondary Lot Contact (Optional)'}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`locationContact[${index}].firstName`}
                                                            label='First Name'
                                                            type='text'
                                                            disabled={formSuccess}
                                                            helperText={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.firstName && ((formik.errors?.locationContact?.[index] as lotContact)?.firstName))
                                                                    ?
                                                                    (formik.errors.locationContact[index] as lotContact).firstName : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.firstName && ((formik.errors?.locationContact?.[index] as lotContact)?.firstName))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`locationContact[${index}].firstName`)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`locationContact[${index}].lastName`}
                                                            label='Last Name'
                                                            type='text'
                                                            disabled={formSuccess}
                                                            helperText={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.lastName && ((formik.errors?.locationContact?.[index] as lotContact)?.lastName))
                                                                    ?
                                                                    (formik.errors.locationContact[index] as lotContact).lastName : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.lastName && ((formik.errors?.locationContact?.[index] as lotContact)?.lastName))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`locationContact[${index}].lastName`)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`locationContact[${index}].email`}
                                                            label='Email'
                                                            type="text"
                                                            disabled={formSuccess}
                                                            helperText={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.email && ((formik.errors?.locationContact?.[index] as lotContact)?.email))
                                                                    ?
                                                                    (formik.errors.locationContact[index] as lotContact).email : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.email && ((formik.errors?.locationContact?.[index] as lotContact)?.email))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`locationContact[${index}].email`)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`locationContact[${index}].phoneNumber`}
                                                            label='Phone Number'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.phoneNumber && ((formik.errors?.locationContact?.[index] as lotContact)?.phoneNumber))
                                                                    ?
                                                                    (formik.errors.locationContact[index] as lotContact).phoneNumber : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.locationContact && formik?.touched?.locationContact &&
                                                                    (formik.touched?.locationContact?.[index]?.phoneNumber && ((formik.errors?.locationContact?.[index] as lotContact)?.phoneNumber))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            disabled={formSuccess}
                                                            required
                                                            {...formik.getFieldProps(`locationContact[${index}].phoneNumber`)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    sx={{ display: "flex", alignItems: "center" }}
                                                    onClick={() => {
                                                        if (formik.values.locationContact.length < 5) {
                                                            arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                        }
                                                    }}
                                                >
                                                    <PlusIcon />
                                                    <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                                        Add Additional Contact
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                />

                                <Grid item md={12} mt={2} mb={1}>
                                    <Box className="form-action-section">
                                        <Button
                                            types="cancel"
                                            aria-label="cancel"
                                            className="mr-4"
                                            onClick={onClickBack}
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label="save"
                                            className="ml-4"
                                            disabled={(!formik.isValid || !formik.dirty) || formSuccess}
                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>
                                    <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                </Grid>
                            </Grid>
                        </form>
                    </FormikProvider>
                </Container>
            </Grid>
            <DiscardChangesDialog
                title={t("customerManagement.discardchangesdialog.title")}
                content={t("customerManagement.discardchangesdialog.content")}
                open={open}
                handleToggle={handleModelToggle}
                handleConfirm={handleModelConfirm}
            />
        </>
    );
}

export default AddLot;