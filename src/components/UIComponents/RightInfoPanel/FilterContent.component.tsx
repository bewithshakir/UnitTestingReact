import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCustomerFilterStore } from "../../../store";
import moment from "moment";
import { Grid } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
// import * as Yup from 'yup';
import Select from "../Select/MultiSelect";
import { DatePickerInput } from "../DatePickerInput/DatePickerInput.component";
import { DateRange } from '@mui/lab/DateRangePicker';
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';

type DatePickerRange = DateRange<Date>;

const geoData = {
    states: [
        { label: "Texas", value: "Texas" },
        { label: "TX", value: "TX" },
        { label: "California", value: "CA" },
        { label: "Gujarat", value: "Gujarat" },
        { label: "Florida", value: "Florida" }
    ],
    cities: [
        { label: "Houston", value: "Houston" },
        { label: "Hoston", value: "Hoston" },
        { label: "Saratoga", value: "Saratoga" },
        { label: "kalol", value: "kalol" },
    ]
};

const paymentTypes = [
    { label: "Invoice", value: "Invoice" },
    { label: "Voyager", value: "Voyager" },
    { label: "WEX", value: "wex" }
];

interface filterParamsProps {
    [key: string]: string[] | null[] | null | DatePickerRange
}

interface InfoPanelProps {
    provideFilterParams?: (...args: any) => void;
    onClose: (...args: any) => void;
}

interface filterForm {
    state?: any[],
    city?: any[],
    paymentType?: any[],
    // fromDate: moment.Moment | null,
    // toDate: moment.Moment | null,
    date?: DatePickerRange
}



const initialValues: filterForm = {
    state: [],
    city: [],
    paymentType: [],
    // fromDate: null,
    // toDate: null,
    date: [null, null]
};

let filterParams: filterParamsProps = {};

const timeValidation = (str: any) => {
    return moment(str, 'MM-DD-YYYY', true).isValid();
};



