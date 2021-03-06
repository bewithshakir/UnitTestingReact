import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import './SideBarMenu.style.scss';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  BriefCase64Icon,
  Invoice64Icon,
  ToggleList64Icon,
  Truck64Icon,
  DocumentFile64Icon,
  ToggleMail64Icon,
  ChartPie64Icon,
} from '../../../assets/icons';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import HorizontalBar from '../NavigationBar/HorizontalBar';

import { routes } from '../../../routes';

import { CssBaseline } from '@mui/material';
import { Suspense } from 'react';
import { Loader } from '../Loader';

const SideBarMenuoptions = [
  {
    index: 0,
    icon: <BriefCase64Icon />,
    text: 'Home',
    route: '/',
  },
  {
    index: 1,
    icon: <Invoice64Icon />,
    text: 'Taxes',
    route: '/taxes',
  },
  {
    index: 2,
    icon: <ToggleList64Icon />,
    text: 'Dashboard',
    route: 'home',
  },
  {
    index: 3,
    icon: <Truck64Icon />,
    text: 'Truck Parking Lot',
    route: '/trucks',
  },
  {
    index: 4,
    icon: <ToggleMail64Icon />,
    text: 'Dashboard',
    route: 'home2',
  },
  {
    index: 5,
    icon: <ChartPie64Icon />,
    text: 'Dashboard',
    route: 'home3',
  },
  {
    index: 6,
    icon: <DocumentFile64Icon />,
    text: 'Dashboard',
    route: 'demo',
  },
];

// type SideBarMenuOption = {
//   index: number;
//   icon?: React.ReactNode;
//   text?: string;
//   route?: any;
//   component?: React.ReactNode;
//   to?: any;
// }
// interface sideBarMenuProps {
//   options?: SideBarMenuOption[],
//   onSelect?: (selectedValue: any) => void
//   children?: any
// }

export default function SideBarDrawer () {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;
  const [value, setValue] = React.useState(0);
  const element = useRoutes(routes);

  const onSelectOptions = (value: number) => {
    if (value == 6) {
      // navigate("/demo")
    }
  };

  const handleChange = (event: React.ChangeEvent<any>, newValue: number) => {
    setValue(newValue);
    onSelectOptions(newValue);
  };

  const navigate = useNavigate();
  function onClickBack () {
    navigate('/');
  }

  const drawerWidth = 64;
  return (
    <Box className={'sidebar-menu'}>
      <CssBaseline />
      <HorizontalBar onBack={onClickBack} />
      <Drawer
        className={'sidebar-drawer'}
        sx={{
          width: drawerWidth,
        }}
        variant='permanent'
        anchor='left'
      >
        <img className='sidebarmenu_logo' src={logoSrc} alt='logo' />
        <Tabs
          orientation='vertical'
          value={value}
          onChange={handleChange}
          aria-label='sidebar menu'
          className={'sidebarmenu_tabs'}
        >
          {SideBarMenuoptions &&
            SideBarMenuoptions.map((item, index) => {
              return (
                <Tab
                  className={'sidebarmenu_tab'}
                  icon={item.icon}
                  component={Link}
                  to={item.route}
                  key={index}
                />
              );
            })}
        </Tabs>
      </Drawer>
      <main className='content1'>
        <Suspense fallback={<Loader />}>
          {element}
        </Suspense>
      </main>
    </Box>
  );
}
