

import React from 'react';
import PropTypes from 'prop-types';
import { Content } from '../components/UIComponents/Content/Content.component';
import { Footer } from '../components/UIComponents/Footer/Footer.component';
import bg from "../assets/images/bg_shapes.svg"
const Home = (props: {}) => {
    return (
        <div>
            <div className={'app__main'}>
                <Content />
                <Footer />
            </div>
            <div className={'app__bg'}>
                <img src={bg} alt={'bg'} />
            </div>
        </div>
    );
};

Home.propTypes = {

};

export default Home;