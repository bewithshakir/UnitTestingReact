import { FormControl, FormHelperText, useAutocomplete } from '@mui/material';
import './AutoComplete.scss';

interface props {
    name?: string;
    id?: string;
    width?: number | string;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    required?: boolean;
    autoComplete?: string;
    classes?: object;
    error?: boolean;
    value?: any;
    helperText?: string
    onChange?: (...args: any[]) => void;
    onInputChange?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    options: Array<any>;
    optionTitle: string;
    freeSolo?: boolean;
}

export default function Autocomplete (props: props) {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: 'autocomplete',
        options: props.options,
        getOptionLabel: (option) => option[props.optionTitle],
        onChange: props.onChange,
        onInputChange: props.onInputChange,
        freeSolo: props.freeSolo
    });


    return (
        <div className='autocomplete'>
            <div {...getRootProps()}>
                <FormControl className='formInput'>
                    <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink label" {...getInputLabelProps()}>
                        <b>{props.label && props.label.toUpperCase()}{props.required && props.label && (<span className='super'>*</span>)}</b>
                    </label>
                    <div className={props.error ? "MuiInputBase-root MuiInputBase-formControl Mui-error" : "MuiInputBase-root MuiInputBase-formControl"} aria-required={props.required}>
                        <input aria-invalid="false" id="input" disabled={props.disabled} placeholder={props.placeholder} name={props.name} type="text" className="MuiInputBase-input" value={props.value} {...getInputProps()} onBlur={props.onBlur} />
                    </div>
                    {props.helperText && (
                        <FormHelperText
                            className='helper'
                            id={props.description}
                            error={props.error}>
                            {props.helperText}
                        </FormHelperText>)}
                </FormControl>
            </div>
            {groupedOptions.length > 0 ? (
                <ul className='listbox' {...getListboxProps()}>
                    {(groupedOptions as typeof props.options).map((option, index) => (
                        <li {...getOptionProps({ option, index })} key={index}>{option[props.optionTitle]}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}

Autocomplete.defaultProps = {
    width: '100%',
    disabled: false,
    required: false,
    id: "input",
    error: false,
};


