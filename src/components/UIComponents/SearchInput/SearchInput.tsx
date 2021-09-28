import { InputAdornment, OutlinedInput as Input, IconButton } from '@mui/material';
import { DropSearchIcon as SearchIcon } from '../../../assets/icons';
import './SearchInput.scss';


interface props {
    id?: string;
    width?: number | string;
    name?: string;
    value?: string | number;
    placeholder?: string;
    classes?: object;
    type?: string;
    onChange?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
}

export default function SearchInput(props: props) {
    return (
        <Input
            className='searchinput'
            style={{ width: props.width }}
            id={props.id}
            name={props.name}
            value={props.value}
            inputProps={{ 'aria-label': 'search' }}
            placeholder={props.placeholder}
            classes={props.classes}
            type={props.type}
            onChange={props.onChange}
            onBlur={props.onBlur}
            startAdornment={
                <InputAdornment position="start" className='adornment'>
                    <IconButton aria-label='search' edge='start'>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
        />
    )
}

SearchInput.defaultProps = {
    id: "SearchInput",
    width: 270,
    placeholder: 'Search',
    type: 'text',
}