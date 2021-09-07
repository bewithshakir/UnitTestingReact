import React, { Fragment } from 'react';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, InputBase}  from '@material-ui/core';
import './dropdown.scss';


interface props {
  label : string;
  id?: string;
  value?: string | number;
  width?: number;
  items?: Array<any>; 
  onChange?: (...args: any[]) => void;
}

export default function CustomizedSelect(props:props) {

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
     margin: {
        margin: theme.spacing(1),
      },
    }),
  );

  const classes = useStyles();

  const renderItems = () =>{ 
    const { items } = props;
    return items.map(i => <MenuItem value={i.value}>{i.label}</MenuItem> ) || null;
  }

    return (
        <Fragment>
            <FormControl className={classes.margin}>
            <InputLabel id={`${props.id}`|| "select-label"}>{props.label}</InputLabel>
            <Select
                labelId={`${props.id}`|| "select-label"}
                id="demo-customized-select"
                value={props.value}
                onChange={props.onChange}
                input={<Input />}
                >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {renderItems()}
            </Select>
            </FormControl>
        </Fragment>
    )
}