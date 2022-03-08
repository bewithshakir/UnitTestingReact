import { NoResultFoundIcon } from '../../../assets/icons';
import { FormControl } from '@mui/material';
import './Nodata.scss';
import { Fragment } from 'react';
import { filterObjType } from './grid.component';
interface props {
    msgLine1?: string;
    msgLine2?: string;
    searchTerm?: string;
    filterData?: filterObjType,
    showImg?: React.ReactNode;
}

export default function NoDataFound (props: props) {
    const { msgLine1, msgLine2, searchTerm, showImg, filterData } = props;
    return (
        <FormControl className='nodata'>
            {(searchTerm || Object.keys(filterData || {}).length) ? (<Fragment><NoResultFoundIcon className='noDataSVG' />
                <b>{msgLine1}</b> </Fragment>) :
                (<><div>{showImg || ""}</div> <b>{msgLine2}</b> </>)}
        </FormControl>
    );
}

NoDataFound.defaultProps = {
    msgLine1: 'Oops.. No Results Found',
    msgLine2: '',
};