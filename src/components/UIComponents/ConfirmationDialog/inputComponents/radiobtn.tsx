import RadioComp from "../../Radio/Radio.component";
import { DialogInputProps } from "../config";
import { Typography } from '@mui/material';

const radioBtn = ({ field, fieldId, formik, onChange }: DialogInputProps) => {

    return <div className='dyn-dialog-field-label-div'>
        <RadioComp
            key={fieldId}
            checked={field.value === formik?.values[field.name]}
            name={field.name}
            onChange={(e) => onChange(e.target.name, e.target.value)}
            disabled={field.disabled}
            value={field.value ? field.value : field.label}
            onClick={e => e.stopPropagation()}
        />
        <Typography color={field.disabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
            {field.label}
        </Typography>
    </div>;
};

export default radioBtn; 
