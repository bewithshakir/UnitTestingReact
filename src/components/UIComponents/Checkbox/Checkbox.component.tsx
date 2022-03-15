import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { UncheckedCheckboxIcon, CheckedCheckboxIcon } from '../../../assets/icons';
interface checkBoxProps {
    name: string;
    checked: boolean;
    disabled?: boolean;
    indeterminate?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    value?: any
    style?: any
}

export default function Checkboxes (props: checkBoxProps) {

    return (
        <Checkbox
            color="default"
            className={'checkboxStyle'}
            checkedIcon={<CheckedCheckboxIcon />}
            indeterminateIcon={<UncheckedCheckboxIcon />}
            icon={<UncheckedCheckboxIcon />}
            onChange={props.onChange}
            indeterminate={props.indeterminate}
            onClick={props.onClick}
            checked={props.checked}
            inputProps={{ 'aria-label': 'checkbox' }}
            name={props.name}
            style={props.style}
            disabled={props.disabled}
        />
    );
}

