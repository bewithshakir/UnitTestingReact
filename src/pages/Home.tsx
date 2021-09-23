import React, { useState } from 'react';
import { Content } from '../components/UIComponents/Content/Content.component';
import { Footer } from '../components/UIComponents/Footer/Footer.component';
import bg from "../assets/images/bg_shapes.svg"
import { useQuery } from 'react-query';
import { fetchQueryTodos } from '../actions/todos-with-query';
import { useTheme } from '../contexts/Theme/Theme.context';
import { NavLink, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../components/UIComponents/Input/Input';
import Select from '../components/UIComponents/Select/dropdown';
import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { Box, CssBaseline } from '@mui/material';
import SearchInput from '../components/UIComponents/SearchInput/SearchInput';
const Home = (props: { version: any }) => {
    const { data } = useQuery('repoData', fetchQueryTodos, { retry: false })
    console.log(data)
    const { theme } = useTheme();
    const [form, setForm] = useState({ userName: '', email: '', item: '' ,searchTerm: '' });
    const items = [
        { label: 'Amazon', value: 'Amazon' },
        { label: 'Nike', value: 'Nike' },
        { label: 'Flipkart', value: 'Flipkart' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Hp', value: 'Hp' }
    ]
    const history = useHistory()
    function onClickBack() {
        history.goBack()
    }
    console.log(props, "home props")
    const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));
    const { t } = useTranslation()
    return (
        <Box sx={{ display: 'flex' }} style={{
            ...theme
        } as React.CSSProperties}>
            <CssBaseline />
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />
            <div className="App">
                <div className={'app__main'}>
                    <Content />
                    <NavLink to="/query">{t("query")}</NavLink>
                    <Input name='userName'
                        label='User Name'
                        type='text'
                        onChange={handleChange}
                        value={form.userName}
                        description=''
                        helperText='User Name'
                        error
                    />
                    <Select
                        name='item'
                        label='Select item'
                        value={form.item}
                        placeholder='Choose'
                        items={items}
                        onChange={handleChange}
                    />
                    <Input name='email'
                        label='Email'
                        onChange={handleChange}
                        value={form.email}
                        description=''
                        required
                    />
                    <SearchInput
                        name='searchTerm'
                        value={form.searchTerm}
                        onChange={handleChange}
                    />
                    <Footer />
                </div>
                <div className={'app__bg'}>
                    <img src={bg} alt={'bg'} />
                </div>

            </div>
        </Box>
    );
};

Home.propTypes = {

};

export default Home;