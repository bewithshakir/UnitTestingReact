import { useEffect, useState } from 'react';
import useDebounce from '../../../utils/useDebounce';
import { FetchGoogleAddress } from '../../../hooks/googleAddressAutoComlete';
import AutoComplete from '../Select/SelectAutocomplete';
interface props {
    value: string;
    name: string;
    label?: string;
    placeholder?: string;
    type: string;
    onChange: (...args: any[]) => void;
    onInputChange?: (...args: any[]) => void;
    required?: boolean
    id?: string;
    helperText?: string;
    error?: boolean;
    onBlur?: (...args: any[]) => void;
    description?: string;
    disabled?: boolean;
}

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}

interface prediction {
    description: string,
    matched_substrings: Array<MainTextMatchedSubstrings>,
    place_id: string,
    reference: string,
    structured_formatting: StructuredFormatting,
    secondary_text: string,
    terms: Array<MainTextMatchedSubstrings>,
    types: Array<string>
}

type item = {
    label: string,
    value: string | number
}



export default function AutoCompleteInput(props: props) {
    const [value, setValue] = useState<item | null| string>(null);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce<string>(inputValue, 700);
    const { data } = FetchGoogleAddress(debouncedValue);

    useEffect(() => {
        if (data) {
            const searchPoints: any = [];
            const predictions = data.data.predictions;
            predictions.forEach((element:prediction) => {
                const point = {
                    value: element.place_id,
                    label: element.description
                };
                searchPoints.push(point);
            });
            setOptions(searchPoints);
        }
    }, [data]);

    const handleChange = (opt: item | null) => {
        if (opt !== null) {
            const { onChange } = props;
            const obj = {
                target: {
                    name: 'placeId',
                    value: opt.value,
                }
            };
            onChange(obj);
        }
    };

    return (
        <AutoComplete
            name={props.name}
            description={props.description}
            error={props.error}
            required={props.required}
            helperText={props.helperText}
            //freeSolo
            onBlur={props.onBlur}
            items={options}
            label={props.label}
            placeholder={props.placeholder}
            value={{label:props.value, value:props.value} || value}
            //optionTitle='description'
            disabled={props.disabled}
            onChange={(event: any, newValue: item | null) => {
                handleChange(newValue);
                setValue(newValue);
            }}
            onInputChange={(newInputValue: string) => { 
                setInputValue(newInputValue);
            }} 
            />
    );
}
