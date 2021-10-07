import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import moment from "moment";
import Select from "../Select/dropdown";
import { DatePicker } from "../DatePicker/DatePicker.component";
import { Button } from "../Button/Button.component";
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { styled } from '@mui/system';





interface InfoPanelProps {
    info?: Object;
    onClose: (...args: any[]) => void;
}

export const FilterContent: React.FC<InfoPanelProps> = ({ onClose }) => {
    const { theme } = useTheme();
    const formInitial = { state: [], city: [], settlementType: [], fromDate: null, toDate:null };
    const [form, setForm] = React.useState(formInitial);
    const [filterParams, setFilterParams] = React.useState({state: [], city: [], settlementType: [], date:[]} );
    const { t } = useTranslation();

    const MyComponent = styled('div')({ /* Experimental Code: Custom Style div */   
        color: theme["--White"],
        backgroundColor: theme["--Primary"]  /* Themes getting applied */
      });
      
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
    


    const CustomBtn = styled(Button)((props) =>({ 
          "&&":{
            backgroundColor: theme["--Primary"],
            "&:hover": {
                backgroundColor: theme["--Cancel-Btn"]  /* Experimental Code: Custom Style to TAPUP Button Component */
            } 
          }
    }));
      

      const CustomSelect = styled('div')((props) =>({ 
          "& .selection": {
            border: "1px solid "+ theme["--Lightgray_2"],
            background: theme["--White"] + "0% 0% no-repeat padding-box"
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
            { label: "New York", value: "New York" },
            { label: "Los Angeles", value: "Los Angeles" },
            { label: "Chicago", value: "Chicago" },
            { label: "San Diego", value: "San Diego" },
            { label: "Houston", value: "Houston" }
        ]
    }

    const settlementTypes = [
        { label: "Invoice", value: "Invoice" },
        { label: "Voyager", value: "Voyager" },
        { label: "WEX", value: "WEX" }
    ]

    const onDateChange = (name: string, newValue: Date | string | null | moment.Moment) => {
        setForm(x => ({ ...x, [name]: newValue }));
        // Object.values({...array1, [1]:"seven"});
        // Object.assign([...oldArray], {[dynamicIndex]: 4});

        if(name == "fromDate"){
            setFilterParams(x => ({ ...x, date:Object.assign([...filterParams.date], {[0]: newValue})}));
        }else if(name=="toDate"){
            setFilterParams(x => ({ ...x, date:Object.assign([...filterParams.date], {[1]: newValue})}));
        }
        
    }

    const handleSelect = (e: any) => {
        setForm(x => ({ ...x, [e.target.name]: e.target.value }));
    }

    // const createFilterParams = (formData: Object) => {
    //     // setFilterParams
    // }

    const applyFilter = () => {
        onClose(form);
        console.log("inside-filter-main", form);
    }

    const clearFilter = () => {
        setForm(formInitial);
    }
    return <div className="cust_filter_panel_content">
        <div>{JSON.stringify(form)}</div>
        <div>{JSON.stringify(filterParams)}</div>
        {/* <MyComponent>Styled div</MyComponent> */} {/* Experimental Code: Custom Style div -- theme getting applied here */}
         {/* <CustomBtn> Custom Btn </CustomBtn> */} {/* Experimental Code: Custom Style to TAPUP Button Component -- themes not getting applied here */}
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
                {/* <CustomSelect> */}
                <Select
                    name="state"
                    label="Select State"
                    placeholder=""
                    value={form.state}
                    items={geoData.states}
                    onChange={handleSelect}
                    multiple
                />
                {/* </CustomSelect> */}
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="city"
                    label="Select City"
                    placeholder=""
                    value={form.city}
                    items={geoData.cities}
                    onChange={handleSelect}
                    multiple
                />
            </Grid>
            <Grid item xs={12}>
                <Select
                    name="settlementType"
                    label="Settlement Type"
                    placeholder=""
                    value={form.settlementType}
                    items={settlementTypes}
                    onChange={handleSelect}
                    multiple
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

