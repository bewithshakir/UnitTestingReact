import { Table, TableContainer } from '@mui/material';
import * as React from "react";
import { DataGridActionsMenuOption } from '../Menu/DataGridActionsMenu.component';
import EnhancedGridBody from './dataGrid.component';
import './grid.style.scss';
import EnhancedGridHead from './headerGrid.component';

export interface headerObj {
    field: string,
    label: string,
    type: 'text' | 'button' | 'icon' | 'text-array',
    bold?: boolean
}
type selectedRow = string[];
interface GridComponentProps {
    width?: string,
    height?: string,
    rows: any[],
    header: headerObj[],
    isLoading?: boolean,
    getPages?: any,
    ref?: any,
    openDrawer?: any,
    onRowActionSelect?: (action: DataGridActionsMenuOption, row: any) => void,
    rowActionOptions?: DataGridActionsMenuOption[],
    enableRowSelection?: boolean,
    enableRowAction?: boolean,
}

const GridComponent: React.FC<GridComponentProps> = (props) => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [selected, setSelected] = React.useState<selectedRow>([]);

    const { rows, enableRowSelection, enableRowAction } = props;
    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleTableScroll = (event: any) => {
        const bottomValue = event.target.scrollHeight - event.target.scrollTop;
        if ((bottomValue - event.target.clientHeight) <= 0) {
            props.getPages();
        }
    };


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds: selectedRow = rows.map((n) => n.customerId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleCheckChange = (primaryId: string) => {
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
    };

    return (
        <TableContainer className="table-container" onScroll={handleTableScroll} ref={props.ref}>
            <Table
                sx={{ minWidth: 1600 }}
                aria-labelledby="tableTitle"
                stickyHeader
            >
                <EnhancedGridHead
                    order={order}
                    orderBy={orderBy}
                    headCells={props.header}
                    enableRowSelection={enableRowSelection}
                    enableRowAction={enableRowAction}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    numSelected={selected.length}
                    rowCount={rows.length}
                />
                <EnhancedGridBody
                    order={order}
                    orderBy={orderBy}
                    selectedRows={selected}
                    enableRowSelection={enableRowSelection}
                    enableRowAction={enableRowAction}
                    handleCheckChange={handleCheckChange}
                    headCells={props.header}
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

