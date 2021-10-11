import React, { useState, useEffect } from 'react';
import moment from "moment";

import { Footer } from '../components/UIComponents/Footer/Footer.component';
import bg from "../assets/images/bg_shapes.svg"
import { useQuery } from 'react-query';
import { fetchQueryTodos } from '../hooks/todos-with-query';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../components/UIComponents/Input/Input';
import Select from '../components/UIComponents/Select/dropdown';
import SearchInput from '../components/UIComponents/SearchInput/SearchInput';
import { DatePicker } from '../components/UIComponents/DatePicker/DatePicker.component';
import useDebounce from '../utils/useDebounce';
import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { Box, CssBaseline } from '@mui/material';
<<<<<<< HEAD
import { RightInfoPanel } from '../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
import { Button } from '../components/UIComponents/Button/Button.component';
=======
import { DemoComponents } from '../components/UIComponents/DemoComponents/DemoComponents.component';
import SideBarDrawer from '../components/UIComponents/SideBarMenu/SideBarMenu.component';
>>>>>>> 98c8e21cec391792df47f18362f9904d711ea759



const Home = (props: { version: any }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <SideBarDrawer />
       
        </Box>
    );
};

Home.propTypes = {

};

export default Home;