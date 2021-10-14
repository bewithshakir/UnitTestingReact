import React, { Fragment } from 'react';
import { FormControl, FormHelperText, InputLabel, TextField, Box, Icon } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from "moment";
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';


import './DatePickerInput.style.scss';
import { CalendarIcon } from '../../../assets/icons';

type datePickerRange = DateRange<Date>;
type datePickerVariant = "single-date" | "date-range";

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
    dateRangeMiddleText?:string 
}


const CalendarIconComp: React.FC = () => {
    return <div><CalendarIcon style={{ fontSize: '16px' }} /></div>;
};

export const DatePickerInput: React.FC<DatePickerProps> = ({label,type, placeholder, disabled, required, error, value, dateRangeValue, helperText, onChange, onDateRangeChange, disableBeforeDate, disableAfterDate, id, name, dateRangeMiddleText}) => {
      const disableDates = (date: moment.Moment  | null) => {

        if (disableBeforeDate && disableAfterDate) {
          return moment(date).isBefore(moment(disableBeforeDate)) && moment(date).isAfter(moment(disableAfterDate));
        } else {
          if (disableAfterDate) {
            return moment(date).isAfter(moment(disableAfterDate));
          } else if (disableBeforeDate) {
            return moment(date).isBefore(moment(disableBeforeDate));
          } else {
            return false;
          }
        }
      };
    return (
        <Fragment>
            <FormControl className="date-picker-container" >
                <div className={error ? 'date-picker-error' : ''}>
                    {label && <InputLabel shrink htmlFor={id} style={{ color: 'var(--Darkgray)' }} aria-labelledby={label} aria-required={required}>
                        <b>{label.toUpperCase()}{required && label && (<span className='super'>*</span>)}</b>
                    </InputLabel>
                    }
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        {type === "date-range" &&
                            <DateRangePicker
                                className="custom-date-range-picker"
                                startText={null}
                                endText={null}
                                shouldDisableDate={(val)=>disableDates(moment(val))}
                                value={dateRangeValue ? dateRangeValue : [null, null]}
                                onChange={(newValue) => {
                                    if (onDateRangeChange) {
                                        onDateRangeChange(name, newValue);
                                    }
                                }}
                                renderInput={(startProps, endProps) => {
                                    if (startProps.inputProps) {
                                        startProps.inputProps.placeholder = (typeof placeholder === 'object' && placeholder !== null) ? placeholder.start : "from";
                                    }
                                    if (endProps.inputProps) {
                                        endProps.inputProps.placeholder = (typeof placeholder === 'object' && placeholder !== null) ? placeholder.end : "to";
                                    }
                                    return <React.Fragment>
                                        <TextField {...startProps} InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                   <Icon > <CalendarIconComp /></Icon>
                                                </InputAdornment>
                                            ),
                                        }} InputLabelProps={{ shrink: false }} />
                                        <Box sx={{ mx: 2 }}> {dateRangeMiddleText?dateRangeMiddleText:""} </Box>
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
                        {type === "single-date" &&
                            <DatePicker
                                disabled={disabled}
                                components={{ OpenPickerIcon: CalendarIconComp }}
                                views={['year', 'month', 'day']}
                                value={value}
                                onChange={(newValue) => {
                                    if (onChange) {
                                        onChange(name, newValue);
                                    }
                                }}
                                shouldDisableDate={(val)=>disableDates(val)}
                                renderInput={(params) => {
                                    if (params.inputProps) {
                                        params.inputProps.placeholder = (typeof placeholder === 'string' && placeholder !== null)? placeholder:"";
                                    }
                                    return <TextField {...params} />;

                                }}
                            />}
                    </LocalizationProvider>
                    {helperText && (
                        <FormHelperText
                            id={name}
                            error={error}
                            className="date-picker-helper-text"
                        >
                            {helperText}
                        </FormHelperText>)}
                </div>
            </FormControl>
        </Fragment>
    );
};