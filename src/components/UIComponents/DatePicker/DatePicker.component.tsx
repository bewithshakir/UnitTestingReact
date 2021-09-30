import React, { Fragment, useState } from 'react'
import moment from "moment";
import { SingleDatePicker, toMomentObject } from 'react-dates';
import 'react-dates/initialize';
import { InputLabel, FormControl, FormHelperText, Grid } from '@mui/material';
import 'react-dates/lib/css/_datepicker.css';
import './DatePicker.style.scss';

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  value: moment.Moment | null;
  helperText?: string;
  onChange: (name: string, text: moment.Moment | null) => void;
  onClose?: ((arg: { date: moment.Moment | null }) => void) | undefined;
  disableBeforeDate?: moment.Moment | null;
  disableAfterDate?: moment.Moment | null;
  displayFormat?: string;
  id: string;
  name: string;
}


export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const [dateFocused, setDateFocused] = React.useState<boolean>(false)

  const disableDates = (date: moment.Moment | null) => {
    if (props.disableBeforeDate && props.disableAfterDate) {
      return moment(date).isBefore(moment(props.disableBeforeDate)) && moment(date).isAfter(moment(props.disableAfterDate))
    } else {
      if (props.disableAfterDate) {
        return moment(date).isAfter(moment(props.disableAfterDate))
      } else if (props.disableBeforeDate) {
        return moment(date).isBefore(moment(props.disableBeforeDate))
      } else {
        return false;
      }
    }
  }
  return (
    <Fragment>
      <FormControl className="date-picker-container">
        {props.label &&

          <InputLabel shrink htmlFor={props.id} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
            <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
          </InputLabel>
        }

        <SingleDatePicker
          disabled={props.disabled}
          readOnly={true}
          // required={props.required}
          hideKeyboardShortcutsPanel
          showDefaultInputIcon
          inputIconPosition="after"
          transitionDuration={0}
          verticalSpacing={0}
          numberOfMonths={1}
          onClose={props.onClose}
          displayFormat={props.displayFormat}
          placeholder={props.placeholder}
          isOutsideRange={date => disableDates(date)}
          date={toMomentObject(props.value)} // momentPropTypes.momentObj or null
          onDateChange={date => props.onChange(props.name, date)} // PropTypes.func.isRequired
          focused={dateFocused} // PropTypes.bool
          onFocusChange={({ focused }) => setDateFocused(focused)} // PropTypes.func.isRequired
          id={props.id}
        />
        {props.helperText && <FormHelperText id={props.name} error={props.error}>{props.helperText}</FormHelperText>}
      </FormControl>
    </Fragment>
  )
}
