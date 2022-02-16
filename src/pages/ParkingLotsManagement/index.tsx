/* eslint-disable no-console */
import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl, Typography } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon, ParkingLotNoDataIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import ParkingLotsManagementModel from '../../models/ParkingLotsManagementModel';
import { useAllParkingLotList } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { AllParkingLots, MASS_ACTION_TYPES, ROW_ACTION_TYPES, SORTBY_TYPES } from './config';
import { RightInfoPanel } from '../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
import { getSeachedDataTotalCount } from '../../utils/helperFunctions';
export interface ParkingLotsManagementProps {
    version: string
}


const index: React.FC<ParkingLotsManagementProps> = memo(() => {
    const ParkingLotObj = new ParkingLotsManagementModel();
    const headCells = ParkingLotObj.fieldsToDisplay();
    const massActionOptions = ParkingLotObj.massActions();
    const rowActionOptions = ParkingLotObj.rowActions();
    const { SortByOptions, FilterByFields } = AllParkingLots.LandingPage;


    const [searchTerm, setSearchTerm] = React.useState("");
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [isFilterPanelOpen, toggleFilterPanel] = React.useState(false);
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [parkingLotList, setAllParkingLotList] = React.useState([]);


    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("NavLinks");
    const navigate = useNavigate();

    const { t } = useTranslation();
    const { data, fetchNextPage, isLoading, isFetching }: any = useAllParkingLotList(
        searchTerm,
        sortOrder,
        filterData
    );

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.lots);
            });
            console.log(list);
            setAllParkingLotList(list);
        }
    }, [data]);

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const navigateHomePage = () => {
        navigate("/customer/:customerId/parkingLots/addLot");
    };

    const handleMassAction = (action: DataGridActionsMenuOption) => {
        switch (action.action) {
            case MASS_ACTION_TYPES.EXPORT:
                // perform action
                break;
            default: return;
        }
    };

    const handleRowAction = (action: DataGridActionsMenuOption) => {
        switch (action.action) {
            case ROW_ACTION_TYPES.EDIT:
                navigate("/customer/:customerId/parkingLots/viewLot/:parkinglotId");
                break;
            default: return;
        }
    };

    const onSortBySlected = (value: string) => {
        let sortOrder;
        switch (value) {
            case SORTBY_TYPES.LOT_NAME_AZ:
                sortOrder = { sortBy: "deliveryLocationNm", order: "asc" };
                break;
            case SORTBY_TYPES.LOT_NAME_ZA:
                sortOrder = { sortBy: "deliveryLocationNm", order: "desc" };
                break;
            default:
                sortOrder = { sortBy: "", order: "" };
                break;
        }
        setSortOrder(sortOrder);
    };

    const openFilterPanel = () => {
        toggleFilterPanel(!isFilterPanelOpen);
    };

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setFilterData(filterObj);
    };

    return (
        <Box display="flex" mt={10} ml={8}>
            <Grid container pl={8} pr={8} className="main-area">
                <Grid container display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                id="parkingLotFilter"
                                types="filter"
                                aria-label="dafault"
                                onClick={openFilterPanel}
                                startIcon={<FilterIcon />}
                            >
                                {t("buttons.filter")}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    id={"parkingLotSort"}
                                    options={SortByOptions.map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => onSortBySlected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                id="parkingLotSearch"
                                name="searchTerm"
                                placeholder={t('parkingLotManagement.search')}
                                value={searchTerm}
                                delay={500}
                                onChange={onInputChange}
                            />
                        </Grid>
                        {
                            (searchTerm && !(isFetching || isLoading) && data) &&
                            <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                                    {getSeachedDataTotalCount(data, [t('parkingLotManagement.result(s) found'), t('parkingLotManagement.results found')])}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                types="primary"
                                aria-label="primary"
                                onClick={navigateHomePage}
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
                        rows={parkingLotList}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowSelection
                        enableRowAction
                        onRowActionSelect={handleRowAction}
                        rowActionOptions={rowActionOptions}
                        getPages={fetchNextPage}
                        searchTerm={searchTerm}
                        noDataMsg='Add Parking Lot by clicking on the "ADD LOT" button.'
                        showImg={<ParkingLotNoDataIcon />}
                    />

                    <RightInfoPanel
                        panelType="dynamic-filter"
                        open={isFilterPanelOpen} headingText={t('parkingLotManagement.filterHeader')}
                        provideFilterParams={getFilterParams}
                        onClose={() => toggleFilterPanel(false)}
                        fields={FilterByFields}
                        storeKey={'parkingLotManagementFilter'}
                    />

                </Grid>
            </Grid>
        </Box>
    );
});

export default index;