import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import './SideBarMenu.style.scss';
import logoOne from '../../../assets/images/Shell Taup logo.svg';
import logoTwo from '../../../assets/images/Shell Taup logo2.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { BriefCase64Icon, Invoice64Icon, ToggleList64Icon, Truck64Icon, DocumentFile64Icon, ToggleMail64Icon, ChartPie64Icon } from '../../../assets/icons';
import { BrowserRouter, useHistory } from "react-router-dom";

const SideBarMenuoptions = [{
  index: 0,
  icon: <BriefCase64Icon />,
  text: 'Home',
  route: 'home'
}, {
  index: 1,
  icon: <Invoice64Icon />,
  text: 'Dashboard',
  route: 'dashboard'
}, {
  index: 2,
  icon: <ToggleList64Icon />,
  text: 'Dashboard',
  route: 'home'
}, {
  index: 3,
  icon: <Truck64Icon />,
  text: 'Dashboard',
  route: 'home'
}, {
  index: 4,
  icon: <ToggleMail64Icon />,
  text: 'Dashboard',
  route: 'home'
}, {
  index: 5,
  icon: <ChartPie64Icon />,
  text: 'Dashboard',
  route: 'home'
}, {
  index: 6,
  icon: <DocumentFile64Icon />,
  text: 'Dashboard',
  route: 'home'
}, {
  index: 7,
  icon: <DocumentFile64Icon />,
  text: 'Dashboard',
  route: '/demo'
}];

type SideBarMenuOption = {
  index: number;
  icon?: React.ReactNode;
  text?: string;
  route?: string;
  component?: React.ReactNode;
  to?: any;
}
interface sideBarMenuProps {
  options?: SideBarMenuOption[],
  onSelect?: (selectedValue: object) => void
}

export default function SideBarDrawer(props: sideBarMenuProps) {
  const { themeType } = useTheme();
  const logoSrc = themeType === 'UK' ? logoOne : logoTwo;
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const onSelectOptions = (value: number) => {
    console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
    if(value == 7) {
      console.log("value 7 encountered");
      history.push("/demo")
    }
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
        <BrowserRouter>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="sidebar menu"
          className={'sidebarmenu_tabs'} >
          {SideBarMenuoptions && SideBarMenuoptions.map((item, index) => {
            return (
              <Tab className={'sidebarmenu_tab'} icon={item.icon} />
            )
          })}
        </Tabs>
        </BrowserRouter>
      </Drawer>
    </Box>
  );
}
