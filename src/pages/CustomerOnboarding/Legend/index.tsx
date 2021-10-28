/* eslint-disable no-console */
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import "./style.scss";
import { boxSystem, config } from './config';
import { useTranslation } from 'react-i18next';
import {  useHistory, useLocation } from 'react-router-dom';

const Legend: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory();

  const onItemClick = (to: string) => {
    history.push(to);
  };

  const getSelectedLegendItem = (configItem: any) => {
    if(configItem.to == "/customer/addCustomer") {
      const pathnameSegArr = pathname.split("/");
      if (pathnameSegArr.indexOf("viewCustomer") > -1 || pathnameSegArr.indexOf("addCustomer") > -1 ) {
        return true;
      } 
    } else {
      return pathname.includes(configItem.to);
    }
  };

  return (
    <Box className="legend-box" sx={boxSystem}>
      <nav >
        <List subheader={
          <ListSubheader className="subHeader">
            {t("legend.customerName")}
          </ListSubheader>
        }>
          {config.map((ConfigItem) => {
            return (
              <ListItem key={ConfigItem.index} onClick={() => onItemClick(ConfigItem.to)} >
                <ListItemButton className={"listItemButton"} selected={getSelectedLegendItem(ConfigItem)} >
                  <ListItemText className="listItemTextPrimary" primary={t(ConfigItem.label)} />
                  {ConfigItem.secondaryText && <ListItemText className="listItemTextSecondary" primary={0} />}
                </ListItemButton>
              </ListItem>
            );
          })
          }
        </List>
      </nav>
    </Box>
  );
};

export default Legend;