import React from "react";
import { Drawer } from "@mui/material";
import { PanelHeader } from "./PanelHeader.component";
import { InfoViewContent } from "./InfoViewContent.component";
import { DynamicFilterContent, IDynamicFilterProps } from "./DynamicFilterContent.component";
import "./RightInfoPanel.style.scss";


type drawerVariant = "info-view" | "customer-filter" | "salestax-filter";

interface InfoPanelProps {
  open: boolean;
  headingText: string;
  panelType: drawerVariant;
  info?: any;
  onClose: (...args: any) => void;
  provideFilterParams?: (...args: any) => void;
  fields?: IDynamicFilterProps['fields']
  idStrForEdit?: string,
  nameStrForEdit?: string,
  storeKey?: string
}

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, headingText, info, onClose, provideFilterParams, fields, panelType, idStrForEdit, nameStrForEdit, storeKey }) => {

  const provideContentForPanel = () => {
    if (panelType === "info-view") {
      return <InfoViewContent info={info} />;
    } else if (panelType === "customer-filter" && fields) {
      return <DynamicFilterContent
        provideFilterParams={provideFilterParams}
        onClose={onClose}
        fields={fields}
        storeKey={storeKey || 'dynamicFilter'}
      />;
    } else if (panelType === "salestax-filter" && fields) {
      return <DynamicFilterContent
        provideFilterParams={provideFilterParams}
        onClose={onClose}
        fields={fields}
        storeKey={storeKey || 'dynamicFilter'}
      />;
    } else {
      return <React.Fragment></React.Fragment>;
    }
  };

  const panelDrawer = <Drawer
    className={"right_panel_main_class " + (panelType === "info-view" ? "right_info_panel" : "customer_filter_panel")}
    variant={panelType === ("customer-filter" || "salestax-filter") ? "temporary" : "persistent"}
    anchor="right"
    open={open}
  >
    <PanelHeader onClose={onClose} headingText={headingText} info={info ? info : null} idStrForEdit={idStrForEdit} nameStrForEdit={nameStrForEdit} panelType={panelType} />
    {provideContentForPanel()}
  </Drawer >;

  return (
    <React.Fragment>{panelDrawer}</React.Fragment>
  );
};
