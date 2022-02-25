import React, { useState } from 'react';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteIcon } from '../../../assets/icons';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import Input from '../../../components/UIComponents/Input/Input';
import Select from '../../../components/UIComponents/Select/SingleSelect';
import MultiSelect from '../../../components/UIComponents/Select/MultiSelect';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import AddTruckModel, { AddCustomerForm, TankDetails } from '../../../models/AddTruckModel';
import AddTruckValidationSchema from './validation';
import { useCreateTruck, useGetFuelTypeList, useGetTruckParkingList, useTruckColor, useGetEditTruckDetails, useEditTruckDetails } from './queries';
import { PlusIcon } from '../../../assets/icons';
import "./style.scss";
import { maxTanks } from '../../../utils/constants';
import { useShowConfirmationDialogBoxStore, HorizontalBarVersionState, useStore } from '../../../store';


const initialValues = new AddTruckModel();


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
    success: {
        message: 'Success.',
        type: 'Success',
    },
    updated: {
        message: 'Data updated successfully.',
        type: 'Success',
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    },
};



const deleteContact = (index: number, componentArr: any) => {
    componentArr.remove(index);
};



const AddTruck: React.FC<AddCustomerProps> = () => {
    const navigate = useNavigate();
    const [initialFormikValue,] = useState(initialValues);
    const { data: fuelProductsList } = useGetFuelTypeList();
    const { data: truckParkingLotList } = useGetTruckParkingList();
    const { data: truckColorList } = useTruckColor();
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const showDialogBox = useShowConfirmationDialogBoxStore((state) => state.showDialogBox);
    const isFormValidated = useShowConfirmationDialogBoxStore((state) => state.setFormFieldValue);
    const { t } = useTranslation();
    const { theme } = useTheme();
    const [formStatus, setFormStatus] = useState<IFormStatus>({message: '',type: ''});
    const addTruckStatusList = [{ label: 'Enabled', value: 'Y', },{ label: 'Disabled', value: 'N' }];
    const { deliveryVehicleId }: any = useParams();

    const onAddTruckError = (err: any) => {
        const { data } = err.response;
        setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
        formik.setSubmitting(false);
    };

    const onAddTruckSuccess = () => {
        isFormValidated(false);
        formik.resetForm({ values: formik.values });
        setFormStatus(formStatusProps.updated);
    };

    const { mutate: addNewTruck, isSuccess: isSuccessAddTruck, isError: isErrorAddTruck } = useCreateTruck(onAddTruckError, onAddTruckSuccess);

    const createNewTruck = async (form: AddCustomerForm) => {
        try {
            const apiPayload = {
                "colorCd": form.color.value,
                "activeInactiveInd": form.status.value,
                "parkingLocationIds": form.truckParkingLot.map((id) => {
                    return id.value;
                }),
                "deliveryVehicleNm": form.truckName,
                "makeAndModelNm": form.makeModel,
                "vinNo": form.vin,
                "registrationYr": form.year === ""?0:parseInt(form.year),
                "registrationStateNm": 'us',
                "licenceNo": form.license,
                "productCd": form.opexFuelType.value,
                "deliveryVehicleTanks": form.tankDetails.map(tankObj => ({
                    "tcsRegisterId": tankObj.tcsRegisterId,
                    "productCd": tankObj.tankFuelType.value,
                    "minCapacityVol": tankObj.minCapacityVol,
                    "maxCapacityVol": tankObj.maxCapacityVol
                })),
            };
            addNewTruck(apiPayload);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    //Edit OnPage Load

    const [isEditMode, setEditMode] = useState(false);

    const populateDataInAllFields = (responseData: any) => {
        formik.resetForm({
            values: { ...responseData }
        });
    };


    const onGetTruckDetailsSuccess = (response: any) => {

        try {
            if (response?.data) {
                const finalData = {
                    truckName: response.data.data.deliveryVehicleNm,
                    license: response.data.data.licenceNo,
                    vin: response.data.data.vinNo,
                    makeModel: response.data.data.makeAndModelNm,
                    color: truckColorList.find((item:any)=>{
                        return item.value === response.data.data.colorCd?item:"";
                    }),
                   year: response.data.data.registrationYr,
                   status: addTruckStatusList.find((item:any)=>{
                    return item.value === response.data.data.activeInactiveInd?item:"";
                    }),
                    truckParkingLot: response.data.data.parkingLocations.map((item:any) => {
                        return truckParkingLotList.find((locationItem:any) => {
                            return locationItem.value === item.parkingLocationId? locationItem:"";
                        });
                    }),
                    opexFuelType: fuelProductsList.find((item:any)=>{
                        return item.value === response.data.data.productCd?item:"";
                    }),
                    tankDetails: response.data.data.deliveryVehicleTanks.map(function(item:any) {
                        return {
                            tcsRegisterId: item.tcsRegisterId,
                            tankFuelType: fuelProductsList.find((data:any)=>{ return data.value === item.productCd?item:"" ;}),
                            minCapacityVol: item.minCapacityVol,
                            maxCapacityVol: item.maxCapacityVol,
                        }; 
                      })
                };

                populateDataInAllFields(finalData);
                setEditMode(true);
            }
        } catch {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };
    const onGetTruckDetailsError = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || formStatusProps.error.message, type: 'Error' });
            formik.setSubmitting(false);
        } catch (error) {
            setFormStatus(formStatusProps.error);
        }
    };

    useGetEditTruckDetails(deliveryVehicleId, onGetTruckDetailsSuccess, onGetTruckDetailsError);


    const onSuccessEditTruck = () => {
        isFormValidated(false);
        setFormStatus({ message: t("formStatusProps.updated.message"), type: 'Success' });
        formik.resetForm({ values: formik.values });
    };

    const onErrorEditTruck = (err: any) => {
        try {
            const { data } = err.response;
            setFormStatus({ message: data?.error?.message || t("formStatusProps.error.message"), type: 'Error' });
            formik.setSubmitting(false);
        } catch (error: any) {
            setFormStatus({ message: error?.message || t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const { mutate: editTruck, isSuccess: isSuccessEditTruck, isError: isErrorEditTruck } = useEditTruckDetails(
        deliveryVehicleId,
        onSuccessEditTruck,
        onErrorEditTruck
    );


    const updateTruckData = (form: AddTruckModel) => {
        try {
            const apiPayload = {
                "colorCd": form.color.value,
                "activeInactiveInd": form.status.value,
                "parkingLocationIds": form.truckParkingLot.map((id) => {
                    return id.value;
                }),
                "deliveryVehicleNm": form.truckName,
                "makeAndModelNm": form.makeModel,
                "vinNo": form.vin,
                "registrationYr": form.year === ""?0:parseInt(form.year),
                "registrationStateNm": 'us',
                "licenceNo": form.license,
                "productCd": form.opexFuelType.value,
                "deliveryVehicleTanks": form.tankDetails.map(tankObj => ({
                    "tcsRegisterId": tankObj.tcsRegisterId,
                    "productCd": tankObj.tankFuelType.value,
                    "minCapacityVol": tankObj.minCapacityVol,
                    "maxCapacityVol": tankObj.maxCapacityVol
                })),
            };
            editTruck(apiPayload);
        } catch {
            setFormStatus({ message: t("formStatusProps.error.message"), type: 'Error' });
        }
    };

    const formik = useFormik({
        initialValues: initialFormikValue,
        validationSchema: AddTruckValidationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (isEditMode) {
                updateTruckData(values);
            } else {
                createNewTruck(values);
            }
        },
    });

    const disableSubmitBtn = () =>
        !formik.isValid || !formik.dirty || formik.isSubmitting;

    const isFormFieldChange = () => formik.dirty;

    const handleFormDataChange = () => {
        if (isFormFieldChange()) {
            isFormValidated(true);
        }
    };

    const onClickBack = () => {
        if (!formik.isValid || formik.dirty) {
            showDialogBox(true);
        } else {
            navigate('/trucks');
        }
    };

    return (
        <>
            <Grid item md={10} xs={10}>
                <Container maxWidth="lg" className="page-container">
                    <FormikProvider value={formik}>
                        <form id="addTruckForm" onSubmit={formik.handleSubmit} onBlur={handleFormDataChange} >
                            <Grid container>
                                <Grid item md={12} mt={12} mb={1}>
                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                            {t("addTruckFormLabels.fillDetailsTitle")}
                                    </Typography>
                                </Grid>
                            <Grid container item xs={11} md={11}>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='truckName'
                                        label={t("addTruckFormLabels.truckName")}
                                        type='text'
                                        helperText={(formik.touched.truckName && formik.errors.truckName) ? formik.errors.truckName : undefined}
                                        error={(formik.touched.truckName && formik.errors.truckName) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('truckName')}

                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='license'
                                        label={t("addTruckFormLabels.license")}
                                        type='text'
                                        helperText={(formik.touched.license && formik.errors.license) ? formik.errors.license : undefined}
                                        error={(formik.touched.license && formik.errors.license) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('license')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        id='vin'
                                        label={t("addTruckFormLabels.vin")}
                                        type='text'
                                        helperText={(formik.touched.vin && formik.errors.vin) ? formik.errors.vin : undefined}
                                        error={(formik.touched.vin && formik.errors.vin) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('vin')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='makeModel'
                                        label={t("addTruckFormLabels.makeModel")}
                                        type='text'
                                        helperText={(formik.touched.makeModel && formik.errors.makeModel) ? formik.errors.makeModel : undefined}
                                        error={(formik.touched.makeModel && formik.errors.makeModel) ? true : false}
                                        description=''
                                        required
                                        {...formik.getFieldProps('makeModel')}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='color'
                                        name='color'
                                        label={t("addTruckFormLabels.color")}
                                        value={formik.values.color}
                                        placeholder='Select One'
                                        items={truckColorList}
                                        helperText={(formik.touched.color && formik.errors.color) ? formik.errors.color.value : undefined}
                                        error={(formik.touched.color && formik.errors.color) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("color"); formik.validateField("color"); }}
                                        required
                                    />

                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        id='year'
                                        label={t("addTruckFormLabels.year")}
                                        type='text'
                                        helperText={(formik.touched.year && formik.errors.year) ? formik.errors.year : undefined}
                                        error={(formik.touched.year && formik.errors.year) ? true : false}
                                        description=''
                                        {...formik.getFieldProps('year')}
                                       
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='status'
                                        name='status'
                                        label={t("addTruckFormLabels.status")}
                                        value={formik.values.status}
                                        placeholder='Select One'
                                        items={addTruckStatusList}
                                        helperText={(formik.touched.status && formik.errors.status) ? formik.errors.status.value : undefined}
                                        error={(formik.touched.status && formik.errors.status) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("status"); formik.validateField("status"); }}
                                    />

                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <MultiSelect
                                        id='truckParkingLot'
                                        name='truckParkingLot'
                                        label={t("addTruckFormLabels.truckParkingLot")}
                                        value={formik.values.truckParkingLot}
                                        placeholder='Select Multiple lots'
                                        items={truckParkingLotList}
                                        onChange={formik.setFieldValue}
                                        required
                                        helperText={(formik.touched.truckParkingLot && formik.errors.truckParkingLot) ? formik.errors.truckParkingLot : undefined}
                                        error={(formik.touched.truckParkingLot && formik.errors.truckParkingLot) ? true : false}
                                        onBlur={() => { formik.setFieldTouched(`truckParkingLot`); formik.validateField(`truckParkingLot`); }}
                                    />

                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        id='opexFuelType'
                                        name='opexFuelType'
                                        label='OPEX FUEL TYPE'
                                        value={formik.values.opexFuelType}
                                        placeholder='Select One'
                                        items={fuelProductsList}
                                        helperText={(formik.touched.opexFuelType && formik.errors.opexFuelType) ? formik.errors.opexFuelType.value : undefined}
                                        error={(formik.touched.opexFuelType && formik.errors.opexFuelType) ? true : false}
                                        onChange={formik.setFieldValue}
                                        onBlur={() => { formik.setFieldTouched("opexFuelType"); formik.validateField("opexFuelType"); }}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={12} mt={2} mb={1}>
                                <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                {t("addTruckFormLabels.tankDetails")} (Max {maxTanks} Tanks)
                                </Typography>
                            </Grid>
                            <FieldArray
                                name="tankDetails"
                                render={(arrayHelpers) => (
                                    <React.Fragment>
                                        {formik.values.tankDetails.map((contactList, index) => (
                                            <React.Fragment key={`em${index}`}>
                                                <Grid item md={12} mt={2} mb={1}>
                                                    <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>
                                                        {t("addTruckFormLabels.tank")} {index + 1}
                                                    </Typography>
                                                </Grid>
                                                <Grid container item xs={11} md={11}>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`tankDetails[${index}].tcsRegisterId`}
                                                            label={t("addTruckFormLabels.tankTcsId")}
                                                            type='text'
                                                            helperText={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.tcsRegisterId && ((formik.errors?.tankDetails?.[index] as TankDetails)?.tcsRegisterId))
                                                                    ?
                                                                    (formik.errors.tankDetails[index] as TankDetails).tcsRegisterId : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.tcsRegisterId && ((formik.errors?.tankDetails?.[index] as TankDetails)?.tcsRegisterId))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`tankDetails[${index}].tcsRegisterId`)}
                                                            
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>




                                                        <Select
                                                            id={`tankDetails[${index}].tankFuelType`}
                                                            name={`tankDetails[${index}].tankFuelType`}
                                                            label={t("addTruckFormLabels.tankFuelType")}
                                                            value={formik.values.tankDetails[index].tankFuelType}

                                                            placeholder='Select One'
                                                            items={fuelProductsList}
                                                            helperText={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.tankFuelType?.value && ((formik.errors?.tankDetails?.[index] as TankDetails)?.tankFuelType.value))
                                                                    ?
                                                                    (formik.errors.tankDetails[index] as TankDetails).tankFuelType.value : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.tankFuelType?.value && ((formik.errors?.tankDetails?.[index] as TankDetails)?.tankFuelType.value))
                                                                    ? true : false
                                                            }


                                                            onChange={formik.setFieldValue}
                                                            onBlur={() => { formik.setFieldTouched(`tankDetails[${index}].tankFuelType`); formik.validateField(`tankDetails[${index}].tankFuelType`); }}
                                                            required
                                                        />



                                                    </Grid>
                                                    <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                                        <Input
                                                            id={`tankDetails[${index}].minCapacityVol`}
                                                            label={t("addTruckFormLabels.tankMinCapacity")}
                                                            type="text"
                                                            helperText={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.minCapacityVol && ((formik.errors?.tankDetails?.[index] as TankDetails)?.minCapacityVol))
                                                                    ?
                                                                    (formik.errors.tankDetails[index] as TankDetails).minCapacityVol : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.minCapacityVol && ((formik.errors?.tankDetails?.[index] as TankDetails)?.minCapacityVol))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            required
                                                            {...formik.getFieldProps(`tankDetails[${index}].minCapacityVol`)}
                                                            
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                                        <Input
                                                            id={`tankDetails[${index}].maxCapacityVol`}
                                                            label={t("addTruckFormLabels.tankMaxCapacity")}
                                                            type='text'
                                                            required
                                                            helperText={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.maxCapacityVol && ((formik.errors?.tankDetails?.[index] as TankDetails)?.maxCapacityVol))
                                                                    ?
                                                                    (formik.errors.tankDetails[index] as TankDetails).maxCapacityVol : undefined
                                                            }
                                                            error={
                                                                formik?.errors?.tankDetails && formik?.touched?.tankDetails &&
                                                                    (formik.touched?.tankDetails?.[index]?.maxCapacityVol && ((formik.errors?.tankDetails?.[index] as TankDetails)?.maxCapacityVol))
                                                                    ? true : false
                                                            }
                                                            description=''
                                                            {...formik.getFieldProps(`tankDetails[${index}].maxCapacityVol`)}
                                                            
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container item xs={1} md={1}>
                                                    <div className='deleteBtn'>
                                                        {index !== 0 && (
                                                            <DeleteIcon color='#D7252C' height={16} onClick={() => deleteContact(index, arrayHelpers)} />
                                                        )}
                                                    </div>
                                                </Grid>
                                            </React.Fragment>
                                        ))}

                                        <Grid item md={12} mt={2} mb={4}>
                                            <Link
                                                variant="body2"
                                                className={formik.values.tankDetails.length === maxTanks ? "disabled-text-link" : "add-link"}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    width: "fit-content",
                                                    cursor: "pointer"
                                                }}
                                                onClick={(event) => {
                                                    if (formik.values.tankDetails.length === maxTanks) {
                                                        event.preventDefault();
                                                    } else {
                                                        if (formik.values.tankDetails.length < maxTanks) {
                                                            arrayHelpers.push({ firstName: "", lastName: "", email: "", phoneNumber: "" });
                                                        }
                                                    }
                                                }}
                                            >
                                                <span className="add-icon-span">
                                                    <PlusIcon color={formik.values.tankDetails.length === maxTanks ? theme["--Secondary-Background"] : theme["--Primary"]} />
                                                </span>
                                                <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary disabled-text" mb={1}>
                                                {t("addTruckFormLabels.addAdditionalTank")}
                                                </Typography>
                                            </Link>
                                        </Grid>
                                    </React.Fragment>
                                )}
                            />
                            <Grid item md={12} mt={2} mb={4}>
                                <Box className="form-action-section">
                                    <Button
                                        id="cancelBtn"
                                        types="cancel"
                                        aria-label="cancel"
                                        className="mr-4"
                                        onClick={onClickBack}

                                    >
                                        {t("buttons.cancel")}
                                    </Button>
                                    <Button
                                        id="saveBtn"
                                        type="submit"
                                        types="save"
                                        aria-label="save"
                                        className="ml-4"
                                        disabled={disableSubmitBtn()}
                                    >
                                        {t("buttons.save")}
                                    </Button>
                                </Box>
                                <ToastMessage
                                    isOpen={
                                        isSuccessAddTruck || isErrorAddTruck ||
                                        isSuccessEditTruck || isErrorEditTruck
                                    }
                                    data-testid="toaster-message"
                                    messageType={formStatus.type}
                                    onClose={() => { return ''; }}
                                    message={formStatus.message} />

                            </Grid>
                        </Grid>
                    </form>
                </FormikProvider>
            </Container>
        </Grid>
        </>
    );
};

AddTruck.propTypes = {

};

export default AddTruck;
