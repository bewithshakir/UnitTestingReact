import * as React from "react";
import { TableSortLabel, TableRow, TableHead, TableCell } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import './grid.style.scss';
import { SortByIcon } from '../../../assets/icons';



type HeadCellsOptions = {
    field: string;
    label: string;
    type: string;
}

interface GridHeaderProps {
    order: string | any;
    orderBy: string;
    headCells: HeadCellsOptions[];
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    isError?: any;
    numSelected?: number;
    onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount?: number;
    enableRowSelection?: boolean;
    enableRowAction?: boolean;
}
const EnhancedGridHead: React.FC<GridHeaderProps> = (props) => {

    const createSortHandler = (property: any) => (event: any) => {
        props.onRequestSort(event, property);
    };

    return (

        <TableHead
            sx={{
                height: '51px'
            }}
        >
            {props.isError ?
                <TableRow>{"No Data Received"}</TableRow>
                :
                <TableRow>
                    {props.enableRowSelection && props.numSelected !== undefined && props.rowCount ?
                        <TableCell padding="checkbox" className="header-options">
                            <Checkbox
                                name='checkbox-all'
                                indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                                checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                                onChange={props.onSelectAllClick}

                                onClick={e => e.stopPropagation()}
                            />
                        </TableCell> : null}
                    {props.headCells.map((headCell) => (
                        <TableCell
                            key={headCell.field}
                            className="header-options"
                            sortDirection={props.orderBy === headCell.field ? props.order : false}
                        >
                            <TableSortLabel
                                IconComponent={SortByIcon}
                                active={props.orderBy === headCell.field}
                                direction={props.orderBy === headCell.field ? props.order : "asc"}
                                onClick={createSortHandler(headCell.field)}
                            >

                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    {props.enableRowAction ? <TableCell className="header-options">
                        <TableSortLabel>{''}</TableSortLabel>
                    </TableCell> : null}
                </TableRow>}
        </TableHead>

    );
};
export default EnhancedGridHead;