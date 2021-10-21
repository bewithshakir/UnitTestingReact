/* eslint-disable no-console */
import React, { SyntheticEvent, useEffect } from "react";
import { Button } from "../../components/UIComponents/Button/Button.component";
import "./style.scss";
import { useTranslation } from "react-i18next";
import {
  FilterIcon,
} from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import Table from "../../components/UIComponents/DataGird/Table";
import { useCustomers } from "./queries";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { sortByOptions } from "./config";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { Box, FormControl, Grid } from "@mui/material";
import { HorizontalBarVersionState, useStore } from "../../store";
import CustomerModel from "../../models/CustomerModel";
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";

interface ContentProps {
  rows?: [];
  version: string
}

const Content: React.FC<ContentProps> = () => {
  const CustomerObj = new CustomerModel();
  const headCells = CustomerObj.fieldsToDisplay();
  const rowActionOptions = CustomerObj.rowActions();
  const massActionOptions = CustomerObj.massActions();
  const ACTION_TYPES = CustomerObj.ACTION_TYPES;
  const MASS_ACTION_TYPES = CustomerObj.MASS_ACTION_TYPES;

  const history = useHistory();
  const [info, setInfo] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "customerName", order: "asc" });
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [custFilterPanelVisible, setCustFilterPanelVisible] = React.useState(false);
  const [customerId, setCustomerId] = React.useState('');
  const [customerList, setCustomerList] = React.useState([]);

  const { t } = useTranslation();
  const { data, fetchNextPage, isLoading, isFetching }: any = useCustomers(
    searchTerm,
    sortOrder,
    filterData
  );

  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.customers);
      });
      setCustomerList(list);
    }
  }, [data]);

  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const openDrawer = (row: SyntheticEvent) => {
    setInfo(row);
    setDrawerOpen(true);
  };
  const drawerClose = () => {
    setDrawerOpen(false);
  };
  const navigateToAddCustomer = () => {
    history.push("/customer");
  };
  const onSortBySlected = (value: string) => {
    let sortOrder;
    switch (value) {
      case "Z-A":
        sortOrder = { sortBy: "customerName", order: "desc" };
        break;
      case "Newest to Oldest":
        sortOrder = { sortBy: "date", order: "desc" };
        break;
      case "Oldest to New":
        sortOrder = { sortBy: "date", order: "asc" };
        break;
      default:
        sortOrder = { sortBy: "customerName", order: "asc" };
        break;
    }
    setSortOrder(sortOrder);
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };

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
  };

  const handleRowAction = (action: DataGridActionsMenuOption) => {
    switch (action.action) {
      case ACTION_TYPES.RAISE_REQ:
        // perform action 
        break;
      case ACTION_TYPES.DRIVER_DETAILS:
        // perform action
        break;
      case ACTION_TYPES.OTHER_DETAIL:
        // perform action
        break;
      case ACTION_TYPES.CONTACT_DETAILS:
        // perform action
        break;
      default: return;
    }
  };

  const handleCustFilterPanelClose = () => setCustFilterPanelVisible(false);

  const getFilterParams = (filterObj: { [key: string]: string[] }) => setFilterData(filterObj);

  return (
    <Box display="flex" mt={8} ml={8}>
      <Grid container pl={6.25} pr={6.25} className="main-area">
        <Grid container pt={2.5} display="flex" flexGrow={1}>
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
                  onSelect={(value) => onSortBySlected(value)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
                value={searchTerm}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
            <Grid item pr={2.5}>
              <Button
                types="primary"
                aria-label="primary"
                onClick={navigateToAddCustomer}
                startIcon={<Add />}
              >
                {t("buttons.add customer")}
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
            rows={customerList}
            header={headCells}
            isLoading={isFetching || isLoading}
            enableRowSelection
            enableRowAction
            getPages={fetchNextPage}
            onRowActionSelect={handleRowAction}
            rowActionOptions={rowActionOptions}
            openDrawer={openDrawer}
            searchTerm={searchTerm}
            getCustomerId={(id:string) => setCustomerId(id)}
            InnerTableComponent={<Table id={customerId}/>}
            noDataMsg='Add Customer by clicking on the " Add Customer" button.'
          />

          <RightInfoPanel panelType="customer-filter" open={custFilterPanelVisible} headingText={"Filters"} provideFilterParams={getFilterParams} onClose={handleCustFilterPanelClose} />
          <RightInfoPanel panelType="info-view" open={drawerOpen} headingText={"Accurate Transportation"} info={info} onClose={drawerClose} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;