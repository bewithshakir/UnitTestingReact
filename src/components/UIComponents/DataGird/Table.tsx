import {useState, useEffect} from 'react';
import GridComponent from './grid.component';
import { getLots } from '../../../pages/CustomerManagement/queries'; 
import './Table.scss';
import CustomerModel from '../../../models/CustomerModel';

interface props {
    id:string,
    width?: string,
    height?: string,
    rows?: any[],
    isLoading?: boolean,
    getPages?: any,
}

export default function InnerTable(props:props) {
    const [lotDetails, setLotDetails] = useState([]);
    const Customer = new CustomerModel();
    const headCells = Customer.fieldsToDisplayLotTable();

    const { data, fetchNextPage, isLoading, isFetching }: any = getLots(props.id);
    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.lots);
            });
            setLotDetails(list);
        }
    }, [data]);
    return (
        <div className='sub-Table-Container'>
        <GridComponent
                rows={lotDetails}
                header={headCells}
                isLoading={isFetching || isLoading}
                isChildTable
                enableRowSelection={false}
                enableRowAction
                getPages={fetchNextPage} 
                rowActionOptions={[]}/>
        </div>
    );
}



