import { FormikErrors } from 'formik';
import { Fragment } from 'react';
import Select, { components, DropdownIndicatorProps }  from 'react-select';
import { FormHelperText, InputLabel, FormControl} from '@mui/material';
import './SingleSelect.scss';
import { ArrowDown } from '../../../assets/icons';

type item = {
    label: string,
    value: string | number
}
interface props {
    id?: string;
    name?: string;
    label: string;
    placeholder?: string;
    value?: any;
    items: Array<item>;

    required?: boolean;
    error?: boolean;
    helperText?: string | string[] | FormikErrors<item>[] | undefined;

    description?: string;
    onChange: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
}

export default function SingleSelect(props: props) {

   const DropdownIndicator = (props:DropdownIndicatorProps<item>) => {
       return (
           <components.DropdownIndicator {...props}>
               <ArrowDown/>
           </components.DropdownIndicator>
       )
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
                    placeholder={'Select'}
                    className={props.error ? 'react-select-container error' : 'react-select-container'}
                    classNamePrefix='react-select'
                    value={props.value}
                    options={props.items}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    components={{ IndicatorSeparator: () => null, DropdownIndicator }}
                    isSearchable={false}
                />
                {props.helperText && (
                <FormHelperText
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
}
