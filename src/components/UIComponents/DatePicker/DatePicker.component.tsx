import React, { Fragment, useState } from 'react'
import moment from "moment";
import { SingleDatePicker, toMomentObject } from 'react-dates';
import 'react-dates/initialize';
// import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import { InputLabel, InputBase, FormControl, FormHelperText , TextField, Box, Card} from '@mui/material';
import 'react-dates/lib/css/_datepicker.css';
import {  DatePicker as DatePickerField, LocalizationProvider , DatePickerProps as DatePickerFieldProps} from '@mui/lab';
// DatePicker as DatePickerField, StaticDatePicker as DatePickerField      StaticDatePickerProps DesktopDateTimePicker 
import DateAdapter from '@mui/lab/AdapterMoment';
import './DatePicker.style.scss';
import { ModeComment } from '@material-ui/icons';

// extends DatePickerFieldProps 
// interface DatePickerProps { // old
//   name: string;
//   description?:string;
//   id?: string;
//   width?: number;
//   label?: string;
//   placeholder?: string;
//   disabled?: boolean;
//   required?: boolean;
//   type?: string;
//   error?: boolean;
//   value: Date | string | null | moment.Moment;
//   helperText?: string;
//   mask?:string;
//   onChange:(name: string, text: Date|string |null | moment.Moment) => void;
// }


// interface DatePickerProps { // old
//   name: string;
//   description?:string;
//   id?: string;
//   width?: number;
//   label?: string;
//   placeholder?: string;
//   disabled?: boolean;
//   required?: boolean;
//   type?: string;
//   error?: boolean;
//   value: moment.Moment | null;
//   helperText?: string;
//   mask?:string;
//   onChange:(name: string, text:  moment.Moment | null) => void;
// }



export const DatePicker: React.FC<any> = (props) => {
    // const [value, setValue] = React.useState<Date | null>(new Date())
  const [flag, setFlag] = useState(false);
  const [dateFocused, setDateFocused] = React.useState<boolean>(true)
  const onBlur = () => setFlag(true);

  const disableDates = (date: moment.Moment | null) => {
    if(props.disableBeforeDate && props.disableAfterDate){
      return moment(date).isBefore(moment(props.disableBeforeDate)) && moment(date).isAfter(moment(props.disableAfterDate)) 
    }else{
      if(props.disableAfterDate){
        return moment(date).isAfter(moment(props.disableAfterDate)) 
      }else if(props.disableBeforeDate){
        return moment(date).isBefore(moment(props.disableBeforeDate)) 
      }else{
         return false;
      }
    }
  }
  return (
    <Fragment>
      <FormControl className="date-picker-container">
        {props.label && <InputLabel htmlFor={"my-input"}>{props.label}</InputLabel>}
        {/* <LocalizationProvider dateAdapter={DateAdapter}> */}
            {/* <DatePickerField
              displayStaticWrapperAs="desktop"
              openTo="year"
              value={props.value}
              onChange={(newValue)=>props.onChange(props.name, newValue)}
              // renderInput={(params) => <TextField {...params} />}
              renderInput={({ inputRef, inputProps, InputProps }) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <input ref={inputRef} {...inputProps} />
                  {InputProps?.endAdornment}
                </Box>
              )}
            /> */}
                {/* <DatePickerField         
                    mask={props.mask?props.mask:"____/__/__"}
                    className="date-picker-main"
                    value={props.value}
                    onChange={(newValue)=>props.onChange(props.name, newValue)}
                    renderInput={(params) => <TextField {...params} helperText={props.helperText} />}
                /> */}
              <SingleDatePicker
                disabled={props.disabled}
                required={props.required}
                hideKeyboardShortcutsPanel
                showDefaultInputIcon 
                inputIconPosition="before"
                transitionDuration={0}
                verticalSpacing={0}
                numberOfMonths={1}
                placeholder={props.placeholder}
                isOutsideRange={date => disableDates(date)}
                date={toMomentObject(props.value)} // momentPropTypes.momentObj or null
                onDateChange={date => props.onChange(props.name, date)} // PropTypes.func.isRequired
                focused={dateFocused} // PropTypes.bool
                onFocusChange={({ focused }) => setDateFocused(focused)} // PropTypes.func.isRequired
                id="your_unique_id" // PropTypes.string.isRequired,
              />
        {/* </LocalizationProvider> */}
        {props.helperText && <FormHelperText id={props.name} error={props.error}>{props.helperText}</FormHelperText>}
      </FormControl>
      <FormControl >
        {/* <InputLabel shrink htmlFor={props.id} className="date-picker-label" aria-labelledby={props.label} aria-required={props.required}>
          {props.label}{props.required && props.label && (<span className='super'>*</span>)}
        </InputLabel> */}
      </FormControl>
    </Fragment>
  )
}

DatePicker.defaultProps = {
  disabled: false,
  required: false,
  error: false,
}
