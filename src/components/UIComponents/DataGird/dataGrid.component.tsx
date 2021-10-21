import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Collapse, TableBody, TableCell, TableRow, FormControl } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import * as React from "react";
import { Loader } from '../Loader';
import DataGridActionsMenu, { DataGridActionsMenuOption } from '../Menu/DataGridActionsMenu.component';
import { Button } from './../Button/Button.component';
import './grid.style.scss';
import { headerObj } from './grid.component';
import NoDataFound from './Nodata';
interface GridBodyProps {
    rows?: any;
    order: string | any;
    orderBy: string;
    headCells: headerObj[];
    isError?: string;
    isLoading?: boolean;
    isChildTable?: boolean;
    enableRowSelection?: boolean;
    enableRowAction?: boolean;
    openDrawer?: any;
    selectedRows?: string[];
    getCustomerId?:any;
    InnerTableComponent?:any;
    handleCheckChange?: (customerId: string) => void;
    searchTerm?:string,
    onRowActionSelect?: (selectedValue: DataGridActionsMenuOption, row: any) => void,
    rowActionOptions: DataGridActionsMenuOption[],
    noDataMsg?:string,
}


function descendingComparator (a: any, b: any, orderBy: any) {
    const valueA = isNaN(a[orderBy]) ? a[orderBy]?.toLowerCase() : Number(a[orderBy]);
    const valueB = isNaN(b[orderBy]) ? b[orderBy]?.toLowerCase() : Number(b[orderBy]);
    if (valueB < valueA) {
        return -1;
    }
    if (valueB > valueA) {
        return 1;
    }
    return 0;
}


function getComparator (order: any, orderBy: any) {
    return order === "desc"
        ? (a: any, b: any) => descendingComparator(a, b, orderBy)
        : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort (array: any, comparator: any) {
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



const EnhancedGridBody: React.FC<GridBodyProps> = (props) => {
    const [selectedIndexKey, setSelectedKey] = React.useState(null);

    const getKeys = () => {
        return props?.headCells.map((i: any) => i.field);
    };

    const handleCollapaseClick = (e: React.MouseEvent<HTMLButtonElement>, key: any, row:any) => {
        e.stopPropagation();
        if(row.totalLots){ 
            props.getCustomerId !== undefined && props.getCustomerId(row.customerId);
            if (key === selectedIndexKey) {
                setSelectedKey(null);
            } else {
                setSelectedKey(key);
            }
        }
    };
    const openDrawer = (row: any) => {
        props.openDrawer(row);
    };

    const isSelected = (customerId: string) => props.selectedRows && props.selectedRows.indexOf(customerId) !== -1;


    const getRowsData = () => {
        const keys = getKeys();
        return (
            stableSort(props.rows, getComparator(props.order, props.orderBy))
                .map((row: any, indexKey: any) => {
                    const isItemSelected = isSelected(row.customerId);
                    return (<React.Fragment key={indexKey}>
                        <TableRow key={indexKey} sx={{
                            cursor: "pointer"
                        }}>
                            {
                                props.enableRowSelection ?
                                    <TableCell
                                        className="grid-cell-parent"
                                        component="th"
                                        scope="row"
                                        onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                    >
                                        <Checkbox
                                            name={`checkbox${row.customerId}`}
                                            checked={isItemSelected || false}
                                            onChange={() => props.handleCheckChange && props.handleCheckChange(row.customerId)}
                                            onClick={e => e.stopPropagation()}
                                        />
                                    </TableCell>
                                    : null}
                            {keys.map((key: any, index: any) =>
                                <TableCell
                                    className="grid-cell-parent"
                                    component="th"
                                    scope="row"
                                    key={row[key]}
                                    onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                >
                                    {
                                        props.headCells[index].type === 'text' ?
                                            index === 0 ? <b>{row[key]}</b> : row[key]
                                            :
                                            props.headCells[index].type === 'button' ?
                                                <Button
                                                    types="accordian"
                                                    aria-label="accordian"
                                                    className={row.totalLots === 0 ? 'empty' : "active"}
                                                    onClick={(e) => handleCollapaseClick(e, indexKey, row)}
                                                    startIcon={< LocationOnOutlinedIcon />}
                                                >
                                                    {row.totalLots}
                                                </Button> : ""
                                    }
                                </TableCell>
                            )}
                            {
                                props.enableRowAction ?
                                    <TableCell
                                        className="grid-cell-parent"
                                        component="th"
                                        scope="row"
                                        onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                    >
                                        <FormControl>
                                            <DataGridActionsMenu
                                                options={props.rowActionOptions}
                                                onSelect={(e, value) => props.onRowActionSelect && props.onRowActionSelect(value, row)}
                                            />
                                        </FormControl>
                                    </TableCell>
                                    : null}
                        </TableRow>
                        <TableRow>
                            <TableCell className="grid-cell" colSpan={12}>
                                <Collapse in={indexKey === selectedIndexKey ? true : false} timeout="auto" unmountOnExit>
                                    {props.InnerTableComponent && props.InnerTableComponent}           
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>);
                })
        );
    };

    const getData = () => {
        if(props?.rows?.length > 1) {
            return getRowsData();
        }else if (!props?.isLoading){
            return (<TableBody className='NoData'> <NoDataFound searchTerm={props.searchTerm} msgLine2={props.noDataMsg}/> </TableBody>);
        }
    };

    return (
        <React.Fragment>
            {props?.isLoading && (<Loader />)}
            {getData()}
        </React.Fragment>
    );


};

export default EnhancedGridBody;