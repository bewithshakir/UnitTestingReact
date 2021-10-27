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
import { useHistory } from "react-router-dom";
import { sortByOptions } from "./config";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { Box, FormControl, Grid } from "@mui/material";
import { HorizontalBarVersionState, useStore , useAddedCustomerIdStore} from "../../store";
import ParkingLotModel from "../../models/ParkingLotModel";
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";

interface ContentProps {
  rows?: [];
  version: string
}

const ParkingLotContent: React.FC<ContentProps> = () => {
  const ParkingLotObj = new ParkingLotModel();
  const headCells = ParkingLotObj.fieldsToDisplay();
  const rowActionOptions = ParkingLotObj.rowActions();
  const massActionOptions = ParkingLotObj.massActions();
  const ACTION_TYPES = ParkingLotObj.ACTION_TYPES;
  const MASS_ACTION_TYPES = ParkingLotObj.MASS_ACTION_TYPES;

  const history = useHistory();
  const [info, setInfo] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "customerName", order: "asc" });
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [custFilterPanelVisible, setCustFilterPanelVisible] = React.useState(false);
  const [parkingLotlist, setCustomerList] = React.useState([]);
  const customerId = useAddedCustomerIdStore((state) => state.customerId);

  const { t } = useTranslation();
  const { data, fetchNextPage, isLoading }: any = useGetParkingLotDetails(
    searchTerm,
    sortOrder,
    filterData,
    customerId
  );
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const openDrawer = (row: SyntheticEvent) => {
    setInfo(row);
    setDrawerOpen(true);
  };
  const drawerClose = () => {
    setDrawerOpen(false);
  };
  // const navigateToAddCustomer = () => {
  //   history.push("/customer");
  // };
  const navigateToAddLot = () => {
    history.push("/customer/parkingLots/addLot");
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
  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };
  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.lots);
      });
      setCustomerList(list);
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
  };

  const handleRowAction = (action: DataGridActionsMenuOption) => {
    switch (action.action) {
      case ACTION_TYPES.EDIT:
        // perform action 
        break;
      case ACTION_TYPES.DELETE:
        // perform action
        break;
      default: return;
    }
  };

  const handleCustFilterPanelClose = () => setCustFilterPanelVisible(false);

  const getFilterParams = (filterObj: { [key: string]: string[] }) => setFilterData(filterObj);

  return (
    <Box display="flex">
      <Grid container pl={2.25} pr={6.25} className="main-area">
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
                  onSelect={(value) => onSortBySlected(value)}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
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
            rows={parkingLotlist}
            header={headCells}
            isLoading={isLoading}
            enableRowSelection
            enableRowAction
            getPages={fetchNextPage}
            onRowActionSelect={handleRowAction}
            rowActionOptions={rowActionOptions}
            openDrawer={openDrawer}
          />

          <RightInfoPanel panelType="customer-filter" open={custFilterPanelVisible} headingText={"Filters"} provideFilterParams={getFilterParams} onClose={handleCustFilterPanelClose} />
          <RightInfoPanel panelType="info-view" open={drawerOpen} headingText={"Accurate Transportation"} info={info} onClose={drawerClose} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParkingLotContent;