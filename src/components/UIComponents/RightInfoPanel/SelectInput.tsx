
import { useTranslation } from "react-i18next";
import { useGetFilterData } from "../../../infrastructure/filterQuery";
import Select from "../Select/MultiSelect";
import SingleSelect from "../Select/SingleSelect";
import { filterURLKey } from '../../../infrastructure/filterQuery';

interface ISelectInput {
    field: {
        name: string;
        label: string;
        fieldType: 'select';
        singleSelect?: boolean;
        initialValue?: string | string[] | number | boolean
        optionUrlKey: filterURLKey
        /** like 'states' | 'cities' | 'settlementType' */
        optionAPIResponseKey: string
    },
    handleSelect: (name: string, value: string[], singleSelect?: boolean) => void;
    formik: any
}
export const SelectInput: React.FC<ISelectInput> = ({ field, handleSelect, formik }) => {
    const filterResponse = useGetFilterData(field.optionUrlKey);
    const { t } = useTranslation();

    const touched = (formik.touched as any)[field.name];
    const error = (formik.errors as any)[field.name];
    const value = (formik.values as any)[field.name];
    const items = filterResponse.status === 'success' && filterResponse.data?.data ?
        filterResponse.data.data[field.optionAPIResponseKey]?.map((s: any) => ({ label: s, value: s })) :
        [];

    return field.singleSelect ?
        <SingleSelect
            id={field.name}
            name={field.name}
            label={t(field.label)}
            placeholder=""
            value={value}
            items={items}
            onChange={(name, val) => handleSelect(name, val, true)}
            helperText={(touched && error) ? error : undefined}
            error={(touched && error) ? true : false} />
        : <Select
            id={field.name}
            name={field.name}
            label={t(field.label)}
            placeholder=""
            value={value}
            items={items}
            onChange={(name, val) => handleSelect(name, val)}
            helperText={(touched && error) ? error : undefined}
            error={(touched && error) ? true : false}
        />;
};