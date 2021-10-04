import * as React from "react";
import { Paper, TableContainer, Table, Box } from '@mui/material';
import './grid.style.scss';
import EnhancedGridHead from './headerGrid.component';
import EnhancedGridBody from './dataGrid.component';

interface GridComponentProps {
    width?: string,
    height?: string,
    rows?: any[], 
    isLoading?: boolean,
    getPages?:any
    ref?: any
}

let x: GridComponentProps = {
    height: '1000px',
    width: '1748px'
}


const headCells = [{ id: "customername", label: "CUSTOMER NAME", type: 'text' },
{ id: "contactname", label: "CANTACT NAME", type: 'text' },
{ id: "address", label: "ADDRESS", type: 'text' },
{ id: "city", label: "CITY", type: 'text' },
{ id: "zipcode", label: "ZIP", type: 'text' },
{ id: "state", label: "STATE", type: 'text' },
{ id: "lots", label: "LOTS", type: 'button' },
// { id: "settlementtype", label: "SETTLEMENT TYPE", type: 'text' },
// { id: "cardAdded", label: "CARD ADDED", type: 'text' },
{ id: "paymentType", label: "PAYMENT TYPE", type: 'text' },
{ id: "phone", label: "PHONE", type: 'text' },
{ id: "cardAdded", label: "CARD ADDED", type: 'text' },
{ id: "country", label: "COUNTRY", type: 'text' },
{ id: "email", label: "EMAIL", type: 'text' },
// { id: "id", label: "ID", type: 'text' },
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
           props.getPages()
        }
    };

    return (
        <div>
            <Box sx={{ width: x.width }}>
                <Paper sx={{ width: x.width, mb: 2 }}>
                    <TableContainer sx={{ maxHeight: x.height }} onScroll={handleTableScroll} ref={props.ref}>
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
                </Paper>
            </Box>
        </div>
    );

}

export default GridComponent;