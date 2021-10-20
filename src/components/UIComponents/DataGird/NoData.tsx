import { Fragment } from 'react';
import { NoResultFoundIcon } from '../../../assets/icons';
import { FormControl } from '@mui/material';
import './NoData.scss';

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
    msgLine2 : 'Add Customer by clicking on the "Add Customer" button.',
};