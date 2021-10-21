import { NoResultFoundIcon } from '../../../assets/icons';
import { FormControl } from '@mui/material';
import './gatx.scss';
import { Fragment } from 'react';

interface props{
    msgLine1?: string;
    msgLine2?: string;
    searchTerm?:string;
}

export default function NoDataFound(props:props){
    const { msgLine1, msgLine2, searchTerm } = props;
    return (
        <FormControl className='noData'>
           {searchTerm ? ( <Fragment><NoResultFoundIcon/>
                <b>{msgLine1}</b> </Fragment>) :
           ( <b>{msgLine2}</b> )}
        </FormControl>
    );

} 

NoDataFound.defaultProps = {
    msgLine1 : 'Oops.. No Results Found',
    msgLine2 : '',
};