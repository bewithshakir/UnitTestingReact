import React, { useCallback } from "react";
import { FormHelperText, InputLabel, FormControl } from '@mui/material';

import { AsyncPaginate } from "react-select-async-paginate";
import { getDataFromServer } from "./queries";
import './SingleSelectPaginate.scss';

export interface OptionItem {
    label: string
    value: string
    [k: string]: any
}

interface Props {
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
    onChange: (value: OptionItem) => any
    value?: OptionItem
}

const defaultAdditional = {
    page: 0
};


const SingleSelectPaginate = (props: Props) => {
    const { apiUrl,
        onChange,
        responseFormatter,
        description,
        error,
        extraApiParams,
        helperText,
        value,
        id, label,
        placeholder,
        required, searchFieldName } = props;

    const loadPageOptions: any = useCallback(async (q: string, prevOptions: { length: number }, { page }: { page: number }) => {
        if (q) {
            const { data } = await getDataFromServer(apiUrl, {
                ...(extraApiParams || {}),
                limit: 10,
                offset: page,
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
    const handleChange = (value: any) => {
        onChange(value);
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
                className="select-paginate-custom"
                additional={defaultAdditional}
                value={value}
                loadOptions={loadPageOptions}
                onChange={handleChange}
                noOptionsMessage={() => null}
                defaultOptions={false}
                menuPosition={'fixed'}
                placeholder={placeholder}
                debounceTimeout={300}
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
