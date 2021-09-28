import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { UncheckedCheckboxIcon, CheckedCheckboxIcon } from '../../../assets/icons';
interface checkBoxProps {
}

export default function Checkboxes(props: checkBoxProps) {
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        console.log(event.target.checked)
    };

    return (
        <Checkbox
            color="default"
            className={'checkboxStyle'}
            checkedIcon={<CheckedCheckboxIcon />}
            icon={<UncheckedCheckboxIcon />}
            onChange={handleChange}
            checked={checked}
            inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
    )}