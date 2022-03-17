
import { getInputHelperText, getInputError } from "../../../../utils/helperFunctions";
import MultiSelect from "../../Select/MultiSelect";
import { DialogInputProps } from "../config";

const multiSelect = (props: DialogInputProps) => {
    const { field, fieldId, formik, onChange, handleTouched } = props;

    if (!field.options) {
        throw new Error('Options required');
    }
    const handleBlur = () => {
        handleTouched(field.name);
    };
    return <MultiSelect
        items={field.options}
        key={fieldId}
        placeholder={field.placeHolder}
        label={field.label}
        helperText={getInputHelperText(formik, field.name)}
        error={getInputError(formik, field.name)}
        name={field.name}
        value={formik?.values[field.name]}
        onChange={onChange}
        onBlur={handleBlur}
    />;
};

export default multiSelect;
