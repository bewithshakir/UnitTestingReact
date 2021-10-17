import React, { useEffect } from 'react';
import { Popper, ClickAwayListener } from '@mui/material';
import './TimePicker.style.scss';
import Input from '../Input/Input';
import { TimeBox } from './TimeBox.component';
import moment from 'moment';
import {timeFormatStr, timeValidationFormat, AM} from './config';


type timeMer = 'AM' | 'PM' | '';

interface TimeFormat {
    timeStr: string | '',
    merd: string | timeMer,
    timeStrVal:  string | '';
}

interface TimePickerProps {
    label: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
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

const initialTimeObj = { timeStr: '', hour: null, minute: null, merd: '', timeStrVal:'' };

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
            const hourStr = moment(value,timeFormatStr).hours();
            const twelveHourStr = (hourStr % 12) || 12;
            const minuteStr = moment(value,timeFormatStr).minutes();
            setTimeObj({
                timeStr: value, 
                merd: value.slice(-2),
                timeStrVal: ('0' + twelveHourStr).slice(-2) + ':' + ('0' + minuteStr).slice(-2)
                
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

    const onChangeByTimePicker = (timeStr: string | '' , merdVal: string | '') => {
        const composedTimeStr = moment(`${timeStr} ${merdVal?merdVal:AM}`,timeFormatStr).format(timeFormatStr);
        setInputValue(composedTimeStr);
        onChange(name,composedTimeStr); 
        setTimeObj((timeObj) => ({ 
            ...timeObj, 
            merd: merdVal,
            timeStr: composedTimeStr,
            timeStrVal:timeStr
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
                    <TimeBox timeStrVal={timeObj.timeStrVal} applyTimeStr={onChangeByTimePicker} merd={timeObj.merd} onClose={handleClickAway} />
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
