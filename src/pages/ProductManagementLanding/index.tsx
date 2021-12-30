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
import { useHistory } from "react-router-dom";
import ProductManagementModel from '../../models/ProductManagementModel';
import { ProductManagement, MASS_ACTION_TYPES, ROW_ACTION_TYPES, SORTBY_TYPES } from './config';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { ProductsListSet } from './queries';

const ProductManagementContent = memo(() => {
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const { t } = useTranslation();
  const history = useHistory();

  const productObj = new ProductManagementModel();
  const headCells = productObj.fieldsToDisplay();
  const massActionOptions = productObj.massActions();
  const rowActionOptions = productObj.rowActions();
  const { SortByOptions, FilterByFields } = ProductManagement.LandingPage;

  const [productList, setProductList] = React.useState<any>([]);
  const [salesTaxFilterPanelVisible, setSalesTaxPanelVisible] = React.useState(false);
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });

  const { data, fetchNextPage, isLoading, isFetching }: any = ProductsListSet(searchTerm, sortOrder, filterData);



  useEffect(() => {
    if (data) {
      const list: any = [];
      data?.pages?.forEach((item: any) => {
        list.push(...item.data.products);
      });
      setProductList(list);
    }
  }, [data]);

  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCustFilterPanelOpen = () => {
    setSalesTaxPanelVisible(!salesTaxFilterPanelVisible);
  };

  const handleMassAction = (action: DataGridActionsMenuOption) => {
    switch (action.action) {
      case MASS_ACTION_TYPES.EXPORT:
        // perform action
        break;
      default: return;
    }
  };

  const handleSalesTaxFilterPanelClose = () => setSalesTaxPanelVisible(false);

  const getFilterParams = (filterObj: { [key: string]: string[] }) => {
    setFilterData(filterObj);
  };

  const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
    switch (action.action) {
      case ROW_ACTION_TYPES.EDIT:
        // perform action
        history.push(`productManagement/edit/${row.productId}`);
        break;
      default: return;
    }
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
    setSortOrder(sortOrder);
  };

  const getSeachedDataTotalCount = (data: any, msg: string[]) => {
    const totalCount = data?.pages[0]?.data?.pagination?.totalCount || 0;
    return (`${totalCount} ${totalCount > 1 ? msg[1] : msg[0]}`);
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
                {t("buttons.filter")}
              </Button>
            </Grid>
            <Grid item pr={2.5}>
              <FormControl>
                <SortbyMenu
                  options={SortByOptions.map((sortByItem) => t(sortByItem))}
                  onSelect={onSortBySlected}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
                placeholder={t('productManagement.form.productName')}
                value={searchTerm}
                delay={500}
                onChange={onInputChange}
                data-test="productSearchTerm"
              />
               </Grid>
               {
              (searchTerm && !(isFetching || isLoading) && data) &&
              <Grid item display="flex" alignItems="center" paddingLeft={2.5}>
                <Typography color="var(--Darkgray)" variant="h4" align="center" className="fw-bold">
                  {getSeachedDataTotalCount(data, [t('productManagement.result(s) found'), t('productManagement.results found')])}
                </Typography>
              </Grid>
            }
          </Grid>
          <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
            <Grid item pr={2.5}>
              <Button
                types="primary"
                aria-label="primary"
                onClick={() => history.push('/productManagement/add')}
                startIcon={<Add />}
              >
                {'ADD PRODUCT'}
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
            primaryKey='productId'
            isLoading={isFetching || isLoading}
            rows={productObj.dataModel(productList)}
            header={headCells}
            enableRowSelection
            enableRowAction
            getPages={fetchNextPage}
            onRowActionSelect={handleRowAction}
            rowActionOptions={rowActionOptions}
            searchTerm={searchTerm}
            noDataMsg='Add Product by clicking on the "Add Product" button.'
          />
          <RightInfoPanel panelType="dynamic-filter"
            open={salesTaxFilterPanelVisible} headingText={t('taxes.filterHeader')}
            provideFilterParams={getFilterParams} onClose={handleSalesTaxFilterPanelClose}
            fields={FilterByFields}
            storeKey={'salestaxFilter'}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductManagementContent;