import React, { Fragment, useState } from 'react';
import { FormControl, FormHelperText, InputLabel, TextField, Box, Icon } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from "moment";
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import { dateRangeMiddleTextSx } from './config';
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
    value?: moment.Moment | string | null;
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
    dateRangeMiddleText?: string
    onBlur?: (...args: any[]) => void;
}


const CalendarIconComp: React.FC = () => {
    return <div><CalendarIcon className="calendar-icon-div" /></div>;
};

const inputEndornmentProps = {
    endAdornment: (
        <InputAdornment position="end">
            <Icon > <CalendarIconComp /></Icon>
        </InputAdornment>
    )
};

export const DatePickerInput: React.FC<DatePickerProps> = ({ label, type, placeholder, required, error, value, disabled, dateRangeValue, helperText, onChange, onDateRangeChange, disableBeforeDate, disableAfterDate, id, name, dateRangeMiddleText, onBlur }) => {
    const [openRangeCal, setOpenRangeCal] = useState(false);
    const [openSingleDateCal, setOpenSingleDateCal] = useState(false);
    const disableDates = (date: moment.Moment | null) => {

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

    const setRangePickerStatus = (status: boolean) => {
        if (!disabled) {
            setOpenRangeCal(status);
        }

    };

    const setSinglePickerStatus = (status: boolean) => {
        if (!disabled) {
            setOpenSingleDateCal(status);
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
                                onClose={() => setRangePickerStatus(false)}
                                open={openRangeCal}
                                disabled={disabled}
                                shouldDisableDate={(val) => disableDates(moment(val))}
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
                                        <TextField id={id} name={name}  onBlur={onBlur}  {...startProps} onClick={() => setRangePickerStatus(true)} InputProps={inputEndornmentProps} InputLabelProps={{ shrink: false }} />
                                        <Box sx={dateRangeMiddleTextSx}> {dateRangeMiddleText ? dateRangeMiddleText : ""} </Box>
                                        <TextField onBlur={onBlur} {...endProps} onClick={() => setRangePickerStatus(true)} InputProps={inputEndornmentProps} InputLabelProps={{ shrink: false }} />
                                    </React.Fragment>;
                                }}
                            />}
                        {type === "single-date" &&
                            <DatePicker
                                disabled={disabled}
                                components={{ OpenPickerIcon: CalendarIconComp }}
                                views={['year', 'month', 'day']}
                                value={value}
                                onClose={() => setSinglePickerStatus(false)}
                                open={openSingleDateCal}
                                onChange={(newValue) => {
                                    if (onChange) {
                                        onChange(name, newValue);
                                    }
                                }}
                                shouldDisableDate={(val) => disableDates(val)}
                                renderInput={(params) => {
                                    if (params.inputProps) {
                                        params.inputProps.placeholder = (typeof placeholder === 'string' && placeholder !== null) ? placeholder : "";
                                    }
                                    return <TextField id={id} name={name} onBlur={onBlur} onClick={() => setSinglePickerStatus(true)} {...params} />;

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