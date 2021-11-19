import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { filterStore } from "../../../store";
import moment from "moment";
import { Grid, FormControlLabel, Typography } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
import Select from "../Select/MultiSelect";
import { DatePickerInput } from "../DatePickerInput/DatePickerInput.component";
import { DateRange } from '@mui/lab/DateRangePicker';
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';
import { filterURLKey } from '../../../infrastructure/filterQuery';
import { SelectInput } from "./SelectInput";
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../../../components/UIComponents/Checkbox/Checkbox.component';

type DatePickerRange = DateRange<Date>;

interface filterParamsProps {
    [key: string]: string[] | null[] | null | DatePickerRange
}

export interface IDynamicFilterProps {
    provideFilterParams?: (...args: any) => void;
    onClose: (...args: any) => void;
    /** use for unique zustand store */
    storeKey: string;
    fields: {
        name: string;
        /** only translation supported */
        label: string;
        fieldType: 'text' | 'dateRange' | 'select' | 'checkbox';
        initialValue: any
        multiCheckboxOptions?: { label: string, value: string }[]
        options?: { label: string; value: string;[k: string]: any }[];
        optionUrlKey?: filterURLKey
        optionAPIResponseKey?: 'states' | 'cities' | 'settlementType'
    }[]
}

let filterParams: filterParamsProps = {};

const timeValidation = (str: any) => {
    return moment(str, 'MM-DD-YYYY', true).isValid();
};

export const DynamicFilterContent: React.FC<IDynamicFilterProps> = ({ provideFilterParams, onClose, fields, storeKey }) => {
    const [formValuesSaved, setFormValuesSaved] = React.useState<{ [k: string]: any } | null>(null);
    const filterFormData = filterStore((state) => {
        return state.filterFormData ? state.filterFormData[storeKey] : ({} as { [k: string]: any });
    });
    const setFormData = filterStore((state) => state.setFormData);
    const removeFormData = filterStore((state) => state.removeFormData);
    const { theme } = useTheme();
    const { t } = useTranslation();

    const createDateArr = (value: any, mainObj: any, fieldName: string) => {
        if (timeValidation(value[0]) && timeValidation(value[1])) {
            mainObj[fieldName] = [moment(value[0]).format("MM-DD-YYYY"), moment(value[1]).format("MM-DD-YYYY")];
        }
    };

    const prepateLastFormWithPayload = () => {
        if (filterFormData && Object.keys(filterFormData).length > 0) {
            for (const [key, value] of Object.entries(filterFormData)) {
                formik.setFieldValue(key, value);
                const fieldType = fields.find(field => field.name === key)?.fieldType;
                if (fieldType === 'dateRange') {
                    delete filterParams[key];
                    createDateArr(value, filterParams, key);
                } else if (Array.isArray(value)) {
                    filterParams[key] = value.length > 0 ? value.map((obj: { label: string, value: string }) => obj.value) : [];
                } else {
                    filterParams[key] = value as any;
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
        createDateArr(newValue, filterParams, name);
    };

    function handleSelect(name: string, value: any[]) {
        formik.setFieldValue(name, value);
        filterParams[name] = value.map((obj: { label: string, value: string }) => obj.value);
    }
    function handleChange(name: string, value: any) {
        formik.setFieldValue(name, value);
        filterParams[name] = value;
    }

    const tempFilterCode = (val: any) => {
        return val;
    };

    const applyFilter = (formData: { [k: string]: any }, resetForm: Function) => {
        if (provideFilterParams && Object.keys(filterParams).length > 0) {
            setFormData({ [storeKey]: formData });
            provideFilterParams(filterParams);
            onClose();
        }
        tempFilterCode(resetForm);
    };

    const clearFilter = (resetForm: Function) => {
        setFormValuesSaved(null);
        filterParams = {};
        if (provideFilterParams) {
            provideFilterParams(filterParams);
        }
        removeFormData();
        tempFilterCode(resetForm);
    };

    const formik = useFormik({
        initialValues: formValuesSaved ? formValuesSaved : fields.reduce((acc, field) => {
            acc[field.name] = field.initialValue;
            return acc;
        }, {} as any),
        onSubmit: (values, { resetForm }) => applyFilter(values, resetForm),
        onReset: (values, { resetForm }) => clearFilter(resetForm),
    });
    return <div className="cust_filter_panel_content">
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Grid container spacing={2} className="cust_filter_parent_grid">
                    {fields && fields.map(field => {
                        const touched = (formik.touched as any)[field.name];
                        const error = (formik.errors as any)[field.name];
                        const value = (formik.values as any)[field.name];
                        return (
                            field.fieldType === 'dateRange' ?
                                <Grid key={field.name} item xs={12} columnSpacing={2} container>
                                    <Grid item xs={12} className="cust_filter_date_label_grid">
                                        {"Period".toUpperCase()}
                                    </Grid>
                                    <Grid container item xs={12} spacing="2">
                                        <DatePickerInput
                                            type="date-range"
                                            id="cust-filter-date-range"
                                            placeholder={{ start: t("customer-filter-panel.from date"), end: t("customer-filter-panel.to date") }}
                                            name={field.name}
                                            onDateRangeChange={(name, val) => onDateRangeChange(name, val)}
                                            helperText={(touched && error) ? error : undefined}
                                            error={(touched && error) ? true : false}
                                            dateRangeValue={value}
                                            required
                                        />
                                    </Grid>
                                </Grid> :
                                <Grid item xs={12} key={field.name}>
                                    {field.fieldType === 'select' ?
                                        (field.optionUrlKey && field.optionAPIResponseKey) ?
                                            (< SelectInput field={{
                                                ...field,
                                                optionUrlKey: field.optionUrlKey,
                                                optionAPIResponseKey: field.optionAPIResponseKey,
                                                fieldType: 'select'
                                            }}
                                                handleSelect={handleSelect} formik={formik} />) :
                                            <Select
                                                id={field.name}
                                                name={field.name}
                                                label={t(field.label)}
                                                placeholder=""
                                                value={value}
                                                items={field.options || []}
                                                onChange={(name, val) => handleSelect(name, val)}
                                                helperText={(touched && error) ? error : undefined}
                                                error={(touched && error) ? true : false}
                                            />
                                        : (field.fieldType === 'text') ?
                                            <Input
                                                id={field.name}
                                                label={t(field.label)}
                                                type='text'
                                                helperText={(touched && error) ? error : undefined}
                                                error={(touched && error) ? true : false}
                                                description=''
                                                value={value}
                                                onChange={(e) => {
                                                    handleChange(field.name, e.target.value);
                                                }}
                                            /> : (field.fieldType === 'checkbox') ?
                                                <FormControlLabel
                                                    sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                    className="checkbox-field"
                                                    control={
                                                        <Checkbox checked={value} value={value} onChange={(e) => {
                                                            handleChange(field.name, e.target.checked);
                                                        }} name={field.name} />
                                                    }
                                                    label={
                                                        <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                            {t(field.label)}
                                                        </Typography>
                                                    }
                                                />
                                                : null}

                                </Grid>
                        );
                    }
                    )}
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

