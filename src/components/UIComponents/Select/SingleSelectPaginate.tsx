import React, { useCallback } from "react";
import { components } from 'react-select';
import { FormHelperText, InputLabel, FormControl, Box, Icon, Typography } from '@mui/material';

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
    value?: OptionItem
}

const defaultAdditional = {
    page: 0
};

const { SingleValue } = components;
const optionIconsSX = { width: "20px", height: "20px" };

const SingleValueFrag = (props: any) => {
    return (
        <SingleValue {...props}>
            <Box display="flex" alignItems="center" justifyContent="start">
                {props.data.icon ? <Icon sx={optionIconsSX} component={props.data.icon} /> : null}
                {props.data.label ? <Typography variant="h4" pl={props.data.icon ? 1 : 0}>{props.data.label}</Typography> : null}
            </Box>
        </SingleValue>
    );
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
    const handleChange = (newValue: any) => {
        onChange(name, newValue);
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
                classNamePrefix={'paginate-custom'}
                additional={defaultAdditional}
                value={value}
                loadOptions={loadPageOptions}
                onChange={handleChange}
                noOptionsMessage={() => null}
                defaultOptions={false}
                menuPosition={'fixed'}
                placeholder={placeholder}
                debounceTimeout={300}
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                    SingleValue: SingleValueFrag,
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
