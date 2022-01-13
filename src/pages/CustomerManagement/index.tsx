import React, { SyntheticEvent, useEffect } from "react";
import { Button } from "../../components/UIComponents/Button/Button.component";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { PositiveCricleIcon, FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import Table from "./SubTableLots";
import { useCustomers } from "./queries";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { filterByFields, sortByOptions } from "./config";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { Box, FormControl, Grid, Typography } from "@mui/material";
import { HorizontalBarVersionState, useStore } from "../../store";
import CustomerModel from "../../models/CustomerModel";
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";
import { getSeachedDataTotalCount, maskPhoneNumber } from "../../utils/helperFunctions";

interface ContentProps {
  rows?: [];
  sidebarName: string;
  version: string
}

const Content: React.FC<ContentProps> = () => {
  const CustomerObj = new CustomerModel();
  const headCells = CustomerObj.fieldsToDisplay();
  const headCellsLots = CustomerObj.fieldsToDisplayLotTable();
  const rowActionOptions = CustomerObj.rowActions();
  const massActionOptions = CustomerObj.massActions();
  const ACTION_TYPES = CustomerObj.ACTION_TYPES;
  const MASS_ACTION_TYPES = CustomerObj.MASS_ACTION_TYPES;

  const navigate = useNavigate();
  const [info, setInfo] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [custFilterPanelVisible, setCustFilterPanelVisible] = React.useState(false);
  const [customerId, setCustomerId] = React.useState('');
  const [customerList, setCustomerList] = React.useState([]);
  const [infoPanelEditId, setInfoPanelEditId] = React.useState('');
  const [infoPanelName, setInfoPanelName] = React.useState('');





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

  const createInfoObjForRightInfoPanel = (row: any) => {
    setInfoPanelEditId(row.customerId);
    setInfoPanelName(row.customerName);
    const infoObj = {
      'Customer ID': row.customerInputId,
      'Name': row.contactName,
      'Email': row.email,
      'Phone': maskPhoneNumber(row.phone),
      'Settlement Type': row.paymentType,
      'Card Added': row.cardAdded === "Y" ? <PositiveCricleIcon /> : row.cardAdded === "N" ? 'Not yet assigned' : '',
      'Address': row.address,
      'City': row.city,
      'State': row.state,
      'Zip Code': row.zipCode,
    };
    return infoObj;
  };

  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const openDrawer = (row: SyntheticEvent) => {
    const infoObj = createInfoObjForRightInfoPanel(row);
    setInfo(infoObj);
    setDrawerOpen(true);
  };
  const drawerClose = () => {
    setDrawerOpen(false);
  };
  const navigateToAddCustomer = () => {
    navigate("/customer/addCustomer");
  };
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

  const onInputChange = (value: string) => {
    setResetTableCollaps(true);
    setSearchTerm(value);
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
    setResetTableCollaps(true);
  };

  const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
    switch (action.action) {
      case ACTION_TYPES.EDIT:
        // perform action
        navigate(`/customer/viewCustomer/${row.customerId}`);
        break;
      case ACTION_TYPES.DELETE:
        // perform action
        break;
      case ACTION_TYPES.CONTACT_DETAILS:
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
                placeholder="Customer Name"
                value={searchTerm}
                delay={600}
                onChange={onInputChange}
              />
            </Grid>
            {
              (searchTerm && !(isFetching || isLoading) && data) &&
              <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                  {getSeachedDataTotalCount(data, [t('customerManagement.result(s) found'), t('customerManagement.results found')])}
                </Typography>
              </Grid>
            }
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
            primaryKey='customerId'
            rows={CustomerObj.dataModel(customerList)}
            header={headCells}
            isLoading={isFetching || isLoading}
            enableRowSelection
            enableRowAction
            getPages={fetchNextPage}
            onRowActionSelect={handleRowAction}
            rowActionOptions={rowActionOptions}
            openDrawer={openDrawer}
            searchTerm={searchTerm}
            getId={(id: string) => setCustomerId(id)}
            resetCollaps={resetTableCollaps}
            onResetTableCollaps={setResetTableCollaps}
            InnerTableComponent={<Table primaryKey='deliveryLocationId' id={customerId} headCells={headCellsLots} />}
            noDataMsg='Add Customer by clicking on the "Add Customer" button.'
          />

          <RightInfoPanel panelType="dynamic-filter"
            open={custFilterPanelVisible} headingText={"customer-filter-panel.header.filter"}
            provideFilterParams={getFilterParams} onClose={handleCustFilterPanelClose}
            fields={filterByFields}
            storeKey={'customerFilter'}
          />
          <RightInfoPanel panelType="info-view" category="customer" open={drawerOpen} headingText={infoPanelName} info={info} idStrForEdit={infoPanelEditId} nameStrForEdit={infoPanelName} onClose={drawerClose} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;