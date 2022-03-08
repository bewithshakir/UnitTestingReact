import { Table, TableContainer } from '@mui/material';
import * as React from "react";
import { DataGridActionsMenuOption } from '../Menu/DataGridActionsMenu.component';
import EnhancedGridBody from './dataGrid.component';
import './grid.style.scss';
import EnhancedGridHead from './headerGrid.component';
import { tableSX } from './config';
import { pageDataLimit } from '../../../utils/constants';

export type fieldOptions = {
    value: string;
    displayValue?: string;
    color?: string;
    icon?: React.ReactNode | string | any,
}

export type filterObjType = { [key: string]: string[] };

export type InnerTableType = {
    [key: string]: JSX.Element;
}
export interface headerObj {
    field: string,
    showIconLast?: boolean,
    label: string,
    type: 'text' | 'button' | 'icon' | 'icons' | 'image' | 'images' | 'dropdown' | 'status' | 'product' | 'component',
    icon?: React.ReactNode | string | any,
    bold?: boolean,
    align?: 'right' | 'left' | 'center' | 'justify',
    sortable?: boolean,
    width?: string,
    fieldOptions?: fieldOptions[]
}
type selectedRow = string[];
interface GridComponentProps {
    primaryKey: string,
    width?: string,
    height?: string,
    rows: any[],
    header: headerObj[],
    isLoading?: boolean,
    getPages?: any,
    ref?: any,
    isChildTable?: boolean,
    openDrawer?: any,
    onRowActionSelect?: (action: DataGridActionsMenuOption, row: any) => void,
    rowActionOptions?: DataGridActionsMenuOption[],
    enableRowSelection?: boolean,
    /** Will work only if enableRowSelection is true, It will add radio button instead of checkbox  */
    singleRowSelection?: boolean
    enableRowAction?: boolean,
    getId?: any,
    resetCollaps?: boolean,
    onResetTableCollaps?: (value: boolean) => void;
    InnerTableComponent?: InnerTableType,
    searchTerm?: string,
    filterData?: { [key: string]: string[] },
    noDataMsg?: string,
    showImg?: React.ReactNode,
    showInnerTableMenu?: boolean
    handleSelect?: (primaryKey: string[]) => void
}


const GridComponent: React.FC<GridComponentProps> = (props) => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [selected, setSelected] = React.useState<selectedRow>([]);

    const { rows, enableRowSelection, enableRowAction, singleRowSelection } = props;
    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleTableScroll = (event: any) => {
        const bottomValue = event.target.scrollHeight - event.target.scrollTop;
        if ((bottomValue - event.target.clientHeight) <= 0 && props.rows.length >= pageDataLimit) {
            props.getPages();
        }
    };


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelected: selectedRow = event.target.checked ? rows.map((n) => n[props.primaryKey]) : [];
        setSelected(newSelected);
        props.handleSelect && props.handleSelect(newSelected);
    };

    const handleCheckChange = (primaryId: string) => {
        if (props.singleRowSelection) {
            setSelected([primaryId]);

            props.handleSelect && props.handleSelect([primaryId]);
            return;
        }

        const selectedIndex = selected.indexOf(primaryId);
        let newSelected: selectedRow = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, primaryId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        props.handleSelect && props.handleSelect(newSelected);
    };

    return (
        <TableContainer className="table-container" onScroll={handleTableScroll} ref={props.ref}>
            <Table
                sx={tableSX}
                aria-labelledby="tableTitle"
                stickyHeader
            >
                <EnhancedGridHead
                    order={order}
                    orderBy={orderBy}
                    headCells={props.header}
                    enableRowSelection={enableRowSelection}
                    singleRowSelection={singleRowSelection}
                    enableRowAction={enableRowAction}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    onResetTableCollaps={props.onResetTableCollaps}
                    numSelected={selected.length}
                    rowCount={rows.length}
                />
                <EnhancedGridBody
                    order={order}
                    orderBy={orderBy}
                    selectedRows={selected}
                    enableRowSelection={enableRowSelection}
                    singleRowSelection={singleRowSelection}
                    enableRowAction={enableRowAction}
                    handleCheckChange={handleCheckChange}
                    headCells={props.header}
                    searchTerm={props.searchTerm}
                    showImg={props.showImg}
                    {...props}
                />
            </Table>
        </TableContainer>
    );

};

GridComponent.defaultProps = {
    enableRowSelection: false,
    enableRowAction: false,
    rowActionOptions: [],
};


export default GridComponent;

