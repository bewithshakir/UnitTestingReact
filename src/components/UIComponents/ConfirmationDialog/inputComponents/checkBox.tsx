import CheckboxComp from "../../Checkbox/Checkbox.component";
import { DialogInputProps } from "../config";
import { Typography } from '@mui/material';

const checkBox = ({ field, fieldId, formik, onChange }: DialogInputProps) => {

    return <div className='dyn-dialog-field-label-div'>
        <CheckboxComp
            key={fieldId}
            checked={formik?.values[field.name]}
            name={field.name}
            onChange={onChange as any}
            disabled={field.disabled}
        />
        <Typography color={field.disabled ? 'var(--Secondary-Background)' : "var(--Darkgray)"} variant="h4" className="fw-bold">
            {field.label}
        </Typography>


    </div>;
};

export default checkBox; 
