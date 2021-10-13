import { Table, TableContainer } from '@mui/material';
import * as React from "react";
import EnhancedGridBody from './dataGrid.component';
import './grid.style.scss';
import EnhancedGridHead from './headerGrid.component';

interface GridComponentProps {
    width?: string,
    height?: string,
    rows?: any[],
    isLoading?: boolean,
    getPages?: any
    ref?: any
    openDrawer?: any
}

const headCells = [
    { id: "id", label: "ID", type: 'text' },
    { id: "customerName", label: "CUSTOMER NAME", type: 'text' },
    { id: "contactName", label: "CONTACT NAME", type: 'text' },
    { id: "address", label: "ADDRESS", type: 'text' },
    { id: "city", label: "CITY", type: 'text' },
    { id: "state", label: "STATE", type: 'text' },
    { id: "zipCode", label: "ZIP", type: 'text' },
    { id: "lots", label: "LOTS", type: 'button' },
    { id: "phone", label: "PHONE", type: 'text' },
    { id: "paymentType", label: "PAYMENT TYPE", type: 'text' },
    { id: "country", label: "COUNTRY", type: 'text' },
    { id: "cardAdded", label: "CARD ADDED", type: 'text' },
    { id: "", label: "", type: 'icon' }
];

const GridComponent: React.FC<GridComponentProps> = (props) => {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");


    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleTableScroll = (event: any) => {
        const bottomValue = event.target.scrollHeight - event.target.scrollTop;
        if (bottomValue - event.target.clientHeight <= 0) {
            props.getPages();
        }
    };

    return (
        <TableContainer className="table-container" onScroll={handleTableScroll} ref={props.ref}>
            <Table
                aria-labelledby="tableTitle"
                stickyHeader
            >
                <EnhancedGridHead
                    order={order}
                    orderBy={orderBy}
                    headCells={headCells}
                    onRequestSort={handleRequestSort}
                />
                <EnhancedGridBody
                    rows={props.rows}
                    order={order}
                    orderBy={orderBy}
                    headCells={headCells}
                    {...props}
                />
            </Table>
        </TableContainer>
    );

};

export default GridComponent;