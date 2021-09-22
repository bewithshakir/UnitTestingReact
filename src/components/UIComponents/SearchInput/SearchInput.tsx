import { Paper, InputBase, IconButton } from '@mui/material';
import { SearchIcon } from '../../../assets/icons';
import './SearchInput.scss';


interface props {
    id?: string;
    width?: number;
    name?: string;
    value?: string | number;
    placeholder?: string;
    disabled?: boolean;
    style?: object;
    type?: string;
    onChange?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
}

export default function SearchInput (props:props) {
    

    return (
       
        <Paper
            component="form"
            sx={{ p: '0px 4px', boxShadow:'none', borderRadius:0, display: 'flex', alignItems: 'center', width: props.width }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="Search">
                <SearchIcon />
            </IconButton>
            <InputBase
                id={props.id}
                style={props.style}
                name={props.name}
                value={props.value}
                disabled={props.disabled}
                placeholder={props.placeholder}
                type={props.type}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </Paper>
    )
}

SearchInput.defaultProps = {
    id: "SearchInput",
    width: 270,
    disabled: false,
    placeholder: 'Search',
    type: 'text', 
}