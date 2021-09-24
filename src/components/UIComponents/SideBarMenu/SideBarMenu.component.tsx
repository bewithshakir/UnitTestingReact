import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import './SideBarMenu.style.scss';
import { Link } from '@material-ui/core';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { NotificationIcon } from '../../../assets/icons';

type SideBarMenuOption = {
  index: number;
  icon?: React.ReactNode;
  text?: string;
  route?: string;
}
interface sideBarMenuProps {
  options?: SideBarMenuOption[],
  onSelect?: (selectedValue: object) => void
}

const SideBarMenuoptions = [{
  index: 0,
  icon: <NotificationIcon />,
  text: 'Home',
  route: 'home'
}, {
  index: 1,
  icon: <NotificationIcon />,
  text: 'Dashboard',
  route: 'dashboard'
}, {
  index: 2,
  icon: <NotificationIcon />,
  text: 'Dashboard',
  route: 'home'
}, {
  index: 3,
  icon: <NotificationIcon />,
  text: 'Dashboard',
  route: 'home'
}];

export default function SideBarDrawer(props: sideBarMenuProps) {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;
  const [value, setValue] = React.useState(0);
  const onSelectOptions = (value: number) => {
    console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onSelectOptions(newValue);
    console.log(newValue)
  };
  const drawerWidth = 64;
  return (
    <Box className={'sidebar-menu'}>
      <Drawer className={'sidebar-drawer'}
        sx={{
          width: drawerWidth,
        }}
        variant="permanent"
        anchor="left">
        <div>
          <img className="sidebarmenu_logo"
            src={logoSrc}
            alt="logo" />
        </div>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="sidebar menu"
          className={'sidebarmenu_tabs'} >
          {SideBarMenuoptions && SideBarMenuoptions.map((item, index) => {
            return (
              <Tab className={'sidebarmenu_tab'} icon={item.icon} component={Link} />
            )
          })}
        </Tabs>
      </Drawer>
    </Box>
  );
}
