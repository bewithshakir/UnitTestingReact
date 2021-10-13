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
    //{ id: "id", label: "ID", type: 'text' },
    { id: "", label: "", type: 'checkBox' },
    { id: "customerName", label: "CUSTOMER NAME", type: 'text' },
    { id: "contactName", label: "CONTACT NAME", type: 'text' },
    { id: "address", label: "ADDRESS", type: 'text' },
    { id: "city", label: "CITY", type: 'text' },
    { id: "state", label: "STATE", type: 'text' },
    { id: "zipCode", label: "ZIP", type: 'text' },
    { id: "lots", label: "LOTS", type: 'button' },
    { id: "phone", label: "PHONE", type: 'text' },
    //{ id: "paymentType", label: "PAYMENT TYPE", type: 'text' },
    { id: "country", label: "COUNTRY", type: 'text' },
    { id: "cardAdded", label: "CARD ADDED", type: 'text' },
    { id: "", label: "", type: 'icon' }
];

// const rows = [{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager", "icon": "icon" },
// { "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
// { "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
// { "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
// { "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" }];

// const headCells1 = [{ id: "lotname", label: "LOT NAME", type: 'text' },
// { id: "streetaddress", label: "STREET ADDRESS", type: 'text' },
// { id: "city", label: "CITY", type: 'text' },
// { id: "state", label: "STATE", type: 'text' },
// { id: "zip", label: "ZIP", type: 'text' },
// { id: "walletstatus", label: "WALLET STATUS", type: 'text' },
// { id: "vehicles", label: "VEHICLES", type: 'button' },
// { id: "fuel", label: "FUEL", type: 'text' },
// { id: "", label: "", type: 'icon' }
// ];

// const rows1 = [{ "lotname": "Lot Name", "streetaddress": "898987-9898", "city": "Houston", "state": "TX-Texas", "zip": "777878", "walletstatus": "Flag", "vehicles": "20", "fuel": "Diesel", "icon": "icon" },
// { "lotname": "Lot Name", "streetaddress": "898987-9898", "city": "Houston", "state": "TX-Texas", "zip": "777878", "walletstatus": "Flag", "vehicles": "20", "fuel": "Diesel", "icon": "icon" },
// { "lotname": "Lot Name", "streetaddress": "898987-9898", "city": "Houston", "state": "TX-Texas", "zip": "777878", "walletstatus": "Flag", "vehicles": "18", "fuel": "Diesel", "icon": "icon" },
// { "lotname": "Lot Name", "streetaddress": "898987-9898", "city": "Houston", "state": "TX-Texas", "zip": "777878", "walletstatus": "Flag", "vehicles": "20", "fuel": "Diesel", "icon": "icon" },
// { "lotname": "Lot Name", "streetaddress": "898987-9898", "city": "Houston", "state": "TX-Texas", "zip": "777878", "walletstatus": "Flag", "vehicles": "21", "fuel": "Diesel", "icon": "icon" }];



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