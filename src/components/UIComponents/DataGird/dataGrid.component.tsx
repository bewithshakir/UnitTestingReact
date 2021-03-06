import React, { useEffect, useRef } from "react";
import { Collapse, TableBody, TableCell, TableRow, FormControl, Avatar, Icon, ImageList, Typography, Box, ImageListItem } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import Radio from '../Radio/Radio.component';
import { Loader } from '../Loader';
import DataGridActionsMenu, { DataGridActionsMenuOption, RowActionHanddlerRef } from '../Menu/DataGridActionsMenu.component';
import { Button } from './../Button/Button.component';
import './grid.style.scss';
import { fieldOptions, filterObjType, headerObj } from './grid.component';
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
    /** Will work only if enableRowSelection is true, It will add radio button instead of checkbox  */
    singleRowSelection?: boolean;
    enableRowAction?: boolean;
    openDrawer?: any;
    selectedRows?: string[];
    getId?: any;
    resetCollaps?: boolean;
    onResetTableCollaps?: (value: boolean) => void;
    InnerTableComponent?: any;
    noDataMsg?: string,
    searchTerm?: string,
    filterData?: filterObjType,
    showImg?: React.ReactNode,
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

const EnhancedGridBody: React.FC<GridBodyProps> = (props) => {
    const [selectedRowIndex, setSelectedRowIndex] = React.useState(-1);
    const [selectedColIndex, setSelectedColIndex] = React.useState(-1);
    const dataGridRowActionRef = useRef<RowActionHanddlerRef>(null);

    const getKeys = () => {
        return props?.headCells.map((i: any) => i.field);
    };

    useEffect(() => {
        if (props.resetCollaps) {
            setSelectedRowIndex(-1);
            props.onResetTableCollaps && props.onResetTableCollaps(false);
        }
    }, [props.resetCollaps]);

    const handleCollapaseClick = (e: React.MouseEvent<HTMLButtonElement>, rowIndex: any, colIndex: any, row: any, key: any) => {
        e.stopPropagation();
        const { primaryKey } = props;
        if (!checkCountIsZero(row[key])) {
            props.getId !== undefined && props.getId(row[primaryKey], row);
            if (rowIndex === selectedRowIndex && colIndex === selectedColIndex) {
                setSelectedRowIndex(-1);
            } else {
                setSelectedRowIndex(rowIndex);
                setSelectedColIndex(colIndex);
            }
        }
        dataGridRowActionRef.current?.closeMenu();
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

    const renderProductIcon = (icon: any) => {
        return (
            <Icon sx={tableFuelIconsSX} component={icon} />
        );
    };

    const renderIcons = (key: string, data: any, align: string | undefined) => {
        if (data?.length) {
            return (<ImageList sx={{ ...tableImagesIconListSX, justifyContent: align }} gap={0} cols={5}>
                {data?.map((icon: any, index: number) =>
                    <ImageListItem key={index} >
                        <Icon sx={key === 'fuelStatus' ? tableFuelIconsSX : tableIconsSX} component={key === 'fuelStatus' ? getProductIcon(icon?.productIcon?.productIconNm) : icon} />
                    </ImageListItem>
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

    const shouldDisplayLastIcon = (icon: any, showIconLast: boolean) => {
        return (icon && showIconLast);
    };

    const setStatusCol = (showIconLast: boolean, align: string, value: string, color: string, icon: any) => {
        const leftPadding = shouldDisplayLastIcon(icon, !showIconLast) ? 1 : 0;
        const rightPadding = shouldDisplayLastIcon(icon, showIconLast) ? 1 : 0;
        return (
            <Box display="flex" alignItems="center" justifyContent={align}>
                {shouldDisplayLastIcon(icon, !showIconLast) ? renderIcon(icon) : null}
                {value ?
                    <Typography
                        variant="h4"
                        pl={leftPadding}
                        pr={rightPadding}
                        color={color} className="fw-bold">
                        {value}
                    </Typography> : null}
                {shouldDisplayLastIcon(icon, showIconLast) ? renderIcon(icon) : null}
            </Box>
        );
    };

    const renderProduct = (fieldOpts: headerObj, data: any) => {
        const leftPadding = (!fieldOpts.showIconLast) ? 1 : 0;
        const rightPadding = (fieldOpts.showIconLast) ? 1 : 0;
        return (
            <Box display="flex" alignItems="center" justifyContent={fieldOpts.align}>
                {(!fieldOpts.showIconLast) ? renderProductIcon(getProductIcon(data?.productColorNm)) : null}
                {data?.productName ?
                    <Typography
                        variant="h4"
                        pl={leftPadding}
                        pr={rightPadding}
                        color="var(--Darkgray)"
                        className="fw-bold">
                        {data?.productName}
                    </Typography> : null}
                {(fieldOpts.showIconLast) ? renderProductIcon(getProductIcon(data?.productColorNm)) : null}
            </Box>
        );
    };

    const renderComponent = (fieldOpts: headerObj, data: any) => {
        return (
            <Box display="flex" alignItems="center" justifyContent={fieldOpts.align}>
                {data}
            </Box>
        );
    };

    const renderMultilineText = (data: any) => {
        return (
            <React.Fragment>
                {data.map((value: any, i: any) => <Box key={i}>{value}</Box>)}
            </React.Fragment>);
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

    const setAccordianButtonStatus = (value: string, rowIndex: any, colIndex: any) => {
        if (checkCountIsZero(value)) {
            return 'empty';
        } else {
            return (rowIndex === selectedRowIndex && selectedColIndex === colIndex) ? 'active' : '';
        }
    };


    const onCheckChange = (selectedRow: any) => {
        if (props.handleCheckChange) {
            props.handleCheckChange(selectedRow);
        }
        dataGridRowActionRef.current?.closeMenu();
    };
    const renderRowSelection = (rowData: any, rowPrimaryId: any, singleRowSelection?: boolean, isItemSelected?: boolean) => (
        <TableCell
            padding="checkbox"
            className="grid-cell-parent"
            component="th"
            scope="row"
            onClick={() => props.isChildTable ? {} : openDrawer(rowData)}
        >
            {singleRowSelection ? (
                <Radio
                    name={`checkboxOnGrid`}
                    checked={isItemSelected || false}
                    onChange={() => props.handleCheckChange && props.handleCheckChange(rowPrimaryId)}
                    onClick={e => e.stopPropagation()}
                />
            ) : (<Checkbox
                name={`checkbox${rowPrimaryId}`}
                checked={isItemSelected || false}
                onChange={() => onCheckChange(rowPrimaryId)}
                onClick={e => e.stopPropagation()}
            />
            )}
        </TableCell>
    );

    const renderBoldDataCell = (data: any, isBold: boolean) => isBold ? <b>{data}</b> : data;

    const renderGridCell = (headCells: any, rowIndex: any, colIndex: any, row: any, key: any) => {
        switch (headCells[colIndex].type) {
            case 'text':
                return headCells[colIndex].width ? (
                    <div title={row[key]} className="ellipses_column" style={{ width: headCells[colIndex].width }}>
                        {renderBoldDataCell(row[key], headCells[colIndex].bold)}
                    </div>
                ) : renderBoldDataCell(row[key], headCells[colIndex].bold);
            case 'button':
                return (
                    <Button
                        types="accordian"
                        aria-label="accordian"
                        className={setAccordianButtonStatus(row[key], rowIndex, colIndex)}
                        onClick={(e) => handleCollapaseClick(e, rowIndex, colIndex, row, key)}
                        startIcon={props.headCells[colIndex].icon ? <Icon component={props.headCells[colIndex].icon} /> : undefined}
                    >
                        {row[key]}
                    </Button>
                );
            case 'icon':
                return renderIcon(row[key]);
            case 'icons':
                return renderIcons(key, row[key], props.headCells[colIndex].align);
            case 'image':
                return <Avatar sx={tableAvatarSX} src={row[key]} variant="square" />;
            case 'images':
                return renderImages(row[key]);
            case 'dropdown':
                return renderSelect();
            case 'status':
                return renderStatus(props.headCells[colIndex], row[key]);
            case 'product':
                return renderProduct(props.headCells[colIndex], row[key]);
            case 'component':
                return renderComponent(props.headCells[colIndex], row[key]);
            case 'multi':
                return renderMultilineText(row[key]);
            default:
                return "";
        }
    };

    const renderRowAction = (rowData: any) => (
        <TableCell
            className="grid-cell-parent"
            component="th"
            scope="row"
            align="right"
            size="small"
        >
            <FormControl>
                <DataGridActionsMenu
                    ref={dataGridRowActionRef}
                    options={props.rowActionOptions || []}
                    onSelect={(e, value) => props.onRowActionSelect && props.onRowActionSelect(value, rowData)}
                    showInnerTableMenu={props.showInnerTableMenu}
                />
            </FormControl>
        </TableCell>
    );
    const getRowsData = () => {
        const keys = getKeys();
        const { primaryKey } = props;
        return (
            stableSort(props.rows, getComparator(props.order, props.orderBy))
                .map((row: any, rowIndex: any) => {
                    const isItemSelected = isSelected(row[primaryKey]);
                    return (<React.Fragment key={rowIndex}>
                        <TableRow key={rowIndex} sx={{ cursor: props.openDrawer ? "pointer" : "auto" }}>
                            {props.enableRowSelection ?
                                renderRowSelection(row, row[primaryKey], props.singleRowSelection, isItemSelected) : null
                            }
                            {keys.map((key: any, colIndex: any) =>
                                <TableCell
                                    className="grid-cell-parent"
                                    component="th"
                                    scope="row"
                                    size="small"
                                    align={props.headCells[colIndex].align}
                                    key={(rowIndex.toString() + colIndex.toString())}
                                    onClick={() => props.isChildTable ? {} : openDrawer(row)}
                                >
                                    {renderGridCell(props.headCells, rowIndex, colIndex, row, key)}
                                </TableCell>
                            )}
                            {props.enableRowAction ?
                                renderRowAction(row) : null}
                        </TableRow>
                        <TableRow>
                            <TableCell className="grid-cell" colSpan={12}>
                                <Collapse in={(rowIndex === selectedRowIndex) && selectedColIndex >= 0 ? true : false} timeout="auto" unmountOnExit style={{ position: "sticky" }}>
                                    {(props.InnerTableComponent && selectedColIndex >= 0) && props.InnerTableComponent[props.headCells[selectedColIndex].label]}
                                </Collapse>
                            </TableCell>
                        </TableRow>
                    </React.Fragment >);
                })
        );
    };

    const getGridNumberOfColumns = () => {
        if (props.enableRowSelection) {
            if (props.enableRowAction) {
                return props.headCells.length + 2;
            } else {
                return props.headCells.length + 1;
            }
        } else {
            return props.headCells.length;
        }
    };

    const getData = () => {
        if (props?.rows?.length) {
            return getRowsData();
        } else if (!props?.isLoading) {
            return (<TableBody className='no-data'><TableRow><TableCell colSpan={getGridNumberOfColumns()} sx={{ border: 'none' }}><NoDataFound searchTerm={props.searchTerm} filterData={props.filterData} msgLine2={props.noDataMsg} showImg={props.showImg} /> </TableCell></TableRow></TableBody>);
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