
import { getInputHelperText, getInputError } from "../../../../utils/helperFunctions";
import SingleSelect from "../../Select/SingleSelect";
import { DialogInputProps, OptionItem, } from "../config";
import { useGetFilterData } from "../queries";

const SelectDynamic = (props: DialogInputProps) => {
    const { field, fieldId, formik, onChange, handleTouched } = props;
    const { apiUrl, extraApiParams, responseFormatter } = field;
    if (!apiUrl || !responseFormatter) {
        throw new Error('API URL and response formatter is required');
    }
    let options: OptionItem[] = [];
    const { data } = useGetFilterData(apiUrl, extraApiParams || {});
    if (data) {
        options = responseFormatter(data?.data);
    }
    const handleBlur = () => {
        handleTouched(field.name);
    };
    return <SingleSelect
        items={options}
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

export default SelectDynamic;
