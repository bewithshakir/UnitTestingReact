import { NoResultFoundIcon } from '../../../assets/icons';
import { FormControl } from '@mui/material';
import './NoData.scss';

interface props{
    msgLine1?: string;
    msgLine2?: string;
}

export default function NoDataFound(props:props){
    const { msgLine1, msgLine2 } = props;
    return (
        <FormControl className='noData'>
            <NoResultFoundIcon/>
            <b>{msgLine1}</b>
            {msgLine2}
        </FormControl>
    );

} 

NoDataFound.defaultProps = {
    msgLine1 : 'Oops.. No Results Found',
    msgLine2 : '',
};