import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Grid } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "../Select/MultiSelect";
import { DatePicker } from "../DatePicker/DatePicker.component";
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';

const geoData = { //temporary data
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
}

const paymentTypes = [ //temporary data
    { label: "Invoice", value: "Invoice" },
    { label: "Voyager", value: "Voyager" },
    { label: "WEX", value: "wex" }
]

interface filterParamsProps { //temporary data
    [key: string]: string[]
}

interface InfoPanelProps {
    provideFilterParams?:(...args: any) => void;
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
}

let filterParams: filterParamsProps = {};

export const FilterContent: React.FC<InfoPanelProps> = ({ provideFilterParams, onClose }) => {
    const { theme } = useTheme();
    const { t } = useTranslation();

    const ClearBtn = styled(Button)((props) => ({
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

    const ApplyBtn = styled(Button)((props) => ({
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

    const onDateChange = (name: string, value: null | moment.Moment) => {
        formik.setFieldValue(name, value);
        if (name == "fromDate") {
            filterParams = { 
                ...filterParams, 
                date: [moment(value).format("MM-DD-YYYY"), filterParams.date && filterParams.date[1] ? moment(filterParams.toDate).format("MM-DD-YYYY") : ''] 
            };
        } else if (name == "toDate") {
            filterParams = { 
                ...filterParams, 
                date: [filterParams.date && filterParams.date[0] ? moment(filterParams.date[0]).format("MM-DD-YYYY") : '', moment(value).format("MM-DD-YYYY")] 
            };
        }
    }

    useEffect(()=>{
        filterParams = {};
    },[])

    function handleSelect(name: string, value: any[]) {
        formik.setFieldValue(name, value);
        filterParams = { ...filterParams, [name]: value.map((obj: { label: string, value: string }) => obj.value) };
    }

    const applyFilter = (formData: filterForm, resetForm: Function) => {
        resetForm({});
        if(provideFilterParams){
            provideFilterParams(filterParams);
        }
        onClose();

    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            fromDate: Yup.lazy(() => Yup.object().nullable(true).when('toDate', {
                is: ((toDate: moment.Moment | null) => {
                    return (!!toDate) ? true : false;
                }),
                then: Yup.object().nullable(true).required('From date is required')
            })),
            toDate: Yup.lazy(() => Yup.object().nullable(true).when('fromDate', {
                is: ((fromDate: moment.Moment | null) => {
                    return (!!fromDate) ? true : false;
                }),
                then: Yup.object().nullable(true).required('To date is required')
            })),
        }),
        onSubmit: (values, { resetForm }) => applyFilter(values, resetForm),
        enableReinitialize: true,
    });

    return <div className="cust_filter_panel_content">
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}  onReset={formik.handleReset}>
                <Grid container spacing={2} className="cust_filter_parent_grid">

                    <Grid item xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }} container>
                        <Grid item xs={12} className="cust_filter_date_label_grid">
                            Period
                        </Grid>
                        <Grid container item xs={6} spacing="2">
                            <DatePicker
                                id="fromDate"
                                placeholder="From Date"
                                name="fromDate"
                                value={formik.values.fromDate}
                                onChange={(name, val) => onDateChange(name, val)}
                                helperText={(formik.touched.fromDate && formik.errors.fromDate) ? formik.errors.fromDate : undefined}
                                error={(formik.touched.fromDate && formik.errors.fromDate) ? true : false}
                                required
                        
                            />
                        </Grid>
                        <Grid container item xs={6} spacing="2">
                            <DatePicker
                                id="toDate"
                                disableBeforeDate={formik.values.fromDate}
                                placeholder="To Date"
                                name="toDate"
                                value={formik.values.toDate}
                                onChange={(name, val) => onDateChange(name, val)}
                                helperText={(formik.touched.toDate && formik.errors.toDate) ? formik.errors.toDate : undefined}
                                error={(formik.touched.toDate && formik.errors.toDate) ? true : false}
                                required
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
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            id="city"
                            name="city"
                            label="City"
                            placeholder="Select City"
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
                        aria-label={t("customer-filter-panel.buttons.apply")}
                    >
                        {t("customer-filter-panel.buttons.apply")}
                    </ApplyBtn>
                </div>
            </form>
        </FormikProvider>
    </div>
}

