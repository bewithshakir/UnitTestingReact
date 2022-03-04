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
import { DataGridActionsMenuOption } from "../../components/UIComponents/Menu/DataGridActionsMenu.component";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import DSPModel from "../../models/DSPModel";
import { addedCustomerIdState, HorizontalBarVersionState, useAddedCustomerIdStore, useStore } from "../../store";
import { getSeachedDataTotalCount } from "../../utils/helperFunctions";
import { sortByOptions } from "./config";
import { DspListSet } from './queries';
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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
  const [dspList, setDspList] = React.useState([]);
  const customerId = useAddedCustomerIdStore((state: addedCustomerIdState) => state.customerId);

  const { data, fetchNextPage, isLoading, isFetching }: any = DspListSet(searchTerm, { sortBy: "", order: "" }, customerId, {});

  const { t } = useTranslation();
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("Breadcrumbs-Single");

  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.dsps);
      });
      setDspList(list);
    }
  }, [data]);

  const navigateToAddDsp = () => {
    navigate(`/customer/${customerId}/dsps/addDsp`);
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

  const handleRowAction = (actions: DataGridActionsMenuOption, row: any) => {
    switch (actions.action) {
      case ACTION_TYPES.EDIT:
        // perform action 
        navigate(`/customer/${customerId}/dsps/edit/${row.id}`);
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
                id="dspSearch"
                value={searchTerm}
                delay={600}
                onChange={onInputChange}
                placeholder={t('dsp.search')}
              />
            </Grid>
            {
              (searchTerm && !(isFetching || isLoading) && data) &&
              <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                  {getSeachedDataTotalCount(data, [t('dsp.result(s) found'), t('dsp.results found')])}
                </Typography>
              </Grid>
            }
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
            primaryKey='dspId'
            isLoading={isFetching || isLoading}
            rows={dspList}
            header={headCells}
            enableRowSelection
            enableRowAction
            onRowActionSelect={handleRowAction}
            resetCollaps={resetTableCollaps}
            onResetTableCollaps={setResetTableCollaps}
            searchTerm={searchTerm}
            rowActionOptions={rowActionOptions}
            getPages={fetchNextPage}
            noDataMsg={t('dsp.nodataMsg')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DspLandingContent;