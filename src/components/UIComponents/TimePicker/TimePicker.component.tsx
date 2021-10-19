import React, { useEffect } from 'react';
import { Popper, ClickAwayListener } from '@mui/material';
import './TimePicker.style.scss';
import Input from '../Input/Input';
import { TimeBox } from './TimeBox.component';
import moment from 'moment';
import { timeFormatStr, timeValidationFormat, AM, initialTimeObj, timeErrorText } from './config';

type timeMer = 'AM' | 'PM' | '';

interface TimeFormat {
    timeStr: string | '',
    merd: string | timeMer,
    timeStrVal: string | '';
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
    id: string;
    name: string;
    timeDiffMins?: number;
}

const timeValidation = (str: string) => {
    return moment(str, timeValidationFormat, true).isValid();
};


export const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange, name, required, timeDiffMins, disabled, id, helperText, error, placeholder }) => {
    const [validTime, setValidTime] = React.useState<boolean>(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [timeObj, setTimeObj] = React.useState<TimeFormat>(initialTimeObj);
    const [open, setOpen] = React.useState(Boolean(anchorEl));
    const inputRef = React.useRef();

    const checkTimeAndPrepareTimeObj = (value: string) => {
        if (value && timeValidation(value)) {
            setValidTime(true);
            const hourStr = moment(value, timeFormatStr).hours();
            const twelveHourStr = (hourStr % 12) || 12;
            const minuteStr = moment(value, timeFormatStr).minutes();
            setTimeObj({
                timeStr: value,
                merd: value.slice(-2),
                timeStrVal: ('0' + twelveHourStr).slice(-2) + ':' + ('0' + minuteStr).slice(-2)
            });
        } else {
            setTimeObj({
                timeStr: '',
                merd: '',
                timeStrVal: ''
            });
            setValidTime(value?false:!required);
        }
    };

    useEffect(() => {
        setInputValue(value);
        checkTimeAndPrepareTimeObj(value);

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
        onChange(name, e.target.value);
        const val = e.target.value;
        checkTimeAndPrepareTimeObj(val);
    };

    const handleKeyDown = (e: any) => {
        if(e.keyCode != 8 && (inputValue.length === 2)) {
            setInputValue((value)=>value += ":");
        }else{
            setInputValue(e.target.value);
        }
        setInputValue((value)=>value.replace(/:+/g,":"));
    };

    const onChangeByTimePicker = (timeStr: string | '', merdVal: string | '') => {
        const composedTimeStr = moment(`${timeStr} ${merdVal ? merdVal : AM}`, timeFormatStr).format(timeFormatStr);
        setInputValue(composedTimeStr);
        onChange(name, composedTimeStr);
        setTimeObj((timeObj) => ({
            ...timeObj,
            merd: merdVal,
            timeStr: composedTimeStr,
            timeStrVal: timeStr
        }));
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="time-picker-container">
                <Input 
                id={id} 
                autoFocus={true} 
                name={name} 
                helperText={helperText?helperText:(!validTime)?timeErrorText:''} 
                error={error?error:!validTime} disabled={disabled} 
                autoComplete='off' 
                innerRef={inputRef} 
                label={label} 
                value={inputValue} 
                onChange={onChangeByInput} 
                onClick={handleClick}
                placeholder={placeholder} 
                onKeyDown={handleKeyDown}
                />
                <Popper
                    className="custom-popper"
                    disablePortal={true}
                    open={open}
                    anchorEl={anchorEl}
                    placement="bottom-start"
                >
                    <TimeBox timeDiffMins={timeDiffMins} timeStrVal={timeObj.timeStrVal} applyTimeStr={onChangeByTimePicker} merd={timeObj.merd} onClose={handleClickAway} />
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
