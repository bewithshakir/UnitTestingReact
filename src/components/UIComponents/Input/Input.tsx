import React, { Fragment } from 'react'
import { InputLabel, InputBase, FormControl, FormHelperText} from '@material-ui/core';
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';
import './Input.scss';


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
      width: '16rem',
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
      }
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

interface props {
    name?: string;
    label: String;
    description?: String;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value?: String;
    onChange?: (...args: any[]) => void;
  }

export const TextField: React.FC<props> = (props:props) => {
    const classes = useStyles();
    return(
        <Fragment>
        <FormControl className={classes.margin}>
        <InputLabel shrink htmlFor="validation-outlined-input">
          <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
        </InputLabel>
        <Input name={props.name} value={props.value} id="validation-outlined-input" aria-describedby="component-text" disabled={props.disabled} required={props.required || props.error} onChange={props.onChange}/>
        {props.description && (<FormHelperText id="component-text" className={props.error ? 'MuiFormHelperText-error' : '' }>{props.description}</FormHelperText>)}
        </FormControl>
        </Fragment>
        )
}
