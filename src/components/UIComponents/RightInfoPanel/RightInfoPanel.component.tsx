import React, { useEffect } from "react";
import { Drawer } from "@mui/material";
import { PanelHeader } from "./PanelHeader.component";
import { InfoViewContent } from "./InfoViewContent.component";
import { DynamicFilterContent, IDynamicFilterProps } from "./DynamicFilterContent.component";
import "./RightInfoPanel.style.scss";
import { filterStore } from "../../../store";


type drawerVariant = "info-view" | "dynamic-filter";

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
  storeKey?: string,
  category?: "customer" | "lot"
}

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, headingText, info, onClose, provideFilterParams, fields, panelType, idStrForEdit, nameStrForEdit, storeKey, category }) => {

  const removeFormData = filterStore((state) => state.removeFormData);
  useEffect(() => {
    return () => {
      removeFormData();
    };
  }, []);

  const provideContentForPanel = () => {
    if (panelType === "info-view") {
      return <InfoViewContent info={info} />;
    } else if (panelType === "dynamic-filter" && fields) {
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
    variant={(panelType === "dynamic-filter") ? "temporary" : "persistent"}
    anchor="right"
    open={open}
  >
    <PanelHeader onClose={onClose} category={category} headingText={headingText} info={info ? info : null} idStrForEdit={idStrForEdit} nameStrForEdit={nameStrForEdit} panelType={panelType} />
    {provideContentForPanel()}
  </Drawer >;

  return (
    <React.Fragment>{panelDrawer}</React.Fragment>
  );
};
