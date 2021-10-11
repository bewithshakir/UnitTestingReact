import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import "./style.scss"
import { boxSystem, config } from './config';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { SyntheticEvent } from 'react';
import { useEffect } from 'react';


const Legend: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const history = useHistory()
  useEffect(()=>{
    history.push("/customer/addCustomer")
  },[])
  const onItemClick = (index: number): void => {
    // if (index === 1) {
    //   history.push("/customer/addCustomer")
    // }
  }
  return (

    <Box className="legend-box" sx={boxSystem}>
      <nav >
        <List subheader={
          <ListSubheader className="subHeader">
            {t("legend.customerName")}
          </ListSubheader>
        }>
          {config.map((ConfigItem) => {
            const isLegendSelected = pathname.includes(ConfigItem.to)
            return (
              <ListItem key={ConfigItem.index} onClick={() => onItemClick(ConfigItem.index)} >
                <ListItemButton className={"listItemButton"} selected={isLegendSelected} >
                  <ListItemText className="listItemTextPrimary" primary={t(ConfigItem.label)} />
                  {ConfigItem.secondaryText && <ListItemText className="listItemTextSecondary" primary={0} />}
                </ListItemButton>
              </ListItem>
            )
          })
          }
        </List>
      </nav>
    </Box>
  );
}

export default Legend