import * as React from "react";
import { Collapse, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Box } from '@mui/material';
import './grid.style.scss';
import EnhancedGridHead from './headerGrid.component';
import { Button } from './../Button/Button.component';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { useTranslation } from 'react-i18next';

interface GridComponentProps {
    width?: string,
    height?: string
}

let x: GridComponentProps = {
    height: '1000px',
    width: '100%'
}


function descendingComparator(a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function getComparator(order: any, orderBy: any) {
    return order === "desc"
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any, comparator: any) {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el: any) => el[0]);
}


const headCells = [{ id: "customername", label: "CUSTOMER NAME" },
{ id: "contactname", label: "CANTACT NAME" },
{ id: "address", label: "ADDRESS" },
{ id: "city", label: "CITY" },
{ id: "zip", label: "ZIP" },
{ id: "state", label: "STATE" },
{ id: "lots", label: "LOTS" },
{ id: "settlementtype", label: "SETTLEMENT TYPE" },
{ id: "", label: "" }
];

const rows = [{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" }];



const GridComponent: React.FC<GridComponentProps> = (props) => {

    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("");
    const [selectedIndexKey, setSelectedKey] = React.useState(null);
    const { t, i18n } = useTranslation();

    const handleRequestSort = (event: any, property: any) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleCollapaseClick = (key: any) => {
        if (key === selectedIndexKey) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    }

    const handleTableScroll = (event: any) => {
        const bottomValue = event.target.scrollHeight - event.target.scrollTop;
        if (bottomValue - event.target.clientHeight <= 0) {
            console.log("At The Bottom"); //Add in what you want here
        }
    };


    return (

        <div>
            <Box sx={{ width: x.width }}>
                <Paper sx={{ width: x.width, mb: 2 }}>
                    <TableContainer sx={{ maxHeight: x.height }} onScroll={handleTableScroll}>
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

                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .map((row: any, index: any) => {
                                        return (
                                            <React.Fragment>
                                                <TableRow>
                                                    <TableCell component="th" scope="row"> <b>{row.customername}</b></TableCell>
                                                    <TableCell component="th" scope="row"> {row.contactname}</TableCell>
                                                    <TableCell component="th" scope="row"> {row.address}</TableCell>
                                                    <TableCell component="th" scope="row"> {row.city}</TableCell>
                                                    <TableCell component="th" scope="row"> {row.state}</TableCell>
                                                    <TableCell component="th" scope="row"> {row.zip}</TableCell>
                                                    <TableCell>
                                                        < Button
                                                            types="accordian"
                                                            aria-label="accordian"
                                                            className="active"
                                                            onClick={() => handleCollapaseClick(index)}
                                                            startIcon={< LocationOnOutlinedIcon />}
                                                        >
                                                            {row.lots}
                                                        </Button >
                                                    </TableCell>
                                                    <TableCell component="th" scope="row"> {row.settlementtype} </TableCell>
                                                    <TableCell>
                                                        <DataGridActionsMenu
                                                            options={[
                                                                {
                                                                    label: t("menus.data-grid-actions.raise a request"),
                                                                },
                                                                {
                                                                    label: t("menus.data-grid-actions.fee & driver details"),
                                                                },
                                                                {
                                                                    label: t("menus.data-grid-actions.other details"),
                                                                },
                                                                {
                                                                    label: t("menus.data-grid-actions.contact details"),
                                                                }
                                                            ]}
                                                            onSelect={(value) => {
                                                                console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="grid-cell" colSpan={12}>
                                                        <Collapse in={index === selectedIndexKey ? true : false} timeout="auto" unmountOnExit>
                                                            <Box sx={{ margin: 1 }}>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <h1>Show Another Table {index} - {row.lots}</h1>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>

                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </div>
    );

}

export default GridComponent;