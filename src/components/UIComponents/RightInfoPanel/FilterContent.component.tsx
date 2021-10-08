import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Grid } from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import Select from "../Select/MultiSelect";
import { DatePicker } from "../DatePicker/DatePicker.component";
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';

interface SelectProps {
    label: string,
    value: string,
}




interface InfoPanelProps {
    info?: Object;
    onClose: (...args: any[]) => void;
}

interface filterForm {
    state: any[],
    city: any[],
    paymentType?: any[],
    fromDate: moment.Moment | null ,
    toDate: moment.Moment | null 
}

const initialValues: filterForm = {
    state:  [], 
    city:  [],
    paymentType:  [], 
    fromDate: null, 
    toDate:null 
}
  

const formInitial = { state: [], city: [], paymentType: [], fromDate: null, toDate:null };

export const FilterContent: React.FC<InfoPanelProps> = ({ onClose }) => {
    const { theme } = useTheme();

   
    const [form, setForm] = React.useState(formInitial);
    const [filterParams, setFilterParams] = React.useState<{[key: string]: string[]}>({ }); 
    const { t } = useTranslation();

    const ClearBtn = styled(Button)((props) =>({ 
        "&&":{
            width: '200px',
            backgroundColor: theme["--Cancel-Btn"],
            color: theme["--Darkgray"],
            border: "1px solid "+ theme["--Gray"],
            "&:hover": {
              backgroundColor: theme["--Lightgray_2"],
            }
        }
    }));

    const ApplyBtn = styled(Button)((props) =>({ 
        "&&":{
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
    }

    const paymentTypes = [
        { label: "Invoice", value: "Invoice" },
        { label: "Voyager", value: "Voyager" },
        { label: "WEX", value: "wex" }
    ]

    const onDateChange = (name: string, newValue: Date | string | null | moment.Moment) => {
        setForm(x => ({ ...x, [name]: newValue }));
 
        if(name == "fromDate"){ //actual
            setFilterParams(x => ({ ...x, date: [moment(newValue).format("MM-DD-YYYY"), form.toDate?moment(form.toDate).format("MM-DD-YYYY"):'']}));
        }else if(name=="toDate"){
            setFilterParams(x => ({ ...x, date: [form.fromDate?moment(form.fromDate).format("MM-DD-YYYY"):'', moment(newValue).format("MM-DD-YYYY")]}));
        }
    }
    
    const handleSelect = (name:any,e:any) => {
        // setForm(x => ({ ...x, [name]: e }));
        setFilterParams(x => ({...x, [name]: e.map((obj:{label:string,value:string}) => obj.value)})) // actual
    }

    const applyFilter = (formData: filterForm, resetForm: Function) => {
        // resetForm();
        // onClose(filterParams);
        console.log("inside-filter-main------>>", formData);
    }

    const clearFilter = () => {
        setForm(formInitial);
        setFilterParams({});
    }

    const formik = useFormik({
        initialValues,
        validationSchema:  Yup.object().shape({
            fromDate: Yup.object().nullable(),
            toDate: Yup.object().nullable().when("fromDate", {
                is: true,
                then: Yup.object().required("Please enter to date")
              })
        }),
        onSubmit: (values, actions) => {
            
            applyFilter(values, actions.resetForm);
        
        },
        enableReinitialize: true,
    });

    return <div className="cust_filter_panel_content">
        <div>{JSON.stringify(form)}</div>
        <div>{JSON.stringify(filterParams)}</div>
        <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className="cust_filter_parent_grid">
            
            <Grid item  xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }} container>
                <Grid item xs={12} className="cust_filter_date_label_grid">
                    Period
                </Grid>
                <Grid container item xs={6} spacing="2">
                    <DatePicker
                        id="fromDate"
                        placeholder="From Date"
                        name="fromDate"
                        // onChange={onDateChange}
                        value={formik.values.fromDate}
                        onChange={formik.setFieldValue}
                        helperText={(formik.touched.fromDate && formik.errors.fromDate) ? formik.errors.fromDate : undefined}
                        error={(formik.touched.fromDate && formik.errors.fromDate) ? true : false}
                        // {...formik.getFieldProps('fromDate')}
                    />
                </Grid>
                <Grid container item xs={6} spacing="2">
                    <DatePicker
                        id="toDate"
                        disableBeforeDate={form.fromDate}
                        placeholder="To Date"
                        name="toDate"
                        // onChange={onDateChange}
                        value={formik.values.toDate}
                        onChange={formik.setFieldValue}
                        helperText={(formik.touched.toDate && formik.errors.toDate) ? formik.errors.toDate : undefined}
                        error={(formik.touched.toDate && formik.errors.toDate) ? true : false}
                        // {...formik.getFieldProps('toDate')}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="state"
                    label="Select State"
                    placeholder=""
                    value={formik.values.state}
                    items={geoData.states}
                    onChange={formik.setFieldValue}
                     // helperText={(formik.touched.state && formik.errors.state) ? formik.errors.state : undefined}
                    // error={(formik.touched.state && formik.errors.state) ? true : false}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="city"
                    label="Select City"
                    placeholder=""
                    value={formik.values.city}
                    items={geoData.cities}
                    onChange={formik.setFieldValue}
                     // helperText={(formik.touched.city && formik.errors.city) ? formik.errors.city : undefined}
                    // error={(formik.touched.city && formik.errors.city) ? true : false}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="paymentType"
                    label="Settlement Type"
                    placeholder=""
                    items={paymentTypes}
                    onChange={formik.setFieldValue}
                    value={formik.values.paymentType}
                    helperText={(formik.touched.paymentType && formik.errors.paymentType) ? formik.errors.paymentType : undefined}
                    error={(formik.touched.paymentType && formik.errors.paymentType) ? true : false}
                />
            </Grid>
        </Grid>
        <div className="cust_filter_buttons_container">
            <ClearBtn
                
                types="cancel"
                aria-label={t("customer-filter-panel.buttons.clear all")}
                onClick={clearFilter}
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

