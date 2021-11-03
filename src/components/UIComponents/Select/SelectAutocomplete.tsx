import { FormikErrors } from 'formik';
import { Fragment } from 'react';
import Select from 'react-select';
import { FormHelperText, InputLabel, FormControl } from '@mui/material';
import './SingleSelect.scss';

type item = {
    label: string,
    value: string | number
}

interface props {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    value: item | string | null;
    items?: Array<item>;

    required?: boolean;
    error?: boolean;
    helperText?: string | FormikErrors<item> | undefined;

    isDisabled?: boolean;

    description?: string;
    onChange: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    onInputChange: (...args: any[]) => void;
    disabled?: boolean;
    components?: any;
}

export default function SelectAutoComplete(props: props) {

    const handleInputChange =(keyword: string) => {
        props.onInputChange(keyword);
    };

    const handleChange = (e: any) => {
        const { name, onChange } = props;
        onChange(name, e);
    };

    return (
        <Fragment>
            <FormControl className='select' >
                {props.label && (<InputLabel shrink htmlFor={`${props.id}-label`} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
                    <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super' >* </span>)}</b >
                </InputLabel>)}
                <Select
                    id={props.id}
                    name={props.name}
                    placeholder={props.placeholder}
                    className={props.error ? 'react-select-container error' : 'react-select-container'}
                    classNamePrefix='react-select'
                    value={props.value}
                    options={props.items}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    onBlur={props.onBlur}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator: () => null}}
                    isSearchable={true}
                    isDisabled={props.disabled}
                    isMulti={false}
                />
                {props.helperText && (
                    <FormHelperText
                        className='select-helper'
                        id={props.description}
                        error={props.error}>
                        {props.helperText}
                    </FormHelperText>)}
            </FormControl>
        </Fragment>
    );


}

SelectAutoComplete.defaultProps = {
    required: false,
    id: "select-label",
    error: false,
    placeholder: 'Search Location',
};
