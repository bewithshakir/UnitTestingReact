import React, { useState, useEffect } from 'react';
import moment from "moment";

import { Footer } from '../components/UIComponents/Footer/Footer.component';
import bg from "../assets/images/bg_shapes.svg"
import { useQuery } from 'react-query';
import { fetchQueryTodos } from '../hooks/todos-with-query';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../components/UIComponents/Input/Input';
import SearchInput from '../components/UIComponents/SearchInput/SearchInput';
import useDebounce from '../utils/useDebounce';
import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { Box, CssBaseline } from '@mui/material';
import { DemoComponents } from '../components/UIComponents/DemoComponents/DemoComponents.component';
import SideBarDrawer from '../components/UIComponents/SideBarMenu/SideBarMenu.component';



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