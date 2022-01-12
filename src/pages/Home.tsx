
import { Box, CssBaseline } from '@mui/material';
import { string } from 'yup';

import SideBarDrawer from '../components/UIComponents/SideBarMenu/SideBarMenu.component';


const Home = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SideBarDrawer />
       
        </Box>
    );
};

Home.propTypes = {
 version: string
};

export default Home;