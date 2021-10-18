import React, { SyntheticEvent } from "react";
import { Button } from "../../components/UIComponents/Button/Button.component";
import "./style.scss";
import { useTranslation } from "react-i18next";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import {
  ExportIcon,
  PlusIcon,
  DeleteIcon,
  ImportIcon,
  FilterIcon,
} from "../../assets/icons";
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import { useCustomers } from "./queries";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { sortByOptions } from "./config";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
import { Box, FormControl, Grid } from "@mui/material";
import { HorizontalBarVersionState, useStore } from "../../store";
interface ContentProps {
  rows?: [];
  version: string
}

const headCells = [
  { id: "", label: "", type: 'checkbox' },
  { id: "customerId", label: "ID", type: 'text' },
  { id: "customerName", label: "CUSTOMER NAME", type: 'text' },
  { id: "contactName", label: "CONTACT NAME", type: 'text' },
  { id: "address", label: "ADDRESS", type: 'text' },
  { id: "city", label: "CITY", type: 'text' },
  { id: "state", label: "STATE", type: 'text' },
  { id: "zipCode", label: "ZIP", type: 'text' },
  { id: "lots", label: "LOTS", type: 'button' },
  { id: "paymentType", label: "SETTLEMENT TYPE", type: 'text' },
  { id: "", label: "", type: 'icon' }
];

const Content: React.FC<ContentProps> = () => {
  const history = useHistory();
  const [info, setInfo] = React.useState({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "customerName", order: "asc" });
  const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
  const [custFilterPanelVisible, setCustFilterPanelVisible] = React.useState(false);

  const { t } = useTranslation();
  const { data, fetchNextPage, isLoading }: any = useCustomers(
    searchTerm,
    sortOrder,
    filterData
  );
  const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
  setVersion("NavLinks");
  const openDrawer = (row: SyntheticEvent) => {
    setInfo(row);
    setDrawerOpen(true);
  };
  const drawerClose = () => {
    setDrawerOpen(false);
  };
  const navigateToAddCustomer = () => {
    history.push("/customer");
  };
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
    setSortOrder(sortOrder);
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };
  const list: any = [];
  data?.pages?.map((item: any) => {
    list.push(...item.data.customers);
  });


  const handleCustFilterPanelOpen = () => {
    setDrawerOpen(false);
    setCustFilterPanelVisible(!custFilterPanelVisible);
  };

  const handleCustFilterPanelClose = () => setCustFilterPanelVisible(false);

  const getFilterParams = (filterObj: { [key: string]: string[] }) => setFilterData(filterObj);

  return (
    <Box display="flex" mt={8} ml={8}>
      <Grid container pl={6.25} pr={6.25} className="main-area">
        <Grid container pt={2.5} display="flex" flexGrow={1}>
          <Grid item md={8} lg={9} display="flex" >
            <Grid item pr={2.5}>
              <Button
                types="filter"
                aria-label="dafault"
                onClick={handleCustFilterPanelOpen}
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
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
            <Grid item pr={2.5}>
              <Button
                types="primary"
                aria-label="primary"
                onClick={navigateToAddCustomer}
                startIcon={<Add />}
              >
                {t("buttons.add customer")}
              </Button>
            </Grid>
            <Grid item>
              <FormControl>
                <ActionsMenu
                  options={[
                    {
                      label: t("menus.actions.add vehicle"),
                      icon: <PlusIcon />,
                    },
                    {
                      label: t("menus.actions.import data"),
                      icon: <ImportIcon />,
                    },
                    {
                      label: t("menus.actions.export data"),
                      icon: <ExportIcon />,
                    },
                    {
                      label: t("menus.actions.delete"),
                      icon: <DeleteIcon />,
                    },
                  ]}
                  onSelect={(value) => {
                    return value;
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid container pt={2.5} display="flex" flexGrow={1}>

          <GridComponent
            rows={list}
            header={headCells}
            isLoading={isLoading}
            getPages={fetchNextPage}
            openDrawer={openDrawer}
          />

          <RightInfoPanel panelType="customer-filter" open={custFilterPanelVisible} headingText={"Filters"} provideFilterParams={getFilterParams} onClose={handleCustFilterPanelClose} />
          <RightInfoPanel panelType="info-view" open={drawerOpen} headingText={"Accurate Transportation"} info={info} onClose={drawerClose} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Content;