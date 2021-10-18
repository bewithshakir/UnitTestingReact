import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, FormControl } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import * as React from "react";
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { Button } from './../Button/Button.component';
import './grid.style.scss';

type HeadCellsOptions = {
    id: string;
    label: string;
    type: string;
}

interface GridBodyProps {
    rows?: any;
    order: string | any;
    orderBy: string;
    headCells: HeadCellsOptions[];
    isError?: string;
    isLoading?: boolean;
    enableRowSelection?: boolean;
    enableRowAction?: boolean;
    openDrawer?: any;
    selectedRows: string[];
    handleCheckChange: (customerId: string) => void;
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

    const { t } = useTranslation();

    const getKeys = () => {
        return props?.headCells.map((i: any) => i.id);
    };

    const handleCollapaseClick = (e: React.MouseEvent<HTMLButtonElement>, key: any) => {
        e.stopPropagation();
        if (key === selectedIndexKey) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    };
    const openDrawer = (row: any) => {
        props.openDrawer(row);
    };

    const isSelected = (customerId: string) => props.selectedRows.indexOf(customerId) !== -1;


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
                                        onClick={() => openDrawer(row)}
                                    >
                                        <Checkbox
                                            name={`checkbox${row.customerId}`}
                                            checked={isItemSelected}
                                            onChange={() => props.handleCheckChange(row.customerId)}
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
                                    onClick={() => openDrawer(row)}
                                >
                                    {
                                        props.headCells[index].type === 'text' ?
                                            index === 0 ? <b>{row[key]}</b> : row[key]
                                            :
                                            props.headCells[index].type === 'button' ?
                                                <Button
                                                    types="accordian"
                                                    aria-label="accordian"
                                                    className="active"
                                                    onClick={(e) => handleCollapaseClick(e, indexKey)}
                                                    startIcon={< LocationOnOutlinedIcon />}
                                                >
                                                    {0}
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
                                        onClick={() => openDrawer(row)}
                                    >
                                        <FormControl>
                                            <DataGridActionsMenu
                                                options={[{ label: t("menus.data-grid-actions.raise a request"), },
                                                { label: t("menus.data-grid-actions.fee & driver details"), },
                                                { label: t("menus.data-grid-actions.other details"), },
                                                { label: t("menus.data-grid-actions.contact details"), }
                                                ]}
                                                onSelect={(e: React.SyntheticEvent, value: any) => {
                                                    return value;
                                                }}
                                            />
                                        </FormControl>
                                    </TableCell>
                                    : null}
                        </TableRow>
                        <TableRow>
                            <TableCell className="grid-cell" colSpan={12}>
                                <Collapse in={indexKey === selectedIndexKey ? true : false} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <h1>Show Another Table {indexKey} - {row.lots}</h1>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment>);
                })
        );
    };


    if (props?.rows?.length > 1) {
        return getRowsData();
    } else if (props?.isLoading) {
        return (<Loader />);
    } else {
        return (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", width: "auto" }}>{"No Data found"}</div>);
    }


};

export default EnhancedGridBody;