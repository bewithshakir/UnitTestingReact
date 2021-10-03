import { useEffect, useState } from 'react'
import useDebounce from '../../../utils/useDebounce';
import { FetchGoogleAddress } from '../../../actions/googleAddressAutoComlete';
import AutoComplete from '../AutoComplete/AutoComplete';



interface props {
    value: string;
    name: string; 
    label: string;
    type: string;
    onChange: (...args: any[]) => void;
    onInputChange?: (...args: any[]) => void;
    required ?: boolean
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



export default function AutoCompleteInput(props: props){
    const [value, setValue] = useState<prediction | null>(null);
    const [options, setOptions] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const debouncedValue = useDebounce<string>(inputValue, 1000);
    const { data } = FetchGoogleAddress(debouncedValue);

    
    
    useEffect(()=> { 
        if(data){
            let predictions = data.data.predictions;
            setOptions(predictions);
        }
    }, [data])

    const handleChange = (opt1:prediction|null) => {
        if (opt1 !== null){
        const { name, onChange } = props;
            let obj = {
                target: {
                    name: 'placeId',
                    value: opt1.place_id
                }
            }
        onChange(obj)
        }
    }
 
    return (
        <AutoComplete 
            freeSolo
            options={options} 
            label={props.label} 
            value={value}
            optionTitle='description' 
            onChange={(event: any, newValue: prediction | null) => {
             handleChange(newValue);   
            setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}/>
    )
}
