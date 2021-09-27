import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, IconButton, AppBar, Toolbar, Box, Grid, Divider, Backdrop } from "@mui/material";

import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { CloseIcon } from '../../../assets/icons';
import './RightInfoPanel.style.scss';

type drawerVariant = "info-view" | "customer-filter";

interface InfoPanelProps {
  open: boolean;
  headingText: string;
  panelType: string;
  info?: Object;
  onClose: (...args: any[]) => void;
}

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, headingText, info, onClose, panelType }) => {
  console.log("panelType", panelType);
  const { t } = useTranslation();

  const panelHeader = <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                onClick={onClose}
              >
                <CloseIcon className="right_info_panel_close_icon" color="var(--White)" />
              </IconButton>
              <h2 style={{ flexGrow: 1 }}>
                {t(headingText)}
              </h2>
              <DataGridActionsMenu
                options={[
                  {
                    label: t("right-info-panel.settings.view & edit details")
                  }
                ]}
                onSelect={(value) => {
                  // console.log("selected")
                }}
              />
            </Toolbar>
          </AppBar>

  const contentDrawer = <Drawer
    className="right_info_panel"
    variant="persistent"
    anchor="right"
    open={open}
  >
    <div className="right_info_panel_header">
      <Box sx={{ flexGrow: 1 }}>
          {panelHeader}
      </Box>
    </div>
    <div className="right_info_panel_content">
      {info && <Grid container spacing={4}>
        {Object.entries(info).map(([key, value], i) =>
          <React.Fragment>
            <Grid container item xs={12} spacing={2} key={key}>
              <Grid item xs={6} className="right_info_panel_content_label">
                {key}
              </Grid>
              <Grid item xs={6} className="right_info_panel_content_value">
                {value ? value : '-'}
              </Grid>
            </Grid>
            <Divider className="right_info_panel_content_item_divider" />
          </React.Fragment>)
        }
      </Grid>}
    </div>
  </Drawer>

  const drawerUnderBackdrop = <Backdrop
    sx={{ color: "var(--White)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    {contentDrawer}
  </Backdrop>

  const renderPanel = () => {
    if (panelType === 'customer-filter') {
      return drawerUnderBackdrop;
    } else if (panelType === 'info-view') {
      return contentDrawer;
    }
  }

  return (
    <React.Fragment>{renderPanel()}</React.Fragment>
  );
}
