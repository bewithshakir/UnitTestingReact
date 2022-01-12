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
import ParkingLotModel from "../../models/ParkingLotModel";
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";
import { ParkingLotNoDataIcon } from '../../assets/icons';
import { getSeachedDataTotalCount } from "../../utils/helperFunctions";
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
  const [infoPanelName, setInfoPanelName] = React.useState('');
  const [infoPanelEditId, setInfoPanelEditId] = React.useState('');

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
    if(statePL) {
      setPageCustomerName(statePL.customerName);
    } 
  });

  const createInfoObjForRightInfoPanel = (row: any) => {
    setInfoPanelEditId(row.deliveryLocationId);
    setInfoPanelName(row.deliveryLocationNm);
    const infoObj = {
      // 'Customer ID': row.customerInputId,
      // 'Name': row.contactName,
      // 'Email': row.email,
      // 'Phone': maskPhoneNumber(row.phone),
      // 'Settlement Type': row.paymentType,
      // 'Card Added': row.cardAdded === "Y" ? <PositiveCricleIcon /> : row.cardAdded === "N" ? 'Not yet assigned' : '',
      // 'Address': row.address,
      // 'City': row.city,
      // 'State': row.state,
      // 'Zip Code': row.zipCode,
    };
    return infoObj;
  };

  // const openDrawer = (row: SyntheticEvent) => {
  //   setInfo(row);
  //   setDrawerOpen(true);
  // };

  const openDrawer = (row: SyntheticEvent) => {
    const infoObj = createInfoObjForRightInfoPanel(row);
    setInfo(row);
    setDrawerOpen(true);
  };

  const drawerClose = () => {
    setDrawerOpen(false);
  };

  const navigateToAddLot = () => {
    navigate(`/customer/${customerId}/parkingLots/addLot`);
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
        list.push(...item.data.lots);
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
        navigate(`/customer/${customerId}/parkingLots/viewLot/${row.deliveryLocationId}`);
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
                  {getSeachedDataTotalCount(data, [t('parkingLot.result(s) found'), t('parkingLot.results found')])}
                </Typography>
              </Grid>
            }
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
            isLoading={isFetching || isLoading}
            enableRowSelection
            enableRowAction
            getPages={fetchNextPage}
            onRowActionSelect={handleRowAction}
            searchTerm={searchTerm}
            rowActionOptions={rowActionOptions}
            openDrawer={openDrawer}
            noDataMsg='Add Parking lot by clicking on lot or any related sentence.'
            resetCollaps={resetTableCollaps}
            onResetTableCollaps={setResetTableCollaps}
            showImg={<ParkingLotNoDataIcon />}
          />

          <RightInfoPanel
            panelType="dynamic-filter"
            open={custFilterPanelVisible}
            headingText={"parkingLot.header.filter"}
            provideFilterParams={getFilterParams}
            onClose={handleCustFilterPanelClose}
            fields={filterByFields}
            storeKey='parkingLot' />
            
          <RightInfoPanel panelType="info-view" category="lot" open={drawerOpen} headingText={infoPanelName} info={info} idStrForEdit={infoPanelEditId} nameStrForEdit={infoPanelName} onClose={drawerClose} />

        </Grid>
      </Grid>
    </Box>
  );
};

export default ParkingLotContent;