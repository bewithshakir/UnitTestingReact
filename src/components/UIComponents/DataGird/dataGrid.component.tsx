import { Collapse, TableBody, TableCell, TableRow, FormControl, Avatar, Icon, ImageList, Typography, Box } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import React, { useEffect } from "react";
import { Loader } from '../Loader';
import DataGridActionsMenu, { DataGridActionsMenuOption } from '../Menu/DataGridActionsMenu.component';
import { Button } from './../Button/Button.component';
import './grid.style.scss';
import { fieldOptions, headerObj } from './grid.component';
import {
    YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon,
} from '../../../assets/icons';
import { tableImagesSX, tableAvatarSX, tableImagesIconListSX, tableIconsSX, tableFuelIconsSX } from './config';
import NoDataFound from './Nodata';
import Select from './ProductSingleSelect';
import { getProductIcon } from '../../../utils/helperFunctions';


interface GridBodyProps {
    primaryKey: string,
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
    getId?: any;
    resetCollaps?: boolean;
    onResetTableCollaps?: (value: boolean) => void;
    InnerTableComponent?: any;
    noDataMsg?: string,
    searchTerm?: string,
    showImg?: React.ReactNode | undefined,
    onRowActionSelect?: (selectedValue: DataGridActionsMenuOption, row: any) => void,
    rowActionOptions?: DataGridActionsMenuOption[],
    showInnerTableMenu?: boolean,
    handleCheckChange: (primaryId: string) => void;
}


