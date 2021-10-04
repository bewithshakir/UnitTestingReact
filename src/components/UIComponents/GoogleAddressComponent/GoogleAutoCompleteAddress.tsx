import { useState, useEffect } from 'react'
import { Box, Grid} from '@mui/material';
import Input from '../Input/Input';
import useDebounce from '../../../utils/useDebounce';
import { FetchFormattedAddress } from '../../../actions/googleAddressAutoComlete';
import AutocompleteInput from './AutoCompleteInput';
import './GoogleAutoCompleteAddress.scss';

interface props {
    className?: string;
    name: string
    onChange: (...args: any[]) => void;
    onInputChange?: (...args: any[]) => void;
    required?: boolean;
    value: value;
}

type value =
    { addressLine1: string, addressLine2: string, city: string, state: string, postalCode: string }


export default function GoogleAutoCompleteAddress(props: props) {
    const [address, setAddress] = useState({ address1: '', address2: '', city: '', state: '', zip: '' , placeId:''});
    const handleChange = (e: any) => setAddress(x => ({ ...x, [e.target.name]: e.target.value }));
    const debouncedValue = useDebounce(address.placeId, 10);
    const { data } = FetchFormattedAddress(debouncedValue);

    const onChanges = () => {
        const { name, onChange } = props;
        const { address1, address2, city, state, zip } = address;
        const required = address1 && address2 && city && state && zip;
        const obj = { 
            addressLine1: address1,
            addressLine2: address2,
            city,
            state,
            postalCode: zip,
        }
        let objA = {
            target: {
                name: name,
                value: obj
            }
        }
        required && onChange(objA);
    }

    useEffect(() => {
        if (data) {
            // temporary fix for address2
            const getAddress2 = (x:string) => {
                let a = x.split(',');
                return a[a.length -1] || a[a.length-2];
            }
            const {address1, city, state, zip} = data.data;
            const obj ={
                address1,
                address2: getAddress2(address1),
                city,
                state,
                zip,
                placeId: ''
            }
           setAddress(obj);
        }
        onChanges();
    }, [data, props, onChanges])

    useEffect(() => {
        if(props.value){
            const { addressLine1, addressLine2, city, state, postalCode} = props.value;
            const obj = {
                address1: addressLine1,
                address2: addressLine2,
                city,
                state,
                zip: postalCode,
                placeId: ''
            }
            setAddress(obj);
        }
    }, [])

 

    return (
        <Box display="flex" mt={8} className={props.className || "address-container"}>
            <Grid container mt={1}>
                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                    <AutocompleteInput
                        name='address1'
                        label='ADDRESS LINE 1'
                        type='text'
                        onChange={handleChange}
                        value={address.address1}
                        required={props.required}
                    />
                </Grid>
                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                    <Input
                        name='address2'
                        label='ADDRESS LINE 2'
                        type='text'
                        onChange={handleChange}
                        value={address.address2}
                        required={props.required}
                    />
                </Grid>
                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                    <Input
                        name='city'
                        label='City'
                        type='text'
                        onChange={handleChange}
                        value={address.city}
                        required={props.required}
                    />
                </Grid>
                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                    <Input
                        name='state'
                        label='STATE / PROVINCE'
                        type='text'
                        onChange={handleChange}
                        value={address.state}
                        required={props.required}
                    />
                </Grid>
                <Grid item md={3} pl={2.5}>
                    <Input
                        name='zip'
                        label='POSTAL CODE'
                        type='text'
                        onChange={handleChange}
                        value={address.zip}
                        required={props.required}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}