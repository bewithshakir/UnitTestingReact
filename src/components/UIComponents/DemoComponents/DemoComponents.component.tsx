import React, { useEffect, useState } from 'react';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useTranslation } from 'react-i18next';
import SortbyMenu from '../Menu/SortbyMenu.component';
import ActionsMenu from '../Menu/ActionsMenu.component';
import ProfileMenu from '../Menu/ProfileMenu.component';
import { DatePickerV2 } from '../DatePickerV2/DatePickerV2.component';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { ExportIcon, PlusIcon, DeleteIcon, ImportIcon, SettingsIcon, LogoutIcon, CustomerProfileIcon2 } from '../../../assets/icons';
import GridComponent from '../DataGird/grid.component';
import ToastMessage from '../ToastMessage/ToastMessage.component';
import { Footer } from '../Footer/Footer.component';
import Input from '../Input/Input';
import Select from '../Select/MultiSelect';
import SearchInput from '../SearchInput/SearchInput';
import useDebounce from '../../../utils/useDebounce';
import moment from "moment";
//import { useQuery } from 'react-query';
//import { fetchQueryTodos } from '../../../hooks/todos-with-query';
import { Box, FormControl } from '@mui/material';
import './DemoComponents.style.scss';
import { DateRange } from '@mui/lab/DateRangePicker';

type DatePickerRange = DateRange<Date>;

export const DemoComponents: React.FC = () => {
    //const { data } = useQuery('repoData', fetchQueryTodos, { retry: false });
    const { setCurrentTheme } = useTheme();
    const { i18n } = useTranslation();
    const changeLanguage = (language: string) => () => {
        i18n.changeLanguage(language);
    };
    const [isOpen, setOpen] = React.useState(false);

    const MessageTypes = ["Success", "Error", "Info"];

    const handleButtonClick = () => {
        setOpen(true);
    };

    const handleMessageBoxClose = () => {
        setOpen(false);
    };
    const [dateRange, setDateRange] = useState<DatePickerRange>([new Date(), new Date()]);
    const [form, setForm] = useState({ userName: '', email: '', item: [{ label: 'Nike', value: 'Nike' }], searchTerm: '', startDate: moment().format("MM/DD/YYYY"), endDate: moment().format("MM/DD/YYYY"), address: { addressLine1: '', addressLine2: '', state: '', city: '', postalCode: '' } });
    const debouncedValue = useDebounce<string>(form.searchTerm, 1000);
    const items = [
        { label: 'Amazon', value: 'Amazon' },
        { label: 'Nike', value: 'Nike' },
        { label: 'Flipkart', value: 'Flipkart' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Hp', value: 'Hp' }
    ];
    const handleSelect = (name: any, e: any) => setForm(x => ({ ...x, [name]: e }));
    const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));
    const setTempValue = (value: any) => {
        return value;
    };
    useEffect(() => {
        setTempValue(debouncedValue);
    }, [debouncedValue]);
    const onDateRangeChange = (name: string, newValue: DatePickerRange) => setDateRange(newValue);
    const onDateChange = (name: string, newValue: Date | string | null | moment.Moment) => setForm(x => ({ ...x, [name]: (name === "startDate" || name === "endDate") && newValue ? moment(newValue).format('MM/DD/YYYY') : null }));
    const { t } = useTranslation();
    return (
        <div>
            <div
                className={'content'}
            >
                <h1 className={'content__title'}>
                    <span className={'content__title--colored'}>{t("themes")} </span>
                    {t("content1")}
                </h1>
                <p className={'content__paragraph'}>
                    {t("content2")} <b>{t("content3")}</b>{t("para")}
                </p>
                <p className={'content__paragraph'}>
                    {t("para1")} <b>{t("para1")}</b> ,<b>{t("para2")}</b> <b>{t("para3")}</b> <b>{t("para4")}</b>
                </p>
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
                <FormControl>
                    <SortbyMenu
                        options={[
                            t("menus.sortby.payment completed"),
                            t("menus.sortby.payment in progress"),
                            t("menus.sortby.recently added lots"),
                        ]}
                        onSelect={(value) => {
                            return value;
                        }}
                    />
                </FormControl>
                <FormControl>
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
                            return value;
                        }}
                    />
                </FormControl>
                <FormControl>
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
                            return value;
                        }}
                    />
                </FormControl>
                <FormControl>
                    <ProfileMenu
                        options={[
                            {
                                label: t("menus.profile-actions.profile"),
                                icon: <CustomerProfileIcon2 />
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
                            return value;
                        }}
                    />
                </FormControl>
                <FormControl>
                    <Button
                        types={'primary'}
                        onClick={changeLanguage("en")}
                    >
                        {t("english")}
                    </Button>
                </FormControl>
                <FormControl>
                    <Button
                        types={'primary'}
                        onClick={changeLanguage("es")}
                    >
                        {t("spanish")}
                    </Button>
                </FormControl>
                <FormControl>
                    <Button
                        types={'primary'}
                        onClick={changeLanguage("fr")}
                    >
                        {t("french")}
                    </Button>
                </FormControl>
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

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            marginLeft: '70px',
                            marginBottom: '20px',
                            '& > :not(style)': {
                                m: 1,
                                minWidth: '200px'
                            },
                        }}
                    >
                              
                        <div>{dateRange[0] ? moment(dateRange[0]).format('MM/DD/YYYY') : ''} to
                        {dateRange[1] ? moment(dateRange[1]).format('MM/DD/YYYY') : ''}</div>
                        <DatePickerV2
                            label="DATE RANGE"
                            type="date-range"
                            id="cust-filter-date-range"
                            // disableBeforeDate={form.startDate}
                            placeholder={{start:"From", end: "To"}}
                            name="dateRange"
                            onDateRangeChange={onDateRangeChange}
                            dateRangeValue={dateRange}
                            required
                        />
                        <br />

                        <DatePickerV2
                            label="Select Date"
                            type="single-date"
                            id="cust-filter-start-date"
                           
                            placeholder="From"
                            name="startDate"
                            onChange={onDateChange}
                            value={form.startDate}
                            required
                        /> <span>{form.startDate}</span>
                        <DatePickerV2
                            type="single-date"
                            id="cust-filter-end-date"
                            // disableBeforeDate={form.endDate}
                            placeholder="End date"
                            name="endDate"
                            onChange={onDateChange}
                            value={form.endDate}
                            required
                        /> <span>{form.endDate}</span>
                    </Box>

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
                        onChange={handleSelect}
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
                    {/* <GoogleAutoCompleteAddress name='address' onChange={handleChange} value={form.address}/> */}


                </div>

            </div>

        </div >

    );
};