function descendingComparator (a: any, b: any, orderBy: any) {
    const valueA = orderBy === "product" ? a.productName : a[orderBy];
    const valueB = orderBy === "product" ? b.productName : b[orderBy];
    const finalValueA = isNaN(valueA) ? valueA?.toLowerCase() : Number(valueA);
    const finalValueB = isNaN(valueB) ? valueB?.toLowerCase() : Number(valueB);
    if (finalValueB < finalValueA) {
        return -1;
    }
    if (finalValueB > finalValueA) {
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

function getFuelIcon (fuelStatus: string) {
    return ({
        "Regular": YellowFuelIcon,
        "Premium": RedFuelIcon,
        "Diesel": GreenFuelIcon,
        "V-Power": NavyBlueFuelIcon,
    }[fuelStatus] || YellowFuelIcon);
}

const EnhancedGridBody: React.FC<GridBodyProps> = (props) => {
    const [selectedIndexKey, setSelectedKey] = React.useState(null);

    const getKeys = () => {
        return props?.headCells.map((i: any) => i.field);
    };

    useEffect(() => {
        if (props.resetCollaps) {
            setSelectedKey(null);
            props.onResetTableCollaps && props.onResetTableCollaps(false);
        }
    }, [props.resetCollaps]);

    const handleCollapaseClick = (e: React.MouseEvent<HTMLButtonElement>, indexKey: any, row: any, key: any) => {
        e.stopPropagation();
        const { primaryKey } = props;
        if (!checkCountIsZero(row[key])) {
            props.getId !== undefined && props.getId(row[primaryKey]);
            if (indexKey === selectedIndexKey) {
                setSelectedKey(null);
            } else {
                setSelectedKey(indexKey);
            }
        }
    };
    const openDrawer = (row: any) => {
        props.openDrawer && props.openDrawer(row);
    };

    const isSelected = (primaryId: string) => props.selectedRows && props.selectedRows.indexOf(primaryId) !== -1;

    const renderIcon = (icon: any) => {
        return (
            <Icon sx={tableIconsSX} component={icon} />
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

    const renderSelect = () => {
        return (
            <Select />
        );
    };

    const setStatusCol = (showIconLast: boolean, align: string, value: string, color: string, icon: any) => {
        return (
            <Box display="flex" alignItems="center" justifyContent={align}>
                {(icon && !showIconLast) ? renderIcon(icon) : null}
                {value ?
                    <Typography variant="h4" pl={(icon && !showIconLast) ? 1 : 0} pr={(icon && showIconLast) ? 1 : 0} color={color} className="fw-bold">
                        {value}
                    </Typography> : null}
                {(icon && showIconLast) ? renderIcon(icon) : null}
            </Box>
        );
    };

    const renderProduct = (fieldOpts: headerObj, data: any) => {
        return (
            <Box display="flex" alignItems="center" justifyContent={fieldOpts.align}>
                {(!fieldOpts.showIconLast) ? renderIcon(getProductIcon(data.productColorNm)) : null}
                {data.productName ?
                    <Typography variant="h4" pl={(!fieldOpts.showIconLast) ? 1 : 0} pr={(fieldOpts.showIconLast) ? 1 : 0} color="var(--Darkgray)" className="fw-bold">
                        {data.productName}
                    </Typography> : null}
                {(fieldOpts.showIconLast) ? renderIcon(getProductIcon(data.productColorNm)) : null}
            </Box>
        );
    };


    const renderStatus = (fieldOpts: headerObj, data: any) => {
        let matchedStatus: fieldOptions[] = [];
        if (fieldOpts.fieldOptions) {
            matchedStatus = fieldOpts?.fieldOptions.filter(field => data?.toLowerCase() === field.value?.toLowerCase());
        }

        if (matchedStatus.length) {
            return (setStatusCol(
                fieldOpts.showIconLast || false,
                fieldOpts.align || 'left',
                matchedStatus[0].displayValue || '',
                matchedStatus[0].color || 'var(--Darkgray)',
                matchedStatus[0].icon
            ));
        } else {
            return;
        }
    };

    const checkCountIsZero = (value: string) => {
        try {
            const extractedNumbers = value.toString().match(/\d/g);
            if (extractedNumbers) {
                if (Number(extractedNumbers?.join("")) <= 0) {
                    return true;
                }
                return false;
            }
            return false;
        } catch {
            return false;
        }
    };

    const setAccordianButtonStatus = (value: string, indexKey: any) => {
        if (checkCountIsZero(value)) {
            return 'empty';
        } else {
            return indexKey === selectedIndexKey ? 'active' : '';
        }
    };


    const getRowsData = () => {
        const keys = getKeys();
        const { primaryKey } = props;
        return (
            stableSort(props.rows, getComparator(props.order, props.orderBy))
                .map((row: any, indexKey: any) => {
                    const isItemSelected = isSelected(row[primaryKey]);
                    return (<React.Fragment key={indexKey}>
                        <TableRow key={indexKey} sx={{
                            cursor: props.openDrawer ? "pointer" : "auto"
                        }}>
                            {
                                props.enableRowSelection ?
                                    <TableCell
                                        padding="checkbox"
                                        className="grid-cell-parent"
                                        component="th"
                                        scope="row"
                                        onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                    >
                                        <Checkbox
                                            name={`checkbox${row[primaryKey]}`}
                                            checked={isItemSelected || false}
                                            onChange={() => props.handleCheckChange && props.handleCheckChange(row[primaryKey])}
                                            onClick={e => e.stopPropagation()}
                                        />
                                    </TableCell>
                                    : null}
                            {keys.map((key: any, index: any) =>
                                <TableCell
                                    className="grid-cell-parent"
                                    component="th"
                                    scope="row"
                                    size="small"
                                    align={props.headCells[index].align}
                                    key={(indexKey.toString() + index.toString())}
                                    onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                >
                                    {
                                        props.headCells[index].type === 'text' ?
                                            props.headCells[index].width ? (
                                                <div
                                                    title={row[key]}
                                                    className="ellipses_column"
                                                    style={{
                                                        width: props.headCells[index].width,
                                                    }}>
                                                    {props.headCells[index].bold ? <b>{row[key]}</b> : row[key]}
                                                </div>

                                            ) : (
                                                props.headCells[index].bold ? <b>{row[key]}</b> : row[key]
                                            )
                                            :
                                            props.headCells[index].type === 'button' ?
                                                <Button
                                                    types="accordian"
                                                    aria-label="accordian"
                                                    className={setAccordianButtonStatus(row[key], indexKey)}
                                                    onClick={(e) => handleCollapaseClick(e, indexKey, row, key)}
                                                    startIcon={props.headCells[index].icon ? <Icon component={props.headCells[index].icon} /> : undefined}
                                                >
                                                    {
                                                        row[key]
                                                    }
                                                </Button> :
                                                props.headCells[index].type === 'icon' ? renderIcon(row[key]) :
                                                    props.headCells[index].type === 'icons' ? renderIcons(key, row[key], props.headCells[index].align) :
                                                        props.headCells[index].type === 'image' ? <Avatar sx={tableAvatarSX} src={row[key]} variant="square" /> :
                                                            props.headCells[index].type === 'images' ? renderImages(row[key]) :
                                                                props.headCells[index].type === 'dropdown' ? renderSelect() :
                                                                    props.headCells[index].type === 'status' ? renderStatus(props.headCells[index], row[key]) :
                                                                        props.headCells[index].type === 'product' ? renderProduct(props.headCells[index], row[key]) : ""
                                    }
                                </TableCell>
                            )}
                            {
                                props.enableRowAction ?
                                    <TableCell
                                        className="grid-cell-parent"
                                        component="th"
                                        scope="row"
                                        align="right"
                                        size="small"
                                    >
                                        <FormControl>
                                            <DataGridActionsMenu
                                                options={props.rowActionOptions || []}
                                                onSelect={(e, value) => props.onRowActionSelect && props.onRowActionSelect(value, row)}
                                                showInnerTableMenu={props.showInnerTableMenu}
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
        if (props?.rows?.length) {
            return getRowsData();
        } else if (!props?.isLoading) {
            return (<TableBody className='no-data'> <NoDataFound searchTerm={props.searchTerm} msgLine2={props.noDataMsg} showImg={props.showImg} /> </TableBody>);
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