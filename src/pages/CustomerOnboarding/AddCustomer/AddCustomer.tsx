/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useState, useEffect, useCallback } from 'react';
import { Add, FileCopy } from '@material-ui/icons';
import { Box, Container, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Link, Typography } from '@mui/material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { DeleteIcon, FileUploadIcon } from '../../../assets/icons';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';
import { DatePickerInput } from '../../../components/UIComponents/DatePickerInput/DatePickerInput.component';
import Input from '../../../components/UIComponents/Input/Input';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { getCountryCode } from '../../../navigation/utils';
import CustomerModel, { AddCustomerForm, EmergencyContact } from '../../../models/CustomerModel';
import AddCustomerValidationSchema from './validation';
import { useCreateCustomer, useEditCustomer, useGetCustomerData, useGetFrequencies, useGetPaymentTypes, useUploadContractFile } from './queries';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import { EditIcon } from '../../../assets/icons';
import "./AddCustomer.style.scss";
import { useAddedCustomerIdStore, useAddedCustomerNameStore, useShowConfirmationDialogBoxStore } from '../../../store';
import moment from 'moment';
import { maxContacts } from '../../../utils/constants';
import { formatFileSizeUnit } from '../../../utils/helperFunctions';
import FileUploadErrorDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';

const initialValues = new CustomerModel();

function getTokenApplicable (Obj: any) {
    const temp: any = [];
    Object.entries(Obj).forEach(obj => {
        if (obj[1]) {
            temp.push(obj[0]).toString();
        }
    });
    return temp;
}
interface IFormStatus {
    message: string
    type: string
}
interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    editsuccess: {
        message: 'Data updated successfully',
        type: 'Success',
    },
    success: {
        message: 'Signed up successfully.',
        type: 'Success',
    },
    duplicate: {
        message: 'Email-id already exist. Please use different email-id.',
        type: 'Error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
    fileuploadsuccess:{
        message: 'File Uploaded Successfully',
        type: 'Success'
    }
};

