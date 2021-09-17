import React from 'react';
import { Drawer, IconButton, Divider , List, ListItem, ListItemText, AppBar, Toolbar, Box} from "@material-ui/core";
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import MoreIcon from '@material-ui/icons/MoreVert';
import { styled } from '@material-ui/styles';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useTranslation } from 'react-i18next';


import { useTheme } from '../../../contexts/Theme/Theme.context';
import './RightInfoPanel.style.scss';

const drawerWidth = 560;

  

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  const grid_col_spacing = { xs: 1, sm: 2, md: 3 };

interface InfoPanelProps {
    open: boolean;
    data: {
        customerName: string
        info: object
    };
    style?: React.CSSProperties;
    onClose: (...args: any[]) => void;
  }

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }));

export const RightInfoPanel: React.FC<InfoPanelProps> = ({ open, data, style, onClose}) => {
    const { setCurrentTheme } = useTheme();
    const { t, i18n } = useTranslation();
    const changeLanguage = (language: string) => () => {
        i18n.changeLanguage(language);
    };

    const drawerProps = {
        // width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }

      const iconBtnProps = { ...(open && { display: "none" }) }
    
    return (
        <Drawer
        className="right_info_panel"
        variant="persistent"
        anchor="right"
        open={open}
        // sx={{
        //     width: drawerWidth,
        //     flexShrink: 0,
        //     '& .MuiDrawer-paper': {
        //       width: drawerWidth,
        //     },
        //   }}
      >
        <DrawerHeader>
            <Box sx={{ flexGrow: 1 }}>  
                <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton 
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onClose}
                        {...{mr:2}}
                    >
                        <KeyboardTabIcon />
                    </IconButton> 
                    <h6>
                        {t(data.customerName)}
                    </h6>
                    <IconButton 
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={onClose}
                        {...{mr:2}}
                    >
                        <MoreIcon />
                    </IconButton> 
                    </Toolbar>
                </AppBar>
            </Box>
        </DrawerHeader>
        <Box sx={{ flexGrow: 1 , padding: '18px 47px'}}>  
            <Box sx={{ flexGrow: 1 }}>
          
            </Box>
            {/* <Grid container  columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={6}>
                
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid> */}
            {/* <Grid columnSpacing={grid_col_spacing}>
                <Grid item xs={6}>
                
                </Grid>
                <Grid item xs={6}>
                
                </Grid>
                <Grid item xs={6}>

                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid> */}
            
            <List 
                // sx={style} 
                component="nav"
                className="panel_content_list"
            >
                
                <ListItem>
                    <ListItemText primary="Customer Id" />
                </ListItem>
                <Divider />
                <ListItem divider>
                    <ListItemText primary="Name" />
                </ListItem>
                <ListItem divider>
                    <ListItemText primary="Email" />
                </ListItem>
                <ListItem divider>
                    <ListItemText primary="Phone" />
                </ListItem>
            </List>
        </Box>
      </Drawer>
    );
}
