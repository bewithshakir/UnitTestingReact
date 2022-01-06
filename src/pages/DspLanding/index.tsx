/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { useTranslation } from "react-i18next";
import {
  FilterIcon,
} from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { Box, FormControl, Grid, Typography } from "@mui/material";
import { HorizontalBarVersionState, addedCustomerIdState, useStore, useAddedCustomerIdStore, useShowConfirmationDialogBoxStore, useAddedCustomerNameStore } from "../../store";
import DSPModel from "../../models/DSPModel";
import { sortByOptions, mockDSPData } from "./config";
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";
interface ContentProps {
  rows?: [];
  version: string
}

const DspLandingContent: React.FC<ContentProps> = () => {
  const dspObj = new DSPModel();
  const headCells = dspObj.fieldsToDisplay();
  const rowActionOptions = dspObj.rowActions();
  const massActionOptions = dspObj.massActions();
  const ACTION_TYPES = dspObj.ACTION_TYPES;
  const MASS_ACTION_TYPES = dspObj.MASS_ACTION_TYPES;
  const history = useHistory();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [parkingLotlist, setParkingLotList] = React.useState([...mockDSPData]);
  const customerId = useAddedCustomerIdStore((state: addedCustomerIdState) => state.customerId);

  const { t } = useTranslation();
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("Breadcrumbs-Single");
  const setPageCustomerName = useAddedCustomerNameStore((state) => state.setCustomerName);

  const navigateToAddDsp = () => {
    history.push(`/customer/${customerId}/adddsp`);
  };
  
  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleMassAction = (action: DataGridActionsMenuOption) => {
    switch (action.action) {      
      case MASS_ACTION_TYPES.EXPORT:
        // perform action
        break;
      default: return;
    }
  };

  const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
    switch (action.action) {
      case ACTION_TYPES.EDIT:
        // perform action 
        break;
      default: return;
    }
  };

  return (
    <Box display="flex">
      <Grid container pl={2.25} pr={6.25} className="main-area">
        <Grid container display="flex" flexGrow={1}>
          <Grid item md={8} lg={9} display="flex" >
            <Grid item pr={2.5}>
              <Button
                types="filter"
                aria-label="default"
                startIcon={<FilterIcon />}
              >
                {t('dsp.filterHeader')}
              </Button>
            </Grid>
            <Grid item pr={2.5}>
              <FormControl>
                <SortbyMenu
                  options={sortByOptions.map((sortByItem) => t(sortByItem))}
                  onSelect={(value) => value}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
                value={searchTerm}
                delay={600}
                onChange={onInputChange}
                placeholder={t('dsp.search')}
              />
            </Grid>
          </Grid>
          <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
            <Grid item pr={2.5}>
              <Button
                types="primary"
                aria-label="primary"
                onClick={navigateToAddDsp}
                startIcon={<Add />}
              >
                {t("buttons.add dsp")}
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
            enableRowSelection
            enableRowAction
            onRowActionSelect={handleRowAction}
            searchTerm={searchTerm}
            rowActionOptions={rowActionOptions}
            noDataMsg={t('dsp.nodataMsg')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DspLandingContent;