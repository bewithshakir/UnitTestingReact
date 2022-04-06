
import { Typography, FormControlLabel } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';
import Checkbox from './Checkbox.component';

interface Props {
    id?: string
    label?: string
    required?: boolean
    /** 
     * value will be converted to boolean 
     * and will assign to checked property of checkbox 
     * */
    value?: any
    helperText?: string
    error?: boolean
    name: string
    /** value will be always in boolean */
    onChange: (name: string, value: boolean) => void
    onBlur?: () => void
}

const labelColor = "var(--Darkgray)";
const checkboxConfig = { marginLeft: "-0.5rem", marginBottom: "1rem", fontWeight: "bold" };
export default function ChecboxControl({ label, value, name, id, required, onChange }: Props) {
    const handleCange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onChange(name, event.target.checked);
    }, []);
    return (
        <FormControlLabel
            sx={checkboxConfig}
            className="checkbox-field"
            control={<Checkbox
                id={id}
                name={name}
                checked={Boolean(value)}
                onChange={handleCange}
            />}
            label={<Typography color={labelColor} variant="h4">
                {label}{required && (<span className='super'>*</span>)}
            </Typography>}
        />
    );
}
