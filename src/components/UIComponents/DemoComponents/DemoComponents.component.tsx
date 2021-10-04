import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useTranslation } from 'react-i18next';
import SortbyMenu from '../Menu/SortbyMenu.component';
import ActionsMenu from '../Menu/ActionsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { ExportIcon, PlusIcon, DeleteIcon, ImportIcon, SettingsIcon, LogoutIcon, CustomerProfileIcon2 } from '../../../assets/icons';
import GridComponent from '../DataGird/grid.component';
import ToastMessage from '../ToastMessage/ToastMessage.component';
import { Footer } from '../Footer/Footer.component';
import Input from '../Input/Input';
import Select from '../Select/dropdown';
import SearchInput from '../SearchInput/SearchInput';
import { DatePicker } from '../DatePicker/DatePicker.component';
import bg from "../../../assets/images/bg_shapes.svg"
import { NavLink } from 'react-router-dom';
import useDebounce from '../../../utils/useDebounce';
import moment from "moment";
import { useQuery } from 'react-query';
import { fetchQueryTodos } from '../../../hooks/todos-with-query';
import { Box, CssBaseline } from '@mui/material';
import './DemoComponents.style.scss';

export const DemoComponents: React.FC = () => {
    const { data } = useQuery('repoData', fetchQueryTodos, { retry: false })
    console.log(data)
    const { setCurrentTheme } = useTheme();
    const { i18n } = useTranslation();
    const changeLanguage = (language: string) => () => {
        i18n.changeLanguage(language);
    };
    const [isOpen, setOpen] = React.useState(false);

    const MessageTypes = ["Success", "Error", "Info"];

    const handleButtonClick = () => {
        setOpen(true);
    }

    const handleMessageBoxClose = () => {
        setOpen(false);
    }
    const [form, setForm] = useState({ userName: '', email: '', item: [{ label: 'Nike', value: 'Nike' }], searchTerm: '', startDate: moment(), endDate: moment() });
    const debouncedValue = useDebounce<string>(form.searchTerm, 1000);
    const items = [
        { label: 'Amazon', value: 'Amazon' },
        { label: 'Nike', value: 'Nike' },
        { label: 'Flipkart', value: 'Flipkart' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Hp', value: 'Hp' }
    ]

    const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));
    useEffect(() => { console.log('Debounced Value:', debouncedValue) }, [debouncedValue]);
    const onDateChange = (name: string, newValue: Date | string | null | moment.Moment) => setForm(x => ({ ...x, [name]: newValue }));
    const { t } = useTranslation()
    return (
        <div>
            <div
                className={'content'}
            >
                {/* <h1 className={'content__title'}>
                    <span className={'content__title--colored'}>{t("themes")} </span>
                    {t("content1")}
                </h1>
                <p className={'content__paragraph'}>
                    {t("content2")} <b>{t("content3")}</b>{t("para")}
                </p>
                <p className={'content__paragraph'}>
                    {t("para1")} <b>{t("para1")}</b> ,<b>{t("para2")}</b> <b>{t("para3")}</b> <b>{t("para4")}</b>
                </p> */}
                <GridComponent />
                <div className={'content__buttons'}>
                    <Button
                        types={'primary'}
                        onClick={() => setCurrentTheme('USA')}
                    >
                        {t("ustheme")}
                    </Button>
                    <Button
                        types={'secondary'}
                        onClick={() => setCurrentTheme('UK')}
                    >
                        {t("uktheme")}
                    </Button>
                </div>
            </div>
            <div className={'content__buttons1'}>
                <SortbyMenu
                    options={[
                        t("menus.sortby.payment completed"),
                        t("menus.sortby.payment in progress"),
                        t("menus.sortby.recently added lots"),
                    ]}
                    onSelect={(value) => {
                        console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                    }}
                />

                <ActionsMenu
                    options={[
                        {
                            label: t("menus.actions.add vehicle"),
                            icon: <PlusIcon />
                        },
                        {
                            label: t("menus.actions.import data"),
                            icon: <ImportIcon />
                        },
                        {
                            label: t("menus.actions.export data"),
                            icon: <ExportIcon />
                        },
                        {
                            label: t("menus.actions.delete"),
                            icon: <DeleteIcon />
                        }
                    ]}
                    onSelect={(value) => {
                        console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                    }}
                />

                <DataGridActionsMenu
                    options={[
                        {
                            label: t("menus.data-grid-actions.raise a request"),
                        },
                        {
                            label: t("menus.data-grid-actions.fee & driver details"),
                        },
                        {
                            label: t("menus.data-grid-actions.other details"),
                        },
                        {
                            label: t("menus.data-grid-actions.contact details"),
                        }
                    ]}
                    onSelect={(value) => {
                        console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                    }}
                />

                <ProfileMenu
                    options={[
                        {
                            label: t("menus.profile-actions.profile"),
                            icon: <CustomerProfileIcon2 /> // width={"20px"} height={"20px"}
                        },
                        {
                            label: t("menus.profile-actions.settings"),
                            icon: <SettingsIcon />

                        },
                        {
                            label: t("menus.profile-actions.logout"),
                            icon: <LogoutIcon />
                        },
                    ]}
                    onSelect={(value) => {
                        console.log("🚀 ~ file: Content.component.tsx ~ line 60 ~ value", value)
                    }}
                />

                <Button
                    types={'primary'}
                    onClick={changeLanguage("en")}
                >
                    {t("english")}
                </Button>
                <Button
                    types={'primary'}
                    onClick={changeLanguage("es")}
                >
                    {t("spanish")}
                </Button>
                <Button
                    types={'primary'}
                    onClick={changeLanguage("fr")}
                >
                    {t("french")}
                </Button>
            </div>


            <div className={''} style={{ 'marginLeft': '20px' }}>
                <Button variant="outlined" onClick={handleButtonClick}>
                    Open success snackbar
                </Button>
                {isOpen && <ToastMessage isOpen={isOpen} messageType={MessageTypes[1]} onClose={handleMessageBoxClose} message='MyMessage' />}
            </div>

            <Footer />

            <div className="App" style={{ 'marginLeft': '20px' }}>
                <div className={'app__main'}>

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
                    {/* temporary styles */}
                    <Box style={{ 'marginLeft': '20px', 'marginBottom': '20px' }}>
                        <DatePicker
                            label="FROM DATE"
                            id="cust-filter-end-date"
                            disableBeforeDate={form.startDate}
                            placeholder="To Date"
                            name="endDate"
                            onChange={onDateChange}
                            value={form.endDate}
                            required
                        />
                    </Box>

                </div>
                {/* <div className={'app__bg'}>
                    <img src={bg} alt={'bg'} />
                </div> */}

            </div>

        </div >

    )
}