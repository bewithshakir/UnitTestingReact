import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, IconButton, AppBar, Toolbar, Box, Grid, Divider } from "@material-ui/core";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';



import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
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
  const { setCurrentTheme } = useTheme();
  const { t, i18n } = useTranslation();

  return (
    <Drawer
      className="right_info_panel"
      variant="persistent"
      anchor="right"
      open={open}
    >
      <div className="info_panel_header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <IconButton //to be replaced
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onClose}
                {...{ mr: 2 }}
              >
                <CloseIcon color="var(--White)" fontSize="20px"/>
              </IconButton>
              <h4 style={{ flexGrow: 1 }}>
                {t(headingText)}
              </h4>
              <DataGridActionsMenu //to be edited
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
      <div className="info_panel_content">
        <Grid container spacing={4}>
          {Object.entries(info).map(([key,value],i) =>
            <React.Fragment>
              <Grid container item xs={12} spacing={2} key={key}>
                <Grid item xs={6}>
                  {key}
                </Grid>
                <Grid item xs={6}>
                  {value?value:'-'}
                </Grid>
              </Grid>
              <Divider className="info_panel_content_item_divider" />
            </React.Fragment>) 
          }
        </Grid>
      </div>
    </Drawer>
  );
}
