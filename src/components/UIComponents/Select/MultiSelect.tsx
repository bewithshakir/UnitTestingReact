import { FormikErrors } from 'formik';
import { Fragment, Children } from 'react';
import Select, { components, DropdownIndicatorProps, OptionProps, ValueContainerProps } from 'react-select';
import { FormHelperText, InputLabel, FormControl } from '@mui/material';
import './SingleSelect.scss';
import { ArrowDown, CheckedCheckboxIcon as Check, UncheckedCheckboxIcon as UnCheck } from '../../../assets/icons';


type item = {
    label: string,
    value: string | number
}
interface props {
    id?: string;
    name?: string;
    label: string;
    placeholder?: string;
    value?: Array<item>;
    items: Array<item>;

    required?: boolean;
    error?: boolean;
    helperText?: string | FormikErrors<item> | undefined;

    description?: string;
    onChange: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
}

export default function MultiSelect(props: props) {
    

    const ValueContainer = (props:ValueContainerProps<any>) => {
        const { getValue, hasValue, children } = props;
        const value = getValue();
        const length = value.length;
        const abLength = length - 2 ;

        return(
            <components.ValueContainer {...props}>
                {!hasValue && null}
                {length === 1 && (value[0].label)}
                {length === 2 && ([value[0].label, 'and', value[1].label].join(' '))}
                {length > 2 && ([`${value[0].label},`,value[1].label, 'and', abLength, 'more'].join(' '))} 
                {children}
            </components.ValueContainer>
        )
    }


    const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
        return (
            <components.DropdownIndicator {...props}>
                <ArrowDown />
            </components.DropdownIndicator>
        )
    }

    const Option = (props: OptionProps<any>) => {
        return (
            <components.Option {...props}>
                <Fragment>
                    <span className='box'>
                        {props.isSelected ? <Check /> : <UnCheck />}
                        <label>{props.label}</label>
                    </span>
                </Fragment>
            </components.Option>
        )
    }
    const handleChange = (e: any) => {
        const { name, onChange } = props;
        onChange(name, e);
    }

    return (
        <Fragment>
            <FormControl className='select' >
                <InputLabel shrink htmlFor={`${props.id}-label`} style={{ color: 'var(--Darkgray)' }} aria-labelledby={props.label} aria-required={props.required}>
                    <b>{props.label.toUpperCase()}{props.required && props.label && (<span className='super' >* </span>)}</b >
                </InputLabel>
                <Select
                    id={props.id}
                    name={props.name}
                    placeholder={props.placeholder}
                    className={props.error ? 'multi-select-container error' : 'multi-select-container'}
                    classNamePrefix='multi-select'
                    value={props.value}
                    options={props.items}
                    onChange={handleChange}
                    onBlur={props.onBlur}
                    components={{ ValueContainer, ClearIndicator: () => null, IndicatorSeparator: () => null, Option, DropdownIndicator}}
                    isSearchable={false}
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                    isMulti={true}
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

MultiSelect.defaultProps = {
    required: false,
    id: "select-label",
    error: false,
    placeholder: 'Select',
}
