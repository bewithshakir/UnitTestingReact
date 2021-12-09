import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddLotForm from './AddLotForm/AddLotForm.component';
import ProductManagement from '../../ProductManagement/index';
import './AddLotWrapper.style.scss';
import { addLotHeaderConfig, lotHeaderBoxSx, lotHeaderInnerBoxSx } from '../config';
import { HorizontalBarVersionState, useStore } from '../../../store';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface MenuProps {
    config?: any;
    current?: number;
}

const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
};


const AddLotWrapper: React.FC<MenuProps> = () => {
    const { pathname } = useLocation();
    const check = pathname.includes('viewLot');
    const [value, setValue] = React.useState(0);
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Many");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        if(check){
        setValue(newValue);
        }
    };

    return (
        <Box className='lot-header-box' sx={lotHeaderBoxSx}>
            <Box sx={lotHeaderInnerBoxSx} className={"lot-header-tab"}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {addLotHeaderConfig.map((headerTab, index) =>
                        <Tab key={headerTab.index} label={<React.Fragment>
                            <div className="tab-div">
                                <div className="verticle-middle"> {headerTab.label}  </div>
                                {headerTab.containsValue && <div className='verticle-middle number-box'>{headerTab.value}</div>}
                            </div>
                        </React.Fragment>} {...a11yProps(index)} />
                    )}
                </Tabs>
            </Box>
            <Box>
                <TabPanel value={value} index={0}>
                    <AddLotForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {check && (<ProductManagement />  )}
                </TabPanel>
                <TabPanel value={value} index={2}>

                </TabPanel>
                <TabPanel value={value} index={3}>

                </TabPanel>
                <TabPanel value={value} index={4}>

                </TabPanel>
            </Box>
        </Box>
    );
};

export default AddLotWrapper;
