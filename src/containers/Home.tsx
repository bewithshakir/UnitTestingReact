

import React from 'react';
import PropTypes from 'prop-types';
import { Content } from '../components/UIComponents/Content/Content.component';
import { Footer } from '../components/UIComponents/Footer/Footer.component';
import bg from "../assets/images/bg_shapes.svg"
import { useQuery } from 'react-query';
import { fetchQueryTodos } from '../actions/todos-with-query';
import { useTheme } from '../contexts/Theme/Theme.context';
import { Fab } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Home = (props: {}) => {
    const { data } = useQuery('repoData', fetchQueryTodos)
    const { theme } = useTheme();
    const {t} = useTranslation()
    return (
        <div className="App"
            style={{
                ...theme
            } as React.CSSProperties}
        >
            <div>
                <div className={'app__main'}>
                    <NavLink to="/query">{t("query")}</NavLink>
                    <Content />
                    <Footer />
                </div>
                <div className={'app__bg'}>
                    <img src={bg} alt={'bg'} />
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home ;