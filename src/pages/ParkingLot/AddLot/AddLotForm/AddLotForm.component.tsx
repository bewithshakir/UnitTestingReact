/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-empty */
import React, { useState, useEffect } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Button } from '../../../../components/UIComponents/Button/Button.component';
import Input from '../../../../components/UIComponents/Input/Input';
import Select from '../../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Divider from '@mui/material/Divider';
import { AddParkingLotForm, addLotFormInitialValues, lotContact, orderSchDel } from '../../../../models/ParkingLotModel';
import AddParkingLotValidationSchema from '../validation';
import { useCreateLot, useEditParkingLot, useGetContactTypes, useGetParkingLotData } from '../queries';
import AutocompleteInput from '../../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { PlusIcon, EditIcon } from '../../../../assets/icons';
import { useTheme } from '../../../../contexts/Theme/Theme.context';
import { formStatusObj, timeZones, productDelFreq, getCountry} from '../../config';
import MultiSelect from '../../../../components/UIComponents/Select/MultiSelect';
import { DatePickerInput } from '../../../../components/UIComponents/DatePickerInput/DatePickerInput.component';
import { TimePicker } from '../../../../components/UIComponents/TimePicker/TimePicker.component';
import { useAddedCustomerIdStore, useAddedCustomerNameStore, useShowConfirmationDialogBoxStore } from '../../../../store';
import './AddLotForm.style.scss';
interface FormStatusType {
    message: string
    type: string
}
interface FormStatusProps {
    [key: string]: FormStatusType
}

const formStatusProps: FormStatusProps = formStatusObj;

