import React, { useState, useEffect, useRef } from 'react';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Button } from '../../../../components/UIComponents/Button/Button.component';
import Input from '../../../../components/UIComponents/Input/Input';
import ToastMessage from '../../../../components/UIComponents/ToastMessage/ToastMessage.component';
import Divider from '@mui/material/Divider';
import { AddParkingLotForm, addLotFormInitialValues, lotContact, orderSchDel } from '../../../../models/ParkingLotModel';
import AddParkingLotValidationSchema from '../validation';
import { useCreateLot, useEditParkingLot, useGetContactTypes, useGetDaysOfWeek, useGetDeliveryFrequency, useGetParkingLotData, useGetTimeZones } from '../queries';
import AutocompleteInput from '../../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { PlusIcon, EditIcon, DeleteIcon } from '../../../../assets/icons';
import { useTheme } from '../../../../contexts/Theme/Theme.context';
import { formStatusObj, getCountry, daysToDeliver } from '../../config';
import MultiSelect from '../../../../components/UIComponents/Select/MultiSelect';
import SingleSelect from '../../../../components/UIComponents/Select/SingleSelect';
import { DatePickerInput } from '../../../../components/UIComponents/DatePickerInput/DatePickerInput.component';
import { TimePicker } from '../../../../components/UIComponents/TimePicker/TimePicker.component';
import { useAddedCustomerIdStore, useAddedCustomerNameStore, useAddedParkingLotIdStore, useShowConfirmationDialogBoxStore, useAddedParkingLotCityNmStore } from '../../../../store';
import { isEqual } from 'lodash';
import './AddLotForm.style.scss';
import { ParkingLot_SearchParam } from '../../../../utils/constants';
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
    const { search } = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { data: contactTypeList } = useGetContactTypes();
    const [primaryContactType, setPrimaryContactType] = useState('');
    const [secondaryContactType, setSecondaryContactType] = useState('');
    const [formStatus, setFormStatus] = useState<FormStatusType>({ message: '', type: '' });
    const [apiResposneState, setAPIResponse] = useState(false);
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const hideDialogBox = useShowConfirmationDialogBoxStore((state) => state.hideDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const [isTrigger, setIsTrigger] = useState(false);
    const setParkingLotIdCreated = useAddedParkingLotIdStore((state) => state.setParkingLotId);
    const setParkingLotCityNmCreated = useAddedParkingLotCityNmStore((state) => state.setParkingLotCityNm);
    const [isDisabled, setDisabled] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    const [isEditShown, setEditShown] = useState(true);
    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const [activeLotId, setActiveLotId] = React.useState("");
    const addedLotId = useAddedParkingLotIdStore((state) => state.parkingLotId);
    const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);
    const selectedCustomerName = useAddedCustomerNameStore((state) => state.customerName);
    const [timeZones, setTimeZones] = useState([]);
    const [init, setInit] = useState(false);
    const [lotState, setLotState] = useState({});
    const { data: timeZoneList } = useGetTimeZones();
    const { data: deliveryFrequencies } = useGetDeliveryFrequency();
    const [deliveryFrequenciesItems, setDeliveryFrequenciesItems] = useState<any[]>([]);
    const [intialFormikValue, setInitialFormikValue] = useState(addLotFormInitialValues);
    const [lotData, setLotData] = useState<any>(null);
    const daysOfWeek = useGetDaysOfWeek();
    const timerRef = useRef<any>(null);

    const onAddLotError = (err: any) => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        const { data } = err.response;
        setAPIResponse(true);
        formik.setSubmitting(false);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
    };
    useEffect(() => {
        if (deliveryFrequencies?.data?.length) {
            setDeliveryFrequenciesItems(deliveryFrequencies.data.map((delFeq: any) => ({ label: delFeq.deliveryFrequencyNm, value: delFeq.deliveryFrequencyCd })));
        }
    }, [deliveryFrequencies]);

    useEffect(() => {
        if (timeZoneList?.data?.timezones?.length) {
            setTimeZones(timeZoneList.data.timezones.map((obj: any) => ({ label: obj.timezoneNm, value: obj.timezoneCd })));
        }
    }, [timeZoneList]);

    const onAddLotSuccess = (data: any) => {
        resetFormFieldValue(false);
        hideDialogBox(false);
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.success);
        setEditShown(true);
        setSaveCancelShown(false);
        setDisabled(true);
        setActiveLotId(data?.data?.deliveryLocationId.toString());
        timerRef.current = setTimeout(() => {
            navigate(`/customer/${addedCustomerId}/parkingLots/viewLot/${data?.data?.deliveryLocationId.toString()}`);
        }, 6000);
    };

    const onEditLotSuccess = () => {
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.editsuccess);
        setEditShown(true);
        setSaveCancelShown(false);
        setIsTrigger(!isTrigger);
        formik.resetForm({});

    };

    const onEditLotError = (err: any) => {
        const { data } = err.response;
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        formik.setSubmitting(false);
        setEditShown(false);
        setSaveCancelShown(true);
    };

    useEffect(() => {
        if (init) {
            setLotState(formik.values);
            setInit(false);
        }
    }, [init]);

    const onGetLotSuccess = (data: any) => {
        if (data) {
            populateDataInAllFields(data);
            setPageCustomerName(data?.data?.lot?.customerName);
            setParkingLotCityNmCreated(data?.data?.lot?.cityNm);
            setInit(true);
        }
    };

    const onGetLotError = () => {
        setEditShown(false);
        setSaveCancelShown(true);
    };

    const { mutate: addNewLot } = useCreateLot(onAddLotError, onAddLotSuccess);
    const { mutate: editParkingLot } = useEditParkingLot(addedLotId, onEditLotSuccess, onEditLotError);
    useGetParkingLotData(activeLotId, isTrigger, onGetLotSuccess, onGetLotError);
    useEffect(() => {
        if (lotData) {
            const daysArray = daysOfWeek?.data?.data?.map((day: any) => ({
                label: day.dayOfWeekNm,
                value: day.dayOfWeekCd,
            })) || [];
            const productDelFreq = deliveryFrequenciesItems.find((obj: any) => obj.value === lotData.deliveryFrequencyCd) || { label: "", value: "" };
            setInitialFormikValue({
                lotName: lotData.deliveryLocationNm,
                lotId: lotData.lotId,
                addressLine1: lotData.addressLine1,
                addressLine2: lotData.addressLine2,
                city: lotData.cityNm,
                state: lotData.stateNm,
                postalCode: lotData.postalCd,
                county: lotData.addressLine3,
                jurisdictionId: lotData.taxJurisdictionId,
                timeZone: timeZones.find((obj: any) => obj.value === lotData.timezoneCd) || { label: '', value: '' },
                locationContact: lotData.deliveryLocationContact.map((obj: any) => ({
                    lotContactId: obj.locationContactId,
                    firstName: obj.contactFirstNm,
                    lastName: obj.contactLastNm,
                    email: obj.contactEmailId,
                    phoneNumber: obj.contactPhoneNo,
                })
                ),
                productDelFreq,
                orderScheduleDel: lotData.deliveryOrderSchedule.map((order: any) => {
                    const deliveryDayWeek = order.deliveryDayWeek.map((day: any) => {
                        day.label = daysArray.find((d: any) => d.value === day.dayOfWeekCd)?.label || '';
                        day.value = day.dayOfWeekCd;
                        return day;
                    });
                    return {
                        deliveryDayId: order.deliveryDayId,
                        fromDate: moment(order.startDt),
                        toDate: order.endDt || null,
                        startTime: order.startTime,
                        endTime: order.endTime,
                        ...(['weekly', 'monthly'].includes(String(productDelFreq?.label).toLowerCase())
                            ? { productDelDays: deliveryDayWeek[0] || { label: '', value: '' } }
                            : { productDelDaysMulti: deliveryDayWeek }),
                        delFreq: productDelFreq?.label,
                        isPrimary: order.isPrimary,
                    };
                })
            });
        }
    }, [lotData, deliveryFrequenciesItems, timeZones, daysOfWeek?.data?.data]);
    //to populate all the data in the form fields
    const populateDataInAllFields = (dataToPopulate: any) => {
        if (dataToPopulate?.data?.lot) {
            setLotData(dataToPopulate.data.lot);
        }
        setDisabled(true);
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
            setParkingLotIdCreated(selectedLotId);
        } else {
            setInit(true);
            setPageCustomerName(selectedCustomerName);
            setEditShown(false);
            setSaveCancelShown(true);
        }
    }, [location]);

    const onClickBack = () => {
        const searchParams = new URLSearchParams(search);
        const backTo = searchParams.get('backTo');
        if (isEqual(lotState, formik.values)) {
            isFormValidated(false);
            backTo === ParkingLot_SearchParam ? navigate(`/parkinglots`) : navigate(`/customer/${addedCustomerId}/parkingLots`, {
                state: {
                    customerId: addedCustomerId,
                    customerName: selectedCustomerName
                }
            });
        } else {
            showDialogBox(true);
        }
    };

    const createAddLotPayload = (form: AddParkingLotForm) => {
        return {
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
            delivery_frequency_cd: form.productDelFreq?.value || "",
            order_schedule: form.orderScheduleDel.map((orderSchedule, index) => ({
                startDt: moment(orderSchedule.fromDate).format("YYYY-MM-DD"),
                endDt: orderSchedule.toDate ? moment(orderSchedule.toDate).format("YYYY-MM-DD") : "",
                startTime: orderSchedule.startTime,
                endTime: orderSchedule.endTime,
                dayOfWeek: ['weekly', 'monthly'].includes(String(form.productDelFreq?.label).toLowerCase())
                    ? (!orderSchedule?.productDelDays?.value ? [] : [orderSchedule.productDelDays?.value])
                    : orderSchedule.productDelDaysMulti?.map(daysMulti => daysMulti.value),
                isPrimary: index === 0 ? "Y" : "N"
            }))
        };
    };

    const createEditLotPayload = (form: AddParkingLotForm) => {
        return {
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
            delivery_frequency_cd: form.productDelFreq?.value || "",
            order_schedule: form.orderScheduleDel.map((orderSchedule, index) => ({
                deliveryDayId: orderSchedule.deliveryDayId,
                startDt: moment(orderSchedule.fromDate).format("YYYY-MM-DD"),
                endDt: orderSchedule.toDate ? moment(orderSchedule.toDate).format("YYYY-MM-DD") : "",
                startTime: orderSchedule.startTime,
                endTime: orderSchedule.endTime,
                dayOfWeek: ['weekly', 'monthly'].includes(String(form.productDelFreq?.label).toLowerCase())
                    ? [{ dayOfWeekCd: orderSchedule.productDelDays?.value, deliveryDayWeekId: orderSchedule.productDelDays?.deliveryDayWeekId }]
                    : orderSchedule.productDelDaysMulti?.map(daysMulti => ({
                        dayOfWeekCd: daysMulti.value,
                        deliveryDayWeekId: daysMulti.deliveryDayWeekId
                    })),
                isPrimary: orderSchedule.isPrimary || (index === 0 ? "Y" : "N")
            }))
        };
    };

    const createNewLot = (form: AddParkingLotForm) => {
        try {
            addNewLot(createAddLotPayload(form));
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const editNewLot = (form: AddParkingLotForm) => {
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

    function handleGoogleAddressBlur() {
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
        initialValues: intialFormikValue,
        validationSchema: AddParkingLotValidationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isEditMode) {
                editNewLot(values);
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
        if (isEqual(lotState, formik.values)) {
            isFormValidated(false);
        } else {
            isFormValidated(true);
        }
    };

    const handleProductDelFreq = (fieldName: string, value: any) => {
        formik.setFieldValue(fieldName, value);
        formik.setFieldValue('orderScheduleDel', [{
            fromDate: null,
            toDate: null,
            startTime: '',
            endTime: '',
            productDelDays: { label: '', value: '' },
            productDelDaysMulti: [],
            delFreq: value.label
        }]);
    };

    const isAddScheduleDisabled = () => {
        if (formik?.values?.productDelFreq?.value && formik?.values?.orderScheduleDel?.length < 10 && !isDisabled) {
            if (isOrderScheduleDelInfoEmpty(formik?.values?.orderScheduleDel)) {
                return false;
            }
        }
        return true;
    };

    const isOrderScheduleDelInfoEmpty = (fieldArr: any) => {
        if (fieldArr[(fieldArr.length - 1)].fromDate != null
            && fieldArr[(fieldArr.length - 1)].startTime != null
            && fieldArr[(fieldArr.length - 1)].endTime != null) {
            return true;
        } else {
            return false;
        }
    };

    const isLocationContactDisabled = () => {
        if (formik.values.locationContact && formik.values.locationContact.length < 5 && !isDisabled) {
            return false;
        }
        return true;
    };

    const isOrderInputsDisabled = (index: number) => {
        return formik.values.productDelFreq.value === '' || isDisabled || typeof formik.values.orderScheduleDel[index].deliveryDayId === 'string';
    };

    const deleteSchedule = (index: number, componentArr: any) => {
        componentArr.remove(index);
    };

    const addSchedule = (e: any, fieldArr: any) => {
        if (isOrderScheduleDelInfoEmpty(fieldArr.form.values.orderScheduleDel)) {
            if (!isAddScheduleDisabled()) {
                fieldArr.push({
                    fromDate: null,
                    toDate: null,
                    startTime: '',
                    endTime: '',
                    productDelDays: { label: '', value: '' },
                    productDelDaysMulti: [],
                    delFreq: formik.values.productDelFreq.label
                });
            } else {
                e.preventDefault();
            }
        }
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

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
                                    {isEditShown && <Grid item xs={6} sx={{ justifyContent: 'flex-end' }}>
                                        <Button
                                            types="save"
                                            aria-label="edit"
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
                                        disabled={isDisabled}
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
                                        disabled={isDisabled}
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
                                        disabled={isDisabled}
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
                                    <SingleSelect
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
                                    <SingleSelect
                                        id='productDelFreq'
                                        name='productDelFreq'
                                        label='PRODUCT DELIVERY FREQUENCY'
                                        value={formik.values.productDelFreq}
                                        placeholder='Choose'
                                        items={deliveryFrequenciesItems}
                                        helperText={(formik.touched.productDelFreq && formik.errors.productDelFreq) ? formik.errors.productDelFreq.value : undefined}
                                        error={(formik.touched.productDelFreq && formik.errors.productDelFreq) ? true : false}
                                        onChange={handleProductDelFreq}
                                        isDisabled={lotData !== null}
                                        required
                                        onBlur={() => { formik.setFieldTouched("productDelFreq"); formik.validateField("productDelFreq"); }}
                                    />
                                </Grid>
                                <Grid item md={12} mt={3}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Order Schedule Delivery info (Max 10)
                                    </Typography>
                                </Grid>

                                <FieldArray
                                    name="orderScheduleDel"
                                    render={(arr) => (
                                        <React.Fragment>
                                            {formik.values.orderScheduleDel.map((orderSchObj, index) => (
                                                <>
                                                    <Grid item md={12} mt={1} mb={2}>
                                                        <Divider className="field-divider" />
                                                    </Grid>
                                                    <Grid container key={index}>
                                                        <Grid item md={3} pr={2.5} pb={2.5}>
                                                            <DatePickerInput
                                                                type="single-date"
                                                                label='FROM DATE'
                                                                required={formik.values.productDelFreq.value ? true : false}
                                                                name={`orderScheduleDel[${index}].fromDate`}
                                                                value={formik.values.orderScheduleDel[index].fromDate}
                                                                disabled={isOrderInputsDisabled(index)}
                                                                onChange={formik.setFieldValue}
                                                                onClose={() => { formik.setFieldTouched(`orderScheduleDel[${index}].fromDate`); formik.validateField(`orderScheduleDel[${index}].fromDate`); }}
                                                                id={`orderScheduleDel[${index}].fromDate`}
                                                                onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].fromDate`); formik.validateField(`orderScheduleDel[${index}].fromDate`); }}
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
                                                                label='TO DATE(OPTIONAL)'
                                                                id={`orderScheduleDel[${index}].toDate`}
                                                                name={`orderScheduleDel[${index}].toDate`}
                                                                value={formik.values.orderScheduleDel[index].toDate}
                                                                disabled={isOrderInputsDisabled(index)}
                                                                onChange={formik.setFieldValue}
                                                                onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].toDate`); formik.validateField(`orderScheduleDel[${index}].toDate`); }}
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
                                                        <Grid item xs={12} md={6} pl={2.5} pr={2.5} pb={2.5} className='deliveryDays'>
                                                            {['weekly', 'monthly'].includes(String(formik?.values?.productDelFreq?.label).toLowerCase()) ?
                                                                (<SingleSelect
                                                                    id={`orderScheduleDel[${index}].productDelDays`}
                                                                    label='SELECT DAY TO DELIVER PRODUCT'
                                                                    placeholder='Select Day'

                                                                    items={daysToDeliver(formik?.values?.productDelFreq?.label, daysOfWeek)}
                                                                    name={`orderScheduleDel[${index}].productDelDays`}
                                                                    value={formik.values.orderScheduleDel[index].productDelDays}
                                                                    isDisabled={isOrderInputsDisabled(index)}
                                                                    onChange={formik.setFieldValue}

                                                                    onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].productDelDays`); formik.validateField(`orderScheduleDel[${index}].productDelDays`); }}
                                                                    helperText={
                                                                        formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                            (formik.touched?.orderScheduleDel?.[index]?.productDelDays && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDays))
                                                                            ?
                                                                            (formik.errors.orderScheduleDel[index] as orderSchDel).productDelDays?.value : undefined
                                                                    }
                                                                    error={
                                                                        formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                            (formik.touched?.orderScheduleDel?.[index]?.productDelDays && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDays))
                                                                            ? true : false
                                                                    }
                                                                />) : (
                                                                    <MultiSelect
                                                                        id={`orderScheduleDel[${index}].productDelDaysMulti`}
                                                                        label='SELECT DAYS TO DELIVER PRODUCT'
                                                                        placeholder='Select Multiple Days'
                                                                        required={formik.values.productDelFreq.value ? true : false}
                                                                        items={daysToDeliver(formik?.values?.productDelFreq?.label, daysOfWeek)}
                                                                        name={`orderScheduleDel[${index}].productDelDaysMulti`}
                                                                        value={formik.values.orderScheduleDel[index].productDelDaysMulti}
                                                                        disabled={isOrderInputsDisabled(index)}
                                                                        onChange={formik.setFieldValue}
                                                                        onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].productDelDaysMulti`); formik.validateField(`orderScheduleDel[${index}].productDelDaysMulti`); }}
                                                                        helperText={
                                                                            formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                                (formik.touched?.orderScheduleDel?.[index]?.productDelDaysMulti && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDaysMulti))
                                                                                ?
                                                                                JSON.parse(JSON.stringify((formik.errors.orderScheduleDel[index] as orderSchDel).productDelDaysMulti)) : undefined

                                                                        }
                                                                        error={
                                                                            formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                                (formik.touched?.orderScheduleDel?.[index]?.productDelDaysMulti && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.productDelDaysMulti))
                                                                                ? true : false
                                                                        }
                                                                    />
                                                                )}
                                                            {index !== 0 && (
                                                                <DeleteIcon color='#D7252C' height={16} onClick={() => (!formik.values.orderScheduleDel[index].deliveryDayId) && deleteSchedule(index, arr)}
                                                                    className='deleteBtn' />
                                                            )}
                                                        </Grid>
                                                        <Grid item md={3} pr={2.5} pb={2.5}>
                                                            <TimePicker
                                                                label='START TIME'
                                                                id={`orderScheduleDel[${index}].startTime`}
                                                                name={`orderScheduleDel[${index}].startTime`}
                                                                value={formik.values.orderScheduleDel[index].startTime}
                                                                onChange={formik.setFieldValue}
                                                                required={formik.values.productDelFreq?.value ? true : false}
                                                                disabled={isOrderInputsDisabled(index)}
                                                                onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].startTime`); formik.validateField(`orderScheduleDel[${index}].startTime`); }}
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
                                                                required={formik.values.productDelFreq.value ? true : false}
                                                                disabled={isOrderInputsDisabled(index)}
                                                                onBlur={() => { formik.setFieldTouched(`orderScheduleDel[${index}].endTime`); formik.validateField(`orderScheduleDel[${index}].endTime`); }}
                                                                helperText={
                                                                    formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                        (formik.touched?.orderScheduleDel?.[index]?.endTime && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.endTime))
                                                                        ?
                                                                        (formik.errors.orderScheduleDel[index] as orderSchDel).endTime : undefined
                                                                }
                                                                error={
                                                                    formik?.errors?.orderScheduleDel && formik?.touched?.orderScheduleDel &&
                                                                        (formik.touched?.orderScheduleDel?.[index]?.endTime && ((formik.errors?.orderScheduleDel?.[index] as orderSchDel)?.endTime))
                                                                        ? true : false
                                                                }
                                                            />

                                                        </Grid>

                                                    </Grid>
                                                </>
                                            ))}
                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link data-testid="add-another-order"
                                                    variant="body2"
                                                    className={`add-link add-another-schedule ${isAddScheduleDisabled() && "add-link disabled-text-link"}`}
                                                    onClick={(e: any) => addSchedule(e, arr)}
                                                >
                                                    <span className="add-icon-span"><PlusIcon color={isAddScheduleDisabled() ? theme["--Secondary-Background"] : theme["--Primary"]} /></span>
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
                                                    className={`add-link add-another-schedule ${isLocationContactDisabled() && "add-link disabled-text-link"}`}
                                                    onClick={(event: any) => {
                                                        if (isLocationContactDisabled()) {
                                                            event.preventDefault();
                                                        } else {
                                                            if (formik.values.locationContact.length < 5) {
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <span className="add-icon-span">
                                                        <PlusIcon color={isLocationContactDisabled() ? theme["--Secondary-Background"] : theme["--Primary"]} />
                                                    </span>
                                                    <Typography variant="h3" component="h3" className={"fw-bold MuiTypography-h5-primary"} mb={1}>
                                                        Add Additional Contact
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                />

                                <Grid item md={12} mt={2} mb={4}>
                                    {isSavCancelShown && <Box className="form-action-section">
                                        <Button
                                            types="cancel"
                                            aria-label="cancel"
                                            className="mr-4 cancelBtnPL"
                                            onClick={onClickBack}
                                            disabled={isDisabled}
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label="save"
                                            className="ml-4 saveBtnPL"
                                            disabled={(!formik.isValid || !formik.dirty) || isDisabled}
                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>}
                                    <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => setAPIResponse(false)} message={formStatus.message} />
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