import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCustomerFilterStore } from "../../../store";
import moment from "moment";
import { Grid } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "../Select/MultiSelect";
import { DatePickerInput } from "../DatePickerInput/DatePickerInput.component";
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';

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
    [key: string]: string[]
}

interface InfoPanelProps {
    provideFilterParams?: (...args: any) => void;
    onClose: (...args: any) => void;
}

interface filterForm {
    state?: any[],
    city?: any[],
    paymentType?: any[],
    fromDate: moment.Moment | null,
    toDate: moment.Moment | null
}



const initialValues: filterForm = {
    state: [],
    city: [],
    paymentType: [],
    fromDate: null,
    toDate: null
};

let filterParams: filterParamsProps = {};

export const FilterContent: React.FC<InfoPanelProps> = ({ provideFilterParams, onClose }) => {
    const [formSubmitClicked, setFormSubmitClicked] = React.useState<boolean>(false);
    const [formValuesSaved, setFormValuesSaved] = React.useState<filterForm | null>(null);
    const filterFormData = useCustomerFilterStore((state) => state.filterFormData);
    const setFormData = useCustomerFilterStore((state) => state.setFormData);
    const removeFormData = useCustomerFilterStore((state) => state.removeFormData);

    const { theme } = useTheme();
    const { t } = useTranslation();

    useEffect(() => {
        filterParams = {};
        setFormSubmitClicked(false);
        if (filterFormData) {
            setFormValuesSaved(filterFormData);
            if (filterFormData && Object.keys(filterFormData).length > 0) {
                for (const [key, value] of Object.entries(filterFormData)) {
                    formik.setFieldValue(key, key === 'fromDate' || key === 'toDate' ? moment(value) : value);
                }
            }
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

    const onDateChange = (name: string, value: null | string | moment.Moment) => {
        formik.setFieldValue(name, value);
        if (name == "fromDate") {
            filterParams.date = [moment(value).format("MM-DD-YYYY"), filterParams.date && filterParams.date[1] ? moment(filterParams.date[1]).format("MM-DD-YYYY") : ''];
        } else if (name == "toDate") {
            filterParams.date = [filterParams.date && filterParams.date[0] ? moment(filterParams.date[0]).format("MM-DD-YYYY") : '', moment(value).format("MM-DD-YYYY")];
        }
    };

    function handleSelect(name: string, value: any[]) {
        formik.setFieldValue(name, value);
        filterParams[name] = value.map((obj: { label: string, value: string }) => obj.value);
    }

    const tempFilterCode = (val: any) => {
        return val;
    };
    const applyFilter = (formData: filterForm, resetForm: Function) => {
        setFormSubmitClicked(true);
        if (provideFilterParams && Object.keys(filterParams).length > 0) {
            setFormData(formData);
            provideFilterParams(filterParams);
            onClose();
        }
        tempFilterCode(resetForm);
    };

    const clearFilter = (formData: filterForm, resetForm: Function) => {
        setFormSubmitClicked(false);
        setFormValuesSaved(null);
        filterParams={};
        if (provideFilterParams) {
            provideFilterParams(filterParams);
        }
        removeFormData();
        tempFilterCode(resetForm);
    };


    const formik = useFormik({
        initialValues: formValuesSaved ? formValuesSaved : initialValues,
        validationSchema: Yup.object().shape({
            fromDate: Yup.object().nullable(true).when('toDate', {
                is: ((toDate: moment.Moment | null) => {
                    return (!!toDate) ? true : false;
                }),
                then: Yup.object().nullable(true).required('From date is required')
            }),
            toDate: Yup.object().nullable(true).when('fromDate', {
                is: ((fromDate: moment.Moment | null) => {
                    return (!!fromDate) ? true : false;
                }),
                then: Yup.object().nullable(true).required('To date is required')
            }),


        }, [["fromDate", "toDate"]]
        ),
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
                        <Grid container item xs={6} spacing="2">
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
                        </Grid>
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
                {!formik.dirty && formSubmitClicked && (
                    <div className="filter-error-box">Please select the criteria to apply the filter</div>
                )}

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
                        aria-label={t("customer-filter-panel.buttons.apply")}
                    >
                        {t("customer-filter-panel.buttons.apply")}
                    </ApplyBtn>
                </div>
            </form>
        </FormikProvider>
    </div>;
};

