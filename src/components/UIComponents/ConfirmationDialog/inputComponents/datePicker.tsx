import { DatePickerInput } from "../../DatePickerInput/DatePickerInput.component";
import { getInputHelperText, getInputError } from "../../../../utils/helperFunctions";
import { DialogInputProps } from "../config";
// import { DateRange } from '@mui/lab/DateRangePicker';

// type datePickerRange = DateRange<Date>;
type datePickerType = "single-date" | "date-range";
const datePicker = ({ field, fieldId, formik, onChange }: DialogInputProps) => {

    const datePickerVariant: datePickerType = (field.fieldType === 'date' ?
        'single-date' : (field.fieldType === 'dateRange' ?
            'date-range' : 'single-date'));

    return <div className='dyn-dialog-field-label-div'>
        <DatePickerInput
            required={field.required}
            key={fieldId}
            name={field.name}
            onChange={onChange as any}
            disabled={field.disabled}
            value={formik?.values[field.name]}
            helperText={getInputHelperText(formik, field.name)}
            error={getInputError(formik, field.name)}
            type={datePickerVariant}
            id={`datePickerId${fieldId}`}
            label={field.label}
        />
    </div>;
};

export default datePicker; 