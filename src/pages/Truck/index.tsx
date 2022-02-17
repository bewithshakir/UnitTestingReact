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
import { useNavigate } from "react-router-dom";
import TruckModel from '../../models/TruckModel';
import { useTruckList } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";

export interface TruckLandingContentProps {
  version: string
}


const TruckLandingContent: React.FC<TruckLandingContentProps> = memo(() => {
  const truckObj = new TruckModel();
  const headCells = truckObj.fieldsToDisplay();

  const navigate = useNavigate();
  const [searchTerm] = React.useState("");
  const [sortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
  const [truckList, setTruckList] = React.useState([]);
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");

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

const onInputChange = () => {
    // TODO
};  

const handleMassAction = () => {
    // TO DO
};

  const onSortBySlected = () => {
      //TODO
  };

    const navigateAddtruck = () => {
        navigate(`/trucks/addTruck`);
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
                  options={[]}
                  onSelect={() => onSortBySlected()}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <SearchInput
                name="searchTerm"
                placeholder={t('truckLanding.search')}
                value={searchTerm}
                delay={500}
                onChange={onInputChange}
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
            enableRowSelection={false}
            enableRowAction
            getPages={fetchNextPage}
            searchTerm={searchTerm}
            noDataMsg={t("truckLanding.noTrucksMsg")}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default TruckLandingContent;