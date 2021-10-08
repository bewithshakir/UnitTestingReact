import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import moment from "moment";
import Select from "../Select/MultiSelect";
import { DatePicker } from "../DatePicker/DatePicker.component";
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';





interface InfoPanelProps {
    info?: Object;
    onClose: (...args: any[]) => void;
}

interface FilterDataProps {
    date?: string[],
    state?: string[],
    city?: string[],
    paymentType?: string[]
}

export const FilterContent: React.FC<InfoPanelProps> = ({ onClose }) => {
    const { theme } = useTheme();

    const formInitial = { state: [], city: [], paymentType: [], fromDate: null, toDate:null };
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
    
    //temporary dropdown data
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
        setForm(x => ({ ...x, [name]: e }));
        setFilterParams(x => ({...x, [name]: e.map((obj:{label:string,value:string}) => obj.value)})) // actual
    }

    const applyFilter = () => {
        console.log("inside-filter-main", form);
        onClose(filterParams);
        console.log("inside-filter-main", filterParams);
    }

    const clearFilter = () => {
        setForm(formInitial);
        setFilterParams({});
    }


    return <div className="cust_filter_panel_content">
        <div>{JSON.stringify(form)}</div>
        <div>{JSON.stringify(filterParams)}</div>
        <Grid container spacing={2} className="cust_filter_parent_grid">
            <Grid item  xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }} container>
                <Grid item xs={12} className="cust_filter_date_label_grid">
                    Period
                </Grid>
                <Grid container item xs={6} spacing="2">
                    <DatePicker
                        id="cust-filter-start-date"
                        placeholder="From Date"
                        name="fromDate"
                        onChange={onDateChange}
                        value={form.fromDate}
                    />
                </Grid>
                <Grid container item xs={6} spacing="2">
                    <DatePicker
                        id="cust-filter-end-date"
                        disableBeforeDate={form.fromDate}
                        placeholder="To Date"
                        name="toDate"
                        onChange={onDateChange}
                        value={form.toDate}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="state"
                    label="Select State"
                    placeholder=""
                    value={form.state}
                    items={geoData.states}
                    onChange={handleSelect}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="city"
                    label="Select City"
                    placeholder=""
                    value={form.city}
                    items={geoData.cities}
                    onChange={handleSelect}
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="paymentType"
                    label="Settlement Type"
                    placeholder=""
                    value={form.paymentType}
                    items={paymentTypes}
                    onChange={handleSelect}
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
                types="save"
                aria-label={t("customer-filter-panel.buttons.apply")}
                onClick={applyFilter}
            >
                {t("customer-filter-panel.buttons.apply")}
            </ApplyBtn>
        </div>
    </div>
}

