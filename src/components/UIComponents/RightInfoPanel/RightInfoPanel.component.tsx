import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, Backdrop } from "@mui/material";
import './RightInfoPanel.style.scss';
import './CustomerFilterPanel.style.scss';
import { PanelHeader } from './PanelHeader.component';
import { InfoViewContent } from './InfoViewContent.component';
import { FilterContent } from './FilterContent.component';

type drawerVariant = "info-view" | "customer-filter";

interface InfoPanelProps {
  open: boolean;
  headingText: string;
  panelType: drawerVariant;
  info?: Object;
  onClose: (...args: any[]) => void;
}

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, headingText, info, onClose, panelType }) => {

  const provideContentForPanel = () => {
    if (panelType === 'info-view') {
      return <InfoViewContent info={info} />;
    } else if (panelType === 'customer-filter') {
      return <FilterContent onClose={onClose} />
    } else {
      return <React.Fragment></React.Fragment>
    }
  }

  const panelDrawer = <Drawer
    className={panelType === "info-view" ? "right_info_panel": "customer_filter_panel"}
    variant="persistent"
    anchor="right"
    open={open}
  >
    <PanelHeader onClose={onClose} headingText={headingText} panelType={panelType} />
    {provideContentForPanel()}
  </Drawer >

  const panelDrawerUnderBackdrop = <Backdrop
    sx={{ color: "var(--White)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    {panelDrawer}
  </Backdrop>

  const renderPanel = () => {
    if (panelType === 'customer-filter') {
      return panelDrawerUnderBackdrop;
    } else if (panelType === 'info-view') {
      return panelDrawer;
    }
  }

  return (
    <React.Fragment>{renderPanel()}</React.Fragment>
  );
}
