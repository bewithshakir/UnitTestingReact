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
import { useHistory } from "react-router-dom";
import TaxModel from '../../models/TaxModel';
import { useFuelTaxList } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { FuelTax, MASS_ACTION_TYPES } from './config';


const TaxLandingContent = memo(() => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const { t } = useTranslation();
  const history = useHistory();
  const TaxObj = new TaxModel();
  const massActionOptions = TaxObj.massActions();
  const [fuelTaxList, setFuelTaxList] = React.useState([]);
  const headCells = TaxObj.fieldsToDisplay();
  const { SortByOptions } = FuelTax.LandingPage;
  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const navigateHomePage = () => {
    history.push("/addFuelTax");
  };

  const handleMassAction = (action: DataGridActionsMenuOption) => {
    switch (action.action) {
      case MASS_ACTION_TYPES.EXPORT:
        // perform action
        break;
      default: return;
    }
  };

  const { data, fetchNextPage, isLoading, isFetching }: any = useFuelTaxList(
    searchTerm,
    sortOrder,
  );

  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.fuelTax);
      });
      setFuelTaxList(list);
    }
  }, [data]);

  const openDrawer = () => {
    // TODO
  };

  const onSortBySlected = (value: string) => {
    let sortOrder;
    switch (value) {
      case "City Name A-Z":
        sortOrder = { sortBy: "cityName", order: "asc" };
        break;
      case "City Name Z-A":
        sortOrder = { sortBy: "cityName", order: "desc" };
        break;
      default:
        sortOrder = { sortBy: "", order: "" };
        break;
    }
    setSortOrder(sortOrder);
  };

  return (
    <Box display="flex" mt={10} ml={8}>
      <Grid container pl={6.25} pr={6.25} className="main-area">
        <Grid container display="flex" flexGrow={1}>
          <Grid item md={8} lg={9} display="flex" >
            <Grid item pr={2.5}>
              <Button
                types="filter"
                aria-label="dafault"
                startIcon={<FilterIcon />}
              >
                Filter
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
                {t("buttons.add tax")}
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
            primaryKey='fuelTaxId'
            rows={TaxObj.dataModel(fuelTaxList)}
            header={headCells}
            isLoading={isFetching || isLoading}
            enableRowSelection={false}
            enableRowAction
            getPages={fetchNextPage}
            searchTerm={searchTerm}
            openDrawer={openDrawer}
            noDataMsg='Add Tax.'
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default TaxLandingContent;