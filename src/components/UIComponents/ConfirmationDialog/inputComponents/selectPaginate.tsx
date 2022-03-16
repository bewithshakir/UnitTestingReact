import { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import SingleSelectPaginate from "../../Select/SingleSelectPaginate";
import { FilterDialogField } from "../config";

interface Props {
    field: FilterDialogField,
    fieldId: string | number
    formik: FormikProps<{ [k: string]: any }>
}


const selectPaginate = (props: Props) => {
    const { field, fieldId, formik } = props;
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
            key={`dynFilt${fieldId}`}
            label={label}
            required={required}
            placeholder={placeHolder}
            apiUrl={apiUrl}
            responseFormatter={responseFormatter}
            extraApiParams={extraApiParams}
            onChange={(value => formik.setFieldValue(name, value))}
        />
    );
};

export default selectPaginate;