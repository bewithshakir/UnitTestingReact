import { useState, useEffect } from 'react';
import GridComponent, { headerObj } from '../../components/UIComponents/DataGird/grid.component';
import { getProducts } from './queries';
import './SubTableFuelProduct.scss';
import { DataGridActionsMenuOption } from './../../components/UIComponents/Menu/DataGridActionsMenu.component';
import TaxModel from '../../models/TaxModel';
import { useNavigate } from "react-router-dom";

interface props {
    id: string,
    rows?: any[],
    isLoading?: boolean,
    getPages?: any,
    headCells: headerObj[],
    primaryKey: string,
    enableRowAction?: boolean,
    rowActionOptions?: DataGridActionsMenuOption[],
}

export default function InnerTable (props: props) {
    const [productDetails, setProductDetails] = useState([]);
    const TaxObj = new TaxModel();
    const ACTION_TYPES = TaxObj.ACTION_TYPES;
    const navigate = useNavigate();

    const { data, fetchNextPage, isLoading, isFetching }: any = getProducts(props.id);
    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.products);
            });
            setProductDetails(list);
        }
    }, [data]);

    const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
        switch (action.action) {
            case ACTION_TYPES.EDIT:
                // perform action
                navigate(`/editFuelTax/?productId=${row.productCd}&taxJurisdictionId=${props.id}&countryCode=us`);
                break;
            default: return;
        }
    };

    return (
        <div className='product-Sub-Table-Container'>
            <GridComponent
                primaryKey={props.primaryKey}
                rows={TaxObj.displayProductdataModel(productDetails)}
                header={props.headCells}
                isLoading={isFetching || isLoading}
                isChildTable
                enableRowAction={true}
                getPages={fetchNextPage}
                rowActionOptions={props.rowActionOptions}
                showInnerTableMenu={true}
                onRowActionSelect={handleRowAction}
            />
        </div>
    );
}
