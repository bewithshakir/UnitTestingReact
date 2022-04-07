import { useCallback } from "react";
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
        optionAPIResponseKey: string;
        customerId?: string;
        options?: { label: string; value: string;[k: string]: any }[] | undefined;
    },
    handleSelect: (name: string, value: string[], singleSelect?: boolean) => void;
    formik: any
}
export const SelectInput: React.FC<ISelectInput> = ({ field, handleSelect, formik }) => {
    const filterResponse = useGetFilterData(field.optionUrlKey, field.customerId);

    const { t } = useTranslation();
    const touched = (formik.touched as any)[field.name];
    const error = (formik.errors as any)[field.name];
    const value = (formik.values as any)[field.name];

    const getItems = useCallback(() => {
        if (field.singleSelect && field.optionUrlKey === "truckOverviewFilter") {
            return field['options'];
        }
        if (filterResponse.status === 'success' && filterResponse.data?.data) {
            return filterResponse.data.data[field.optionAPIResponseKey]?.map((s: any) => {
                return (s.productNm ? { label: s.productNm, value: s.productCd } : { label: s, value: s });
            });
        }
        return [];

    }, [filterResponse.data]);

    const helperText = useCallback(() => {
        if (touched && error) return error;
        else return undefined;
    }, [touched, error]);

    const isError = useCallback(() => {
        if (touched && error) return true;
        else return false;
    }, [touched, error]);

    return field.singleSelect ?
        <SingleSelect
            id={field.name}
            name={field.name}
            label={t(field.label)}
            placeholder=""
            value={value}
            items={getItems()}
            onChange={(name, val) => handleSelect(name, val, true)}
            helperText={helperText()}
            error={isError()} />
        : <Select
            id={field.name}
            name={field.name}
            label={t(field.label)}
            placeholder=""
            value={value}
            items={getItems()}
            onChange={(name, val) => handleSelect(name, val)}
            helperText={helperText()}
            error={isError()}
        />;
};