import { Fragment } from 'react';
import { InputLabel, InputBase, FormControl, FormHelperText } from '@material-ui/core';
import './Input.scss';

interface props {
  name?: string;
  id?: string;
  width?: number | string;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  classes?: any;
  multiline?: boolean;
  type?: string;
  error?: boolean;
  value?: string;
  helperText?: string
  onChange?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
  onFocus?:(...args: any[]) => void;
  onClick?:(...args: any[]) => void;
  innerRef?:any;
  onKeyDown?:(...args: any[]) => void;
  inputProps?:any;
  endAdornment?:any;
  startAdornment?:any;
}

export default function Input (props: props) {

  return (
    <Fragment>
      <FormControl className='formInput'>
        <InputLabel shrink htmlFor={props.id} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
          <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
        </InputLabel>
        <InputBase
          id={props.id}
          ref={props.innerRef} 
          style={{ width: props.width }}
          aria-describedby={props.description}
          name={props.name}
          value={props.value}
          disabled={props.disabled}
          placeholder={props.placeholder}
          aria-required={props.required}
          autoComplete={props.autoComplete}
          classes={props.classes}
          multiline={props.multiline}
          type={props.type}
          error={props.error}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onClick={props.onClick}
          onKeyDown={props.onKeyDown}
          inputProps={props.inputProps}
          endAdornment={props.endAdornment}
          startAdornment={props.startAdornment}
        />
        {props.helperText && (
          <FormHelperText
            id={props.description}
            error={props.error}>
            {props.helperText}
          </FormHelperText>)}
      </FormControl>
    </Fragment>
  );
}

Input.defaultProps = {
  width: '100%',
  disabled: false,
  required: false,
  id: "input",
  autoComplete: "new-password",
  error: false,
};
