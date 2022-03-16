
import SingleSelect from "../../Select/SingleSelect";
import { FilterDialogField } from "../config";

interface Props {
    field: FilterDialogField,
    fieldId: string | number
}

const select = (props: Props) => {
    const { field, fieldId } = props;
    if (!field.options) {
        throw new Error('Options required');
    }
    return <SingleSelect onChange={() => null}
        items={field.options}
        key={`dynFilt${fieldId}`}
    />;
};

export default select;