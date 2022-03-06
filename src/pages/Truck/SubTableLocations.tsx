import { useState, useEffect } from 'react';
import GridComponent, { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { useGetLocations } from './queries';
import './SubTableLocations.scss';



interface props {
    id: string,
    headCells: headerObj[],
    primaryKey: string,
}

export default function InnerTable (props: props) {
    const [locations, setLocations] = useState([]);

    const { data, fetchNextPage, isLoading, isFetching }: any = useGetLocations(props.id);
    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.parkingLocations);
            });
            setLocations(list);
        }
    }, [data]);
    return (
        <div className='Sub-Table-Container'>
            <GridComponent
                primaryKey={props.primaryKey}
                rows={locations}
                header={props.headCells}
                isLoading={isFetching || isLoading}
                isChildTable
                enableRowAction
                getPages={fetchNextPage}
            />
        </div>
    );
}
