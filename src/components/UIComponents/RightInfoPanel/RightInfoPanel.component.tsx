import React from "react";
import { Drawer } from "@mui/material";
import { PanelHeader } from "./PanelHeader.component";
import { InfoViewContent } from "./InfoViewContent.component";
import { FilterContent } from "./FilterContent.component";
import "./RightInfoPanel.style.scss";


type drawerVariant = "info-view" | "customer-filter";

interface InfoPanelProps {
  open: boolean;
  headingText: string;
  panelType: drawerVariant;
  info?: any;
  onClose: (...args: any) => void;
  provideFilterParams?: (...args: any) => void;
  idStrForEdit?: string,
  nameStrForEdit?:string
}

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, headingText, info, onClose, provideFilterParams, panelType , idStrForEdit, nameStrForEdit}) => {

  const provideContentForPanel = () => {
    if (panelType === "info-view") {
      return <InfoViewContent info={info}  />;
    } else if (panelType === "customer-filter") {
      return <FilterContent provideFilterParams={provideFilterParams} onClose={onClose} />;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  const panelDrawer = <Drawer
    className={"right_panel_main_class " + (panelType === "info-view" ? "right_info_panel": "customer_filter_panel")}
    variant={panelType === "customer-filter"?"temporary":"persistent"}
    anchor="right"
    open={open}
  >
    <PanelHeader onClose={onClose} headingText={headingText} info={info?info:null} idStrForEdit={idStrForEdit} nameStrForEdit={nameStrForEdit} panelType={panelType}  />
    {provideContentForPanel()}
  </Drawer >;

  return (
    <React.Fragment>{panelDrawer}</React.Fragment>
  );
};
