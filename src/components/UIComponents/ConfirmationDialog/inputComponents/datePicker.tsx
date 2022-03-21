import { DatePickerInput } from "../../DatePickerInput/DatePickerInput.component";
import { getInputHelperText, getInputError } from "../../../../utils/helperFunctions";
import { DialogInputProps } from "../config";

const datePicker = ({ field, fieldId, formik, onChange, handleTouched }: DialogInputProps) => {
    const handleBlur = () => {
        handleTouched(field.name);
    };

    return <div className='dyn-dialog-field-label-div'>
        {field.fieldType === 'date' && <DatePickerInput
            required={field.required}
            key={fieldId}
            name={field.name}
            onChange={onChange}
            disabled={field.disabled}
            value={formik?.values[field.name]}
            helperText={getInputHelperText(formik, field.name)}
            error={getInputError(formik, field.name)}
            type={'single-date'}
            id={`datePickerId${fieldId}`}
            label={field.label}
            placeholder={field.placeHolder}
            onBlur={handleBlur}
        />}

        {field.fieldType === 'dateRange' && <DatePickerInput
            required={field.required}
            key={fieldId}
            name={field.name}
            onDateRangeChange={onChange}
            disabled={field.disabled}
            dateRangeValue={formik?.values[field.name]}
            helperText={getInputHelperText(formik, field.name)}
            error={getInputError(formik, field.name)}
            type={'date-range'}
            id={`datePickerId${fieldId}`}
            label={field.label}
            placeholder={field.dateRangerPlaceHolder}
            onBlur={handleBlur}
        />}

    </div>;
};

export default datePicker;
