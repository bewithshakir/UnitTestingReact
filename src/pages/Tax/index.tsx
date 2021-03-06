import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl, Typography } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TaxModel from '../../models/TaxModel';
import { useFuelTaxList } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { FuelTax, MASS_ACTION_TYPES, SORTBY_TYPES } from './config';
import { RightInfoPanel } from '../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
import { getSeachedDataTotalCount } from '../../utils/helperFunctions';
import Table from './SubTableFuelProduct';

export interface TaxLandingContentProps {
  version: string
}


const TaxLandingContent: React.FC<TaxLandingContentProps> = memo(() => {

  const TaxObj = new TaxModel();
  const headCells = TaxObj.fieldsToDisplay();
  const headCellsLots = TaxObj.fieldsToDisplayLotTable();
  const massActionOptions = TaxObj.massActions();
  const rowActionOptions = TaxObj.rowActions();
  const { SortByOptions, FilterByFields, DataGridFields } = FuelTax.LandingPage;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [isFilterPanelOpen, toggleFilterPanel] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
  const [fuelTaxList, setFuelTaxList] = React.useState([]);
  const [fuelTaxProductId, setFuelTaxProductId] = React.useState('');

  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");

  const { t } = useTranslation();
  const { data, fetchNextPage, isLoading, isFetching }: any = useFuelTaxList(
    searchTerm,
    sortOrder,
    filterData
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

  const onInputChange = (value: string) => {
    setResetTableCollaps(true);
    setSearchTerm(value);
  };

  const navigateHomePage = () => {
    navigate("/addFuelTax");
  };

  const handleMassAction = (action: DataGridActionsMenuOption) => {
    switch (action.action) {
      case MASS_ACTION_TYPES.EXPORT:
        // perform action
        break;
      default: return;
    }
    setResetTableCollaps(true);
  };

  const onSortBySlected = (value: string) => {
    let sortOrder;
    switch (value) {
      case SORTBY_TYPES.CITY_NAME_AZ:
        sortOrder = { sortBy: "cityName", order: "asc" };
        break;
      case SORTBY_TYPES.CITY_NAME_ZA:
        sortOrder = { sortBy: "cityName", order: "desc" };
        break;
      default:
        sortOrder = { sortBy: "", order: "" };
        break;
    }
    setResetTableCollaps(true);
    setSortOrder(sortOrder);
  };

  const openFilterPanel = () => {
    toggleFilterPanel(!isFilterPanelOpen);
  };

  const getFilterParams = (filterObj: { [key: string]: string[] }) => {
    setResetTableCollaps(true);
    setFilterData(filterObj);
  };

  const setSelectedRow = (fuelTaxProductId: string) => {
    setFuelTaxProductId(fuelTaxProductId);
  };

  return (
    <Box display="flex" mt={10} ml={8}>
      <Grid container pl={8} pr={8} className="main-area">
        <Grid container display="flex" flexGrow={1}>
          <Grid item md={8} lg={9} display="flex" >
            <Grid item pr={2.5}>
              <Button
                types="filter"
                aria-label="dafault"
                onClick={openFilterPanel}
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
                placeholder={t('taxes.fuelTax.search')}
                value={searchTerm}
                delay={500}
                onChange={onInputChange}
              />
            </Grid>
            {
              (searchTerm && !(isFetching || isLoading) && data) &&
              <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                  {getSeachedDataTotalCount(data, [t('taxes.fuelTax.result(s) found'), t('taxes.fuelTax.results found')])}
                </Typography>
              </Grid>
            }
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
            rows={fuelTaxList}
            header={headCells}
            isLoading={isFetching || isLoading}
            enableRowSelection={false}
            enableRowAction={false}
            getPages={fetchNextPage}
            searchTerm={searchTerm}
            noDataMsg='Add Fuel Tax by clicking on the "Add Tax" button.'
            getId={setSelectedRow}
            resetCollaps={resetTableCollaps}
            onResetTableCollaps={setResetTableCollaps}
            InnerTableComponent={
              {
                [DataGridFields.PRODUCT.label]: <Table primaryKey='productTaxId' id={fuelTaxProductId} headCells={headCellsLots} enableRowAction={true} rowActionOptions={rowActionOptions} />,
              }
            }
          />

          <RightInfoPanel
            panelType="dynamic-filter"
            open={isFilterPanelOpen} headingText={t('taxes.filterHeader')}
            provideFilterParams={getFilterParams}
            onClose={() => toggleFilterPanel(false)}
            fields={FilterByFields}
            storeKey={'fuelTaxFilter'}
          />

        </Grid>
      </Grid>
    </Box>
  );
});

export default TaxLandingContent;