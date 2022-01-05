import React, { useEffect } from 'react';
import { Popper, ClickAwayListener, Icon } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import './TimePicker.style.scss';
import Input from '../Input/Input';
import { TimeBox } from './TimeBox.component';
import moment from 'moment';
import { timeFormatStr, timeValidationFormat, AM, initialTimeObj, timeErrorText, hoursMinsAutoSelection } from './config';
import { TimeIcon } from '../../../assets/icons';

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
    onBlur?: (...args: any[]) => void;
}

const timeValidation = (str: string) => {
    return moment(str, timeValidationFormat, true).isValid();
};


export const TimePicker: React.FC<TimePickerProps> = ({ label, value, onChange, name,required, timeDiffMins, disabled, id, helperText, error, placeholder, onBlur }) => {
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
                merd: AM,
                timeStrVal: ''
            });
            // setValidTime(value ? false : !required); // TEMP REF
        }
    };

    useEffect(() => {
        setInputValue(value);
        checkTimeAndPrepareTimeObj(value);

    }, [value]);


    const handleClick = (event: any) => {
        if(!disabled){
            setAnchorEl(event.currentTarget);
            setOpen(true);
        }
        
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    const onChangeByInput = (e: any) => {
        const val = e.target.value;
        setInputValue(val);
        onChange(name, val);
        checkTimeAndPrepareTimeObj(val);
    };

    const handleKeyDown = (e: any) => {
        if((inputValue && inputValue.length === 2) || (timeValidation(inputValue))) {
            setInputValue((value) => value.indexOf('0')<0 ? '0' + value: value);
        }

        if (e.keyCode != 8 && (inputValue.length === 2)) {
            setInputValue((value) => value += ":");
        } else {
            setInputValue(e.target.value);
        }
        setInputValue((value) => value.replace(/:+/g, ":"));
    };

    const onChangeByTimePicker = (timeStr: string | '', merdVal: string | '') => {
        const composedTimeStr = moment(`${timeStr?timeStr:hoursMinsAutoSelection} ${merdVal ? merdVal : AM}`, timeFormatStr).format(timeFormatStr);
        setInputValue(composedTimeStr);
        onChange(name, composedTimeStr);
        setTimeObj((timeObj) => ({
            ...timeObj,
            merd: merdVal,
            timeStr: composedTimeStr,
            timeStrVal: timeStr
        }));
    };

    const TimeIconComp: React.FC = () => {
        return <div><TimeIcon className="calendar-icon-div" /></div>;
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className="time-picker-container">
                <Input
                    id={id}
                    name={name}
                    required={required}
                    helperText={helperText ? helperText : (!validTime) ? timeErrorText : ''}
                    error={error ? error : !validTime}
                    autoComplete='off'
                    innerRef={inputRef}
                    label={label}
                    value={inputValue}
                    onChange={onChangeByInput}
                    onClick={handleClick}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    onBlur={onBlur}
                    endAdornment={<InputAdornment position="start"> <Icon ><TimeIconComp /></Icon></InputAdornment>}
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
