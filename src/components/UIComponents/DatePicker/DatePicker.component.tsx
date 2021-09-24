import React, { Fragment, useState } from 'react'
import moment from "moment";
import { InputLabel, InputBase, FormControl, FormHelperText , TextField} from '@mui/material';
import { DatePicker as DatePickerField, LocalizationProvider , DatePickerProps as DatePickerFieldProps} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import './DatePicker.style.scss';

// extends DatePickerFieldProps 
interface DatePickerProps {
  name: string;
  description?:string;
  id?: string;
  width?: number;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  error?: boolean;
  value: Date | string | null | moment.Moment;
  helperText?: string;
  mask?:string;
  onChange:(name: string, text: Date|string |null | moment.Moment) => void;
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
    // const [value, setValue] = React.useState<Date | null>(new Date())
  const [flag, setFlag] = useState(false);
  const onBlur = () => setFlag(true);

  return (
    <Fragment>
      <FormControl className="date-picker-container">
        {props.label && <InputLabel htmlFor={"my-input"}>{props.label}</InputLabel>}
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePickerField
                  mask={props.mask?props.mask:"____/__/__"}
                  
                  value={props.value}
                  onChange={(newValue)=>props.onChange(props.name, newValue)}
                  renderInput={(params) => <TextField {...params} helperText={props.helperText} />}
          />
        </LocalizationProvider>
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
  width: 460,
  disabled: false,
  required: false,
  error: false,
}
