import { useState, useEffect } from 'react';
import { InputAdornment, OutlinedInput as Input, IconButton } from '@mui/material';
import { DropSearchIcon as SearchIcon } from '../../../assets/icons';
import './SearchInput.scss';
import useDebounce from '../../../utils/useDebounce';
interface props {
    id?: string;
    name?: string;
    width?: number | string;
    value?: string | number;
    placeholder?: string;
    classes?: any;
    type?: string;
    onChange: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    delay?: number;
}

export default function SearchInput(props: props) {
    const [value, setValue] = useState('');
    const searchTerm = useDebounce(value, props.delay || 0);
   
    const handleChange = (e: any) => {
        const { value } = e.target;
        setValue(value);
    };

    useEffect(()=>{
        props.onChange(searchTerm);
    },[searchTerm]);

    return (
        <Input
            className='searchinput'
            id={props.id}
            name={props.name}
            style={{ width: props.width }}
            value={value}
            inputProps={{ 'aria-label': 'search' }}
            placeholder={props.placeholder}
            classes={props.classes}
            type={props.type}
            onChange={handleChange}
            onBlur={props.onBlur}
            startAdornment={
                <InputAdornment position="start" className='adornment'>
                    <IconButton aria-label='search' edge='start'>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    );
}

SearchInput.defaultProps = {
    width: '100%',
    id: "SearchInput",
    placeholder: 'Search',
    type: 'text',
};