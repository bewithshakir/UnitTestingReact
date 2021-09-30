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
import { useLocation } from 'react-router-dom';


const Legend: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
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
              <ListItem key={ConfigItem.index} >
                <ListItemButton className={"listItemButton"} selected={isLegendSelected} disabled={ConfigItem.disabled}>
                  <ListItemText className="listItemTextPrimary" primary={t(ConfigItem.label)} />
                  {!ConfigItem.disabled && ConfigItem.secondaryText && <ListItemText className="listItemTextSecondary" primary={0} />}
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