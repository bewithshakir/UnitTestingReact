import React, { memo, useEffect } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl, Typography } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ProductManagementModel from '../../models/ProductManagementModel';
import { MASS_ACTION_TYPES, ROW_ACTION_TYPES } from './config';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { DataGridActionsMenuOption } from '../../components/UIComponents/Menu/DataGridActionsMenu.component';
import { ProductsListSet } from './queries';
import { getSeachedDataTotalCount } from '../../utils/helperFunctions';

const ProductManagementContent = memo(() => {
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const productObj = new ProductManagementModel();
  const headCells = productObj.fieldsToDisplay();
  const massActionOptions = productObj.massActions();
  const rowActionOptions = productObj.rowActions();

  const [productList, setProductList] = React.useState<any>([]);
  const [filterData] = React.useState<{ [key: string]: string[] }>({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });

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
      case ROW_ACTION_TYPES.EDIT:
        // perform action
        navigate(`productManagement/edit/${row.productId}`);
        break;
      default: return;
    }
  };

  return (
    <Box display="flex" mt={10} ml={8}>
      <Grid container pl={6.25} pr={6.25} className="main-area">
        <Grid container display="flex" flexGrow={1}>
          <Grid item md={8} lg={9} display="flex" >
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
                onClick={() => navigate('/productManagement/add')}
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
        </Grid>
      </Grid>
    </Box>
  );
});

export default ProductManagementContent;