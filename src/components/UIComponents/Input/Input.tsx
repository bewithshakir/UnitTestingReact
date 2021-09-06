import React, { Fragment } from 'react'
import { InputLabel, InputBase, FormControl, FormHelperText} from '@material-ui/core';
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';
import './Input.scss';

interface props {
    name?: string;
    id?:string;
    width?:number;
    label: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?:string;
    classes?:object;
    multiline?:boolean;
    type?:string;
    error?: boolean;
    value?: string;
    helperText?:string
    onChange?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
  }

 const TextField: React.FC<props> = (props:props) => {

  const Input = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        color: 'var(--Darkgray)',
        marginTop: theme.spacing(2.5),
      },
    },
    input: {
      borderRadius: 0,
      position: 'relative',
      background: 'var(--White) 0% 0% no-repeat padding-box',
      border: '1px solid var(--Lightgray_2)',  
      fontSize: 14,
      width: `${props.width || 16}rem`,
      padding: '10px 12px',
      '&:focus': {
        background: 'var(--White) 0% 0% no-repeat padding-box',
        color: 'var(--Darkgray)',  
        border: '2px solid var(--Darkgray)',
      },
      '&:active' : {
        background: 'var(--White) 0% 0% no-repeat padding-box',
        color: 'var(--Darkgray)',  
        border: '1px solid var(--Gray)',
      },
    },
  }),
)(InputBase);


 const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
 );

  const classes = useStyles();
    return(
        <Fragment>
        <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor={props.id || "input"} aria-labelledby={props.label} aria-required={props.required}>
          <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
        </InputLabel>
        <Input 
            id={props.id || "input"}
            aria-describedby={props.description}
            name={props.name} 
            value={props.value} 
            disabled={props.disabled} 
            placeholder={props.placeholder}
            required={props.required}
            aria-required={props.required}
            autoComplete={props.autoComplete}
            classes={props.classes}
            multiline={props.multiline}
            type={props.type}
            error={props.error} 
            onChange={props.onChange}
            onBlur={props.onBlur}
            />
        {props.helperText && (
            <FormHelperText 
                id={props.description} 
                className={props.error ? 'MuiFormHelperText-error' : '' }>
                    {props.helperText}
            </FormHelperText>)}
        </FormControl>
        </Fragment>
        )
}

export default TextField;