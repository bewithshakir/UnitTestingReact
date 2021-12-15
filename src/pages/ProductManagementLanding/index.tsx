/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { filterByFields, sortByOptions } from "./config";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import ProductModel from '../../models/ProductModel';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';

const ProductManagementContent = memo(() => {
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const { t } = useTranslation();
  const history = useHistory();

  const productObj = new ProductModel();
  const massActionOptions = productObj.massActions();
  const rowActionOptions = productObj.rowActions();
  const ACTION_TYPES = productObj.ACTION_TYPES;
  const [productList, setProductList] = React.useState<any>([]);
  const headCells = productObj.fieldsToDisplay();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [salesTaxFilterPanelVisible, setSalesTaxPanelVisible] = React.useState(false);
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [searchTerm, setSearchTerm] = React.useState("");


  useEffect(() => {
    setProductList([
      {
        productId: "44ae7404-ce0a-436d-80fe-5124270d1d4a",
        productName: "Premium",
        productServiceInd: "Y",
        productClass: {
          productClassCd: "1ceb0df7-6459-4905-962b-43302fe43cb4",
          productClassNm: "Non-Fuel",
          activeInactiveInd: "Y"
        },
        productColor: {
          productColorCd: "2e2056eb-a95f-4161-a4fd-0f6be61740f2",
          productColorNm: "Purple",
          productColorCode: "#641964",
          countryCode: "us",
          activeInactiveInd: "Y"
        }
      },
      {
        productId: "7f2db306-c17c-49a9-a84a-ba6770737c15",
        productName: "Premium1",
        productServiceInd: "Y",
        productClass: {
          productClassCd: "1ceb0df7-6459-4905-962b-43302fe43cb4",
          productClassNm: "Non-Fuel",
          activeInactiveInd: "Y"
        },
        productColor: {
          productColorCd: "8ee38d3d-f792-4b93-a506-b656b3523228",
          productColorNm: "Sky Blue",
          productColorCode: "#009EB4",
          countryCode: "us",
          activeInactiveInd: "Y"
        }
      }
    ]);
  }, []);

  const onInputChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCustFilterPanelOpen = () => {
    setDrawerOpen(false);
    setSalesTaxPanelVisible(!salesTaxFilterPanelVisible);
  };

  const handleMassAction = () => {
    return '';
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const handleSalesTaxFilterPanelClose = () => setSalesTaxPanelVisible(false);

  const getFilterParams = (filterObj: { [key: string]: string[] }) => {
    setFilterData(filterObj);
  };

  const handleRowAction = (action: DataGridActionsMenuOption, row: any) => {
    switch (action.action) {
      case ACTION_TYPES.EDIT:
        // perform action
        break;
      case ACTION_TYPES.DELETE:
        // perform action
        break;
      case ACTION_TYPES.CONTACT_DETAILS:
        // perform action
        break;
      default: return;
    }
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
                  options={sortByOptions.map((sortByItem) => t(sortByItem))}
                  onSelect={(value) => value}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
                placeholder={"Search"}
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
                onClick={() => null}
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
            rows={productObj.dataModel(productList)}
            header={headCells}
            enableRowSelection
            enableRowAction
            onRowActionSelect={handleRowAction}
            rowActionOptions={rowActionOptions}
            searchTerm={searchTerm}
            openDrawer={openDrawer}
            noDataMsg='Add Product by clicking on the "Add Product" button.'
          />
          <RightInfoPanel panelType="dynamic-filter"
            open={salesTaxFilterPanelVisible} headingText={t('taxes.filterHeader')}
            provideFilterParams={getFilterParams} onClose={handleSalesTaxFilterPanelClose}
            fields={filterByFields}
            storeKey={'salestaxFilter'}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductManagementContent;