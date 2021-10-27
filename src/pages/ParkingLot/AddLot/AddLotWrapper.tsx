import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddLotForm from './AddLotForm/AddLotForm.component';
import './AddLotWrapper.style.scss';


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
                    <Typography>{children}</Typography>
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
                    <Tab label={<React.Fragment>
                        <div className="tab-div">
                        <div className="verticle-middle"> Lot Details  </div> 
                        </div>
                    </React.Fragment>} {...a11yProps(0)} />
                    <Tab label={<React.Fragment>
                        <div className="tab-div">
                        <div className="verticle-middle">Products </div><div className='verticle-middle number-box'>0</div></div>
                    </React.Fragment>} {...a11yProps(1)} />
                    <Tab label={<React.Fragment>
                        <div className="tab-div">
                        <div className="verticle-middle">Fee Details </div></div>
                    </React.Fragment>} {...a11yProps(2)} />
                    <Tab label={<React.Fragment>
                        <div className="tab-div">
                        <div className="verticle-middle"> Items </div> <div className='verticle-middle number-box'>0</div></div>
                    </React.Fragment>} {...a11yProps(1)} />
                    <Tab label={<React.Fragment>
                        <div className="tab-div">
                        <div className="verticle-middle"> Wallets </div> <div className='verticle-middle number-box'>0</div></div>
                    </React.Fragment>} {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <AddLotForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
        </Box>
    );
};

export default AddLotWrapper;
