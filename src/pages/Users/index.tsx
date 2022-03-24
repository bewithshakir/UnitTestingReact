import { Add } from "@mui/icons-material";
import { Box, FormControl, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    FilterIcon
} from "../../assets/icons";
import { Button } from "../../components/UIComponents/Button/Button.component";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import UserModel, { ACTION_TYPES, MASS_ACTION_TYPES } from "../../models/UserModel";
import { addedCustomerIdState, HorizontalBarVersionState, useAddedCustomerIdStore, useStore } from "../../store";
import { getSeachedDataTotalCount } from "../../utils/helperFunctions";
import { sortByOptions } from "./config";
import { useGetUsersList } from './queries';
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";
import { RightInfoPanel } from '../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';

interface ContentProps {
    rows?: [];
    version: string
}

const UsersLadingContent: React.FC<ContentProps> = () => {
    const userObj = new UserModel();
    const headCells = userObj.fieldsToDisplay();
    const rowActionOptions = userObj.rowActions();
    const massActionOptions = userObj.massActions();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
    const [dspList, setDspList] = React.useState([]);
    const customerId = useAddedCustomerIdStore((state: addedCustomerIdState) => state.customerId);
    const [sortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});

    const [filterPanelVisible, setFilterPanelVisible] = React.useState(false);

    const { data, fetchNextPage, isLoading, isFetching }: any = useGetUsersList(searchTerm, sortOrder, customerId, filterData);

    const { t } = useTranslation();
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.users);
            });
            setDspList(list);
        }
    }, [data]);

    const navigateToAddUser = () => {
        navigate(`/customer/${customerId}/users/addUser`);
    };

    const onInputChange = (value: string) => {
        setResetTableCollaps(true);
        setSearchTerm(value);
    };

    const handleMassAction = (actions: DataGridActionsMenuOption) => {
        switch (actions.action) {
            case MASS_ACTION_TYPES.EXPORT:
                // perform action
                break;
            default: return;
        }
        setResetTableCollaps(true);
    };

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setFilterData(filterObj);
    };
    const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
        switch (action.action) {
            case ACTION_TYPES.EDIT:
                // perform action 
                navigate(`/customer/${customerId}/dsps/edit/${row.id}`);
                break;
            default: return;
        }
    };

    const handleFilterOpen = () => {
        setFilterPanelVisible(true);
    };

    const handleFilterClose = () => {
        setFilterPanelVisible(false);
    };

    const getFields = () => {
        const fields = userObj.FilterByFields().map(item => {
            return { ...item, customerId: customerId };
        });
        return fields;
    };

    return (
        <Box display="flex">
            <Grid container pl={2.25} pr={6.25} className="main-area">
                <Grid container display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                data-testid="filter"
                                types="filter"
                                aria-label="default"
                                onClick={handleFilterOpen}
                                startIcon={<FilterIcon />}
                            >
                                {t('user.filterHeader')}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    id="userSort"
                                    options={sortByOptions.map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => value}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name="searchTerm"
                                id="userSearch"
                                value={searchTerm}
                                delay={600}
                                onChange={onInputChange}
                                placeholder={t('user.search')}
                            />
                        </Grid>
                        {
                            (searchTerm && !(isFetching || isLoading) && data) &&
                            <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                                    {getSeachedDataTotalCount(data, [t('user.result(s) found'), t('user.results found')])}
                                </Typography>
                            </Grid>
                        }
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                types="primary"
                                aria-label="primary"
                                onClick={navigateToAddUser}
                                startIcon={<Add />}
                            >
                                {t("buttons.add user")}
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
                        primaryKey='usersId'
                        isLoading={isFetching || isLoading}
                        rows={userObj.dataModel(dspList)}
                        header={headCells}
                        enableRowSelection
                        enableRowAction
                        onRowActionSelect={handleRowAction}
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                        searchTerm={searchTerm}
                        rowActionOptions={rowActionOptions}
                        getPages={fetchNextPage}
                        noDataMsg={t('user.nodataMsg')}
                    />

                    <RightInfoPanel panelType="dynamic-filter"
                        open={filterPanelVisible} headingText={"customer-filter-panel.header.filter"}
                        provideFilterParams={getFilterParams} onClose={handleFilterClose}
                        fields={getFields()}
                        storeKey={'dspFilter'}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UsersLadingContent;