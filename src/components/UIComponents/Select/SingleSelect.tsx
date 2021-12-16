import { FormikErrors } from 'formik';
import { Fragment } from 'react';
import Select, { components, DropdownIndicatorProps, OptionProps } from 'react-select';
import { FormHelperText, InputLabel, FormControl } from '@mui/material';
import './SingleSelect.scss';
import { ArrowDown } from '../../../assets/icons';

const { SingleValue } = components;

type item = {
    label: string,
    value: string | number,
    icon?: JSX.Element
}
interface props {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    value?: item | Array<item>;
    items: Array<item> | [];

    required?: boolean;
    error?: boolean;
    helperText?: string | FormikErrors<item> | undefined;

    isDisabled?: boolean;

    description?: string;
    onChange: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    disabled?: boolean;
    components?: any;
    isLoading?: boolean;
    noOptionsMessage? : () => string
}

export default function SingleSelect(props: props) {

    const DropdownIndicator = (props: DropdownIndicatorProps<item>) => {
        return (
            <components.DropdownIndicator {...props}>
                <ArrowDown />
            </components.DropdownIndicator>
        );
    };

    const handleChange = (e: any) => {
        const { name, onChange } = props;
        onChange(name, e);
    };

    const Option = (props: OptionProps<any>) => {
        return (
            <components.Option {...props}>
                <Fragment>
                    <span className='box'>
                    {props.data.icon && <span className="icon-svg"> {props.data.icon} </span>}  <label className="label-text" >{props.label}</label>
                    </span>
                </Fragment>
            </components.Option>
        );
    };

    const SingleValueFrag = (props: any) => {
        return (
            <SingleValue {...props}>
                <span className='value-box'>
                {props.data.icon && <span className="icon-svg"> {props.data.icon} </span>} <span className="label-text" >{props.data.label}</span>
                </span>
            </SingleValue>
        );
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
                    onBlur={props.onBlur}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator, ...props.components, Option, SingleValue: SingleValueFrag}}
                    isSearchable={false}
                    isDisabled={props.isDisabled}
                    onKeyDown={e => e.preventDefault()}
                    isLoading={props.isLoading}
                    noOptionsMessage={props.noOptionsMessage}
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

SingleSelect.defaultProps = {
    required: false,
    id: "select-label",
    error: false,
    placeholder: 'Select',
};
