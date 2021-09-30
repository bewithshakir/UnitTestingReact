import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableBody } from '@material-ui/core';
import GridComponent from '../DataGird/grid.component';
import Grid from '@mui/material/Grid'
import SortbyMenu from '../Menu/SortbyMenu.component';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button.component';
import { FilterIcon, PlusIcon, DeleteIcon, ImportIcon, ExportIcon } from '../../../assets/icons';
import Add from '@material-ui/icons/Add';
import ActionsMenu from '../Menu/ActionsMenu.component';
import './CustomerListHeader.style.scss';
import SearchInput from '../SearchInput/SearchInput';




const headCells = [{ id: "customername", label: "CUSTOMER NAME", type: 'text' },
{ id: "contactname", label: "CANTACT NAME", type: 'text' },
{ id: "address", label: "ADDRESS", type: 'text' },
{ id: "city", label: "CITY", type: 'text' },
{ id: "state", label: "STATE", type: 'text' },
{ id: "zip", label: "ZIP", type: 'number' },
{ id: "lots", label: "LOTS", type: 'button' },
{ id: "settlementtype", label: "SETTLEMENT TYPE", type: 'text' },
{ id: "", label: "", type: 'icon' }
];

const rows = [{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager", "icon": "icon" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 21, "settlementtype": "Voyager" },
{ "customername": "B_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 10, "settlementtype": "Voyager" },
{ "customername": "C_Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 18, "settlementtype": "Voyager" },
{ "customername": "Accurate Transportation", "contactname": "Peter Parker", "address": "9555 Post Oak Rd", "city": "Houston", "state": "TX", "zip": 77024, "lots": 20, "settlementtype": "Voyager" }];

const CustomerListHeader: React.FC = () => {
    const { t, i18n } = useTranslation();
    const drawerWidth = 54;
    const [error, showError] = useState(false);
    const [isValidRowData, setValidRowData] = useState(false);


    return (
        <TableContainer sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, pt: 2 }}>
            <Table aria-label="customized table">
                <TableHead>
                    <Grid container className="customer-list-item-header">
                        <Grid item xs={3} className="customer-list-item">
                            <Button
                                types="filter"
                                aria-label="dafault"
                                onClick={() => { }}
                                startIcon={<FilterIcon />}
                            > Filter </Button>

                            <SortbyMenu
                                options={[
                                    t("menus.sortby.payment completed"),
                                    t("menus.sortby.payment in progress"),
                                    t("menus.sortby.recently added lots"),
                                ]}
                                onSelect={(value) => {
                                    console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                                }}
                            />

                            <SearchInput
                                name='searchTerm'
                            //value={form.searchTerm}
                            //onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={7} />
                        <Grid item xs={2} className="customer-list-right-item">
                            <Button
                                types="primary"
                                aria-label="primary"
                                //onClick={navigateToAddCustomer}
                                startIcon={<Add />}
                            >
                                {t("buttons.add customer")}
                            </Button>
                            <ActionsMenu
                                options={[
                                    {
                                        label: t("menus.actions.add vehicle"),
                                        icon: <PlusIcon />
                                    },
                                    {
                                        label: t("menus.actions.import data"),
                                        icon: <ImportIcon />
                                    },
                                    {
                                        label: t("menus.actions.export data"),
                                        icon: <ExportIcon />
                                    },
                                    {
                                        label: t("menus.actions.delete"),
                                        icon: <DeleteIcon />
                                    }
                                ]}
                                onSelect={(value) => {
                                    console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                                }}
                            />
                        </Grid>

                    </Grid>
                </TableHead>

                <TableBody>
                    <GridComponent 
                        showError={error}
                        headCellsData={headCells}
                        rows={rows}
                        isValidRowData={isValidRowData}
                    />
                </TableBody>

            </Table>
        </TableContainer>
    );
}

export default CustomerListHeader;