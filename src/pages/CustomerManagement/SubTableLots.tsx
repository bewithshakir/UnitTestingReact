import {useState, useEffect} from 'react';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import { getLots } from './queries'; 
import './SubTableLots.scss';


type headCells = {
    field: string;
    label: string;
    type: string;
}

interface props {
    id:string,
    rows?: any[],
    isLoading?: boolean,
    getPages?: any,
    headCells: headCells[],
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
                rows={lotDetails}
                header={props.headCells}
                isLoading={isFetching || isLoading}
                isChildTable
                enableRowSelection={false}
                enableRowAction
                getPages={fetchNextPage} 
                rowActionOptions={[]}/>
        </div>
    );
}



