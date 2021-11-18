
import { useTranslation } from "react-i18next";
import { useGetFilterData } from "../../../infrastructure/filterQuery";
import Select from "../Select/MultiSelect";
import { filterURLKey } from '../../../infrastructure/filterQuery';

interface ISelectInput {
    field: {
        name: string;
        label: string;
        fieldType: 'select';
        initialValue?: string | string[] | number | boolean
        optionUrlKey: filterURLKey
        optionAPIResponseKey: 'states' | 'cities' | 'settlementType'
    },
    handleSelect: (name: string, value: string[]) => void;
    formik: any
}
export const SelectInput: React.FC<ISelectInput> = ({ field, handleSelect, formik }) => {
    const filterResponse = useGetFilterData(field.optionUrlKey);
    const { t } = useTranslation();

    const touched = (formik.touched as any)[field.name];
    const error = (formik.errors as any)[field.name];
    const value = (formik.values as any)[field.name];
    return <Select
        id={field.name}
        name={field.name}
        label={t(field.label)}
        placeholder=""
        value={value}
        items={filterResponse.status === 'success' && filterResponse.data?.data ?
            filterResponse.data.data[field.optionAPIResponseKey].map((s: any) => ({ label: s, value: s })) :
            []}
        onChange={(name, val) => handleSelect(name, val)}
        helperText={(touched && error) ? error : undefined}
        error={(touched && error) ? true : false}
    />;
};