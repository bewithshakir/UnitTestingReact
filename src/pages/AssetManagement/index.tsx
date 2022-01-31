/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import AssetManagementModel from '../../models/AssetManagementModel';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { assetManagementListSet } from './queries';
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { AssetManagement, MASS_ACTION_TYPES, ROW_ACTION_TYPES, SORTBY_TYPES } from './config';
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";

export interface AssetManagementProps {
    version: string
}

const AssetManagementLandingContent: React.FC<AssetManagementProps> = memo(() => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("NavLinks");
    const { t } = useTranslation();

    const assetObj = new AssetManagementModel();
    const massActionOptions = assetObj.massActions();
    const rowActionOptions = assetObj.rowActions();
    const [assetList, setAssetList] = React.useState([]);
    const headCells = assetObj.fieldsToDisplay();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [assetFilterPanelVisible, setAssetPanelVisible] = React.useState(false);
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const { SortByOptions, filterByFields } = AssetManagement.LandingPage;

    const { data, fetchNextPage, isLoading, isFetching }: any = assetManagementListSet(searchTerm, sortOrder, filterData);

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.assets);
            });
            setAssetList(list);
        }
    }, [data]);

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleCustFilterPanelOpen = () => {
        setDrawerOpen(false);
        setAssetPanelVisible(!assetFilterPanelVisible);
    };

    const navigateHomePage = () => {
        return 0;
    };

    const onSortBySlected = (value: string) => {
        let sortOrder;
        switch (value) {
            case SORTBY_TYPES.ASSET_PAYMENT:
                sortOrder = { sortBy: "city", order: "asc" };
                break;
            case SORTBY_TYPES.RECENTLY_ADDED:
                sortOrder = { sortBy: "city", order: "desc" };
                break;
            default:
                sortOrder = { sortBy: "", order: "" };
                break;
        }
        setSortOrder(sortOrder);
    };

    const handleMassAction = () => {
        return '';
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };
    const drawerClose = () => {
        setDrawerOpen(false);
    };

    const handleAssetFilterPanelClose = () => setAssetPanelVisible(false);

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setFilterData(filterObj);
    };

    const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
        switch (action.action) {
            case ROW_ACTION_TYPES.EDIT:
                // perform action
                break;
            case ROW_ACTION_TYPES.DELETE:
                // perform action
                break;
            case ROW_ACTION_TYPES.CONTACT_DETAILS:
                // perform action
                break;
            default: return;
        }
    };

    return (
        <Box display="flex" mt={10} ml={8}>
            <Grid container pl={8} pr={8} className="main-area">
                <Grid container display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                types="filter"
                                aria-label="dafault"
                                onClick={handleCustFilterPanelOpen}
                                startIcon={<FilterIcon />}
                            >
                                {t("buttons.filter")}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    options={SortByOptions.map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => onSortBySlected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name="searchTerm"
                                placeholder={t("assetManagement.asset")}
                                value={searchTerm}
                                delay={500}
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                types="primary"
                                aria-label="primary"
                                onClick={navigateHomePage}
                                startIcon={<Add />}
                            >
                                {t("buttons.add asset")}
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
                        primaryKey='assetId'
                        rows={assetList}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowAction
                        getPages={fetchNextPage}
                        onRowActionSelect={handleRowAction}
                        rowActionOptions={rowActionOptions}
                        searchTerm={searchTerm}
                        openDrawer={openDrawer}
                        noDataMsg='Add Asset by clicking on the "Add Asset" button.'
                    />
                    <RightInfoPanel panelType="dynamic-filter"
                        open={assetFilterPanelVisible} headingText={t('taxes.filterHeader')}
                        provideFilterParams={getFilterParams} onClose={handleAssetFilterPanelClose}
                        fields={filterByFields}
                        storeKey={'assetFilter'}
                    />
                </Grid>
            </Grid>
        </Box>
    );
});

export default AssetManagementLandingContent;