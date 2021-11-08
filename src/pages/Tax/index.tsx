import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { sortByOptions } from "./config";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import TaxModel from '../../models/TaxModel';
import { fuelTaxListSet } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";


const TaxLandingContent = memo(() => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const { t } = useTranslation();
  const history = useHistory();
  const TaxObj = new TaxModel();
  const massActionOptions = TaxObj.massActions();
  const [fuelTaxList, setFuelTaxList] = React.useState([]);
  const headCells = TaxObj.fieldsToDisplay();

  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const navigateHomePage = () => {
    history.push("/addFuelTax");
  };

  const handleMassAction = () => {
    return '';
  };

  const { data, fetchNextPage, isLoading, isFetching }: any = fuelTaxListSet(
    searchTerm
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
    alert(sortOrder);
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
            rows={fuelTaxList}
            header={headCells}
            isLoading={isFetching || isLoading}
            enableRowSelection = {false}
            enableRowAction
            getPages={fetchNextPage}
            searchTerm={searchTerm}
            noDataMsg='Add Tax.'
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default TaxLandingContent;