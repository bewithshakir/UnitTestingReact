import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListSubheader } from '@mui/material';
import "./style.scss"
import { boxSystem,  config } from './config';
import { useTranslation } from 'react-i18next';


const Legend: React.FC = () => {
  const { t } = useTranslation()
  let [legendSelected, setLengendSelected] = React.useState(-1)
  const onLegendClick = (index: any) => () => {
    setLengendSelected(index)
  }
  return (

      <Box className="box" sx={boxSystem}>
        <nav >
          <List subheader={
            <ListSubheader className="subHeader">
              {t("legend.customerName")}
            </ListSubheader>
          }>
            {config.map((ConfigItem) => {
              const isLegendSelected =  ConfigItem.index === legendSelected ? true : false
              return (
                <ListItem key={ConfigItem.index} >
                  <ListItemButton onClick={onLegendClick(ConfigItem.index)} className={"listItemButton"} selected={isLegendSelected}>
                    <ListItemText className="listItemTextPrimary" primary={t(ConfigItem.label)} />
                    <ListItemText className="listItemTextSecondary" primary={0} />
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