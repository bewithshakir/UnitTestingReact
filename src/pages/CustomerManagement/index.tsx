import React, { EffectCallback, SyntheticEvent, useEffect } from "react";
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
import { Toolbar } from "@mui/material";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { sortByOptions } from "./config";
import { RightInfoPanel } from "../../components/UIComponents/RightInfoPanel/RightInfoPanel.component";
interface ContentProps {
  rows?: [];
}
export const Content: React.FC<ContentProps> = (props) => {
  const history = useHistory();
  const [info,setInfo] = React.useState({})
  const [searchTerm, setSearchTerm] = React.useState("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [order, setOrder] = React.useState("asc");
  const [sortKey,setSortKey] = React.useState("customerName");
  const { t } = useTranslation();
  const { data, fetchNextPage, isLoading, hasNextPage }: any = useCustomers(
    searchTerm,
    sortKey,
    order
  );
  const openDrawer = (row:SyntheticEvent)=>{
    setInfo(row)
    setDrawerOpen(true)
  }
  const drawerClose =()=>{
    setDrawerOpen(false)
  }
  const navigateToAddCustomer = () => {
    history.push("/addCustomer");
  };
  const onSortBySlected = (value: string) => {
    let sortVariable;
    let sortKey;
    if (value === "A-Z") {
      sortKey="customerName"
      sortVariable = "asc"
    } else if(value === "Z-A"){
      sortKey="customerName"
      sortVariable = "desc"
    }else if(value = "Newest to Oldest"){
      sortKey="date"
      sortVariable = "asc"
    }else{
      sortKey="date"
      sortVariable = "desc"
    }
    setSortKey(sortKey)
    setOrder(sortVariable);
  };
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.currentTarget.value);
  };
  let list: any = []
  console.log(data)
  data?.pages?.map((item: any) => {
    list.push(...item.data.customers )
  })
  return (
    <div>
      <div className={"content"}>
        <div className={"content__buttons1"}>
          <div className={"content__buttons2"}>
            <Button
              types="filter"
              aria-label="dafault"
              onClick={() => { }}
              startIcon={<FilterIcon />}
            >
              Filter
            </Button>
            <div className={"space"} />
            <SortbyMenu
              options={sortByOptions.map((sortByItem) => t(sortByItem))}
              onSelect={(value) => onSortBySlected(value)}
            />
            <div className={"space"} />
            <SearchInput
              name="searchTerm"
              value={searchTerm}
              onChange={onInputChange}
            />
           </div>
           <div  className={"content__buttons3"}>
            <Button
              types="primary"
              aria-label="primary"
              onClick={navigateToAddCustomer}
              startIcon={<Add />}
            >
              {t("buttons.add customer")}
            </Button>
            <div className={"space"} />
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
                console.log(
                  "🚀 ~ file: Content.component.tsx ~ line 60 ~ value",
                  value
                );
              }}
            />
            </div>
        </div>
        <GridComponent
          rows={list}
          isLoading={isLoading}
          getPages={fetchNextPage}
          openDrawer={openDrawer}
        />

       <RightInfoPanel open={drawerOpen} headingText={"Accurate Transportation"} info={info} onClose={drawerClose}/>
      </div>
    </div>
  );
};
