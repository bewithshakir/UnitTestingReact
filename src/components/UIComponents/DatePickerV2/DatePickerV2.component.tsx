import React, { Fragment } from 'react';
import { FormControl, FormHelperText, InputLabel, TextField, Box } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
// import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from "moment";
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';


import './DatePickerV2.style.scss';
import { CalendarIcon } from '../../../assets/icons';


// const styles = () => ({
//     notchedOutline: {
//         borderWidth: "1px",
//         borderColor: "yellow !important"
//       }
// });

type datePickerRange = DateRange<Date>;
type datePickerVariant = "single-date" | "date-range";

interface DatePickerProps {
    label?: string;
    type:datePickerVariant;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: moment.Moment | null;
    dateRangeValue?: datePickerRange ;
    helperText?: any;
    onChange?: (name: string, text: moment.Moment | null) => void;
    onDateRangeChange?: (name: string, text: datePickerRange) => void;
    onClose?: ((arg: { date: moment.Moment | null }) => void) | undefined;
    disableBeforeDate?: moment.Moment | null;
    disableAfterDate?: moment.Moment | null;
    displayFormat?: string;
    id: string;
    name: string;
}


const CalendarIconComp: React.FC = () => {
    return <div><CalendarIcon /></div>;
};

export const DatePickerV2: React.FC<DatePickerProps> = (props) => {
    // const [dateFocused, setDateFocused] = React.useState<boolean>(false)

    // const [value, setValue] = React.useState<datePickerRange>([null, null]);

    // const disableDates = (date: moment.Moment | null) => {
    //     if (props.disableBeforeDate && props.disableAfterDate) {
    //         return moment(date).isBefore(moment(props.disableBeforeDate)) && moment(date).isAfter(moment(props.disableAfterDate))
    //     } else {
    //         if (props.disableAfterDate) {
    //             return moment(date).isAfter(moment(props.disableAfterDate))
    //         } else if (props.disableBeforeDate) {
    //             return moment(date).isBefore(moment(props.disableBeforeDate))
    //         } else {
    //             return false;
    //         }
    //     }
    // }

    // const renderLabel = (date:moment.Moment) => {
    //     console.log(date.isValid());
    //     if (date.isValid()) {
    //       return date.format("DD/MM/YYYY");
    //     } else {
    //       return '';
    //     }
    //   }
    return (
        <Fragment>

            <FormControl className="date-picker-container">
              
                    <div className={props.error ? 'date-picker-error' : ''}>
                        {props.label && <InputLabel shrink htmlFor={props.id} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
                            <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
                        </InputLabel>
                        }
                          <LocalizationProvider dateAdapter={DateAdapter}>
                        {props.type === "date-range" && 
                        <DateRangePicker
                            className="custom-date-range-picker"
                            components={{ OpenPickerIcon: CalendarIconComp }}
                            startText={null}
                            endText={null}
                            value={props.dateRangeValue?props.dateRangeValue:[null,null]}
                            onChange={(newValue) => {
                                if(props.onDateRangeChange){
                                    props.onDateRangeChange(props.name,newValue);
                                }
                                // props.onDateRangeChange?props.onDateRangeChange(props.name,newValue):;
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} InputLabelProps={{ shrink: false }} />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} InputLabelProps={{ shrink: false }} />
                                </React.Fragment>
                            )}
                        /> }
                        {props.type === "single-date" && 
                        <DatePicker
                            disabled={props.disabled}
                            // label={"hello"}
                            components={{ OpenPickerIcon: CalendarIconComp }}
                            views={['year', 'month', 'day']}
                            value={props.value}
                            onChange={(newValue) => {
                                if(props.onChange){
                                    props.onChange(props.name, newValue);
                                }
                               
                            }}
                            
                            renderInput={(params) => {
                                console.warn("params-->",params);
                            return <TextField  placeholder="Outlined" {...params} inputProps={{placeholder:props.placeholder,value:props.value?moment(props.value).format("MM/DD/YYYY"):null  }} InputLabelProps={{ shrink: false }} />;}
                        }
                            // inputProps={{
                            //     endAdornment: (
                            //    <InputAdornment position="end">
                            //      <Icon>  <CalendarIcon />  </Icon>
                            //    </InputAdornment>
                            //  ) 
                        //    }}  
                           
                        />}
                          </LocalizationProvider>
                        {props.helperText && (
                            <FormHelperText
                                id={props.name}
                                error={props.error}
                                className="date-picker-helper-text"
                            >
                                {props.helperText}
                            </FormHelperText>)}

                    </div>
              
            </FormControl>
        </Fragment>
    );
};