const AddCustomer: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);

    useEffect(() => {
        const selectedCustomerId = location.pathname.split("/").pop();
        if (selectedCustomerId != "addCustomer") {
            setActiveCustomerId("" + selectedCustomerId);
            setDisabled(true);
            setSaveCancelShown(false);
        } else {
            setEditShown(false);
            setSaveCancelShown(true);
        }
    }, [location]);

    //common function to segregate the list of emergency contacts and ap contacts from get api response
    const segregateEmergencyAndAPContacts = (data: any, type: string) => {
        const TempData: any = [];
        data.map((obj: any) => {
            if (obj.customerContactTypeNm === type) {
                TempData.push(obj);
            }
        });
        return TempData;
    };

    const getCheckBoxData = (data: any) => {
        const TempData: any = [];
        data.map((obj: any) => {
            TempData.push(obj.tokenApplicabilityOptionNm);
        });
        return TempData;
    };

    //to populate all the data in the form fields
    const populateDataInAllFields = (dataToPopulate: any) => {
        formik.setFieldValue('customerName', dataToPopulate?.data?.customer?.companyNm);
        formik.setFieldValue('customerId', dataToPopulate?.data?.customer?.customerInputId);
        formik.setFieldValue('addressLine1', dataToPopulate?.data?.customer?.addressLine1);
        formik.setFieldValue('addressLine2', dataToPopulate?.data?.customer?.addressLine2);
        formik.setFieldValue('city', dataToPopulate?.data?.customer?.cityNm);
        formik.setFieldValue('state', dataToPopulate?.data?.customer?.stateNm);
        formik.setFieldValue('postalCode', dataToPopulate?.data?.customer?.postalCd);
        formik.setFieldValue('firstName', dataToPopulate?.data?.customer?.contactFirstNm);
        formik.setFieldValue('lastName', dataToPopulate?.data?.customer?.contactLastNm);
        formik.setFieldValue('email', dataToPopulate?.data?.customer?.contactEmailId);
        formik.setFieldValue('phoneNumber', dataToPopulate?.data?.customer?.contactPhoneNo);
        formik.setFieldValue("paymentType", { label: '' + dataToPopulate?.data?.customer?.PaymentType?.paymentTypeNm, value: '' + dataToPopulate?.data?.customer?.PaymentType?.paymentTypeId });
        formik.setFieldValue("invoiceFrequency", { label: '' + dataToPopulate?.data?.customer?.InvoiceFrequency?.invoiceFrequencyNm, value: '' + dataToPopulate?.data?.customer?.InvoiceFrequency?.invoiceFrequencyId });
        formik.setFieldValue("paymentTerm", dataToPopulate?.data?.customer?.paymentTerm);
        const emergenyContactList = segregateEmergencyAndAPContacts(dataToPopulate?.data?.customerContact, 'emergency');
        const APContactList = segregateEmergencyAndAPContacts(dataToPopulate?.data?.customerContact, 'ap_contact');
        const checkBoxData = getCheckBoxData(dataToPopulate?.data?.tokenApplicability);
        emergenyContactList.map((obj: any, index: number) => {
            formik.setFieldValue(`emergencyContact[${index}].customerContactId`, obj.customerContactId);
            formik.setFieldValue(`emergencyContact[${index}].firstName`, obj.contactFirstNm);
            formik.setFieldValue(`emergencyContact[${index}].lastName`, obj.contactLastNm);
            formik.setFieldValue(`emergencyContact[${index}].email`, obj.contactEmailId);
            formik.setFieldValue(`emergencyContact[${index}].phoneNumber`, obj.contactPhoneNo);
        });
        APContactList.map((obj: any, index: number) => {
            formik.setFieldValue(`apContact[${index}].customerContactId`, obj.customerContactId);
            formik.setFieldValue(`apContact[${index}].firstName`, obj.contactFirstNm);
            formik.setFieldValue(`apContact[${index}].lastName`, obj.contactLastNm);
            formik.setFieldValue(`apContact[${index}].email`, obj.contactEmailId);
            formik.setFieldValue(`apContact[${index}].phoneNumber`, obj.contactPhoneNo);
        });
        formik.setFieldValue("endDate", moment(dataToPopulate?.data?.customer.firstSettlementDt));
        checkBoxData.map((obj: any) => {
            if (obj.indexOf("lot")) {
                formik.setFieldValue('lotLevel', true);
            } else if (obj.indexOf("business")) {
                formik.setFieldValue('businessLevel', true);
            } else {
                formik.setFieldValue('vehicleLevel', true);
            }
        });
        setDisabled(true);
    };
    const { t } = useTranslation();
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });
    const [activeCustomerId, setActiveCustomerId] = React.useState("");
    const [isTrigger, setIsTrigger] = useState(false);
    const [paymentTypes, setpaymentTypes] = useState([]);
    const [initialInvoiceFrequencies, setinitialInvoiceFrequencies] = useState([]);
    const { data: savedCustomerData, mutate: addNewCustomer, isSuccess, isError } = useCreateCustomer();
    const { data: editedCustomerData, mutate: editCustomer, isSuccess: isEditSuccess, isError: isEditError } = useEditCustomer(location.pathname === 'customer/viewCustomer/' ? location.pathname.split("/").pop() as string : addedCustomerId as string);
    const { data: frequencyList } = useGetFrequencies();
    const { data: paymentTypeList } = useGetPaymentTypes();
    const { data: customerData, isSuccess: isGetSuccess, isError: isGetError } = useGetCustomerData(activeCustomerId, isTrigger);
    const setCustomerIdCreated = useAddedCustomerIdStore((state) => state.setCustomerId);
    const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);

    const {mutate:uploadContractFiles, isSuccess:uploadSuccess, isError:uploadError} = useUploadContractFile(activeCustomerId);
    const [validFiles,setValidFiles] = useState<FileWithPath[]>([]);
    const [uploadErroMsg,setUploadErrMsg] = useState('');
    
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        if (acceptedFiles.length) {
            setUploadErrMsg('');
            setValidFiles(acceptedFiles);
        }
    }, []);

    const {getRootProps, getInputProps, fileRejections,} = useDropzone({
        onDrop,
        accept:'.pdf,.doc,.docx',
        maxFiles:1,
        maxSize:25000000
    });
    
    useEffect(() => {
        if (fileRejections.length > 0) {
            setUploadErrMsg(fileRejections[0].errors[0].message);
        }
    }, [fileRejections]);

    useEffect(()=> {
        if(validFiles.length){
            uploadFile();
        }
    }, [activeCustomerId]);

    useEffect(()=>{
        if(uploadSuccess){
            setValidFiles([]);
            setAPIResponse(true);
            setFormStatus(formStatusProps.fileuploadsuccess);
        }
        if(uploadError){
            setShowConfirmationDialogBox(true);            
            setUploadErrMsg('Error found. Please delete and reupload the file');
        }
    },[uploadSuccess, uploadError]);      

    useEffect(() => {
        if (isSuccess) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.success);
            setEditShown(true);
            setSaveCancelShown(false);
            setActiveCustomerId(savedCustomerData?.data?.customer?.customerId.toString());
        }
        if (isError) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.error);
            setSaveCancelShown(false);
        }
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        formik.resetForm({});

    }, [savedCustomerData, isSuccess, isError]);

    useEffect(() => {
        if (isEditSuccess) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.editsuccess);
            setActiveCustomerId(editedCustomerData?.data?.customer?.customerId.toString());
            setIsTrigger(true);
            setEditShown(true);
            setSaveCancelShown(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
            uploadFile();
        }
        if (isEditError) {
            setAPIResponse(true);
            setFormStatus(formStatusProps.error);
            setSaveCancelShown(false);
        }
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        formik.resetForm({});
    }, [editedCustomerData, isEditSuccess as boolean, isEditError as boolean]);

    useEffect(() => {
        if (isGetSuccess) {
            populateDataInAllFields(customerData);
            setCustomerIdCreated(customerData?.data?.customer?.customerId);
            setPageCustomerName(customerData?.data?.customer?.companyNm);
        }
        if (isGetError) {
            console.log("Error in getting data");
        }
    }, [customerData, isGetSuccess, isGetError]);   

    useEffect(() => {
        if (frequencyList?.data.length) {
            setinitialInvoiceFrequencies(frequencyList.data.map((obj: any) => ({ label: obj.invoiceFrequencyNm.trim(), value: obj.invoiceFrequencyId.trim() })));
        }
    }, [frequencyList]);

    useEffect(() => {
        if (paymentTypeList?.data.length) {
            setpaymentTypes(paymentTypeList.data.map((obj: any) => ({ label: obj.paymentTypeNm.trim(), value: obj.paymentTypeId.trim() })));
        }
    }, [paymentTypeList]);

    const [apiResposneState, setAPIResponse] = useState(false);


    const [isDisabled, setDisabled] = useState(false);

    const [isEditMode, setEditMode] = useState(false);

    const [isEditShown, setEditShown] = useState(true);

    const [isSavCancelShown, setSaveCancelShown] = useState(true);
    const [showConfirmationDialogBox, setShowConfirmationDialogBox] = useState(false);

    const handleEditButtonClick = () => {
        setEditMode(true);
        setSaveCancelShown(true);
        setDisabled(false);
    };

    const handleDeleteFileClick = () =>{
        setValidFiles([]);
        setUploadErrMsg('');
    };

    const uploadFile = (isOverwriteFile: boolean = false) => {

        if (validFiles.length) {
            let customer;
            if(isEditMode){
                customer = customerData.data.customer;
            }else{
                customer = savedCustomerData.data.customer;
            }
            const formData = new FormData();
            const fileToUpload = validFiles[0];
            formData.append('customerFile', fileToUpload);
            formData.append('newCustomer', isEditMode ? 'n' : 'y');
            formData.append('countryCode', customer.countryCd);
            formData.append('companyNm', customer.companyNm);
            formData.append('fileOverwrite', isOverwriteFile ? 'y' : 'n');
            uploadContractFiles(formData);
        }        
    };

    const editCustomerData = async (data: AddCustomerForm) => {
        try {
            const apiPayload = {
                "customerName": data.customerName,
                "customerInputId": data.customerId,
                "addressLine1": data.addressLine1,
                "addressLine2": data.addressLine2,
                "addressLine3": "",
                "cityNm": data.city,
                "stateNm": data.state,
                "postalCd": Number(data.postalCode),
                "contactFirstNm": data.firstName,
                "contactLastNm": data.lastName,
                "contactEmailId": data.email,
                "contactPhoneNo": data.phoneNumber,
                "paymentTypeId": data.paymentType.value,
                "customerTypeId": "f6f0ec11-cd88-455d-9158-8ade75ddfb3b",
                "invoiceFrequencyId": data.invoiceFrequency.value,
                "firstSettlementDt": data.endDate,
                "paymentTerm": Number(data.paymentTerm),
                "countryCd": getCountryCode(),
                "soldToNo": 10,
                "emergencyContact": data.emergencyContact.map(emgcyObj => ({
                    ...(emgcyObj.customerContactId && { "customerContactId": emgcyObj.customerContactId }),
                    "firstNm": emgcyObj.firstName,
                    "lastNm": emgcyObj.lastName,
                    "email": emgcyObj.email,
                    "phoneNo": emgcyObj.phoneNumber
                })),
                "apContact": data.apContact.map(apObj => ({
                    ...(apObj.customerContactId && { "customerContactId": apObj.customerContactId }),
                    "firstNm": apObj.firstName,
                    "lastNm": apObj.lastName,
                    "email": apObj.email,
                    "phoneNo": apObj.phoneNumber
                })),
                "tokenApplicabilityLevel": getTokenApplicable({
                    lot: data.lotLevel, business: data.businessLevel, vehicle: data.vehicleLevel
                })
            };
            editCustomer(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const createNewCustomer = async (form: AddCustomerForm) => {
        try {
            const apiPayload = {
                "customerName": form.customerName,
                "customerInputId": form.customerId,
                "addressLine1": form.addressLine1,
                "addressLine2": form.addressLine2,
                "addressLine3": "",
                "cityNm": form.city,
                "stateNm": form.state,
                "postalCd": Number(form.postalCode),
                "contactFirstNm": form.firstName,
                "contactLastNm": form.lastName,
                "contactEmailId": form.email,
                "contactPhoneNo": form.phoneNumber,
                "paymentTypeId": form.paymentType.value,
                "customerTypeId": "f6f0ec11-cd88-455d-9158-8ade75ddfb3b",
                "invoiceFrequencyId": form.invoiceFrequency.value,
                "firstSettlementDt": form.endDate,
                "paymentTerm": Number(form.paymentTerm),
                "countryCd": getCountryCode(),
                "soldToNo": 10,
                "emergencyContact": form.emergencyContact.map(emgcyObj => ({
                    "firstNm": emgcyObj.firstName,
                    "lastNm": emgcyObj.lastName,
                    "email": emgcyObj.email,
                    "phoneNo": emgcyObj.phoneNumber
                })),
                "apContact": form.apContact.map(apObj => ({
                    "firstNm": apObj.firstName,
                    "lastNm": apObj.lastName,
                    "email": apObj.email,
                    "phoneNo": apObj.phoneNumber
                })),
                "tokenApplicabilityLevel": getTokenApplicable({
                    lot: form.lotLevel, business: form.businessLevel, vehicle: form.vehicleLevel
                })
            };
            addNewCustomer(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: AddCustomerValidationSchema,
        onSubmit: (values) => {
            if (isEditMode) {
                editCustomerData(values);
            } else {
                createNewCustomer(values);
            }
        },
        enableReinitialize: true,
    });

    const handleModelToggle = () => {
        setShowConfirmationDialogBox(false);
    };

    const handleModelConfirm = () => {
        uploadFile(true);
        setShowConfirmationDialogBox(false);
        setUploadErrMsg('');
    };

    const isFormFieldChange = () => formik.dirty;

    function onClickBack () {
        if (isFormFieldChange()) {
            //handleModelToggle();
            showDialogBox(true);
        } else {
            history.push('/');
        }
    }

    const disableButton = () => {
        if (isEditMode) {
            if (formik.touched && Object.keys(formik.touched).length === 0 && Object.getPrototypeOf(formik.touched) === Object.prototype) {
                if (formik.dirty) {
                    if (formik.initialValues != formik.values) {
                        return false;
                    }
                }
            } else {
                return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
            }
        } else {
            return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
        }
    };

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

    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);

    const handleFormDataChange = () => {
        if(isEditMode) {
            if (formik.touched && Object.keys(formik.touched).length === 0 && Object.getPrototypeOf(formik.touched) === Object.prototype) {
                if (formik.dirty) {
                    if (formik.initialValues != formik.values) {
                        isFormValidated(false);
                    }
                }
            }
        } else if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };
    return (
        <>
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container">
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange}>
                            <Grid container xs={12}>
                                <Grid item xs={10} md={10}>
                                    <Typography variant="h3" component="h3" gutterBottom className="fw-bold" mb={1} >
                                        Customer Profile
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} md={2} >
                                    {isEditShown && <Button
                                        types="edit"
                                        aria-label="edit"
                                        onClick={handleEditButtonClick}
                                        className="right-float"
                                        startIcon={<EditIcon />}>
                                        {t("buttons.edit")}
                                    </Button>}
                                </Grid>
                            </Grid>
                            <Grid container mt={1}>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                        General Information
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='customerName'
                                        label='Customer Name'
                                        type='text'
                                        helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                        error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('customerName')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='customerId'
                                        label='Customer ID'
                                        type='text'
                                        helperText={(formik.touched.customerId && formik.errors.customerId) ? formik.errors.customerId : undefined}
                                        error={(formik.touched.customerId && formik.errors.customerId) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('customerId')}
                                        disabled={isDisabled}
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
                                        {...formik.getFieldProps('addressLine2')}
                                        disabled={isDisabled}
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
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                        Customer Contact
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='firstName'
                                        label='First Name'
                                        type='text'
                                        helperText={(formik.touched.firstName && formik.errors.firstName) ? formik.errors.firstName : undefined}
                                        error={(formik.touched.firstName && formik.errors.firstName) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('firstName')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id="lastName"
                                        label='Last Name'
                                        type='text'
                                        helperText={(formik.touched.lastName && formik.errors.lastName) ? formik.errors.lastName : undefined}
                                        error={(formik.touched.lastName && formik.errors.lastName) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('lastName')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='email'
                                        label='Email'
                                        helperText={(formik.touched.email && formik.errors.email) ? formik.errors.email : undefined}
                                        error={(formik.touched.email && formik.errors.email) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('email')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='phoneNumber'
                                        label='Phone Number'
                                        type='text'
                                        helperText={(formik.touched.phoneNumber && formik.errors.phoneNumber) ? formik.errors.phoneNumber : undefined}
                                        error={(formik.touched.phoneNumber && formik.errors.phoneNumber) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('phoneNumber')}
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                        Payment and Wallet rules
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='paymentType'
                                        name='paymentType'
                                        label='PAYMENT TYPE'
                                        value={formik.values.paymentType}
                                        placeholder='Choose'
                                        items={paymentTypes}
                                        helperText={(formik.touched.paymentType && formik.errors.paymentType) ? formik.errors.paymentType.value : undefined}
                                        error={(formik.touched.paymentType && formik.errors.paymentType) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("paymentType"); formik.validateField("paymentType"); }}
                                        required
                                        isDisabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <DatePickerInput
                                        type="single-date"
                                        id="endDate"
                                        name="endDate"
                                        value={formik.values.endDate}
                                        placeholder="Select Date"
                                        label='START DATE FOR CUSTOMER'
                                        onChange={formik.setFieldValue}
                                        onClose={() => { formik.setFieldTouched("endDate"); formik.validateField("endDate"); }}
                                        disableBeforeDate={formik.values.startDate}
                                        helperText={(formik.touched.endDate && formik.errors.endDate) ? formik.errors.endDate : undefined}
                                        error={(formik.touched.endDate && formik.errors.endDate) ? true : false}
                                        required
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='invoiceFrequency'
                                        name='invoiceFrequency'
                                        label='INVOICE FREQUENCY'
                                        value={formik.values.invoiceFrequency}
                                        placeholder='Choose'
                                        items={initialInvoiceFrequencies}
                                        helperText={(formik.touched.invoiceFrequency && formik.errors.invoiceFrequency) ? formik.errors.invoiceFrequency.value : undefined}
                                        error={(formik.touched.invoiceFrequency && formik.errors.invoiceFrequency) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("invoiceFrequency"); formik.validateField("invoiceFrequency"); }}
                                        required
                                        isDisabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='paymentTerm'
                                        label='PAYMENT TERM'
                                        type='text'
                                        helperText={(formik.touched.paymentTerm && formik.errors.paymentTerm) ? formik.errors.paymentTerm : undefined}
                                        error={(formik.touched.paymentTerm && formik.errors.paymentTerm) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('paymentTerm')}
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <FormControl sx={{ m: 3 }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                className="checkbox-field"
                                                control={
                                                    <Checkbox checked={formik.values.lotLevel} onChange={formik.handleChange} name="lotLevel" disabled={isDisabled} />
                                                }
                                                label={
                                                    <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                        Apply at Lot level
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                className="checkbox-field"
                                                control={
                                                    <Checkbox checked={formik.values.businessLevel} onChange={formik.handleChange} name="businessLevel" disabled={isDisabled} />
                                                }
                                                label={
                                                    <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                        Apply at Busines level
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                className="checkbox-field"
                                                control={
                                                    <Checkbox checked={formik.values.vehicleLevel} onChange={formik.handleChange} name="vehicleLevel" disabled={isDisabled} />
                                                }
                                                label={
                                                    <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                        Apply at Vehicle level
                                                    </Typography>
                                                }
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                        Emergency Contact (Max {maxContacts})
                                    </Typography>
                                </Grid>
                                <FieldArray
                                    name="emergencyContact"
                                    render={(arrayHelpers) => (
                                        <React.Fragment>
                                            {formik.values.emergencyContact.map((contactList, index) => (
                                                <Grid container key={index}>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`emergencyContact[${index}].firstName`}
                                                            label='First Name'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.firstName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.firstName))
                                                                    ?
                                                                    (formik.errors.emergencyContact[index] as EmergencyContact).firstName : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.firstName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.firstName))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`emergencyContact[${index}].firstName`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`emergencyContact[${index}].lastName`}
                                                            label='Last Name'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.lastName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.lastName))
                                                                    ?
                                                                    (formik.errors.emergencyContact[index] as EmergencyContact).lastName : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.lastName && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.lastName))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`emergencyContact[${index}].lastName`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`emergencyContact[${index}].email`}
                                                            label='Email'
                                                            type="text"
                                                            helperText={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.email && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.email))
                                                                    ?
                                                                    (formik.errors.emergencyContact[index] as EmergencyContact).email : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.email && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.email))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`emergencyContact[${index}].email`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`emergencyContact[${index}].phoneNumber`}
                                                            label='Phone Number'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.phoneNumber && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                    ?
                                                                    (formik.errors.emergencyContact[index] as EmergencyContact).phoneNumber : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.emergencyContact && formik?.touched?.emergencyContact &&
                                                                    (formik.touched?.emergencyContact?.[index]?.phoneNumber && ((formik.errors?.emergencyContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            {...formik.getFieldProps(`emergencyContact[${index}].phoneNumber`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}

                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: "var(--Primary)",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        if (formik.values.emergencyContact.length < maxContacts) {
                                                            arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                        }
                                                    }}
                                                >
                                                    <Add />
                                                    <Typography variant="h3" className="fw-bold" mb={1}>
                                                        ADD EMERGENCY CONTACT
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                />

                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                        AP Contact (Max {maxContacts})
                                    </Typography>
                                </Grid>
                                <FieldArray
                                    name="apContact"
                                    render={(arrayHelpers) => (
                                        <React.Fragment>
                                            {formik.values.apContact.map((apContactList, index) => (
                                                <Grid container key={index}>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`apContact[${index}].firstName`}
                                                            label='First Name'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.firstName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.firstName))
                                                                    ?
                                                                    (formik.errors.apContact[index] as EmergencyContact).firstName : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.firstName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.firstName))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`apContact[${index}].firstName`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`apContact[${index}].lastName`}
                                                            label='Last Name'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.lastName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.lastName))
                                                                    ?
                                                                    (formik.errors.apContact[index] as EmergencyContact).lastName : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.lastName && ((formik.errors?.apContact?.[index] as EmergencyContact)?.lastName))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`apContact[${index}].lastName`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`apContact[${index}].email`}
                                                            label='Email'
                                                            type="text"
                                                            helperText={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.email && ((formik.errors?.apContact?.[index] as EmergencyContact)?.email))
                                                                    ?
                                                                    (formik.errors.apContact[index] as EmergencyContact).email : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.email && ((formik.errors?.apContact?.[index] as EmergencyContact)?.email))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`apContact[${index}].email`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`apContact[${index}].phoneNumber`}
                                                            label='Phone Number'
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.phoneNumber && ((formik.errors?.apContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                    ?
                                                                    (formik.errors.apContact[index] as EmergencyContact).phoneNumber : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.apContact && formik?.touched?.apContact &&
                                                                    (formik.touched?.apContact?.[index]?.phoneNumber && ((formik.errors?.apContact?.[index] as EmergencyContact)?.phoneNumber))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            {...formik.getFieldProps(`apContact[${index}].phoneNumber`)}
                                                            disabled={isDisabled}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            ))}

                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        color: "var(--Primary)",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        if (formik.values.apContact.length < maxContacts) {
                                                            arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                        }
                                                    }}
                                                >
                                                    <Add />
                                                    <Typography variant="h3" className="fw-bold" mb={1}>
                                                        ADD AP CONTACT
                                                    </Typography>
                                                </Link>
                                            </Grid>

                                        </React.Fragment>
                                    )}
                                />

                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Import Contract (Optional) (File format:PDF or DOC/ Max File size 25MB)
                                    </Typography>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Box className="import-file">
                                        <div className="import-text">
                                            {validFiles.length === 0 ?
                                                <>
                                                    <FileUploadIcon />
                                                    <Typography variant="h4" component="h4" display={"inline-flex"} className="fw-bold pl-3" mb={1}>
                                                        Import Contract
                                                    </Typography>
                                                </>
                                                : 
                                                <>
                                                    <FileCopy />
                                                    <Typography variant="h4" component="h4" display={"inline-flex"} className="fw-bold pl-3" mb={1}>
                                                       {validFiles[0].name}  {formatFileSizeUnit(validFiles[0].size)}
                                                    </Typography>
                                                </>
                                            }
                                        </div>
                                        {uploadErroMsg ? <span className='import-error fw-bold'>{uploadErroMsg}</span> : ''}
                                        <div>
                                            {
                                                validFiles.length ? (
                                                    <IconButton onClick={handleDeleteFileClick}>
                                                        <DeleteIcon color={'var(--ToastMessageRed)'}/>
                                                    </IconButton>
                                                ) : (
                                                    <Button
                                                        types="browse"
                                                        aria-label="browse"
                                                        className="mr-4"
                                                    >
                                                        <div {...getRootProps()}>
                                                            <input {...getInputProps()} />
                                                            {t("buttons.browse")}
                                                        </div>
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    {isSavCancelShown && <Box className="form-action-section">
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
                                            disabled={disableButton()}

                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>}
                                    <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
                                </Grid>
                            </Grid>
                        </form>
                    </FormikProvider>
                </Container>
            </Grid>
            <FileUploadErrorDialog
                title={t("customerManagement.fileuploaddialog.title")}
                content={t("customerManagement.fileuploaddialog.content")}
                open={showConfirmationDialogBox}
                handleToggle={handleModelToggle}
                handleConfirm={handleModelConfirm}
            />
        </>
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;