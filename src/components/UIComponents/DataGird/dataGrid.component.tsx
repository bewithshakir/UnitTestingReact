import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import * as React from "react";
import { useTranslation } from 'react-i18next';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { Button } from './../Button/Button.component';
import './grid.style.scss';

type HeadCellsOptions = {
    id: string;
    label: string;
    type: string;
}

interface GridBodyProps {
    rows?: any,
    order: string | any,
    orderBy: string,
    headCells: HeadCellsOptions[],
    isError?: string
}


function descendingComparator (a: any, b: any, orderBy: any) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
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
        return Object.keys(props.rows[0]);
    }

    const handleCollapaseClick = (key: any) => {
        if (key === selectedIndexKey) {
            setSelectedKey(null);
        } else {
            setSelectedKey(key);
        }
    }


    const getRowsData = () => {
        var keys = getKeys();
        return (
            stableSort(props.rows, getComparator(props.order, props.orderBy))
                .map((row: any, indexKey: any) =>
                    <React.Fragment>
                        <TableRow key={indexKey}>
                            {keys.map((key: any, index: any) =>
                                <TableCell component="th" scope="row" key={row[key]}>
                                    {props.headCells[index].type === 'text' ? index === 0 ? <b>{row[key]}</b> : row[key] :
                                        props.headCells[index].type === 'button' ?
                                            <Button
                                                types="accordian"
                                                aria-label="accordian"
                                                className="active"
                                                onClick={() => handleCollapaseClick(indexKey)}
                                                startIcon={< LocationOnOutlinedIcon />}
                                            >
                                                {row[key]}
                                            </Button > :
                                            props.headCells[index].type === 'icon' ?
                                                <DataGridActionsMenu
                                                    options={[{ label: t("menus.data-grid-actions.raise a request"), },
                                                    { label: t("menus.data-grid-actions.fee & driver details"), },
                                                    { label: t("menus.data-grid-actions.other details"), },
                                                    { label: t("menus.data-grid-actions.contact details"), }
                                                    ]}
                                                    onSelect={(value) => {
                                                        console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                                                    }}
                                                />
                                                : ""
                                    }
                                </TableCell>
                            )}
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
                    </React.Fragment>
                )
        )
    }

    return (
        getRowsData()
    )

}

export default EnhancedGridBody;