import React, { useCallback } from "react";
import { FormHelperText, InputLabel, FormControl } from '@mui/material';

import { AsyncPaginate } from "react-select-async-paginate";
import { getDataFromServer } from "./queries";
import './SingleSelectPaginate.scss';

interface OptionItem {
    label: string
    value: string
    [k: string]: any
}

interface Props {
    name: string
    label?: string
    required?: boolean
    id?: string
    helperText?: string
    description?: string
    error?: boolean
    placeholder?: string
    apiUrl: string
    extraApiParams?: { [k: string]: any }
    /** default value is search */
    searchFieldName?: string
    responseFormatter: (data: any) => OptionItem[]
    onChange: (name: string, value: OptionItem) => any
    onBlur?: (name: string) => any
    value?: OptionItem
}
const limit = 15;
const defaultAdditional = {
    page: 0
};

const SingleSelectPaginate = (props: Props) => {
    const { name, apiUrl,
        onChange,
        responseFormatter,
        description,
        error,
        extraApiParams,
        helperText,
        value,
        id, label,
        placeholder,
        required, searchFieldName, onBlur } = props;

    const loadPageOptions: any = useCallback(async (q: string, prevOptions: { length: number }, { page }: { page: number }) => {
        if (q) {
            const { data } = await getDataFromServer(apiUrl, {
                ...(extraApiParams || {}),
                limit,
                offset: page * limit,
                [searchFieldName || 'search']: q
            });
            const options = responseFormatter(data);
            return {
                options,
                hasMore: options.length > 0,
                additional: { page: page + 1 }
            };
        }
        return {
            options: [],
            hasMore: false,
            additional: { page: page + 1 }
        };
    }, []);
    const handleChange = (newValue: any) => {
        onChange(name, newValue);
    };
    const handleBlur = () => {
        onBlur && onBlur(name);
    };

    return (
        <FormControl className='select' >
            {label && (
                <InputLabel
                    shrink htmlFor={`${id}`}
                    style={{ color: 'var(--Darkgray)' }}
                    aria-labelledby={label} aria-required={props.required}>
                    <b>{label.toUpperCase()}{required
                        && label
                        && (<span className='super' >* </span>)}
                    </b >
                </InputLabel>
            )}
            <AsyncPaginate
                className={props.error ? "select-paginate-custom error" : "select-paginate-custom"}
                classNamePrefix={'paginate-custom'}
                additional={defaultAdditional}
                value={value}
                loadOptions={loadPageOptions}
                onChange={handleChange}
                onBlur={handleBlur}
                noOptionsMessage={() => null}
                defaultOptions={false}
                menuPosition={'fixed'}
                placeholder={placeholder}
                debounceTimeout={300}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                }}
            />
            {helperText && (
                <FormHelperText
                    className='select-helper'
                    id={description}
                    error={error}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default SingleSelectPaginate;
