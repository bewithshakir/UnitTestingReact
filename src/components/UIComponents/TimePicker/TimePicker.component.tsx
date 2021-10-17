import React, { useEffect } from 'react';
import { Popper, ClickAwayListener } from '@mui/material';
import './TimePicker.style.scss';
import Input from '../Input/Input';
import { TimeBox } from './TimeBox.component';
import moment from 'moment';
import {timeFormatStr, timeValidationFormat} from './config';


type timeMer = 'AM' | 'PM' | '';

interface TimeFormat {
    timeStr: string | '',
    hour: number | null,
    minute: number | null,
    merd: string | timeMer
}

interface TimePickerProps {
    label: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    // value: TimeFormat | null;
    value: string | '';
    helperText?: string;
    onChange: (name: string, newValue: string | '') => void;
    onClose?: ((arg: { date: moment.Moment | null }) => void) | undefined;
    disableBeforeDate?: moment.Moment | null;
    disableAfterDate?: moment.Moment | null;
    displayFormat?: string;
    id: string;
    name: string;
}

const initialTimeObj = { timeStr: '', hour: null, minute: null, merd: '' };

const timeValidation = (strTime:string) =>  {
    return moment(strTime, timeValidationFormat, true).isValid();
};

export const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange , name,required}) => {
    const [validTime, setValidTime] = React.useState<boolean>(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [timeObj, setTimeObj] = React.useState<TimeFormat>(initialTimeObj);
    const [open, setOpen] = React.useState(Boolean(anchorEl));
    const inputRef = React.useRef();

    useEffect(() => {
        setInputValue(value);
        if(value && timeValidation(value)){
            setValidTime(true);
            const timeHourStr = moment(value,timeFormatStr).hours();
            setTimeObj({
                timeStr: value, 
                hour: timeHourStr>12?(timeHourStr-12):12, 
                minute: moment(value,timeFormatStr).minutes(), 
                merd: value.slice(-2)
            });
        }else{
            if(required){
                setValidTime(false);
            }else{
                setValidTime(true);
            }   
        }
    }, [value]);


    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClickAway = () => {
        if (inputRef && inputRef.current) {
            setAnchorEl(inputRef.current);
        }
        setOpen(false);
    };

    const onChangeByInput = (e: any) => {
        setInputValue(e.target.value);
        onChange(name,e.target.value);
        setTimeObj((timeObj) => ({ ...timeObj, timeStr: e.target.value }));
    };

    const onChangeByTimePicker = (timeStr: string | '') => {
        debugger;
        setInputValue(timeStr);
        onChange(name,timeStr);
        console.warn(timeValidation(timeStr)); 
        setTimeObj((timeObj) => ({ 
            ...timeObj, 
            timeStr: timeStr 
        }));
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="time-picker-container">
                <Input id="time-picker-input" autoFocus={true} autoComplete='off' error={!validTime} ref={inputRef} label={label} value={inputValue} onChange={onChangeByInput} onClick={handleClick} />
                <Popper
                    className="custom-popper"
                    disablePortal={true}
                    open={open}
                    anchorEl={anchorEl}
                >
                    <TimeBox hour={timeObj.hour} applyTimeStr={onChangeByTimePicker} minute={timeObj.minute} merd={timeObj.merd} onClose={handleClickAway} />
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

TimePicker.defaultProps = {
    disabled: false,
    required: false,
    id: "time-picker",
    error: false,
    value: ''
};
