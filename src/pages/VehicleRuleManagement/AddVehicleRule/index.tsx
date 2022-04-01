import { Box, Container, Grid, Typography, Icon } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MultiSelect from '../../../components/UIComponents/Select/MultiSelect';
import { VehicleRule as vehicleRuleType, initialFormValuesVehicleRule }  from '../../../models/VehicleRuleModel';
import AutocompleteInput from '../../../components/UIComponents/GoogleAddressComponent/GoogleAutoCompleteAddress';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import Input from '../../../components/UIComponents/Input/Input';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import { useAddVehicleRule, useEditVehicleRule, useGetVehicleRule } from './queries';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import { HorizontalBarVersionState, useStore, useShowConfirmationDialogBoxStore } from '../../../store';
import { useGetProductList } from '../../ProductManagementLanding/queries';
import { getProductIcon, getInputHelperText, getInputError } from '../../../utils/helperFunctions';
import { getProductIds, getFilteredProductsFromMainList, getValidationSchema } from './helperMethods';

export interface AddVehicleRuleProps {
    version: string
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
        message: 'Data added successfully.',
        type: 'Success',
    },
    updated: {
        message: 'Data updated successfully.',
        type: 'Success',
    },
    duplicate: {
        message: 'Customer Id already exist. Please use different Customer Id.',
        type: 'Error',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    }
};

const vehicleStatusList = [
    { label: 'Enabled', value: 'Y', },
    { label: 'Disabled', value: 'N' },
];

