/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SyntheticEvent, useEffect } from "react";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { useTranslation } from "react-i18next";
import {
    FilterIcon,
} from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { useGetParkingLotDetails } from "./queries";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { Add } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { filterByFields, sortByOptions } from "./config";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { Box, FormControl, Grid, Typography } from "@mui/material";
import { HorizontalBarVersionState, addedCustomerIdState, useStore, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore, useAddedCustomerNameStore } from "../../store";
import VehicleModel from "../../models/VehicleModel";
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";
import { ParkingLotNoDataIcon } from '../../assets/icons';
import { getSeachedDataTotalCount } from "../../utils/helperFunctions";
interface ContentProps {
    rows?: [];
    version: string
}

const VehicleContent: React.FC<ContentProps> = () => {
    const VehicleObj = new VehicleModel();
    const headCells = VehicleObj.fieldsToDisplay();
    const rowActionOptions = VehicleObj.rowActions();
    const massActionOptions = VehicleObj.massActions();
    const ACTION_TYPES = VehicleObj.ACTION_TYPES;
    const MASS_ACTION_TYPES = VehicleObj.MASS_ACTION_TYPES;
    const navigate = useNavigate();
    const location = useLocation();
    const [info, setInfo] = React.useState({});
    const [searchTerm, setSearchTerm] = React.useState("");
    const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [custFilterPanelVisible, setCustFilterPanelVisible] = React.useState(false);
    const [parkingLotlist, setParkingLotList] = React.useState([]);
    const customerId = useAddedCustomerIdStore((state: addedCustomerIdState) => state.customerId);

    const { t } = useTranslation();
    const { data, fetchNextPage, isFetching, isLoading }: any = useGetParkingLotDetails(
        searchTerm,
        sortOrder,
        filterData,
        customerId
    );
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);
    const resetFormFieldValue = useShowConfirmationDialogBoxStore((state) => state.resetFormFieldValue);


    useEffect(() => {
        const statePL = location.state as { customerName: string };
        resetFormFieldValue(false);
        if (statePL) {
            setPageCustomerName(statePL.customerName);
        }
    });

    const openDrawer = (row: SyntheticEvent) => {
      setInfo(row);
      setDrawerOpen(true);
    };

    const navigateToAddVehicle = () => {
        console.log("navigateToAddVehicle");
    };

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
        setResetTableCollaps(true);
        setSortOrder(sortOrder);
    };

    const onInputChange = (value: string) => {
        setResetTableCollaps(true);
        setSearchTerm(value);
    };
    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                console.log(list);
            });
            setParkingLotList(list);
        }
    }, [data]);
    const handleCustFilterPanelOpen = () => {
        setDrawerOpen(false);
        setCustFilterPanelVisible(!custFilterPanelVisible);
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
        setResetTableCollaps(true);
    };

    const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
        switch (action.action) {
            case ACTION_TYPES.EDIT:
                // perform action 
                console.log("navigate to edit =vehicle page");
                break;
            case ACTION_TYPES.DELETE:
                // perform action
                break;
            default: return;
        }
    };

    const handleCustFilterPanelClose = () => setCustFilterPanelVisible(false);

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setResetTableCollaps(true);
        setFilterData(filterObj);
    };

    return (
        <Box display="flex">
            <Grid container pr={8}>
                <Grid container display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                types="filter"
                                aria-label="dafault"
                                onClick={handleCustFilterPanelOpen}
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
                        {
                            (searchTerm && !(isFetching || isLoading) && data) &&
                            <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                                    {getSeachedDataTotalCount(data, [t('vehicle.result(s) found'), t('vehicle.results found')])}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                types="primary"
                                aria-label="primary"
                                onClick={navigateToAddVehicle}
                                startIcon={<Add />}
                            >
                                {t("buttons.add vehicle")}
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
                        rows={parkingLotlist}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowSelection
                        enableRowAction
                        getPages={fetchNextPage}
                        onRowActionSelect={handleRowAction}
                        searchTerm={searchTerm}
                        rowActionOptions={rowActionOptions}
                        openDrawer={openDrawer}
                        noDataMsg='Add vehicle by clicking on vehicle or any related sentence.'
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                        showImg={<ParkingLotNoDataIcon className='PLNoDataSVG' />}
                    />

                    <RightInfoPanel
                        panelType="dynamic-filter"
                        open={custFilterPanelVisible}
                        headingText={"parkingLot.header.filter"}
                        provideFilterParams={getFilterParams}
                        onClose={handleCustFilterPanelClose}
                        fields={filterByFields}
                        storeKey='parkingLot' />


                </Grid>
            </Grid>
        </Box>
    );
};

export default VehicleContent;