import React, { memo, useEffect, useState } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TruckModel from '../../models/TruckModel';
import { useTruckList } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import Table from "./SubTableLocations";
import { RightInfoPanel } from '../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
import TruckDetail from './TruckDetail';
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { TruckManagement, ROW_ACTION_TYPES, SORTBY_TYPES } from './config';
import SubTableTanks from "./SubTableTanks";

export interface TruckLandingContentProps {
  version: string
}


const TruckLandingContent: React.FC<TruckLandingContentProps> = memo(() => {
  const truckObj = new TruckModel();
  const headCells = truckObj.fieldsToDisplay();
  const headCellsLots = truckObj.parkingLocationTableFields();
  const tanksTableCells = truckObj.tanksTableFields();

  const rowActionOptions = truckObj.rowActions();
  const navigate = useNavigate();
  const [searchTerm,setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
  const [truckList, setTruckList] = useState([]);

  // Truck detail panel state
  const [info, setInfo] = React.useState({});
  const [editURL, setEditURL] = React.useState('');
  const [infoPanelName, setInfoPanelName] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  const [deliveryVehicleId, setDeliveryVehicleId] = React.useState('');


  setVersion("NavLinks");
  const { SortByOptions, DataGridFields } = TruckManagement.LandingPage;
  const [resetTableCollaps, setResetTableCollaps] = useState(false);
  const { t } = useTranslation();
  const { data, fetchNextPage, isLoading, isFetching }: any = useTruckList(
    searchTerm,
    sortOrder,
  );

  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.deliveryVehicles);
      });
      setTruckList(list);
    }
  }, [data]);


const onInputChange = (value: string) => {
  setResetTableCollaps(true);
  setSearchTerm(value);
};  
  const drawerClose = () => {
    setDrawerOpen(false);
  };

  const openDrawer = (row: any) => {
    setInfo(row);
    setInfoPanelName("Truck Info");
    setEditURL(`/trucks/editTruck/${row?.deliveryVehicleId}`);
    setDrawerOpen(true);
  };

  const handleMassAction = () => {
    // TO DO
  };

  const onSortBySlected = (value: string) => {
    let sortOrder;
    switch (value) {
      case SORTBY_TYPES.TRUCK_NAME_AZ:
        sortOrder = { sortBy: "deliveryVehicleNm", order: "asc" };
        break;
      case SORTBY_TYPES.TRUCK_NAME_ZA:
        sortOrder = { sortBy: "deliveryVehicleNm", order: "desc" };
        break;
      default:
        sortOrder = { sortBy: "", order: "" };
        break;
    }
    setResetTableCollaps(true);
    setSortOrder(sortOrder);
  };

  const navigateAddtruck = () => {
    navigate(`/trucks/addTruck`);
  };

  const setSelectedRow = (deliveryVehicleId: string) => {
    setDeliveryVehicleId(deliveryVehicleId);
  };

  const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
    switch (action.action) {
      case ROW_ACTION_TYPES.EDIT:
        navigate(`/trucks/editTruck/${row.deliveryVehicleId}`);
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
                data-testid="filter"
                types="filter"
                aria-label="dafault"
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
                id="searchTerm"
                placeholder={t('truckLanding.search')}
                value={searchTerm}
                delay={500}
                onChange={onInputChange}
                width={"110%"}
              />
            </Grid>
          </Grid>
          <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
            <Grid item pr={2.5}>
              <Button
                data-testid="addBtn"
                types="primary"
                aria-label="primary"
                onClick={navigateAddtruck}
                startIcon={<Add />}
              >
                {t("buttons.add truck")}
              </Button>
            </Grid>
            <Grid item>
              <FormControl>
                <ActionsMenu
                  options={[]}
                  onSelect={handleMassAction}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container pt={2.5} display="flex" flexGrow={1}>
          <GridComponent
            primaryKey='deliveryVehicleId'
            rows={truckObj.dataModel(truckList)}
            header={headCells}
            isLoading={isFetching || isLoading}
            openDrawer={openDrawer}
            enableRowAction
            getId={setSelectedRow}
            getPages={fetchNextPage}
            searchTerm={searchTerm}
            noDataMsg={t("truckLanding.noTrucksMsg")}
            onResetTableCollaps={setResetTableCollaps}
            InnerTableComponent={
              {
                [DataGridFields.LOCATIONS.label]: <Table primaryKey='id' id={deliveryVehicleId} headCells={headCellsLots} />,
                [DataGridFields.TANKS.label]: <SubTableTanks tanksDataModel={truckObj.tanksDataModel} primaryKey='id' id={deliveryVehicleId} headCells={tanksTableCells} />,
              }
            }
            onRowActionSelect={handleRowAction}
            rowActionOptions={rowActionOptions}
            resetCollaps={resetTableCollaps}
          />

          <RightInfoPanel
            panelType="info-view"
            open={drawerOpen}
            onClose={drawerClose}
            headingText={infoPanelName}
            editURL={editURL}
          >
            {Object.keys(info).length &&
              <TruckDetail info={info} drawerOpen={drawerOpen} />
            }
          </RightInfoPanel>

        </Grid>
      </Grid>
    </Box>
  );
});

export default TruckLandingContent;