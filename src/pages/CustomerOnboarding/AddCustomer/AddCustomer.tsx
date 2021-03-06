import React, { useState, useEffect, useCallback } from 'react';
import { FileCopy } from '@material-ui/icons';
import { Box, Container, FormControl, FormControlLabel, FormGroup, Grid, IconButton, Link, Typography } from '@mui/material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useNavigate, useLocation } from 'react-router-dom';
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
import { EditIcon, PlusIcon, LoadingIcon } from '../../../assets/icons';
import "./AddCustomer.style.scss";
import { useAddedCustomerIdStore, useAddedCustomerNameStore, useShowConfirmationDialogBoxStore, useAddedCustomerPaymentTypeStore } from '../../../store';
import moment from 'moment';
import { maxContacts } from '../../../utils/constants';
import { formatFileSizeUnit, getCheckBoxDisabledByPaymentType, getUploadedBy, getUploadedIn } from '../../../utils/helperFunctions';
import FileUploadErrorDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import FileUploadComponent from '../../../components/UIComponents/FileUpload/FileUpload.component';

const initialValues = new CustomerModel();

function getTokenApplicable(Obj: any) {
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

export interface AddCustomerProps {
    version: string
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
        message: 'Customer Id already exist. Please use different Customer Id.',
        type: 'Error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
    fileuploadsuccess: {
        message: 'File Uploaded Successfully',
        type: 'Success'
    }
};

const maxAllowedFileSizeBtyes = 25000000;
const maxAllowedFileSizeMB = 25;


const deleteContact = (index: number, componentArr: any) => {
    componentArr.remove(index);
};


//common function to segregate the list of emergency contacts and ap contacts from get api response
const segregateEmergencyAndAPContacts = (data: any[], type: string) => {
    return data?.filter(obj => obj.customerContactTypeNm === type) || [];
};

//function to segragate checkbox data, from get api response, as per UI requirements
const getCheckBoxData = (data: any) => {
    return data?.map((obj: any) => obj.tokenApplicabilityOptionNm) || [];
};

const AddCustomer: React.FC<AddCustomerProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    const [initialFormikValue, setInitialFormikValue] = useState(initialValues);
    const [activeCustomerId, setActiveCustomerId] = React.useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    //to populate all the data in the form fields
    const populateDataInAllFields = (dataToPopulate: any) => {
        const customer = dataToPopulate?.data?.customer;
        const emergenyContactList = segregateEmergencyAndAPContacts(dataToPopulate?.data?.customerContact, 'emergency');
        const APContactList = segregateEmergencyAndAPContacts(dataToPopulate?.data?.customerContact, 'ap_contact');
        const checkBoxData = getCheckBoxData(dataToPopulate?.data?.tokenApplicability);

        setInitialFormikValue({
            customerName: customer?.companyNm,
            customerId: customer?.customerInputId,
            addressLine1: customer?.addressLine1,
            addressLine2: customer?.addressLine2,
            city: customer?.cityNm,
            state: customer?.stateNm,
            postalCode: customer?.postalCd,
            firstName: customer?.contactFirstNm,
            lastName: customer?.contactLastNm,
            email: customer?.contactEmailId,
            phoneNumber: customer?.contactPhoneNo,
            paymentType: { label: '' + customer?.PaymentType?.paymentTypeNm, value: '' + customer?.PaymentType?.paymentTypeId },

            invoiceFrequency: { label: '' + customer?.InvoiceFrequency?.invoiceFrequencyNm, value: '' + customer?.InvoiceFrequency?.invoiceFrequencyId },

            paymentTerm: customer?.paymentTerm,
            endDate: moment(dataToPopulate?.data?.customer.firstSettlementDt),
            emergencyContact: emergenyContactList.map(obj => ({
                customerContactId: obj.customerContactId,
                firstName: obj.contactFirstNm,
                lastName: obj.contactLastNm,
                email: obj.contactEmailId,
                phoneNumber: obj.contactPhoneNo,
            })),
            apContact: APContactList.map(obj => ({
                customerContactId: obj.customerContactId,
                firstName: obj.contactFirstNm,
                lastName: obj.contactLastNm,
                email: obj.contactEmailId,
                phoneNumber: obj.contactPhoneNo,
            })),
            ...(checkBoxData.map((obj: any) => {
                if (obj.indexOf("lot") > -1) {
                    return { lotLevel: true };
                } else if (obj.indexOf("business") > -1) {
                    return { businessLevel: true };
                } else {
                    return { vehicleLevel: true };
                }
            })),
        });
        setDisabled(true);
    };
    const { t } = useTranslation();
    const { theme } = useTheme();

    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    const onAddCustomerError = (err: any) => {
        const { data } = err?.response;
        setAPIResponse(true);
        setIsSubmitting(false);
        setFormStatus({ message: data?.error?.message || formStatusProps?.error?.message, type: 'Error' });
        formik.setSubmitting(false);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const onFileUploadError = (err: any) => {
        setIsSubmitting(false);
        const { data: { error } } = err.response;

        if (error?.httpCode === 409) {
            setShowConfirmationDialogBox(true);
        } else {
            setUploadErrMsg('Error found. Please delete and reupload the file');
        }
    };

    const onFileUploadSuccess = () => {
        setValidFiles([]);
        setAPIResponse(true);
        setSaveCancelShown(false);
        setFormStatus(formStatusProps.fileuploadsuccess);
        setIsSubmitting(false);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const onAddCustomerSuccess = (data: any) => {
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.success);
        setEditShown(true);
        setDisabled(true);
        setActiveCustomerId(data?.data?.customer?.customerId.toString());
        formik.resetForm({});
        if (validFiles.length) {
            uploadFile(false, data?.data?.customer);
        } else {
            setSaveCancelShown(false);
            setIsSubmitting(false);
        }
        setTimeout(() => {
            setAPIResponse(false);
            navigate(`/customer/viewCustomer/${data?.data?.customer?.customerId.toString()}`);
        }, 6000);
    };

    const onEditCustomerSuccess = (data: any) => {
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.editsuccess);
        setActiveCustomerId(data?.data?.customer?.customerId.toString());
        setEditShown(true);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
        setIsTrigger(!isTrigger);
        formik.resetForm({});
        if (validFiles.length) {
            uploadFile(false, data?.data?.customer);
        } else {
            setSaveCancelShown(false);
            setIsSubmitting(false);
        }
    };

    const onEditCustomerError = (err: any) => {
        const { data } = err?.response;
        setAPIResponse(true);
        setIsSubmitting(false);
        isFormValidated(false);
        setFormStatus({ message: data?.error?.message || formStatusProps?.error?.message, type: 'Error' });
        formik.setSubmitting(false);
        setEditShown(false);
        setSaveCancelShown(true);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const { mutate: uploadContractFiles } = useUploadContractFile(activeCustomerId, onFileUploadError, onFileUploadSuccess);
    const [validFiles, setValidFiles] = useState<File[]>([]);
    const [uploadErroMsg, setUploadErrMsg] = useState('');

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: Array<any>) => {
        if (acceptedFiles.length) {
            setUploadErrMsg('');
            setValidFiles(acceptedFiles);
        }
        if (rejectedFiles.length) {
            setUploadErrMsg(rejectedFiles[0].errors.map((err: { code: string, message: string }) => ({
                code: err.code, message: err.code === 'file-too-large' ? `File is larger than ${maxAllowedFileSizeMB} MB` : err.message
            }))[0].message);
        }
    }, []);


    const onGetCustomerSuccess = (data: any) => {
        if (data) {
            populateDataInAllFields(data);
            setActiveCustomerId(data?.data?.customer?.customerId.toString());
            setCustomerIdCreated(data?.data?.customer?.customerId);
            setPageCustomerName(data?.data?.customer?.companyNm);
            setPaymentType(data?.data?.customer?.PaymentType?.paymentTypeNm);
            setCustomerData(data?.data?.customer);
        }
    };

    const onGetCustomerError = () => {
        setEditShown(false);
        setSaveCancelShown(true);
    };

    const [isTrigger, setIsTrigger] = useState(false);
    const [paymentTypes, setpaymentTypes] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [initialInvoiceFrequencies, setinitialInvoiceFrequencies] = useState([]);
    const { mutate: addNewCustomer } = useCreateCustomer(onAddCustomerError, onAddCustomerSuccess);
    const { mutate: editCustomer } = useEditCustomer(location.pathname === 'customer/viewCustomer/' ? location.pathname.split("/").pop() as string : addedCustomerId as string, onEditCustomerSuccess, onEditCustomerError);
    const { data: frequencyList } = useGetFrequencies();
    const { data: paymentTypeList } = useGetPaymentTypes();
    useGetCustomerData(activeCustomerId, isTrigger, onGetCustomerSuccess, onGetCustomerError);
    const setCustomerIdCreated = useAddedCustomerIdStore((state) => state.setCustomerId);
    const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);
    const setPaymentType = useAddedCustomerPaymentTypeStore((state) => state.setCustomerPaymentType);

    useEffect(() => {
        setPaymentType('');
    }, [activeCustomerId]);

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

    const handleDeleteFileClick = () => {
        setValidFiles([]);
        setUploadErrMsg('');
    };

    const uploadFile = (isOverwriteFile: boolean = false, customer: (CustomerModel | any) = {}) => {
        setIsSubmitting(true);
        const formData = new FormData();
        const fileToUpload = validFiles[0];
        formData.append('customerFile', fileToUpload);
        formData.append('newCustomer', isEditMode ? 'n' : 'y');
        formData.append('countryCode', customer.countryCd);
        formData.append('companyNm', customer.companyNm);
        formData.append('fileOverwrite', isOverwriteFile ? 'y' : 'n');
        formData.append('uploadedBy', getUploadedBy());
        formData.append('uploadedIn', getUploadedIn(location.pathname));
        uploadContractFiles(formData);
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
        initialValues: initialFormikValue,
        validationSchema: AddCustomerValidationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            setIsSubmitting(true);
            if (isEditMode) {
                editCustomerData(values);
            } else {
                createNewCustomer(values);
            }
        },
    });

    const handleModelToggle = () => {
        setShowConfirmationDialogBox(false);
        setUploadErrMsg('Error found. Please delete and reupload the file');
    };

    const handleModelConfirm = () => {
        uploadFile(true, customerData);
        setShowConfirmationDialogBox(false);
    };

    const isFormFieldChange = () => formik.dirty || validFiles.length > 0 || uploadErroMsg !== "";

    function onClickBack() {
        if ((isFormFieldChange() && !isEditShown) || (isFormFieldChange() && isEditMode)) {
            showDialogBox(true);
        } else {
            navigate('/');
        }
    }

    // Enabling Cancel button 
    // const isCancelEnable = () => {
    //     return formik.dirty || validFiles.length > 0 || uploadErroMsg !== "";
    // };

    const isSubmitDisabled = () => {
        let buttonEnable = false;

        if (formik.dirty && formik.isValid && !formik.isSubmitting) {
            buttonEnable = true;
        }

        if (validFiles.length > 0
            && (
                (isEditMode && formik.isValid)
                || (formik.dirty && formik.isValid)
            )
        ) {
            buttonEnable = true;
        }


        if (uploadErroMsg) {
            buttonEnable = false;
        }
        return buttonEnable === false;
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

    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const isCheckBoxDisabled = () => getCheckBoxDisabledByPaymentType(formik.values.paymentType.label) || isEditMode ? true : isDisabled;

    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };
    const handlePaymentTypeChange = (fieldName: string, value: any) => {
        formik.setFieldValue(fieldName, value);
        if (getCheckBoxDisabledByPaymentType(value.label)) {
            formik.setFieldValue('lotLevel', false);
            formik.setFieldValue('businessLevel', false);
            formik.setFieldValue('vehicleLevel', false);
        }
    };

    return (
        <>
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container">
                    <FormikProvider value={formik}>
                        <form onSubmit={formik.handleSubmit} onBlur={handleFormDataChange}>
                            <Grid container>
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
                                        required
                                        {...formik.getFieldProps('city')}
                                        disabled={isDisabled}
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
                                        required
                                        {...formik.getFieldProps('state')}
                                        disabled={isDisabled}
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
                                        required
                                        {...formik.getFieldProps('postalCode')}
                                        disabled={isDisabled}
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
                                        onChange={handlePaymentTypeChange}
                                        onBlur={() => { formik.setFieldTouched("paymentType"); formik.validateField("paymentType"); }}
                                        required
                                        isDisabled={isEditMode ? true : isDisabled}
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
                                        onBlur={() => { formik.setFieldTouched("endDate"); formik.validateField("endDate"); }}
                                        required
                                        disabled={isEditMode ? true : isDisabled}
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
                                        isDisabled={isEditMode ? true : isDisabled}
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
                                        disabled={isDisabled}
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <FormControl sx={{ m: 3 }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                className="checkbox-field"
                                                control={
                                                    <Checkbox checked={formik.values.lotLevel} onChange={formik.handleChange} name="lotLevel" disabled={isCheckBoxDisabled()} />
                                                }
                                                label={
                                                    <Typography color={isCheckBoxDisabled() ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                                        Apply at Lot level
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                className="checkbox-field"
                                                control={
                                                    <Checkbox checked={formik.values.businessLevel} onChange={formik.handleChange} name="businessLevel" disabled={isCheckBoxDisabled()} />
                                                }
                                                label={
                                                    <Typography color={isCheckBoxDisabled() ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
                                                        Apply at Busines level
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                className="checkbox-field"
                                                control={
                                                    <Checkbox checked={formik.values.vehicleLevel} onChange={formik.handleChange} name="vehicleLevel" disabled={isCheckBoxDisabled()} />
                                                }
                                                label={
                                                    <Typography color={isCheckBoxDisabled() ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
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
                                                <React.Fragment key={`em${index}`}>
                                                    <Grid container item xs={11} md={11}>
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
                                                                required
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
                                                    <Grid container item xs={1} md={1}>
                                                        <div className='deleteBtn'>
                                                            {index !== 0 && (
                                                                <DeleteIcon color='#D7252C' height={16} onClick={() => (!formik.values.emergencyContact[index].customerContactId) && deleteContact(index, arrayHelpers)} />
                                                            )}
                                                        </div>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}

                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    className={isDisabled ? "disabled-text-link" : "add-link"}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={(event) => {
                                                        if (isDisabled) {
                                                            event.preventDefault();
                                                        } else {
                                                            if (formik.values.emergencyContact.length < maxContacts) {
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <span className="add-icon-span">
                                                        <PlusIcon color={isDisabled ? theme["--Secondary-Background"] : theme["--Primary"]} />
                                                    </span>
                                                    <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary disabled-text" mb={1}>
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
                                                <React.Fragment key={`ap${index}`}>
                                                    <Grid container item xs={11} md={11}>
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
                                                                required
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
                                                    <Grid container item xs={1} md={1}>
                                                        <div className='deleteBtn'>
                                                            {index !== 0 && (
                                                                <DeleteIcon color='#D7252C' height={16} onClick={() => ((!formik.values.apContact[index].customerContactId) && deleteContact(index, arrayHelpers))} />
                                                            )}
                                                        </div>
                                                    </Grid>
                                                </React.Fragment>
                                            ))}

                                            <Grid item md={12} mt={2} mb={4}>
                                                <Link
                                                    variant="body2"
                                                    className={isDisabled ? "disabled-text-link" : "add-link"}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        width: "fit-content",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={(event) => {
                                                        if (isDisabled) {
                                                            event.preventDefault();
                                                        } else {
                                                            if (formik.values.apContact.length < maxContacts) {
                                                                arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                            }
                                                        }
                                                    }}
                                                >
                                                    <span className="add-icon-span">
                                                        <PlusIcon color={isDisabled ? theme["--Secondary-Background"] : theme["--Primary"]} />
                                                    </span>
                                                    <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary disabled-text" mb={1}>
                                                        ADD AP CONTACT
                                                    </Typography>
                                                </Link>
                                            </Grid>
                                        </React.Fragment>
                                    )}
                                />

                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Import Contract (Optional) <span className="fw-normal">(File format: PDF, XLSX or DOCX/ Max File size 25MB)</span>
                                    </Typography>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Box className="import-file">
                                        <div className="import-text">
                                            <>
                                                {validFiles.length === 0 ? <FileUploadIcon /> : <FileCopy />}
                                                <Typography variant="h4" component="h4" display={"inline-flex"} className="fw-bold pl-3" mb={1}>
                                                    {validFiles.length === 0 ? 'Import Contract' : `${validFiles[0].name}  ${formatFileSizeUnit(validFiles[0].size)}`}
                                                </Typography>
                                            </>
                                        </div>
                                        {uploadErroMsg ? <span className='import-error fw-bold'>{uploadErroMsg}</span> : ''}
                                        <div>
                                            {
                                                validFiles.length ? (
                                                    <IconButton onClick={handleDeleteFileClick}>
                                                        <DeleteIcon color={'var(--ToastMessageRed)'} />
                                                    </IconButton>
                                                ) : (
                                                    <FileUploadComponent
                                                        onDrop={onDrop}
                                                        acceptedFiles='.pdf,.docx,.xlsx'
                                                        maxFiles={1}
                                                        maxSizeinBytes={maxAllowedFileSizeBtyes}
                                                        disabled={isDisabled}
                                                        multiple={false}
                                                    >
                                                        <Button
                                                            types="browse"
                                                            aria-label="browse"
                                                            className="mr-4"
                                                            disabled={isDisabled}
                                                        >
                                                            {t("buttons.browse")}
                                                        </Button>
                                                    </FileUploadComponent>
                                                )
                                            }
                                        </div>
                                    </Box>
                                </Grid>
                                <Grid item md={12} mt={2} mb={4}>
                                    {isSavCancelShown && <Box className="form-action-section">
                                        <Button
                                            types="cancel"
                                            aria-label="cancel"
                                            className="mr-4"
                                            onClick={onClickBack}
                                            disabled={isSubmitting}
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label="save"
                                            className="ml-4"
                                            disabled={isSubmitDisabled() || isSubmitting}
                                        >
                                            {isSubmitting && <LoadingIcon data-testid="loading-spinner" className='loading_save_icon' />} {t("buttons.save")}
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
                cancelBtnTitle='No'
                discardBtnTitle='Yes'
            />
        </>
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;