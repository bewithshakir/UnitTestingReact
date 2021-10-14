import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { UncheckedCheckboxIcon, CheckedCheckboxIcon } from '../../../assets/icons';
interface checkBoxProps {
    name: string;
    checked: boolean;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkboxes(props: checkBoxProps) {

    return (
        <Checkbox
            color="default"
            className={'checkboxStyle'}
            checkedIcon={<CheckedCheckboxIcon />}
            icon={<UncheckedCheckboxIcon />}
            onChange={props.onChange}
            checked={props.checked}
            inputProps={{ 'aria-label': 'checkbox' }}
            name={props.name}
            disabled={props.disabled}
        />
    );}

