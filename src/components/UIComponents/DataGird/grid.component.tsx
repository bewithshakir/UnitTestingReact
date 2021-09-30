import * as React from "react";
import { Paper, TableContainer, Table } from '@mui/material';
import './grid.style.scss';
import EnhancedGridHead from './headerGrid.component';
import EnhancedGridBody from './dataGrid.component';
import Grid from '@mui/material/Grid'

interface GridComponentProps {
    width?: string,
    height?: string,
    showError?: boolean,
    headCellsData: any,
    rows?: any,
    isValidRowData: boolean
}

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
            console.log("At The Bottom"); //Add in what you want here
        }
    };


    return (
        
            <Grid>
                <Paper>
                    <TableContainer sx={{ maxHeight: 1200 }} onScroll={handleTableScroll} className="handle-scroll">
                        <Table
                            aria-labelledby="tableTitle"
                            stickyHeader
                            className="grid-list-table-header"
                        >
                            <EnhancedGridHead
                                order={order}
                                orderBy={orderBy}
                                headCells={props.headCellsData}
                                onRequestSort={handleRequestSort}
                            />
                            <EnhancedGridBody
                                rows={props.rows}
                                order={order}
                                orderBy={orderBy}
                                headCells={props.headCellsData}
                                error={props.showError}
                                isValidRowData={props.isValidRowData}
                            />
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
       
    );

}

export default GridComponent;