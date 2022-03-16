import React, { memo, useEffect, useState } from 'react';
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
import { AllParkingLots, ROW_ACTION_TYPES, SORTBY_TYPES } from './config';
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { getSeachedDataTotalCount } from '../../utils/helperFunctions';
import InfoViewUI from './infoViewUI/InfoViewUI.component';
import DynamicFilterDialog from '../../components/UIComponents/ConfirmationDialog/DynamicFilterDialog.component';
export interface ParkingLotsManagementProps {
    version: string
}

const customerRespFormatter = (axiosData: any): { value: string; label: string }[] => {
    if (!axiosData) {
        return [];
    }
    return axiosData?.customers?.map((item: any) => ({ value: item.customerId, label: item.customerName }));
};



const index: React.FC<ParkingLotsManagementProps> = memo(() => {
    const ParkingLotObj = new ParkingLotsManagementModel();
    const headCells = ParkingLotObj.fieldsToDisplay();
    const massActionOptions = ParkingLotObj.massActions();
    const rowActionOptions = ParkingLotObj.rowActions();
    const { SortByOptions, FilterByFields } = AllParkingLots.LandingPage;
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [filterDialogOpen, setFilterDialogOpen] = useState(false);


    const [searchTerm, setSearchTerm] = React.useState("");
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [isFilterPanelOpen, toggleFilterPanel] = React.useState(false);
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [parkingLotList, setAllParkingLotList] = React.useState([]);
    const [rowDataObj, saveRowDataObj] = React.useState<any>(null);
    const [rowLotId, saveRowLotId] = React.useState<any>(null);

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
                list.push(...item?.data?.lots);
            });
            setAllParkingLotList(list);
        }
    }, [data]);

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleAddBtnClick = () => {
        setFilterDialogOpen(true);
    };

    const handleMassAction = () => {
        return '';
    };

    const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
        if (action.action === ROW_ACTION_TYPES.EDIT) {
            navigate(`/customer/${row.customerId}/parkingLots/viewLot/${row.deliveryLocationId}?backTo=parkinglotlanding`);
        }
    };

    const onSortBySlected = (value: string) => {
        let sortOrder1;
        switch (value) {
            case SORTBY_TYPES.LOT_NAME_AZ:
                sortOrder1 = { sortBy: "deliveryLocationNm", order: "asc" };
                break;
            case SORTBY_TYPES.LOT_NAME_ZA:
                sortOrder1 = { sortBy: "deliveryLocationNm", order: "desc" };
                break;
            default:
                sortOrder1 = { sortBy: "", order: "" };
                break;
        }
        setSortOrder(sortOrder1);
    };

    const handleLotFilterPanelClose = () => toggleFilterPanel(!isFilterPanelOpen);


    const handleLotFilterPanelOpen = () => {
        setDrawerOpen(false);
        toggleFilterPanel(!isFilterPanelOpen);
    };

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setFilterData(filterObj);
    };

    const openDrawer = (row: any) => {
        setDrawerOpen(true);
        saveRowLotId(row.deliveryLocationId);
        saveRowDataObj({ ...row, editLotUrl: `/customer/${row.customerId}/parkingLots/viewLot/${row.deliveryLocationId}` });
    };

    const drawerClose = () => {
        setDrawerOpen(false);
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
                                onClick={handleLotFilterPanelOpen}
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
                                onClick={handleAddBtnClick}
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
                        filterData={filterData}
                        openDrawer={openDrawer}
                        noDataMsg={t('parkingLotManagement.noDataMsg')}
                        showImg={<ParkingLotNoDataIcon />}
                    />

                    <RightInfoPanel panelType="dynamic-filter"
                        open={isFilterPanelOpen} headingText={"customer-filter-panel.header.filter"}
                        provideFilterParams={getFilterParams} onClose={handleLotFilterPanelClose}
                        fields={FilterByFields}
                        storeKey={'customerFilter'}
                    />


                </Grid>
            </Grid>
            <RightInfoPanel panelType="info-view" open={drawerOpen} editURL={rowDataObj?.editLotUrl} headingText={rowDataObj?.deliveryLocationNm} onClose={drawerClose}>
                {rowDataObj ? <InfoViewUI lotData={rowDataObj} rowLotId={rowLotId} /> : ''}
            </RightInfoPanel>
            <DynamicFilterDialog
                open={filterDialogOpen}
                title=""
                handleConfirm={(formData) => {
                    // eslint-disable-next-line no-console
                    console.log(`Got data`, (formData));
                }}
                handleToggle={() => setFilterDialogOpen(false)}
                fields={[{
                    name: 'customer',
                    label: 'Customer',
                    required: true,
                    fieldType: 'singleSelectPaginate',
                    apiUrl: '/api/customer-service/customers',
                    responseFormatter: customerRespFormatter,
                    extraApiParams: { countryCode: 'us' },
                    searchFieldName: 'search',
                    placeHolder: t('parkingLotManagement.enterCustomername'),
                    initialValue: ''
                }]}
            />
        </Box>
    );
});

export default index;