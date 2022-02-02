import React, { useEffect } from 'react';
import { Box, FormControl, Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

import { Button } from "../../../components/UIComponents/Button/Button.component";
import GridComponent from "../../../components/UIComponents/DataGird/grid.component";
import { FilterIcon } from "../../../assets/icons";
import SortbyMenu from "../../../components/UIComponents/Menu/SortbyMenu.component";
import { sortByOptions } from "./config";
import SearchInput from "../../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../../components/UIComponents/Menu/ActionsMenu.component";
import TruckParkingLotModel from '../../../models/TruckParkingLotModel';
import { DataGridActionsMenuOption } from "../../../components/UIComponents/Menu/DataGridActionsMenu.component";
import { useGetTruckParkingLotList } from "./queries";

interface ContentProps {
    version: string
}

const dataTruck = [
    {
        "id": "a3f54ade-ff65-4055-a968-7f3cb06bffb1",
        "name": "Packing Location 16",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "cb7b8fc1-6538-40ea-9c0e-d58b8036b50c",
        "name": "Packing Location 15",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "3074373b-d99a-4dfa-aa97-a655b9d8756d",
        "name": "Packing Location 14",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "b166ff01-1e98-435a-9b29-ea1b35928300",
        "name": "Packing Location 13",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "e13cc8f9-366a-488b-87ed-2f3b6c056039",
        "name": "Packing Location 12",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "134aff42-07c2-4e9e-8f77-c0a9f5081830",
        "name": "Packing Location 11",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "b93b7dc8-b87f-411b-9582-349f5b942da4",
        "name": "Packing Location 10",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "dfb2bf79-c655-42d6-ba86-b692be328899",
        "name": "Packing Location 9",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "01abedd3-23b4-4a1e-86d6-efd75048e733",
        "name": "Packing Location 8",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "8e333978-fafe-49c1-a818-bc37a6bb8487",
        "name": "Packing Location 7",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "90103ce1-cc2f-4e05-ba61-0d0a78208086",
        "name": "Packing Location 6",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "6bfbc95a-fa96-4eb1-ad74-72d84db3cfd2",
        "name": "Packing Location 5",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "ab9f9a8a-4d8b-42b4-8904-e2ed8a74a1f1",
        "name": "Packing Location 4",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "ac10c5f3-e912-4a15-a4e2-f369b80f86c6",
        "name": "Packing Location 3",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    },
    {
        "id": "912edab5-2444-42b7-86d0-8bd102f27534",
        "name": "Packing Location 2",
        "address": "Address 1   Address 2",
        "city": "Silchar",
        "state": "Assam",
        "postalCode": "788003"
    }
]
const TruckParkingLot: React.FC<ContentProps> = () => {
    const truckParkingLotObj = new TruckParkingLotModel();
    const headCells = truckParkingLotObj.fieldsToDisplay();
    const massActionOptions = truckParkingLotObj.massActions();
    const ACTION_TYPES = truckParkingLotObj.ACTION_TYPES;
    const MASS_ACTION_TYPES = truckParkingLotObj.MASS_ACTION_TYPES;
    const rowActionOptions = truckParkingLotObj.rowActions();

    const { t } = useTranslation();
    const navigate = useNavigate();


    const [searchInput, setSearchInput] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [truckParkingLotList, setTruckParkingLotList] = React.useState<any[]>([]);
    const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    const onSortBySlected = (value: string) => {
        let sortOrder;
        switch (value) {
            case "Customer Name A-Z":
                sortOrder = { sortBy: "customerName", order: "asc" };
                break;
            case "Customer Name Z-A":
                sortOrder = { sortBy: "customerName", order: "desc" };
                break;
            case "Newest to Oldest":
                sortOrder = { sortBy: "date", order: "desc" };
                break;
            case "Oldest to New":
                sortOrder = { sortBy: "date", order: "asc" };
                break;
            default:
                sortOrder = { sortBy: "", order: "" };
                break;
        }
        setResetTableCollaps(true);
        setSortOrder(sortOrder);
    };
    const navigateToAddParkingLot = () => {
        navigate(`/`);
    };
    const onInputChange = (value: string) => {
        setResetTableCollaps(true);
        setSearchInput(value);
    };

    const handleMassAction = (action: DataGridActionsMenuOption) => {
        switch (action.action) {
            case MASS_ACTION_TYPES.IMPORT:
                // perform action
                break;
            case MASS_ACTION_TYPES.EXPORT:
                // perform action
                break;
            case MASS_ACTION_TYPES.DELETE:
                // perform action
                break;
            default: return;
        }
    };

    const { data: truckParkingLotData, fetchNextPage, isLoading, isFetching }: any = useGetTruckParkingLotList(
        searchTerm,
        sortOrder,
        filterData
    );
    useEffect(() => {
        if (truckParkingLotData) {
            const list: any = [];
            truckParkingLotData?.pages?.forEach((item: any) => {
                list.push(...item.data.parkingLocations);
            });
            console.log('list parkingLocations--', list)
            setTruckParkingLotList(list);
        }
    }, [truckParkingLotData]);

    return (
        <Box display="flex" mt={8} ml={8}>
            <Grid container pl={6.25} pr={6.25} className="main-area">
                <Grid container pt={2.5} display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                data-testid="filter"
                                types="filter"
                                aria-label="dafault"
                                onClick={() => {
                                    alert('filter')
                                }}
                                startIcon={<FilterIcon />}
                            >
                                {t("buttons.filterText")}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    id="sortByMenu"
                                    options={sortByOptions.map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => onSortBySlected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name="searchInput"
                                placeholder="Search"
                                value={searchInput}
                                delay={600}
                                onChange={onInputChange}
                            />
                        </Grid>
                        {/* {
                            (searchTerm && !(isFetching || isLoading) && data) &&
                            <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                                    {getSeachedDataTotalCount(data, [t('customerManagement.result(s) found'), t('customerManagement.results found')])}
                                </Typography>
                            </Grid>
                        } */}
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                data-testid="addBtn"
                                types="primary"
                                aria-label="primary"
                                onClick={navigateToAddParkingLot}
                                startIcon={<Add />}
                            >
                                Add Truck Parking Lot
                            </Button>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <ActionsMenu
                                    options={massActionOptions}
                                    onSelect={handleMassAction}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container pt={2.5} display="flex" flexGrow={1} data-testid="data-grid">
                

                    <GridComponent
                        primaryKey='customerId'
                        rows={truckParkingLotList}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowAction
                        getPages={fetchNextPage}
                        rowActionOptions={rowActionOptions}
                        searchTerm={searchInput}
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                        noDataMsg='Add Truck parking lot by clicking on the "Add Truck Parking Lot" button.'
                    />

                    {/* <RightInfoPanel panelType="dynamic-filter"
                        open={custFilterPanelVisible} headingText={"customer-filter-panel.header.filter"}
                        provideFilterParams={getFilterParams} onClose={handleCustFilterPanelClose}
                        fields={filterByFields}
                        storeKey={'customerFilter'}
                    />
                    <RightInfoPanel panelType="info-view" category="customer" open={drawerOpen} headingText={infoPanelName} info={info} idStrForEdit={infoPanelEditId} nameStrForEdit={infoPanelName} onClose={drawerClose} /> */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TruckParkingLot;