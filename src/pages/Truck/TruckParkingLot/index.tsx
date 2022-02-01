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


const TruckParkingLot: React.FC<ContentProps> = () => {
    const truckParkingLotObj = new TruckParkingLotModel();
    const headCells = truckParkingLotObj.fieldsToDisplay();
    const massActionOptions = truckParkingLotObj.massActions();
    const ACTION_TYPES = truckParkingLotObj.ACTION_TYPES;
    const MASS_ACTION_TYPES = truckParkingLotObj.MASS_ACTION_TYPES;
    const rowActionOptions = truckParkingLotObj.rowActions();

    const { t } = useTranslation();
    const navigate = useNavigate();


    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [truckParkingLotList, setTruckParkingLotList] = React.useState([]);
    const [resetTableCollaps, setResetTableCollaps] = React.useState(false);

    const onSortBySelected = (value: string) => {
        let sortOrder;
        switch (value) {
            case "Lot Name A-Z":
                sortOrder = { sortBy: "deliveryLocationNm", order: "asc" };
                break;
            case "Lot Name Z-A":
                sortOrder = { sortBy: "deliveryLocationNm", order: "desc" };
                break;
            default:
                sortOrder = { sortBy: "", order: "" };
                break;
        }
    };
    const navigateToAddLot = () => {
        navigate(`/`);
    };
    const onInputChange = (value: string) => {
        setResetTableCollaps(true);
        setSearchTerm(value);
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
                list.push(...item.data.fuelTax);
            });
            setTruckParkingLotList(list);
        }
    }, [truckParkingLotData]);

    return (
        <Box display="flex">
            <Grid container pl={2.25} pr={6.25} className="main-area">
                <Grid container display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                types="filter"
                                aria-label="dafault"
                                onClick={() => {

                                }}
                                startIcon={<FilterIcon />}
                            >
                                Filter
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    options={sortByOptions.map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => onSortBySelected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name="searchTerm"
                                value={searchTerm}
                                delay={600}
                                onChange={onInputChange}
                                placeholder={t('parkingLot.search')}
                            />
                        </Grid>
                        {/* {
                            (searchTerm && !(isFetching || isLoading) && data) &&
                            <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                                    {getSeachedDataTotalCount(data, [t('parkingLot.result(s) found'), t('parkingLot.results found')])}
                                </Typography>
                            </Grid>
                        } */}
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                types="primary"
                                aria-label="primary"
                                onClick={navigateToAddLot}
                                startIcon={<Add />}
                            >
                                {t("buttons.add lot")}
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
                <Grid container pt={2.5} display="flex" flexGrow={1}>

                    <GridComponent
                        primaryKey='deliveryLocationId'
                        rows={truckParkingLotList}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowSelection
                        enableRowAction
                        getPages={fetchNextPage}
                        searchTerm={searchTerm}
                        rowActionOptions={rowActionOptions}
                        noDataMsg='Add Truck Parking lot by clicking on "Add Truck Parking Lot" button'
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                    />

                    {/* <RightInfoPanel
                panelType="dynamic-filter"
                open={custFilterPanelVisible}
                headingText={"parkingLot.header.filter"}
                provideFilterParams={getFilterParams}
                onClose={handleCustFilterPanelClose}
                fields={filterByFields}
                storeKey='parkingLot' />
                
              <RightInfoPanel panelType="info-view" category="lot" open={drawerOpen} headingText={infoPanelName} info={info} idStrForEdit={infoPanelEditId} nameStrForEdit={infoPanelName} onClose={drawerClose} />
     */}
                </Grid>
            </Grid>
        </Box>
    );
};

export default TruckParkingLot;