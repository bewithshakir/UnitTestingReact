import * as React from "react";
import { TableSortLabel, TableRow, TableHead, TableCell, Box } from '@mui/material';
import './grid.style.scss';



type HeadCellsOptions = {
    id: string;
    label: string;
}

interface GridHeaderProps {
    order: string | any,
    orderBy: string,
    headCells: HeadCellsOptions[],
    onRequestSort: (event: any, property: any) => void,
    isError?: any,
}
const EnhancedGridHead: React.FC<GridHeaderProps> = (props) => {

    const createSortHandler = (property: any) => (event: any) => {
        props.onRequestSort(event, property);
    };

    return (

        <TableHead>
            {props.isError ? <TableRow>{"No Data Received"}</TableRow> : <TableRow>
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        className="header-options"
                        sortDirection={props.orderBy === headCell.id ? props.order : false}
                    >
                        {headCell.id === '' ? '' : <TableSortLabel active={props.orderBy === headCell.id}
                            direction={props.orderBy === headCell.id ? props.order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >

                            {headCell.label}
                            {props.orderBy === headCell.id ? (
                                <Box component="span" sx={{visibility:"hidden"}}>
                                    {props.order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>}

                    </TableCell>
                ))}
            </TableRow>}
        </TableHead>

    );
};
export default EnhancedGridHead;