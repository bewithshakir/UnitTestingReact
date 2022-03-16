
import { useTranslation } from "react-i18next";
import SingleSelectPaginate from "../../Select/SingleSelectPaginate";
import { DialogInputProps } from "../config";


const selectPaginate = (props: DialogInputProps) => {
    const { field, fieldId, formik, onChange } = props;
    const { apiUrl, label, required, placeHolder, responseFormatter, extraApiParams, name } = field;
    const { t } = useTranslation();
    if (!apiUrl) {
        throw new Error(t('dynamicFilterPopup.singleSelectPaginate.apiUrlRequired'));
    }
    if (!responseFormatter) {
        throw new Error('dynamicFilterPopup.singleSelectPaginate.respFormatterRequired');
    }
    return (
        <SingleSelectPaginate
            name={name}
            key={fieldId}
            label={label}
            required={required}
            placeholder={placeHolder}
            apiUrl={apiUrl}
            value={formik?.values[field.name]}
            responseFormatter={responseFormatter}
            extraApiParams={extraApiParams}
            onChange={onChange}
        />
    );
};

export default selectPaginate;