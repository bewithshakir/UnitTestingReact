import * as React from "react";
import { TableSortLabel, TableRow, TableHead, TableCell } from '@mui/material';
import Checkbox from '../Checkbox/Checkbox.component';
import './grid.style.scss';
import { SortByIcon } from '../../../assets/icons';



type HeadCellsOptions = {
    id: string;
    label: string;
    type: string;
}

interface GridHeaderProps {
    order: string | any;
    orderBy: string;
    headCells: HeadCellsOptions[];
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
    isError?: any;


    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rowCount: number;
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
                    {props.headCells.map((headCell) => (

                        headCell.type === 'checkbox' ?
                            <TableCell padding="checkbox" className="header-options">
                                <Checkbox
                                    name={`checkbox${headCell.id}`}
                                    indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
                                    checked={props.rowCount > 0 && props.numSelected === props.rowCount}
                                    onChange={props.onSelectAllClick}

                                    onClick={e => e.stopPropagation()}
                                />
                            </TableCell>
                            :
                            <TableCell
                                key={headCell.id}
                                className="header-options"
                                sortDirection={props.orderBy === headCell.id ? props.order : false}
                            >
                                {headCell.id === '' ? '' :
                                    <TableSortLabel
                                        IconComponent={SortByIcon}
                                        active={props.orderBy === headCell.id}
                                        direction={props.orderBy === headCell.id ? props.order : "asc"}
                                        onClick={createSortHandler(headCell.id)}
                                    >

                                        {headCell.label}
                                    </TableSortLabel>
                                }
                            </TableCell>
                    ))}
                </TableRow>}
        </TableHead>

    );
};
export default EnhancedGridHead;