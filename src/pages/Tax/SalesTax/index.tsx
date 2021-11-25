/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../../assets/icons";
import SortbyMenu from "../../../components/UIComponents/Menu/SortbyMenu.component";
import { filterByFields, sortByOptions } from "./config";
import { useTranslation } from "react-i18next";
import SearchInput from "../../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import SalesTaxModel from '../../../models/SalesTaxModel';
import GridComponent from "../../../components/UIComponents/DataGird/grid.component";
import { salesTaxListSet } from './queries';
import { RightInfoPanel } from "../../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";

const SalesTaxLandingContent = memo(() => {
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const { t } = useTranslation();
  const history = useHistory();

  const salesTaxObj = new SalesTaxModel();
  const massActionOptions = salesTaxObj.massActions();
  const [salesTaxList, setSalesTaxList] = React.useState([]);
  const headCells = salesTaxObj.fieldsToDisplay();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [salesTaxFilterPanelVisible, setSalesTaxPanelVisible] = React.useState(false);
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });

  const { data, fetchNextPage, isLoading, isFetching }: any = salesTaxListSet(searchTerm, sortOrder, filterData);

  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.salesTax);
      });
      setSalesTaxList(list);
    }
  },[data]);

  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCustFilterPanelOpen = () => {
    setDrawerOpen(false);
    setSalesTaxPanelVisible(!salesTaxFilterPanelVisible);
  };

  const navigateHomePage = () => {
    // TO DO
    history.push("/addSalesTax");
  };

const onSortBySlected = (value: string) => {
    let sortOrder;
    switch (value) {
        case "City Name A-Z":
            sortOrder = { sortBy: "city", order: "asc" };
            break;
        case "City Name Z-A":
            sortOrder = { sortBy: "city", order: "desc" };
            break;
        default:
            sortOrder = { sortBy: "", order: "" };
            break;
    }
    setSortOrder(sortOrder);
};
  
  const handleMassAction = () => {
    return '';
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };
  const drawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSalesTaxFilterPanelClose = () => setSalesTaxPanelVisible(false);

  const getFilterParams = (filterObj: { [key: string]: string[] }) => {
    setFilterData(filterObj);
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
                onClick={handleCustFilterPanelOpen}
                startIcon={<FilterIcon />}
              >
                Filters
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
                placeholder={t("taxes.salesTax.city")}
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
            primaryKey='taxJurisdictionId'
            rows={salesTaxList}
            header={headCells}
            isLoading={isFetching || isLoading}
            enableRowSelection = {false}
            enableRowAction
            getPages={fetchNextPage}
            searchTerm={searchTerm}
            openDrawer={openDrawer}
            noDataMsg='Add Tax by clicking on the "Add Tax" button.'
          />
          <RightInfoPanel panelType="salestax-filter"
            open={salesTaxFilterPanelVisible} headingText={"customer-filter-panel.header.filters"}
            provideFilterParams={getFilterParams} onClose={handleSalesTaxFilterPanelClose}
            fields={filterByFields}
            storeKey={'salestaxFilter'}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default SalesTaxLandingContent;