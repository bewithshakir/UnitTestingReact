import TextInput from "../../Input/Input";
import { DialogInputProps, } from "../config";
import { getInputHelperText, getInputError } from "../../../../utils/helperFunctions";


const InputText = (props: DialogInputProps) => {
    const { field, fieldId, formik, onChange } = props;
    return < TextInput
        id={fieldId}
        type='text'
        required={field.required}
        key={fieldId}
        placeholder={field.placeHolder}
        label={field.label}
        helperText={getInputHelperText(formik, field.name)}
        error={getInputError(formik, field.name)}
        name={field.name}
        value={formik?.values[field.name]}
        onChange={(e) => onChange(field.name, e.currentTarget.value)}
    />;
};

export default InputText;