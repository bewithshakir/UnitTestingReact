import React, { useEffect } from 'react';
import { Box, FormControl, Grid, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

import { Button } from "../../../components/UIComponents/Button/Button.component";
import GridComponent from "../../../components/UIComponents/DataGird/grid.component";
import { FilterIcon } from "../../../assets/icons";
import SortbyMenu from "../../../components/UIComponents/Menu/SortbyMenu.component";
import SearchInput from "../../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../../components/UIComponents/Menu/ActionsMenu.component";
import TruckParkingLotModel from '../../../models/TruckParkingLotModel';
import { HorizontalBarVersionState, useStore } from '../../../store';

import { useGetTruckParkingLotList } from "./queries";
import { DataGridActionsMenuOption } from "../../../components/UIComponents/Menu/DataGridActionsMenu.component";
import { RightInfoPanel } from '../../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
import { getSeachedDataTotalCount } from '../../../utils/helperFunctions';

interface ContentProps {
    version: string
}

const TruckParkingLot: React.FC<ContentProps> = () => {
    const truckParkingLotObj = new TruckParkingLotModel();
    const headCells = truckParkingLotObj.fieldsToDisplay();
    const massActionOptions = truckParkingLotObj.massActions();
    const rowActionOptions = truckParkingLotObj.rowActions();
    const ACTION_TYPES = truckParkingLotObj.ACTION_TYPES;
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const { t } = useTranslation();
    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [truckParkingLotList, setTruckParkingLotList] = React.useState<any[]>([]);
    const [resetTableCollaps, setResetTableCollaps] = React.useState(false);

    // const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [filterPanelVisible, setFilterPanelVisible] = React.useState(false);
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        setVersion("NavLinks");
    }, []);

    const handleTruckFilterOpen = () => {
        setFilterPanelVisible(true);
    };
    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setResetTableCollaps(true);
        setFilterData(filterObj);
    };
    const handleTruckFilterClose = () => {
        setFilterPanelVisible(false);
    };

    const onSortBySlected = (value: string) => {
        let sortOrder;
        switch (value) {
            case t('truck.sortBy.atoz'):
                sortOrder = { sortBy: "parkingLocationNm", order: "asc" };
                break;
            case t('truck.sortBy.ztoa'):
                sortOrder = { sortBy: "parkingLocationNm", order: "desc" };
                break;
            default:
                sortOrder = { sortBy: "", order: "" };
                break;
        }
        setResetTableCollaps(true);
        setSortOrder(sortOrder);
    };
    const navigateToAddParkingLot = () => {
        navigate(`/truckParkingLot/add`);
    };
    const onInputChange = (value: string) => {
        setResetTableCollaps(true);
        setSearchTerm(value);
    };

    const handleMassAction = () => {
        // TO DO
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
            setTruckParkingLotList(list);
        }
    }, [truckParkingLotData]);

    const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
        switch (action.action) {
            case ACTION_TYPES.EDIT:
                // perform action 
                navigate(`/truckParkingLot/edit/${row.id}`);
                break;
            default: return;
        }
    };

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
                                onClick={handleTruckFilterOpen}
                                startIcon={<FilterIcon />}
                            >
                                {t("buttons.filterText")}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    data-testid="sortByMenu"
                                    id="sortByMenu"
                                    options={truckParkingLotObj.getSortByOptions().map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => onSortBySlected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name="searchInput"
                                id="trucklotSearch"
                                placeholder={t('truckParkingLot.search')}
                                value={searchTerm}
                                delay={600}
                                onChange={onInputChange}
                            />
                        </Grid>
                        {
                            (searchTerm && !(isFetching || isLoading) && truckParkingLotData) &&
                            <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                                    {getSeachedDataTotalCount(truckParkingLotData, [t('truckParkingLot.result(s) found'), t('truckParkingLot.results found')])}
                                </Typography>
                            </Grid>
                        }
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
                        primaryKey='id'
                        rows={truckParkingLotList}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowAction
                        getPages={fetchNextPage}
                        onRowActionSelect={handleRowAction}
                        rowActionOptions={rowActionOptions}
                        searchTerm={searchTerm}
                        filterData={filterData}
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                        noDataMsg='Add Truck parking lot by clicking on the "Add Truck Parking Lot" button.'
                    />
                    <RightInfoPanel panelType="dynamic-filter"
                        open={filterPanelVisible} headingText={"customer-filter-panel.header.filter"}
                        provideFilterParams={getFilterParams} onClose={handleTruckFilterClose}
                        fields={truckParkingLotObj.FilterByFields()}
                        storeKey={'truckParkingLotFilter'}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default TruckParkingLot;