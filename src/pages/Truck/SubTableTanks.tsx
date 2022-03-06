import { useState, useEffect } from 'react';
import GridComponent, { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { useGetTanksList } from './queries';
import './SubTableLocations.scss';



interface props {
    id: string,
    headCells: headerObj[],
    primaryKey: string,
    tanksDataModel: any,
}

export default function InnerTable (props: props) {
    const [tanksList, setTanksList] = useState([]);

    const { data, fetchNextPage, isLoading, isFetching }: any = useGetTanksList(props.id);
    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.tanks);
            });
            setTanksList(list);
        }
    }, [data]);
    return (
        <div className='Sub-Table-Container'>
            <GridComponent
                primaryKey={props.primaryKey}
                rows={props.tanksDataModel(tanksList)}
                header={props.headCells}
                isLoading={isFetching || isLoading}
                isChildTable
                enableRowAction
                getPages={fetchNextPage}
            />
        </div>
    );
}
