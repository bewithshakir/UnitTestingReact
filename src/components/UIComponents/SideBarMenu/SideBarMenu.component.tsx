// import React from 'react';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import './SideBarMenu.style.scss';
// import Icon from '@material-ui/core/Icon';
// import PhoneIcon from '@material-ui/icons/Phone';
// import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
// import { Button } from '../Button/Button.component';
// import logoOne from '../../../assets/images/Shell Taup logo.svg';
// import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
// import { useTheme } from '../../../contexts/Theme/Theme.context';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: any;
//   value: any;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: any) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }

// export const VerticalTabs: React.FC = () => {
//     const { themeType } = useTheme();

//     const logoSrc = themeType === 'UK' ? logoOne : logoTwo;

//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//       <div> 
//     <div className={'sidebarmenu_container'}>
//     <img
//                 className="sidebarmenu_logo"
//                 src={logoSrc}
//                 alt="logo"
//             />
//       <Tabs
//         orientation="vertical"
//         value={value}
//         onChange={handleChange}
//         aria-label="sidebar menu"
//         className={'sidebarmenu_tabs'} >        
//             <Tab className={'sidebarmenu_tab'} icon={<PhoneIcon />} {...a11yProps(0)} />
//             <Tab className={'sidebarmenu_tab'} icon={<PhoneIcon />} {...a11yProps(1)} />
//             <Tab className={'sidebarmenu_tab'} icon={<PhoneIcon />} {...a11yProps(2)} />
//             <Tab className={'sidebarmenu_tab'} icon={<PhoneIcon />} {...a11yProps(3)} />
//       </Tabs>
//       </div>
//       <div>
//       <TabPanel value={value} index={0}>
//         Item One
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//       <TabPanel value={value} index={3}>
//         Item Four
//       </TabPanel>
//       </div>
//       </div>
//   );
// }



import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { DeleteIcon } from '../../../assets/icons';
import './SideBarMenu.style.scss';
import { Link } from '@material-ui/core';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';

export const SideBarDrawer: React.FC = () => {
    const { themeType } = useTheme();

    const logoSrc = themeType === 'UK' ? logoOne : logoTwo;
    const ListData = [{
        index: 0,
        icon: logoOne,
        text: 'Home'
    },{
        index: 1,
        icon: logoTwo,
        text: 'Dashboard'
    },{ 
        index: 2,
        icon: logoTwo,
        text: 'Dashboard'
    },{ 
        index: 3,
        icon: logoTwo,
        text: 'Dashboard'
    }]
  return (
    <Box className={'sidebar-menu'}>
      <AppBar
        position="fixed"
        className={'sidebar-appbar'}>
      </AppBar>
      <Drawer className={'sidebar-drawer'}
        variant="permanent"
        anchor="left">
        <div style={{ padding: 0, margin: 0 }}>
        <img className="sidebarmenu_logo"
                src={logoSrc}
                alt="logo" />
        </div>
        
        <List>
          {ListData.map((icon, text, index) => (
              <Link className='sidebar-menuitem-link'>
            <ListItem className = {'sidebar-menu-item'} button key={text}>
              <ListItemIcon> 
                <DeleteIcon />
              </ListItemIcon>
              
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
