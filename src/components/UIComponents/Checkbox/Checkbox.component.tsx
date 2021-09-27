import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
// import UnCheckedIcon from '@material-ui/icons/ToggleOn/UnCheckedIcon'; //'@material-ui/svg-icons/toggle/check-box-outline-blank'
// import CheckedIcon from '@material-ui/icons/ToggleOn/checkedIcon';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

type CheckBoxOption = {
    label?: string;
    labelStyle?: string;
    iconStyle?: string;
    // uncheckedIcon?: any;
    // checkedIcon?: any;
}

interface checkBoxProps {
    options?: CheckBoxOption[],
    onSelect?: (selectedValue: object) => void,
}

export default function Checkboxes(props: checkBoxProps) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        console.log(event.target.checked)
    };

    return (
        <Checkbox
            // label='My checkbox'
            // labelStyle={{ color: 'white' }}
            // iconStyle={{ fill: 'white' }}
            defaultChecked
            color="default"
            // icon={<CheckBoxOutlineBlankIcon fontSize="small" className={'checkboxStyle'}/>}

            
            onChange={handleChange}
            checked={checked}
            // checkedIcon={<span className='checkedIconStyle' />}
            
            inputProps={{ 'aria-label': 'checkbox with default color' }}
        />
    )}