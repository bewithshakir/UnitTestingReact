import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useCustomerFilterStore } from "../../../store";
import moment from "moment";
import { Grid } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
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
    date?: DatePickerRange
}



const initialValues: filterForm = {
    state: [],
    city: [],
    paymentType: [],
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
    const { theme } = useTheme();
    const { t } = useTranslation();

    const createDateArr = (value: any, mainObj: any) => {
        if (timeValidation(value[0]) && timeValidation(value[1])) {
            mainObj['date'] = [moment(value[0]).format("MM-DD-YYYY"), moment(value[1]).format("MM-DD-YYYY")];
        }
    };

    const prepateLastFormWithPayload = () => {
        if (filterFormData && Object.keys(filterFormData).length > 0) {
            for (const [key, value] of Object.entries(filterFormData)) {
                formik.setFieldValue(key, value);
                if (key === 'date') {
                    delete filterParams["date"];
                    createDateArr(value, filterParams);
                } else {
                    filterParams[key] = value.length > 0 ? value.map((obj: { label: string, value: string }) => obj.value) : [];
                }
            }
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

    const onDateRangeChange = (name: string, newValue: DatePickerRange) => {
        formik.setFieldValue(name, newValue);
        delete filterParams["date"];
        createDateArr(newValue, filterParams);
    };

    function handleSelect(name: string, value: any[]) {
        formik.setFieldValue(name, value);
        filterParams[name] = value.map((obj: { label: string, value: string }) => obj.value);
    }

    const tempFilterCode = (val: any) => {
        return val;
    };
    
    const applyFilter = (formData: filterForm, resetForm: Function) => {
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

