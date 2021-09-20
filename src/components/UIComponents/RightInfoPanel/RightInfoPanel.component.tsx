import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, IconButton, AppBar, Toolbar, Box, Grid, Divider } from "@material-ui/core";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import  {CloseIcon} from '../../../assets/icons';
import './RightInfoPanel.style.scss';

interface InfoPanelProps {
  open: boolean;
  headingText: string;
  info: Object,
  style?: React.CSSProperties;
  onClose: (...args: any[]) => void;
}

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, headingText, info, style, onClose }) => {
  const { t, i18n } = useTranslation();

  return (
    <Drawer
      className="right_info_panel"
      variant="persistent"
      anchor="right"
      open={open}
    >
      <div className="right_info_panel_header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onClose}
              >
                <CloseIcon color="var(--White)" fontSize="20px"/>
              </IconButton>
              <h4 style={{ flexGrow: 1 }}>
                {t(headingText)}
              </h4>
              <DataGridActionsMenu
                options={[
                  {
                    label: t("right-info-panel.settings.view details"),
                    icon: <VisibilityOutlinedIcon />
                  }
                ]}
                onSelect={(value) => {
                  console.log("selected")
                }}
              />
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div className="right_info_panel_content">
        <Grid container spacing={4}>
          {Object.entries(info).map(([key,value],i) =>
            <React.Fragment>
              <Grid container item xs={12} spacing={2} key={key}>
                <Grid item xs={6} className="right_info_panel_content_label">
                  {key}
                </Grid>
                <Grid item xs={6} className="right_info_panel_content_value">
                  {value?value:'-'}
                </Grid>
              </Grid>
              <Divider className="right_info_panel_content_item_divider" />
            </React.Fragment>) 
          }
        </Grid>
      </div>
    </Drawer>
  );
}
