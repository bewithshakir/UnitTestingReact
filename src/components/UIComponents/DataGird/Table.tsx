import GridComponent from './grid.component';
import { getLots } from '../../../pages/CustomerManagement/queries'; 
import './Table.scss';

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

const headCells = [{ id: "deliveryLocationNm", label: "LOT NAME", type: 'text' },
    { id: "streetAddress", label: "STREET ADDRESS", type: 'text' },
    { id: "cityNm", label: "CITY", type: 'text' },
    { id: "stateNm", label: "STATE", type: 'text' },
    { id: "postalCd", label: "ZIP", type: 'text' },
    { id: "walletstatus", label: "WALLET STATUS", type: 'text' },
    { id: "vehicles", label: "VEHICLES", type: 'text' },
    { id: "fuel", label: "FUEL", type: 'text' }
];

export default function InnerTable(props:props) {
    const list: any = [];
    const { data, fetchNextPage, isLoading }: any = getLots(props.id);
    data?.pages?.map((item: any) => {
        list.push(...item.data.lots);
    });

    

    return (
        <div className='sub-Table-Container'>
        <GridComponent
            rows={list}
            header={headCells}
            isLoading={isLoading}
            isChildTable
            enableRowSelection={false}
            enableRowAction
            getPages={fetchNextPage}
        />
        </div>
    );
}