export const FilterContent: React.FC<InfoPanelProps> = ({ provideFilterParams, onClose }) => {
    const [formValuesSaved, setFormValuesSaved] = React.useState<filterForm | null>(null);
    const filterFormData = useCustomerFilterStore((state) => state.filterFormData);
    const setFormData = useCustomerFilterStore((state) => state.setFormData);
    const removeFormData = useCustomerFilterStore((state) => state.removeFormData);

    // const [dateRange, setDateRange] = React.useState<DatePickerRange>([new Date(), new Date()]);
  

    const { theme } = useTheme();
    const { t } = useTranslation();

    const createDateArr = (value:any, mainObj:any) => {
        if(timeValidation(value[0]) && timeValidation(value[1])){
            mainObj['date'] = [moment(value[0]).format("MM-DD-YYYY"),moment(value[1]).format("MM-DD-YYYY")]; 
        }
    };

    const prepateLastFormWithPayload = () => {
        console.warn("onUseEffect->", filterFormData);
        if (filterFormData && Object.keys(filterFormData).length > 0) {
            for (const [key, value] of Object.entries(filterFormData)) {
                if (key === 'date') {
                    formik.setFieldValue(key, value);
                    delete filterParams["date"];
                    createDateArr(value, filterParams);
                    // if(timeValidation(value[0]) && timeValidation(value[1])){
                    //     filterParams.date = [moment(value[0]).format("MM-DD-YYYY"),moment(value[1]).format("MM-DD-YYYY")]; 
                    // }
                    // filterParams.date = [moment(value[0]).format("MM-DD-YYYY"),moment(value[1]).format("MM-DD-YYYY")]; 
                    // formik.setFieldValue(key, value ? moment(value) : null);
                    // if (!filterParams.date) {
                    //     filterParams.date = [];
                    // }
                    // if (key === 'fromDate') {
                    //     filterParams.date[0] = value ? moment(value).format("MM-DD-YYYY") : null;
                    // } else if (key === 'toDate') {
                    //     filterParams.date[1] = value ? moment(value).format("MM-DD-YYYY") : null;
                    // }
                } else {
                    formik.setFieldValue(key, value);
                    filterParams[key] = value.length > 0 ? value.map((obj: { label: string, value: string }) => obj.value) : [];
                }

            }
            console.warn("onUseEffect filterParams->", filterParams);
        }
    };

    useEffect(() => {
        filterParams = {};
        if (filterFormData) {
            setFormValuesSaved(filterFormData);
            prepateLastFormWithPayload();
        }
    }, []);

    window.onunload = function () {
        removeFormData();
    };

    const ClearBtn = styled(Button)(() => ({
        "&&": {
            width: '200px',
            backgroundColor: theme["--Cancel-Btn"],
            color: theme["--Darkgray"],
            border: "1px solid " + theme["--Gray"],
            "&:hover": {
                backgroundColor: theme["--Lightgray_2"],
            }
        }
    }));

    const ApplyBtn = styled(Button)(() => ({
        "&&": {
            width: '200px',
            backgroundColor: theme["--Save-Btn"],
            color: theme["--Darkgray"],
            border: "0px",
            "&:hover": {
                backgroundColor: theme["--Gray"],
                color: theme["--Save-Btn"],
            }
        }
    }));

    // const onDateChange = (name: string, value: null | string | moment.Moment) => {
    //     formik.setFieldValue(name, value);
    //     if (name == "fromDate") {
    //         filterParams.date = [moment(value).format("MM-DD-YYYY"), filterParams.date && filterParams.date[1] ? moment(filterParams.date[1]).format("MM-DD-YYYY") : ''];
    //     } else if (name == "toDate") {
    //         filterParams.date = [filterParams.date && filterParams.date[0] ? moment(filterParams.date[0]).format("MM-DD-YYYY") : '', moment(value).format("MM-DD-YYYY")];
    //     }
    // };

    const onDateRangeChange = (name: string, newValue: DatePickerRange) => {
        formik.setFieldValue(name, newValue);
        console.warn("type check->", typeof newValue);
        console.warn("time check1->",timeValidation(newValue[0]));
        console.warn("time check2->",timeValidation(newValue[1]));
        
        delete filterParams["date"];
        createDateArr(newValue, filterParams);
        
        // if(timeValidation(newValue[0]) && timeValidation(newValue[1])){
        //     filterParams.date = [moment(newValue[0]).format("MM-DD-YYYY"),moment(newValue[1]).format("MM-DD-YYYY")]; 
        // }
        
    };

    function handleSelect(name: string, value: any[]) {
        formik.setFieldValue(name, value);
        filterParams[name] = value.map((obj: { label: string, value: string }) => obj.value);
    }

    const tempFilterCode = (val: any) => {
        return val;
    };
    const applyFilter = (formData: filterForm, resetForm: Function) => {
        console.warn("after apply filter->", formData);
        if (provideFilterParams && Object.keys(filterParams).length > 0) {
            setFormData(formData);
            provideFilterParams(filterParams);
            onClose();
        }
        tempFilterCode(resetForm);
    };

    const clearFilter = (formData: filterForm, resetForm: Function) => {
        setFormValuesSaved(null);
        filterParams = {};
        if (provideFilterParams) {
            provideFilterParams(filterParams);
        }
        removeFormData();
        tempFilterCode(resetForm);
    };


    const formik = useFormik({
        initialValues: formValuesSaved ? formValuesSaved : initialValues,
        // validationSchema: Yup.object().shape({
        //     date: Yup.object().nullable(true)
        //     // toDate: Yup.object().nullable(true).when('fromDate', {
        //     //     is: ((fromDate: moment.Moment | null) => {
        //     //         return (!!fromDate) ? true : false;
        //     //     }),
        //     //     then: Yup.object().nullable(true).required('To date is required')
        //     // }),


        // }, 
        // ),
        onSubmit: (values, { resetForm }) => applyFilter(values, resetForm),
        onReset: (values, { resetForm }) => clearFilter(values, resetForm),
    });

    return <div className="cust_filter_panel_content">
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Grid container spacing={2} className="cust_filter_parent_grid">
                    <Grid item xs={12} columnSpacing={2} container>
                        <Grid item xs={12} className="cust_filter_date_label_grid">
                            {"Period".toUpperCase()}
                        </Grid>
                        <Grid container item xs={12} spacing="2">
                            <DatePickerInput
                                type="date-range"
                                id="cust-filter-date-range"
                                placeholder={{ start: "From Date", end: "To Date" }}
                                name="date"
                                onDateRangeChange={(name, val) => onDateRangeChange(name, val)}
                                helperText={(formik.touched.date && formik.errors.date) ? formik.errors.date : undefined}
                                error={(formik.touched.date && formik.errors.date) ? true : false}
                                dateRangeValue={formik.values.date}
                                required
                            />
                        </Grid>
                        {/* <Grid container item xs={6} spacing="2">
                            <DatePickerInput
                                type="single-date"
                                id="fromDate"
                                placeholder="From Date"
                                name="fromDate"
                                value={formik.values.fromDate}
                                onChange={(name, val) => onDateChange(name, val)}
                                helperText={(formik.touched.fromDate && formik.errors.fromDate) ? formik.errors.fromDate : undefined}
                                error={(formik.touched.fromDate && formik.errors.fromDate) ? true : false}
                            />
                        </Grid>
                        <Grid container item xs={6} spacing="2">
                            <DatePickerInput
                                type="single-date"
                                id="toDate"
                                disableBeforeDate={formik.values.fromDate}
                                placeholder="To Date"
                                name="toDate"
                                value={formik.values.toDate}
                                onChange={(name, val) => onDateChange(name, val)}
                                helperText={(formik.touched.toDate && formik.errors.toDate) ? formik.errors.toDate : undefined}
                                error={(formik.touched.toDate && formik.errors.toDate) ? true : false}
                            />
                        </Grid> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id="state"
                            name="state"
                            label={"State".toLowerCase()}
                            placeholder=""
                            value={formik.values.state}
                            items={geoData.states}
                            onChange={(name, val) => handleSelect(name, val)}
                            helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                            error={(formik.touched.state && formik.errors.state) ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id="city"
                            name="city"
                            label="City"
                            placeholder=""
                            value={formik.values.city}
                            items={geoData.cities}
                            onChange={(name, val) => handleSelect(name, val)}
                            helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                            error={(formik.touched.city && formik.errors.city) ? true : false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id="paymentType"
                            name="paymentType"
                            label="Settlement Type"
                            placeholder=""
                            items={paymentTypes}
                            onChange={(name, val) => handleSelect(name, val)}
                            value={formik.values.paymentType}
                            helperText={(formik.touched.paymentType && formik.errors.paymentType) ? formik.errors.paymentType : undefined}
                            error={(formik.touched.paymentType && formik.errors.paymentType) ? true : false}
                        />
                    </Grid>
                </Grid>

                <div className="cust_filter_buttons_container">
                    <ClearBtn
                        type="reset"
                        types="cancel"
                        aria-label={t("customer-filter-panel.buttons.clear all")}
                    >
                        {t("customer-filter-panel.buttons.clear all")}
                    </ClearBtn >
                    <ApplyBtn
                        type="submit"
                        types="save"
                        disabled={!formik.dirty}
                        aria-label={t("customer-filter-panel.buttons.apply")}
                    >
                        {t("customer-filter-panel.buttons.apply")}
                    </ApplyBtn>
                </div>
            </form>
        </FormikProvider>
    </div>;
};

