import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Input from '../Input/Input';
import useDebounce from '../../../utils/useDebounce';
import { FetchFormattedAddress } from '../../../hooks/googleAddressAutoComlete';
import AutocompleteInput from './AutoCompleteInput';
import './GoogleAutoCompleteAddress.scss';

interface props {
    className?: string;
    name: string;
    label?: string;
    description?: string;
    placeholder?: string;
    onChange: (...args: any[]) => void;
    onInputChange?: (...args: any[]) => void;
    required?: boolean;
    value: string;
    error?: boolean;
    helperText?: string;
    onBlur?: (...args: any[]) => void;
}

type addressValue =
    { address1: string, address2: string, city: string, state: string, zip: string }


export default function GoogleAutoCompleteAddress (props: props) {
    const [address, setAddress] = useState({ address1: '', address2: '', city: '', state: '', zip: '', placeId: '' });
    const handleChange = (e: any) => { setAddress(x => ({ ...x, [e.target.name]: e.target.value })); };
    const debouncedValue = useDebounce(address.placeId, 10);
    const { data } = FetchFormattedAddress(debouncedValue);

    const onFinalChanges = (addresss: addressValue) => {
        const { address1, address2, city, state, zip } = addresss;
        const required = address1 && address2 && city && state && zip;
        const obj = {
            addressLine1: address1,
            addressLine2: address2,
            city,
            state,
            postalCode: zip,
        };
        required && props.onChange(obj);
    };

    useEffect(() => {
        if (data) {
            // temporary fix for address2
            const getAddress2 = (x: string) => {
                const a = x.split(',');
                return a[a.length - 1] || a[a.length - 2];
            };
            const { address1, city, state, zip } = data.data;
            const obj = {
                address1,
                address2: getAddress2(address1),
                city,
                state,
                zip,
                placeId: ''
            };
            setAddress(obj);
            onFinalChanges(obj);
        }
    }, [data]);

    return (
        <AutocompleteInput
            name={props.name}
            label={props.label}
            description={props.description}
            placeholder={props.placeholder}
            type='text'
            onChange={handleChange}
            onBlur={props.onBlur}
            value={props.value}
            required={props.required}
            helperText={props.helperText}
            error={props.error}
        />
    );
}