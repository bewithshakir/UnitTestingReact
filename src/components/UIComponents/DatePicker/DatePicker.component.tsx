import React, { Fragment, useState } from 'react'
import { InputLabel, InputBase, FormControl, FormHelperText , TextField} from '@mui/material';
import { DatePicker as DatePickerField, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import './DatePicker.style.scss';

interface props {
  name?: string;
  id?: string;
//   width?: number;
  label: string;
//   placeholder?: string;
//   description?: string;
//   disabled?: boolean;
  required?: boolean;
//   autoComplete?: string;
//   classes?: object;
//   multiline?: boolean;
//   type?: string;
//   error?: boolean;
//   value?: string;
//   helperText?: string
//   onChange?: (...args: any[]) => void;
}

export default function DatePicker(props: props) {
    const [value, setValue] = React.useState<Date | null>(new Date())
  const [flag, setFlag] = useState(false);

  const onBlur = () => setFlag(true);

  return (
    <Fragment>
      <FormControl>
        <InputLabel shrink htmlFor={props.id} style={{ color: 'var(--Darkgray)'}} aria-labelledby={props.label} aria-required={props.required}>
          <b>{props.label}{props.required && props.label && (<span className='super'>*</span>)}</b>
        </InputLabel>
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePickerField
                mask="____/__/__"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        
        {/* {props.helperText && (
          <FormHelperText
            id={props.description}
            error={props.error}>
            {props.helperText}
          </FormHelperText>)} */}
      </FormControl>
    </Fragment>
  )
}

DatePicker.defaultProps = {
  width: 460,
  disabled: false,
  required: false,
  id: "input",
  error: false,
}
