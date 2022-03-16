
import { FormikProps } from "formik";
import { getInputHelperText, getInputError } from "../../../../utils/helperFunctions";
import SingleSelect from "../../Select/SingleSelect";
import { FilterDialogField, } from "../config";

interface Props {
    field: FilterDialogField,
    fieldId: string | number
    formik: FormikProps<{ [k: string]: any }>
}

const select = (props: Props) => {
    const { field, fieldId, formik } = props;
    if (!field.options) {
        throw new Error('Options required');
    }
    return <SingleSelect
        items={field.options}
        key={`dynFilt${fieldId}`}
        placeholder={field.placeHolder}
        label={field.label}
        helperText={getInputHelperText(formik, field.name)}
        error={getInputError(formik, field.name)}
        name={field.name}
        onChange={(name, e) => {
            formik.setFieldValue(name, e);
        }}
    />;
};

export default select;