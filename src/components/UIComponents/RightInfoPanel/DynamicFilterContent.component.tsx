import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { filterStore } from "../../../store";
import moment from "moment";
import { Grid, FormControlLabel, Typography, FormControl } from "@mui/material";
import { FormikProvider, useFormik } from 'formik';
import Select from "../Select/MultiSelect";
import SingleSelect from "../Select/SingleSelect";
import { DatePickerInput } from "../DatePickerInput/DatePickerInput.component";
import { DateRange } from '@mui/lab/DateRangePicker';
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';
import { filterURLKey } from '../../../infrastructure/filterQuery';
import { SelectInput } from "./SelectInput";
import Input from '../../../components/UIComponents/Input/Input';
import Checkbox from '../Checkbox/Checkbox.component';
import Radio from '../Radio/Radio.component';
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
        fieldType: 'text' | 'date' | 'dateRange' | 'select' | 'checkbox' | 'multiCheckbox' | 'radio';
        /** don't pass undefined initialValue */
        initialValue: any
        /** options can be used in combination of select/multiCheckbox/radio */
        options?: { label: string; value: string;[k: string]: any }[];
        /** Used to call API and show data on dropdown. Update src/infrastructure/filterQuery.ts if needed */
        optionUrlKey?: filterURLKey
        /** default value false */
        singleSelect?: boolean
        /** used to pick data from response body of API call for dropdown. like 'states' | 'cities' | 'settlementType' */
        optionAPIResponseKey?: string
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

    function handleSelect(name: string, value: any, singleSelect?: boolean) {
        formik.setFieldValue(name, value);

        filterParams[name] = singleSelect ? value.value : value.map((obj: { label: string, value: string }) => obj.value);
    }
    function handleMultiCheckboxChange(name: string, value: any[], itemValue: string, isChecked: boolean) {
        const valueSet = new Set(value);
        isChecked ? valueSet.add(itemValue) : valueSet.delete(itemValue);
        const uniqueValue = Array.from(valueSet);
        formik.setFieldValue(name, uniqueValue);
        filterParams[name] = uniqueValue;
    }
    function handleRadioChange(name: string, itemValue: any, isChecked: boolean) {
        if (isChecked) {
            formik.setFieldValue(name, itemValue);
            filterParams[name] = itemValue;
        } else {
            formik.setFieldValue(name, null);
            delete filterParams[name];
        }
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
                <Grid container className="dynamicFilterGrid" >
                    <Grid container spacing={2} className="cust_filter_parent_grid row1">
                        {fields && fields.map(field => {
                            const touched = (formik.touched as any)[field.name];
                            const error = (formik.errors as any)[field.name];
                            const value = (formik.values as any)[field.name];
                            return (
                                field.fieldType === 'date' ?
                                    <Grid key={field.name} item xs={12} columnSpacing={2} container>
                                        <Grid item xs={12} className="cust_filter_date_label_grid">
                                            {t(field.label)}
                                        </Grid>
                                        <Grid container item xs={12} spacing="2">
                                            <DatePickerInput
                                                type="single-date"
                                                id="cust-filter-date"
                                                placeholder={t(field.label)}
                                                name={field.name}
                                                value={value}
                                                onChange={(name, val) => handleChange(name, moment(val).format("MM-DD-YYYY"))}
                                                helperText={(touched && error) ? error : undefined}
                                                error={(touched && error) ? true : false}
                                                dateRangeValue={value}
                                            />
                                        </Grid>
                                    </Grid>
                                    : field.fieldType === 'dateRange' ?
                                        <Grid key={field.name} item xs={12} columnSpacing={2} container>
                                            <Grid item xs={12} className="cust_filter_date_label_grid">
                                                {t('right-info-panel.filter.period')}
                                            </Grid>
                                            <Grid container item xs={12} spacing="2">
                                                <DatePickerInput
                                                    type="date-range"
                                                    id="cust-filter-date-range"
                                                    placeholder={{ start: t("right-info-panel.filter.from date"), end: t("right-info-panel.filter.to date") }}
                                                    name={field.name}
                                                    onDateRangeChange={(name, val) => onDateRangeChange(name, val)}
                                                    helperText={(touched && error) ? error : undefined}
                                                    error={(touched && error) ? true : false}
                                                    dateRangeValue={value}
                                                    required
                                                />
                                            </Grid>
                                        </Grid>
                                        : <Grid item xs={12} key={field.name}>
                                            {(field.fieldType === 'text') ?
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
                                                />
                                                : field.fieldType === 'select' ?
                                                    (field.optionUrlKey && field.optionAPIResponseKey) ?
                                                        (< SelectInput field={{
                                                            ...field,
                                                            optionUrlKey: field.optionUrlKey,
                                                            optionAPIResponseKey: field.optionAPIResponseKey,
                                                            fieldType: 'select'
                                                        }}
                                                            handleSelect={handleSelect} formik={formik} />) :
                                                        field.singleSelect ?
                                                            <SingleSelect
                                                                id={field.name}
                                                                name={field.name}
                                                                label={t(field.label)}
                                                                placeholder=""
                                                                value={value}
                                                                items={field.options || []}
                                                                onChange={(name, val) => handleSelect(name, val, true)}
                                                                helperText={(touched && error) ? error : undefined}
                                                                error={(touched && error) ? true : false} />
                                                            :
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
                                                    : (field.fieldType === 'multiCheckbox') ?
                                                        <FormControl className='formInput'>
                                                            <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                                {t(field.label)}
                                                            </Typography>
                                                            {(field.options && field.options.map(opt => {
                                                                return (
                                                                    <FormControlLabel key={`${field.name}-${opt.label}`}
                                                                        sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                                        className="checkbox-field"
                                                                        control={
                                                                            <Checkbox checked={value.includes(opt.value)} onChange={(e) => {
                                                                                handleMultiCheckboxChange(field.name, value, opt.value, e.target.checked);
                                                                            }} name={field.name} />
                                                                        }
                                                                        label={
                                                                            <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                                                {t(opt.label)}
                                                                            </Typography>
                                                                        }
                                                                    />
                                                                );
                                                            }))}
                                                        </FormControl>
                                                        : (field.fieldType === 'checkbox') ?
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
                                                            : (field.fieldType === 'radio') ?
                                                                <FormControl className='formInput'>
                                                                    <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                                        {t(field.label)}
                                                                    </Typography>
                                                                    {(field.options && field.options.map(opt => {
                                                                        return (
                                                                            <FormControlLabel key={`${field.name}-${opt.label}`}
                                                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                                                className="checkbox-field"
                                                                                control={
                                                                                    <Radio checked={value === opt.value} onClick={() => {
                                                                                        handleRadioChange(field.name, opt.value, opt.value !== value);
                                                                                    }} name={field.name} />
                                                                                }
                                                                                label={
                                                                                    <Typography color="var(--Darkgray)" variant="h4" className="fw-bold">
                                                                                        {t(opt.label)}
                                                                                    </Typography>
                                                                                }
                                                                            />
                                                                        );
                                                                    }))}
                                                                </FormControl>
                                                                : null}

                                        </Grid>
                            );
                        }
                        )}
                    </Grid>
                    <Grid container spacing={2} className="row2">
                        <div className="cust_filter_buttons_container">
                            <ClearBtn
                                type="reset"
                                types="cancel"
                                aria-label={t("right-info-panel.filter.buttons.clear all")}
                            >
                                {t("right-info-panel.filter.buttons.clear all")}
                            </ClearBtn >

                            <ApplyBtn
                                type="submit"
                                types="save"
                                disabled={!formik.dirty}
                                aria-label={t("right-info-panel.filter.buttons.apply")}
                            >
                                {t("right-info-panel.filter.buttons.apply")}
                            </ApplyBtn>

                        </div>
                    </Grid>
                </Grid>
            </form>
        </FormikProvider>
    </div>;
};

