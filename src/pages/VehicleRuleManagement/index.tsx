import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, FormControl } from "@mui/material";

import { HorizontalBarVersionState, useStore } from '../../store';
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { vehicleRuleManagementListSet } from './queries';
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { VehicleRule, ROW_ACTION_TYPES, SORTBY_TYPES } from './config';
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import VehicleRuleModel from '../../models/VehicleRuleModel';

export interface AddVehicleRuleProps {
    version: string
}

const VehicleRuleManagement: React.FC<AddVehicleRuleProps> = () => {

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("NavLinks");
    const navigate = useNavigate();
    const { t } = useTranslation();


    const vehicleRuleObj = new VehicleRuleModel();
    const massActionOptions = vehicleRuleObj.massActions();
    const rowActionOptions = vehicleRuleObj.rowActions();
    const [vehicleRuleList, setVehicleRuleList] = React.useState([]);
    const headCells = vehicleRuleObj.fieldsToDisplay();
    const [, setDrawerOpen] = React.useState(false);
    const [vehicleRuleFilterPanelVisible, setVehicleRulePanelVisible] = React.useState(false);
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const { SortByOptions, filterByFields } = VehicleRule.LandingPage;

    const { data, fetchNextPage, isLoading, isFetching }: any = vehicleRuleManagementListSet(searchTerm, sortOrder, filterData);

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.vehicleRules);
            });
            setVehicleRuleList(list);
        }
    }, [data]);

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const handleCustFilterPanelOpen = () => {
        setDrawerOpen(false);
        setVehicleRulePanelVisible(!vehicleRuleFilterPanelVisible);
    };

    const navigateAddPage = () => {
        navigate('/vehicleRule/add');
    };

    const onSortBySlected = (value: string) => {
        switch (value) {
            case SORTBY_TYPES.ASSET_PAYMENT:
                setSortOrder({ sortBy: "city", order: "asc" });
                break;
            case SORTBY_TYPES.RECENTLY_ADDED:
                setSortOrder({ sortBy: "city", order: "desc" });
                break;
            default:
                setSortOrder({ sortBy: "", order: "" });
                break;
        }
    };

    const handleMassAction = () => {
        return '';
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const handleVehicleRuleFilterPanelClose = () => setVehicleRulePanelVisible(false);

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setFilterData(filterObj);
    };

    const handleRowAction = (action: DataGridActionsMenuOption) => {
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
                                placeholder="Vehicle Rule"
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
                                onClick={navigateAddPage}
                                startIcon={<Add />}
                            >
                                Add Vehicle Rule
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
                        primaryKey='vehicleRuleId'
                        rows={vehicleRuleObj.dataModel(vehicleRuleList)}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowAction
                        getPages={fetchNextPage}
                        onRowActionSelect={handleRowAction}
                        rowActionOptions={rowActionOptions}
                        searchTerm={searchTerm}
                        filterData={filterData}
                        openDrawer={openDrawer}
                        noDataMsg='Add Vehicle Rule by clicking on the "Add Vehicle Rule" button.'
                    />
                    <RightInfoPanel panelType="dynamic-filter"
                        open={vehicleRuleFilterPanelVisible} headingText={t('taxes.filterHeader')}
                        provideFilterParams={getFilterParams} onClose={handleVehicleRuleFilterPanelClose}
                        fields={filterByFields}
                        storeKey={'assetFilter'}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};


export default VehicleRuleManagement;
