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
import {  useNavigate, useLocation } from 'react-router-dom';
import { useAddedCustomerNameStore, useAddedCustomerIdStore } from '../../../store';

const Legend: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const selectedCustomerName = useAddedCustomerNameStore((state) => state.customerName);
  const customerId = useAddedCustomerIdStore((state) => state.customerId);

  const getPath = (x: string) => {
  if (customerId) {
    return {
      'addCustomer': `/customer/viewCustomer/${customerId}`,
      'parkingLots': `/customer/${customerId}/parkingLots`,
    }[x];
  }
  };

  const isDisabled = (to : string) => {
    if (to.includes('addCustomer') && (pathname.includes('addCustomer') || pathname.includes('viewCustomer') || pathname.includes('parkingLots'))) {
      return false;
    } else if (to.includes('parkingLots') && (pathname.includes('viewCustomer') || pathname.includes('parkingLots'))){
      return false;
    } else return true;
  };

  const onItemClick = (to: string) => {
    const pathnameSegArr = to.split("/");
    if(!isDisabled(to)){
    navigate( getPath(pathnameSegArr[2]) || to,{
      state: {
        customerId: customerId,
        customerName: selectedCustomerName
      }});
    }
  };

  const getSelectedLegendItem = (configItem: any) => {
    if(configItem.to == "/customer/addCustomer") {
      const pathnameSegArr = pathname.split("/");
      if (pathnameSegArr.indexOf("viewCustomer") > -1 || pathnameSegArr.indexOf("addCustomer") > -1 ) {
        return true;
      } 
    } else if (configItem.to == "/customer/parkingLots") {
      const pathnameSegArr = pathname.split("/");
      if(pathnameSegArr.indexOf('parkingLots') > 0){
        return true;
      }
    } else {
      return pathname.includes(configItem.to);
    }
  };

  const getLegendHeader = () => {
      if(pathname.includes("viewCustomer") || pathname.includes("parkingLots")) { 
      return selectedCustomerName;
    } else {
      return t("legend.customerName");
    }
  };

  return (
    <Box className="legend-box" sx={boxSystem}>
      <nav >
        <List subheader={
          <ListSubheader className="subHeader">
           {getLegendHeader()}
          </ListSubheader>
        }>
          {config.map((ConfigItem) => {
            return (
              <ListItem key={ConfigItem.index} onClick={() => onItemClick(ConfigItem.to)} >
                <ListItemButton className={"listItemButton"} disabled={isDisabled(ConfigItem.to)} selected={getSelectedLegendItem(ConfigItem)} >
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