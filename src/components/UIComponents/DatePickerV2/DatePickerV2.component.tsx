import React, { Fragment } from 'react';
import { FormControl, FormHelperText, InputLabel, TextField, Icon, IconButton } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterMoment';
import InputAdornment from '@mui/material/InputAdornment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from "moment";
import './DatePickerV2.style.scss';
import { placeholder } from '@babel/types';
import {CalendarIcon} from '../../../assets/icons' ;

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


const CalendarIconComp: React.FC= (props) => {
    return <div><CalendarIcon/></div>
}

export const DatePickerV2: React.FC<DatePickerProps> = (props) => {
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
                <CalendarIcon />
            <LocalizationProvider dateAdapter={DateAdapter}>
                <div className={props.error ? 'date-picker-error' : ''}>
                    {props.label && <InputLabel shrink htmlFor={props.id} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
                        <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
                    </InputLabel>
                    }

                    <DatePicker
                        disabled={props.disabled}
                        components={{OpenPickerIcon:CalendarIconComp  }}
                        
                        // InputAdornmentProps={{position:"end", style:{display:"none"}}}
                        // InputAdornmentProps={{
                        //     position:"start",
                        //     children: <InputAdornment
                        //     position={'end'}
                        //     style={{
                   
                        //      maxHeight: 'none',
                        //      height: 'auto',
                        //      marginTop: '-1px',
                        //      marginRight: '-1px',
                        //      marginBottom: '-1px',
                        //    }}
                        //    >
                        //      <IconButton>  <CalendarIcon />  </IconButton>
                        //    </InputAdornment>

                        // }}
                        // required={props.required}
                        // label={props.placeholder}
                        views={['year', 'month', 'day']}
                        value={props.value}
                        onChange={(newValue) => {
                            props.onChange(props.name, newValue);
                        }}
                        // InputProps={{
                        //     startAdornment: (
                        //      <InputAdornment
                        //       position={'start'}
                        //       style={{
                        //        maxHeight: 'none',
                        //        display: 'none',
                        //        height: 'auto',
                        //        marginTop: '-1px',
                        //        marginRight: '-1px',
                        //        marginBottom: '-1px',
                        //       }}
                        //      >
                        //        <IconButton>  <CalendarIcon />  </IconButton>
                        //      </InputAdornment>
                        //     ),
                        //     endAdornment: (
                        //         <InputAdornment
                        //          position={'end'}
                        //          style={{
                                 
                        //           maxHeight: 'none',
                        //           height: 'auto',
                        //           marginTop: '-1px',
                        //           marginRight: '-1px',
                        //           marginBottom: '-1px',
                        //         }}
                        //         >
                        //           <IconButton>  <CalendarIcon />  </IconButton>
                        //         </InputAdornment>
                        //        )
                        //    }}
                        renderInput={(params) => <TextField {...params}  InputLabelProps={{ shrink: false}} />}
                    />
                    {/* inputProps={{placeholder:props.placeholder,
                             endAdornment: (
                            <InputAdornment position="end">
                              <Icon>  <CalendarIcon />  </Icon>
                            </InputAdornment>
                          ) 
                        }} */}

                    {/* <SingleDatePicker
          disabled={props.disabled}
          readOnly={true}
          required={props.required}
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
        /> */}
                    {props.helperText && <FormHelperText id={props.name} className="date-picker-helper-text" error={props.error}>{props.helperText}</FormHelperText>}
                </div>
            </LocalizationProvider>
            </FormControl>
        </Fragment>
    )
}