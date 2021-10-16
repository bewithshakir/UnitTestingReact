import React, { } from 'react';
// import Input from '@mui/material/Input';
import { InputAdornment } from '@mui/material';
import { Paper, Popper } from '@mui/material';
import './TimePicker.style.scss';
import Input from "../Input/Input";
import { ClickAwayListener } from '@mui/material';

interface TimeFormat {
    timeStr: string,
    hour: number | null,
    minute: number | null
}

interface TimePickerProps {
    label: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    value: TimeFormat | null;
    helperText?: string;
    onChange: (name: string, timeObject: 'string' | number | null) => void;
    onClose?: ((arg: { date: moment.Moment | null }) => void) | undefined;
    disableBeforeDate?: moment.Moment | null;
    disableAfterDate?: moment.Moment | null;
    displayFormat?: string;
    id: string;
    name: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({ label, value }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [open, setOpen] = React.useState(Boolean(anchorEl));
    const popperId = open ? 'simple-popper' : undefined;
    const handleClick = (event: any) => {
        console.warn(event.currentTarget);
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const onChange = () => {
        setOpen(true);
    };

    const onBlur = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClick}>
            <div className="time-picker-container">
                <Input label={label} autoFocus={false} value={value?.timeStr} onChange={onChange} onClick={handleClick} onBlur={onBlur} />
                <Popper
                    id={popperId}
                    open={open}
                    anchorEl={anchorEl}
                >
                    <div className='time-div'>
                        <Paper > Hello Simple Popper</Paper>
                    </div>
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
    value: {
        timeStr: '',
        hour: null,
        minute: null
    }
};
