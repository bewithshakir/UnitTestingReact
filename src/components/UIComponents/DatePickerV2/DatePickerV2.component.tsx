import React, { Fragment } from 'react';
import { FormControl, FormHelperText, InputLabel, TextField, Box, Icon } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import InputAdornment from '@mui/material/InputAdornment';
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
// interface rangePlaceHolder

interface DatePickerProps {
    label?: string;
    type: datePickerVariant;
    placeholder?: string | {
        start: string,
        end: string,
    };
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: moment.Moment| string | null;
    dateRangeValue?: datePickerRange;
    helperText?: any;
    onChange?: (name: string, text: moment.Moment | string | null) => void;
    onDateRangeChange?: (name: string, text: datePickerRange) => void;
    onClose?: ((arg: { date: moment.Moment | null }) => void) | undefined;
    disableBeforeDate?: moment.Moment | string | null;
    disableAfterDate?: moment.Moment | string | null;
    displayFormat?: string;
    id: string;
    name: string;
}


const CalendarIconComp: React.FC = () => {
    return <div><CalendarIcon style={{ fontSize: '16px' }} /></div>;
};

export const DatePickerV2: React.FC<DatePickerProps> = (props) => {
    // const disableRandomDates = () =>  {
    //     return Math.random() > 0.7;
    //   };
      const disableDates = (date: moment.Moment  | null) => {

        if (props.disableBeforeDate && props.disableAfterDate) {
          return moment(date).isBefore(moment(props.disableBeforeDate)) && moment(date).isAfter(moment(props.disableAfterDate));
        } else {
          if (props.disableAfterDate) {
            return moment(date).isAfter(moment(props.disableAfterDate));
          } else if (props.disableBeforeDate) {
            return moment(date).isBefore(moment(props.disableBeforeDate));
          } else {
            return false;
          }
        }
      };
    // className={"date-picker-container " + (props.type==="date-range" ? 'date-range-picker-error ' : '') + (props.error ? 'date-picker-error' : '')}
    return (
        <Fragment>
            <FormControl className="date-picker-container" >
                <div className={props.error ? 'date-picker-error' : ''}>
                    {props.label && <InputLabel shrink htmlFor={props.id} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
                        <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
                    </InputLabel>
                    }
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        {props.type === "date-range" &&
                            <DateRangePicker
                                className="custom-date-range-picker"
                                startText={null}
                                endText={null}
                                shouldDisableDate={(val)=>disableDates(moment(val))}
                                value={props.dateRangeValue ? props.dateRangeValue : [null, null]}
                                onChange={(newValue) => {
                                    if (props.onDateRangeChange) {
                                        props.onDateRangeChange(props.name, newValue);
                                    }
                                }}
                                renderInput={(startProps, endProps) => {
                                    if (startProps.inputProps) {
                                        startProps.inputProps.placeholder = (typeof props.placeholder === 'object' && props.placeholder !== null) ? props.placeholder.start : "from";
                                    }
                                    if (endProps.inputProps) {
                                        endProps.inputProps.placeholder = (typeof props.placeholder === 'object' && props.placeholder !== null) ? props.placeholder.end : "from";
                                    }
                                    return <React.Fragment>
                                        <TextField {...startProps} InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                   <Icon > <CalendarIconComp /></Icon>
                                                </InputAdornment>
                                            ),
                                        }} InputLabelProps={{ shrink: false }} />
                                        <Box sx={{ mx: 2 }}> to </Box>
                                        <TextField {...endProps} InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                   <Icon > <CalendarIconComp /></Icon>
                                                </InputAdornment>
                                            ),
                                        }} InputLabelProps={{ shrink: false }} />
                                    </React.Fragment>;
                                }}
                            />}
                        {props.type === "single-date" &&
                            <DatePicker
                                disabled={props.disabled}
                                components={{ OpenPickerIcon: CalendarIconComp }}
                                views={['year', 'month', 'day']}
                                value={props.value}
                                onChange={(newValue) => {
                                    if (props.onChange) {
                                        props.onChange(props.name, newValue);
                                    }
                                }}
                                shouldDisableDate={(val)=>disableDates(val)}
                                renderInput={(params) => {
                                    if (params.inputProps) {
                                        params.inputProps.placeholder = (typeof props.placeholder === 'string' && props.placeholder !== null)? props.placeholder:"";
                                    }
                                    return <TextField {...params} />;

                                }}
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