function AddLotForm(): React.ReactElement {

    const { t } = useTranslation();
    const history = useHistory();
    const isFormFieldChange = () => formik.dirty;
    const { theme } = useTheme();
    const { data: contactTypeList } = useGetContactTypes();
    const [primaryContactType, setPrimaryContactType] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);
    const [secondaryContactType, setSecondaryContactType] = useState('');
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const [apiResposneState, setAPIResponse] = useState(false);
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const [isTrigger, setIsTrigger] = useState(false);
    // const setCustomerIdCreated = useAddedCustomerIdStore((state) => state.setCustomerId);
    const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);
    const [isDisabled, setDisabled] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isEditShown, setEditShown] = useState(true);
    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const [activeLotId, setActiveLotId] = React.useState("");
    const [LotData, setLotData] = React.useState({});

    const onAddLotError = (err: any) => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        try {
            const { data } = err.response;
            setAPIResponse(true);
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
        } catch (error) {
           
        }
    };

    const onAddLotSuccess = (data: any) => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        setAPIResponse(true);
        setFormStatus(formStatusProps.success);
        setActiveLotId(data?.lot?.deliveryLocationId.toString());
        setFormSuccess(true);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const onEditLotSuccess = (data: any) => {
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.editsuccess);
        //set active parking lot id
        setActiveLotId(data?.lot?.deliveryLocationId.toString());
        setEditShown(true);
        setSaveCancelShown(false);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        setIsTrigger(!isTrigger);
        formik.resetForm({});
        history.push(`/customer/${addedCustomerId}/parkingLots/viewLot/${activeLotId}`);
    };

    const onEditLotError = (err: any) => {
        try {
            const { data } = err.response;
            setAPIResponse(true);
            isFormValidated(false);
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
            setEditShown(true);
            setSaveCancelShown(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
            formik.resetForm({});
        } catch (error) {

        }
    };

    const onGetLotSuccess = (data: any) => {
        if (data) {
            populateDataInAllFields(data);
             //set active parking lot id
            setActiveLotId(data?.lot?.deliveryLocationId.toString());
            setLotData(data?.lot);
            console.log(data?.lot?.deliveryLocationId);
            console.log(activeLotId);
            console.log(LotData);
            // setCustomerIdCreated(data?.data?.customer?.customerId);
            // setPageCustomerName(data?.data?.customer?.companyNm);
        }
    };

    const onGetLotError = () => {
        setEditShown(false);
        setSaveCancelShown(true);
    };

    const { mutate: addNewLot } = useCreateLot(onAddLotError, onAddLotSuccess);
    const { mutate: editParkingLot } = useEditParkingLot(activeLotId, onEditLotSuccess, onEditLotError);
    useGetParkingLotData(activeLotId, isTrigger, onGetLotSuccess, onGetLotError);

    //to populate all the data in the form fields
    const populateDataInAllFields = (dataToPopulate: any) => {
        //populate data in UI fields
        formik.setFieldValue('lotName', dataToPopulate?.data?.lot?.deliveryLocationNm);
        formik.setFieldValue('lotId', dataToPopulate?.data?.lot?.lotId);
        formik.setFieldValue('addressLine1', dataToPopulate?.data?.lot?.addressLine1);
        formik.setFieldValue('addressLine2', dataToPopulate?.data?.lot?.addressLine2);
        formik.setFieldValue('city', dataToPopulate?.data?.lot?.cityNm);
        formik.setFieldValue('state', dataToPopulate?.data?.lot?.stateNm);
        formik.setFieldValue('postalCode', dataToPopulate?.data?.lot?.postalCd);
        formik.setFieldValue('county', dataToPopulate?.data?.lot?.addressLine3);
        formik.setFieldValue('jurisdictionId', dataToPopulate?.data?.lot?.taxJurisdictionId);
        dataToPopulate?.data?.lot?.deliveryLocationContact.map((obj: any, index: number) => {
            formik.setFieldValue(`locationContact[${index}].lotContactId`, obj.locationContactId);
            formik.setFieldValue(`locationContact[${index}].firstName`, obj.contactFirstNm);
            formik.setFieldValue(`locationContact[${index}].lastName`, obj.contactLastNm);
            formik.setFieldValue(`locationContact[${index}].email`, obj.contactEmailId);
            formik.setFieldValue(`locationContact[${index}].phoneNumber`, obj.contactPhoneNo);
        });
        timeZones.map((obj:any, index: number) => {
            if(obj.value === dataToPopulate?.data?.lot?.timezoneCd) {
                formik.setFieldValue("timeZone",
                    { label: obj.label, value: obj.value });
            }
        });
        // add the same logic for del freq drop down 

    };

    useEffect(() => {
        if (contactTypeList?.data.length) {
            const primaryContactObj = contactTypeList.data.find((contactType: any) => contactType.locationContactNm.toLowerCase() === 'primary');
            const secContactObj = contactTypeList.data.find((contactType: any) => contactType.locationContactNm.toLowerCase() === 'secondary');
            setPrimaryContactType(primaryContactObj?.locationContactCd);
            setSecondaryContactType(secContactObj?.locationContactCd);

        }
    }, [contactTypeList]);

    useEffect(() => {
        const selectedLotId = location.pathname.split("/").pop();
        if (selectedLotId != "addLot") {
             //set active parking lot id
            setActiveLotId("" + selectedLotId);
            setDisabled(true);
            setSaveCancelShown(false);
        } else {
            setEditShown(false);
            setSaveCancelShown(true);
        }
    }, [location]);

    const onClickBack = () => {
        if (isFormFieldChange()) {
            showDialogBox(true);
        } else {
            history.push('/customer/parkingLots');
        }
    };

    const createAddLotPayload = (form: AddParkingLotForm) => {
        const apiPayload = {
            customer_id: addedCustomerId ? addedCustomerId : "",
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
            country: getCountry(),
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

    const createEditLotPayload = (form: AddParkingLotForm) => {
        console.log("in createEditLotPayload");
        const apiPayload = {
            customer_id: addedCustomerId ? addedCustomerId : "",
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
            country: getCountry(),
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

    const editNewLot = (form: AddParkingLotForm, LotData: any) => {
        console.log("editNewLot");
        console.log(activeLotId);
        console.log(LotData);
        try {
            editParkingLot(createEditLotPayload(form));
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

    const formik = useFormik({
        initialValues: addLotFormInitialValues,
        validationSchema: AddParkingLotValidationSchema,
        onSubmit: (values) => {

            if (isEditMode) {
                console.log(activeLotId);
                editNewLot(values, LotData);
            } else {
                createNewLot(values);
            }
       
            
        },
    });

    const handleEditButtonClick = () => {
        setEditMode(true);
        setSaveCancelShown(true);
        setDisabled(false);
    };

    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };

    return (
        <>
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container lot-container">
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange}>
                            <Grid container mt={1}>
                                <Grid container item md={12} mt={2} mb={1}>
                                    <Grid item xs={6}>
                                        <Typography variant="h4" component="h4" gutterBottom className="left-heading fw-bold" mb={1}>
                                            General Information
                                        </Typography>
                                    </Grid>
                                    {isEditShown && <Grid item xs={6} sx= {{ justifyContent: 'flex-end' }}>
                                        <Button
                                            types="save"
                                            aria-label="save"
                                            className="edit-button"
                                            onClick={handleEditButtonClick}
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
                                        disabled={isDisabled}
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
                                        disabled={isDisabled}
                                        required
                                        {...formik.getFieldProps('lotId')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <AutocompleteInput
                                        name='addressLine1'
                                        label='ADDRESS LINE 1'
                                        onChange={handleGoogleAddressChange}
                                        onBlur={handleGoogleAddressBlur}
                                        value={formik.values.addressLine1}
                                        helperText={(formik.touched.addressLine1 && formik.errors.addressLine1) ? formik.errors.addressLine1 : undefined}
                                        error={(formik.touched.addressLine1 && formik.errors.addressLine1) ? true : false}
                                        required
                                        disabled={isDisabled}
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
                                        disabled={isDisabled}
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
                                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5} className="no-wrap">
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
                                <Grid item md={3} pl={2.5} className="no-wrap">
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
                                        disabled={isDisabled}
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
                                        isDisabled={isDisabled}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={6} pr={2.5} >
                                    <Input
                                        id='jurisdictionId'
                                        label='Tax Jurisdiction'
                                        type='text'
                                        helperText={(formik.touched.jurisdictionId && formik.errors.jurisdictionId) ? formik.errors.jurisdictionId : undefined}
                                        error={(formik.touched.jurisdictionId && formik.errors.jurisdictionId) ? true : false}
                                        description=''
                                        disabled={isDisabled}
                                        required
                                        {...formik.getFieldProps('jurisdictionId')}
                                    />
                                </Grid>

                                <Grid item md={12} mt={5} mb={3}>
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
                                        isDisabled={isDisabled}
                                        onBlur={() => { formik.setFieldTouched("productDelFreq"); formik.validateField("productDelFreq"); }}
                                    />
                                </Grid>
                                <Grid item md={12} mt={5} mb={3}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Order Schedule Delivery info (Max 10)
                                    </Typography>
                                </Grid> 
                                <Grid item md={12} mt={1} mb={2}>
                                    <Divider className="field-divider"/>
                                </Grid>
                               
                                <FieldArray
                                    name="orderScheduleDel"
                                    render={() => (
                                        <React.Fragment>
                                            {formik.values.orderScheduleDel.map((orderSchObj, index) => (
                                                <Grid container key={index}>
                                                     
                                                    <Grid item md={3} pr={2.5} pb={2.5}>
                                                        <DatePickerInput
                                                            type="single-date"
                                                            label='FROM DATE'
                                                            name={`orderScheduleDel[${index}].fromDate`}
                                                            value={formik.values.orderScheduleDel[index].fromDate}
                                                            onChange={formik.setFieldValue}
                                                            disabled
                                                            onClose={() => { formik.setFieldTouched(`orderScheduleDel[${index}].fromDate`); formik.validateField(`orderScheduleDel[${index}].fromDate`); }}
                                                            id={`orderScheduleDel[${index}].fromDate`}
                                                            // helperText={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.fromDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.fromDate))
                                                            //         ?
                                                            //         (formik.errors.orderScheduleDel[index] as orderSchDel).fromDate : undefined
                                                            // }
                                                            // error={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.fromDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.fromDate))
                                                            //         ? true : false
                                                            // }
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
                                                            disabled
                                                            onClose={() => { formik.setFieldTouched(`orderScheduleDel[${index}].toDate`); formik.validateField(`orderScheduleDel[${index}].toDate`); }}
                                                            // helperText={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.toDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.toDate))
                                                            //         ?
                                                            //         (formik.errors.orderScheduleDel[index] as orderSchDel).toDate : undefined
                                                            // }
                                                            // error={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.toDate && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.toDate))
                                                            //         ? true : false
                                                            // }
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} md={6} pl={2.5} pr={2.5} pb={2.5}>
                                                        <MultiSelect
                                                            id={`orderScheduleDel[${index}].productDelDays`}
                                                            label='SELECT DAYS TO DELIVER PRODUCT'
                                                            placeholder='Select Multiple Days'
                                                            items={productDelFreq}
                                                            name={`orderScheduleDel[${index}].productDelDays`}
                                                            value={formik.values.orderScheduleDel[index].productDelDays}
                                                            onChange={formik.setFieldValue}
                                                            disabled
                                                            onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].productDelDays`); formik.validateField(`orderScheduleDel[${index}].productDelDays`); }}
                                                            // helperText={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.productDelDays && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDays))
                                                            //         ?
                                                            //         (formik.errors.orderScheduleDel[index] as orderSchDel).productDelDays : undefined
                                                            // }
                                                            // error={
                                                            //     formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                            //         (formik.touched?.orderScheduleDel?.[index]?.productDelDays && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDays))
                                                            //         ? true : false
                                                            // }

                                                        />
                                                    </Grid>

                                                    <Grid item md={3} pr={2.5} pb={2.5}>
                                                        <TimePicker
                                                            label='START TIME'
                                                            id={`orderScheduleDel[${index}].startTime`}
                                                            name={`orderScheduleDel[${index}].startTime`}
                                                            value={formik.values.orderScheduleDel[index].startTime}
                                                            onChange={formik.setFieldValue}
                                                            disabled
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
                                                        />

                                                    </Grid>
                                                    <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                                        <TimePicker
                                                            label='END TIME'
                                                            id={`orderScheduleDel[${index}].endTime`}
                                                            name={`orderScheduleDel[${index}].endTime`}
                                                            value={formik.values.orderScheduleDel[index].endTime}
                                                            onChange={formik.setFieldValue}
                                                            disabled
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
                                                        />

                                                    </Grid>

                                                </Grid>
                                            ))}
                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    className="add-link disabled-text-link"
                                                    // onClick={() => {
                                                    //     if (formik.values.locationContact.length < 5) {
                                                    //         arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                    //     }
                                                    // }}
                                                >
                                                    <span className="add-icon-span"><PlusIcon color={theme["--Secondary-Background"]} /></span>
                                                    <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary disabled-text" mb={1}>
                                                        ADD ANOTHER ORDER SCHEDULE
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                /> 
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
                                                            disabled={isDisabled}
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
                                                            disabled={isDisabled}
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
                                                            disabled={isDisabled}
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
                                                            disabled={isDisabled}
                                                            required
                                                            {...formik.getFieldProps(`locationContact[${index}].phoneNumber`)}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}
                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    className="add-link disabled-text-link"
                                                    onClick={() => {
                                                        if (formik.values.locationContact.length < 0) {
                                                            arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                        }
                                                    }}
                                                >
                                                    <span className="add-icon-span"><PlusIcon color={theme["--Secondary-Background"]} /></span>
                                                    <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary disabled-text" mb={1}>
                                                        Add Additional Contact
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                />

                                <Grid item md={12} mt={2} mb={1}>
                                    {isSavCancelShown && <Box className="form-action-section">
                                        <Button
                                            types="cancel"
                                            aria-label="cancel"
                                            className="mr-4"
                                            onClick={onClickBack}
                                            disabled={formSuccess}
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
                                    </Box> }
                                    <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                </Grid>
                            </Grid>
                        </form>
                    </FormikProvider>
                </Container>
            </Grid>
        </>
    );
}

export default AddLotForm;
