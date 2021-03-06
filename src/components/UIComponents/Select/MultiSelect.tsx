import { Fragment } from 'react';
import Select, { components, DropdownIndicatorProps, OptionProps } from 'react-select';
import { FormHelperText, InputLabel, FormControl } from '@mui/material';
import './SingleSelect.scss';
import { ArrowDown, CheckedCheckboxIcon as Check, UncheckedCheckboxIcon as UnCheck } from '../../../assets/icons';


type Item = {
    label: string,
    value: string | number,
    icon?: JSX.Element
}
interface Props {
    id?: string;
    name?: string;
    label: string;
    placeholder?: string;
    value?: Array<Item>;
    items: Array<Item>;

    required?: boolean;
    error?: boolean;
    helperText?: any;
    loadingMessage?: string;
    noOptionsMessage?: string;

    description?: string;
    onChange: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;

    disabled?: boolean
}


const MultiValue = (props: any) => {
    const { index, getValue } = props;
    const value = getValue();
    const length = value.length;
    const abLength = length - 2;
    if (index > 0) return null;

    return (length > 0) ?
        <div className="option-label">
            {length === 1 && (value[0].label)}
            {length === 2 && ([value[0].label, 'and', value[1].label].join(' '))}
            {length > 2 && ([`${value[0].label},`, value[1].label, 'and', abLength, 'more'].join(' '))}
        </div> : <components.MultiValue {...props} />
        ;
};


const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
    return (
        <components.DropdownIndicator {...props}>
            <ArrowDown />
        </components.DropdownIndicator>
    );
};

const Option = (props: OptionProps<any>) => {
    return (
        <components.Option {...props}>
            <Fragment>
                <span className='box'>
                    {props.isSelected ? <Check /> : <UnCheck />}
                    {props.data.icon && <span className="icon-svg">{props.data.icon}</span>} <label className="label-text" >{props.label} </label>
                </span>
            </Fragment>
        </components.Option>
    );
};

export default function MultiSelect(props: Props) {

    const handleChange = (e: any) => {
        const { name, onChange } = props;
        onChange(name, e);
    };

    return (
        <Fragment>
            <FormControl className='select'>
                <InputLabel
                    shrink
                    htmlFor={`${props.id}`}
                    style={{ color: 'var(--Darkgray)' }}
                    aria-labelledby={props.label}
                    aria-required={props.required}>
                    <b>
                        {props.label.toUpperCase()}
                        {props.required &&
                            props.label &&
                            (<span className='super' >* </span>)
                        }
                    </b >
                </InputLabel>
                <Select
                    id={props.id}
                    inputId={props.id}
                    name={props.name}
                    placeholder={props.placeholder}
                    className={props.error ? 'multi-select-container error' : 'multi-select-container'}
                    classNamePrefix='multi-select'
                    value={props.value}
                    options={props.items}
                    onChange={handleChange}
                    onBlur={props.onBlur}
                    components={{ ClearIndicator: () => null, IndicatorSeparator: () => null, Option, DropdownIndicator, MultiValue }}
                    isSearchable={false}
                    hideSelectedOptions={false}
                    closeMenuOnSelect={false}
                    isMulti={true}
                    noOptionsMessage={() => props.noOptionsMessage}
                    loadingMessage={() => props.loadingMessage}
                    isDisabled={props.disabled}
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
    noOptionsMessage: 'No Options found',
    loadingMessage: 'Loading...'
};
