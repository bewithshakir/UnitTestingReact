import { Collapse, TableBody, TableCell, TableRow, FormControl, Avatar, Icon, ImageList } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import * as React from "react";
import { Loader } from '../Loader';
import DataGridActionsMenu, { DataGridActionsMenuOption } from '../Menu/DataGridActionsMenu.component';
import { Button } from './../Button/Button.component';
import './grid.style.scss';
import { headerObj } from './grid.component';
import { PositiveCricleIcon, AlertExclamationIcon, YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon } from '../../../assets/icons';
import { tableImagesSX, tableAvatarSX, tableImagesIconListSX, tableIconsSX, tableFuelIconsSX } from './config';
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
    getId?:any;
    InnerTableComponent?:any;
    noDataMsg?: string,
    searchTerm?:string,
    onRowActionSelect?: (selectedValue: DataGridActionsMenuOption, row: any) => void,
    rowActionOptions?: DataGridActionsMenuOption[],
    handleCheckChange: (primaryId: string) => void;
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


function getWalletIcon (status: string) {
    switch (status) {
        case "Y":
            return PositiveCricleIcon;
        case "N":
            return AlertExclamationIcon;
        default:
            return AlertExclamationIcon;
    }
}

function getFuelIcon (status: string) {
    switch (status) {
        case "Regular":
            return YellowFuelIcon;
        case "Premium":
            return RedFuelIcon;
        case "Diesel":
            return GreenFuelIcon;
        case "V-Power":
            return NavyBlueFuelIcon;
        default:
            return YellowFuelIcon;
    }
}

const EnhancedGridBody: React.FC<GridBodyProps> = (props) => {
    const [selectedIndexKey, setSelectedKey] = React.useState(null);

    const getKeys = () => {
        return props?.headCells.map((i: any) => i.field);
    };

    const handleCollapaseClick = (e: React.MouseEvent<HTMLButtonElement>, indexKey: any, row:any, key:any) => {
        e.stopPropagation();
        if(row[key]){ 
            props.getId !== undefined && props.getId(row.customerId);
            if (indexKey === selectedIndexKey) {
                setSelectedKey(null);
            } else {
                setSelectedKey(indexKey);
            }
       }
    };
    const openDrawer = (row: any) => {
        props.openDrawer(row);
    };

    const isSelected = (primaryId: string) => props.selectedRows && props.selectedRows.indexOf(primaryId) !== -1;

    const renderIcon = (key: string, icon: any) => {
        return (
            <Icon sx={tableIconsSX} component={key === 'walletStatus' ? getWalletIcon(icon) : icon} />
        );
    };

    const renderIcons = (key: string, data: any, align: string | undefined) => {
        if (data?.length) {
            return (<ImageList sx={{ ...tableImagesIconListSX, justifyContent: align }} gap={0} cols={10}>
                {data?.map((icon: any, index: number) =>
                    <Icon key={index} sx={key === 'fuelStatus' ? tableFuelIconsSX : tableIconsSX} component={key === 'fuelStatus' ? getFuelIcon(icon) : icon} />
                )}
            </ImageList>);
        }
    };

    const renderImages = (data: any) => {
        if (data?.length) {
            return (<ImageList sx={tableImagesIconListSX} cols={10}>
                {data?.map((item: any, index: number) =>
                    <Avatar key={index} sx={tableImagesSX} src={item} variant="square" />
                )}
            </ImageList>);
        }
    };
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
                                    align={props.headCells[index].align}
                                    key={row[key]}
                                    onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                >
                                    {
                                        props.headCells[index].type === 'text' ?
                                            props.headCells[index].bold ? <b>{row[key]}</b> : row[key]
                                            :
                                            props.headCells[index].type === 'button' ?
                                                <Button
                                                    types="accordian"
                                                    aria-label="accordian"
                                                    className={row[key] ? "active" : 'empty'}
                                                    onClick={(e) => handleCollapaseClick(e, indexKey, row, key)}
                                                    startIcon={props.headCells[index].icon ? <Icon component={props.headCells[index].icon} /> : undefined}
                                                >
                                                    {
                                                        row[key]
                                                    }
                                                </Button> :
                                                props.headCells[index].type === 'icon' ?
                                                    renderIcon(key, row[key])
                                                    :
                                                    props.headCells[index].type === 'icons' ?
                                                        renderIcons(key, row[key], props.headCells[index].align)
                                                        :
                                                        props.headCells[index].type === 'image' ?
                                                            <Avatar sx={tableAvatarSX} src={row[key]} variant="square" />
                                                            :
                                                            props.headCells[index].type === 'images' ?
                                                                renderImages(row[key])
                                                                :
                                                                ""
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
        if(props?.rows?.length) {
            return getRowsData();
        }else if (!props?.isLoading){
            return (<TableBody className='no-data'> <NoDataFound searchTerm={props.searchTerm} msgLine2={props.noDataMsg}/> </TableBody>);
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