import React from 'react';
import RadioButton from '@material-ui/core/Radio';
interface checkBoxProps {
    name: string;
    checked: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    value?: any,
    style?: any,
}

export default function Radio (props: checkBoxProps) {

    return (
        <RadioButton
            color="default"
            className={'checkboxStyle'}
            onChange={props.onChange}
            onClick={props.onClick}
            checked={props.checked}
            inputProps={{ 'aria-label': 'checkbox' }}
            name={props.name}
            disabled={props.disabled}
            style={props.style}
        />
    );
}

