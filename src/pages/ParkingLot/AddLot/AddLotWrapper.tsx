import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddLotForm from './AddLotForm/AddLotForm.component';
import './AddLotWrapper.style.scss';
import { addLotHeaderConfig } from '../config';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface MenuProps {
    config?: any;
    current?: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
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
}


const AddLotWrapper: React.FC<MenuProps> = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
            <TabPanel value={value} index={0}>
                <AddLotForm />
            </TabPanel>
            <TabPanel value={value} index={1}>

            </TabPanel>
            <TabPanel value={value} index={2}>

            </TabPanel>
            <TabPanel value={value} index={3}>

            </TabPanel>
            <TabPanel value={value} index={4}>

            </TabPanel>
        </Box>
    );
};

export default AddLotWrapper;