const AddVehicleRule: React.FC<AddVehicleRuleProps> = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const [initialFormikValues, setInitialFormikValues] = useState<vehicleRuleType>(initialFormValuesVehicleRule);

    const isFormFieldChange = () => formik.dirty;
    setVersion("Breadcrumbs-Single");
    const [apiResposneState, setAPIResponse] = useState(false);

    const navigate = useNavigate();
    const { ruleId }: any = useParams();
    const { t } = useTranslation();
    const [productNameList, setProductNameList] = useState([]);
    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    });

    useEffect(() => {
        resetFormFieldValue();
    }, []);

    const [isEditMode, setEditMode] = useState(false);

    const updateFormStatus = (data: any) => {
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
    };

    const executeErrorScenario = (errorResponse: any) => {
        try {
            const { data } = errorResponse.response;
            setAPIResponse(true);
            updateFormStatus(data);
            formik.setSubmitting(false);
            setTimeout(() => {
                setAPIResponse(false);
            }, 6000);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const populateDataInAllFields = (formData: any) => {
        const obj:vehicleRuleType  = {
            addressLine1: '',
            city: formData.city,
            state: formData.state,
            countryCd: 'us',
            year: formData.yearNo,
            status: vehicleStatusList.filter((obj) => obj.value === formData.activeInactiveInd)[0],
            product: getFilteredProductsFromMainList(formData.vehicleRuleProducts, productNameList)
        };
        setInitialFormikValues(obj);
    };

    const onGetVehicleRuleSuccess = (response: any) => {
        if(response?.data){
            setEditMode(true);
            populateDataInAllFields(response?.data);
        }
    };
    const onGetVehicleRuleError = (response: any) => {
        executeErrorScenario(response);
    };

    useGetVehicleRule(ruleId, onGetVehicleRuleSuccess, onGetVehicleRuleError);

    const onEditVehicleRuleSuccess = () => {
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.updated);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const onEditVehicleRuleError = (errorResponse: any) => {
        executeErrorScenario(errorResponse);
    };

    const { mutate: editVehicleRule } = useEditVehicleRule(ruleId, onEditVehicleRuleError, onEditVehicleRuleSuccess);

    const updateVehicleRule = (form: vehicleRuleType) => {
        try {
            const payload = {
                "countryCode": form.countryCd,
                "city": form.city,
                "state": form.state,
                "yearNo": form.year,
                "productId": getProductIds(form.product),
                "activeInactiveInd": form.status.value,
            };
            editVehicleRule(payload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };
    // Edit end

    
    const onAddVehicleRuleSuccess = () => {
        setAPIResponse(true);
        isFormValidated(false);
        setFormStatus(formStatusProps.success);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };
    const onAddVehicleRuleError = (err: any) => {
        executeErrorScenario(err);
    };

    const { data } = useGetProductList("", { sortBy: "", order: "" }, { skipPagination: true });

    useEffect(() => {
        if (data) {
            setProductNameList(getFuelNonFuelProductList(data));
        }
    }, [data]);

    const getFuelNonFuelProductList = (productData?: { data?: any[] }): any => {
        if (!productData?.data) {
            return [];
        }
        return productData?.data?.filter((product: any) => (
            (product.activeInactiveInd === 'Y')
            && (product.ProductGroup.productGroupNm === "Fuel"
                || product.ProductGroup.productGroupNm === "Non-Fuel"
            )
        )).map(obj => ({
            label: '' + obj.productNm,
            value: '' + obj.productCd,
            icon: <Icon component={getProductIcon(obj.ProductIcon.productIconNm)}></Icon>, productDetail: obj
        })) || [];
    };

    const { mutate: addNewVehicleRule } = useAddVehicleRule(onAddVehicleRuleError, onAddVehicleRuleSuccess);

    const createNewVehicleRule = (form: vehicleRuleType) => {
        try {
            const apiPayload = {
                "countryCode": form.countryCd,
                "city": form.city,
                "state": form.state,
                "yearNo": form.year,
                "productId": getProductIds(form.product),
                "activeInactiveInd": form.status.value,
            };
            addNewVehicleRule(apiPayload);

        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    const formik = useFormik({
        initialValues: initialFormikValues,
        enableReinitialize: true,
        validationSchema: getValidationSchema(isEditMode),
        onSubmit: (values) => {
            if (isEditMode) {
                updateVehicleRule(values);
            } else {
            createNewVehicleRule(values);
            }
        }
    });

    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };

    const handleProductsSelected = (field: any, value: any) => {
        formik.setFieldValue(field, value);
    };

    const handleGoogleAddressChange = (addressObj: any) => {
        formik.setFieldValue('addressLine1', addressObj.addressLine1);
        formik.setFieldValue('city', addressObj.city);
        formik.setFieldValue('state', addressObj.state);
        formik.setFieldValue('countryCd', 'us');
    };
    const handleGoogleAddressBlur = () => {
        formik.setFieldTouched("addressLine1");
        formik.validateField("addressLine1");

        formik.setFieldTouched("city");
        formik.validateField("city");

        formik.setFieldTouched("state");
        formik.validateField("state");
    };


    const onClickCancel = () => {
        if (isFormFieldChange()) {
            showDialogBox(true);
        } else {
            navigate(`/vehicleRule`);
        }
    };

    const disableButton = () => {
        return (!formik.isValid || !formik.dirty) || formik.isSubmitting;
    };
    
    const handleStatusChange = (field: any, value: any) => {
        formik.setFieldValue(field, value);
    };

return (
        <Box display="flex" className="global_main_wrapper">
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container">

                    <form 
                    id='vehicleRuleform'
                    onSubmit={formik.handleSubmit} 
                    onBlur={handleFormDataChange} 
                    data-test="component-AddVehicleRule" >
                        <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                            {t("taxes.salesTax.form.title")} *
                        </Typography>
                        <Grid container mt={1}>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <AutocompleteInput
                                        id="addLine1"
                                        name='addLine1'
                                        label={t("taxes.salesTax.form.labelLocation")}
                                        onChange={handleGoogleAddressChange}
                                        onBlur={handleGoogleAddressBlur}
                                        value={formik.values.addressLine1}
                                        helperText={getInputHelperText(formik, 'addressLine1')}
                                        error={getInputError(formik, 'addressLine1')}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='city'
                                        label={t("taxes.salesTax.form.labelCity")}
                                        type='text'
                                        helperText={getInputHelperText(formik, 'city')}
                                        error={getInputError(formik, 'city')}
                                        description=''
                                        {...formik.getFieldProps('city')}
                                        data-test="city"
                                        required
                                    />

                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='state'
                                        label={t("taxes.salesTax.form.labelState")}
                                        type='text'
                                        description=''
                                        helperText={getInputHelperText(formik, 'state')}
                                        error={getInputError(formik, 'state')}
                                        {...formik.getFieldProps('state')}
                                        data-test="state"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='year'
                                        label='Year'
                                        type='text'
                                        placeholder='Enter Year'
                                        helperText={getInputHelperText(formik, 'year')}
                                        error={getInputError(formik, 'year')}
                                        {...formik.getFieldProps('year')}
                                        required
                                        data-test="year"
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='status'
                                        name='status'
                                        label={t("productManagement.form.productStatus")}
                                        placeholder='Choose'
                                        value={formik.values.status}
                                        items={vehicleStatusList}
                                        helperText={getInputHelperText(formik, 'status')}
                                        error={getInputError(formik, 'status')}
                                        onChange={handleStatusChange}
                                        onBlur={() => { 
                                            formik.setFieldTouched("status"); 
                                            formik.validateField("status"); 
                                        }}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={12} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <MultiSelect
                                        id={'product'}
                                        label='PRODUCT TYPE'
                                        placeholder='Choose Multiple Products'
                                        required
                                        items={productNameList}
                                        name={'product'}
                                        value={formik.values.product}
                                        onChange={handleProductsSelected}
                                        onBlur={() => { 
                                            formik.setFieldTouched('product'); 
                                            formik.validateField('product'); 
                                        }}
                                        helperText={getInputHelperText(formik, 'product')}
                                        error={getInputError(formik, 'product')}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={12} pr={2.5} mt={4} mb={4}>
                                <Grid item xs={12} md={6}>
                                    <Box className="form-action-section">
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
                                            data-test="save"
                                            disabled={disableButton()}
                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>
                                    <ToastMessage 
                                    isOpen={apiResposneState} 
                                    messageType={formStatus.type} 
                                    onClose={() => { return ''; }} 
                                    message={formStatus.message} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Grid>
        </Box>
    );
};
export default AddVehicleRule;