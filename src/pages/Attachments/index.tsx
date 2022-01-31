import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { useTranslation } from "react-i18next";
import { Button } from '../../components/UIComponents/Button/Button.component';
import { FilterIcon, ImportIcon } from '../../assets/icons';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import GridComponent from '../../components/UIComponents/DataGird/grid.component';
import SearchInput from '../../components/UIComponents/SearchInput/SearchInput';
import { RightInfoPanel } from '../../components/UIComponents/RightInfoPanel/RightInfoPanel.component';
import { Box, FormControl, Grid } from '@mui/material';
import { useAttachmentList } from './queries';
import { HorizontalBarVersionState, useStore, addedCustomerIdState, useAddedCustomerIdStore } from "../../store";
import Model from "../../models/AttachmentModel";
import './style.scss';

interface props {
    version: string
}

const LandingPage: React.FC<props> = () => {
    const Obj = new Model();
    const headCells = Obj.fieldsToDisplay();
    const [searchTerm, setSearchTerm] = useState('');
    const customerId = useAddedCustomerIdStore((state: addedCustomerIdState) => state.customerId);
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const { t } = useTranslation();
    const [attachmentList, setAttachmentList] = useState([]);
    const [sortOrder, setSortOrder] = useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [filterData, setFilterData] = React.useState<{ [key: string]: string[] }>({});
    const [isFilterPanelOpen, toggleFilterPanel] = React.useState(false);

    const { data, fetchNextPage, isLoading, isFetching }: any = useAttachmentList(
        searchTerm,
        sortOrder,
        filterData,
        customerId
    );

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item.data.customerDocuments);
            });
            setAttachmentList(list);
        }
    }, [data]);

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };

    const navigate = useNavigate();
    const params = useParams();

    const redirectToUploadPage = () => {
        navigate(`/customer/${(params as any)?.customerId}/AddAttachment`);
    };
    const onSortBySlected = (value: string) => {
        let sortOrder;
        switch (value) {
            default:
                sortOrder = { sortBy: "", order: "" };
                break;
        }
        setSortOrder(sortOrder);
    };

    const openFilterPanel = () => {
        toggleFilterPanel(!isFilterPanelOpen);
    };

    const getFilterParams = (filterObj: { [key: string]: string[] }) => {
        setFilterData(filterObj);
    };


    return (
        <Box display='flex' className='attachments'>
            <Grid container pr={8} className='main-area'>
                <Grid container display='flex' flexGrow={1}>
                    <Grid item md={8} lg={9} display='flex' >
                        <Grid item pr={2.5}>
                            <Button
                                types='filter'
                                aria-label='dafault'
                                onClick={openFilterPanel}
                                startIcon={<FilterIcon />}
                            >
                                {t("buttons.filter")}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    options={[]}
                                    onSelect={(value) => onSortBySlected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name='searchTerm'
                                value={searchTerm}
                                delay={600}
                                onChange={onInputChange}
                                placeholder={t('Attachments.search')}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={4} lg={3} display='flex' justifyContent='flex-end'>
                        <Grid item pr={2.5}>
                            <Button
                                types='primary'
                                aria-label='primary'
                                onClick={redirectToUploadPage}
                                startIcon={<ImportIcon />}
                            >
                                {t('buttons.import')}
                            </Button>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <ActionsMenu
                                    options={[]}
                                    onSelect={() => null}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container pt={2.5} display='flex' flexGrow={1}>

                    <GridComponent
                        primaryKey='customerDocumentId'
                        rows={Obj.dataModel(attachmentList)}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowSelection
                        enableRowAction
                        getPages={fetchNextPage}
                        onRowActionSelect={() => null}
                        searchTerm={searchTerm}
                        rowActionOptions={[]}
                        noDataMsg={t('Attachments.noDataMsg')}
                    />

                    <RightInfoPanel
                        panelType="dynamic-filter"
                        open={isFilterPanelOpen} headingText={t('Attachments.filterHeader')}
                        provideFilterParams={getFilterParams}
                        onClose={() => toggleFilterPanel(false)}
                        fields={[]}
                        storeKey={'opisCityFilter'}
                    />

                </Grid>
            </Grid>
        </Box>
    );

};

export default LandingPage;