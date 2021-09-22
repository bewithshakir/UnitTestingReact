

import React, { useState } from 'react';
import { Content } from '../components/UIComponents/Content/Content.component';
import { Footer } from '../components/UIComponents/Footer/Footer.component';
import bg from "../assets/images/bg_shapes.svg"
import { useQuery } from 'react-query';
import { fetchQueryTodos } from '../actions/todos-with-query';
import { useTheme } from '../contexts/Theme/Theme.context';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Input from '../components/UIComponents/Input/Input';
import Select from '../components/UIComponents/Select/dropdown';
import HorizontalBar from '../components/UIComponents/NevigationBar/HorizontalBar';
const Home = (props: {}) => {
    const { data } = useQuery('repoData', fetchQueryTodos, { retry: false })
    console.log(data)
    const { theme } = useTheme();
    const [form, setForm] = useState({ userName: '', email: '', item: '' });
    const items = [
        { label: 'Amazon', value: 'Amazon' },
        { label: 'Nike', value: 'Nike' },
        { label: 'Flipkart', value: 'Flipkart' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Hp', value: 'Hp' }
    ]
    function onClickBack() {
        // history.push('/customer');
      }

    const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));
    const { t } = useTranslation()
    return (
        <div className="App"
            style={{
                ...theme
            } as React.CSSProperties}
        >
            <div>
                <div className={'app__main'}>
                    <HorizontalBar
                        version='v3'
                        onBack={onClickBack}
                    />
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

export default Home;