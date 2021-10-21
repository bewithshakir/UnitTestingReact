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
    getPages?: any
    ref?: any
    openDrawer?: any
}

export default function InnerTable(props:props) {
    const CustomerObj = new CustomerModel();
    const headCells = CustomerObj.fieldsToDisplayLotTable();
    const list: any = [];
    const { data, fetchNextPage, isLoading, isFetching }: any = getLots(props.id);
    data?.pages?.map((item: any) => {
        list.push(...item.data.lots);
    });
    return (
        <div className='sub-Table-Container'>
        <GridComponent
                rows={list}
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



