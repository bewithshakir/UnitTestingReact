import * as React from "react";
import { TableSortLabel, TableRow, TableHead, TableCell } from '@mui/material';
import './grid.style.scss';



type HeadCellsOptions = {
    id: string;
    label: string;
    type: string;
}

interface GridHeaderProps {
    order: string | any,
    orderBy: string,
    headCells: HeadCellsOptions[],
    onRequestSort: (event: any, property: any) => void,
}
const EnhancedGridHead: React.FC<GridHeaderProps> = (props) => {

    const createSortHandler = (property: any) => (event: any) => {
        props.onRequestSort(event, property);
    };

    return (

        <TableHead>
            <TableRow>
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        className="header-options"
                        style={{minWidth:100, maxWidth:100}}
                        sortDirection={props.orderBy === headCell.id ? props.order : false}
                    >
                        {headCell.id === '' ? '' : <TableSortLabel active={props.orderBy === headCell.id}
                            direction={props.orderBy === headCell.id ? props.order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >

                            {headCell.label}
                        </TableSortLabel>}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>

    );
}
export default EnhancedGridHead;