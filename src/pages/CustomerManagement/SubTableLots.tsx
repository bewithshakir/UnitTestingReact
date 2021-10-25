import {useState, useEffect} from 'react';
import GridComponent, { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { getLots } from './queries'; 
import './SubTableLots.scss';




interface props {
    id:string,
    rows?: any[],
    isLoading?: boolean,
    getPages?: any,
    headCells: headerObj[],
    primaryKey: string,
}

export default function InnerTable(props:props) {
    const [lotDetails, setLotDetails] = useState([]);

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
                primaryKey={props.primaryKey}
                rows={lotDetails}
                header={props.headCells}
                isLoading={isFetching || isLoading}
                isChildTable
                enableRowAction
                getPages={fetchNextPage} 
                />
        </div>
    );
}



