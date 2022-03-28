import { FC, memo, useEffect, useState } from 'react';
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid, FormControl } from "@mui/material";
import { Button } from "../../components/UIComponents/Button/Button.component";
import { FilterIcon } from "../../assets/icons";
import SortbyMenu from "../../components/UIComponents/Menu/SortbyMenu.component";
import { useTranslation } from "react-i18next";
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../components/UIComponents/Menu/ActionsMenu.component";
import { Add } from "@mui/icons-material";
import UserManagementModel from '../../models/UserManagementModel';
import { useAllUsersList } from './queries';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";

interface UsersManagementProps {
    version: string
}

const index: FC<UsersManagementProps> = memo(() => {
    const UserObj = new UserManagementModel();
    const headCells = UserObj.fieldsToDisplay();
    const rowActions = UserObj.rowActions();
    const [searchTerm, setSearchTerm] = useState("");
    const sortOrder = { sortBy: "", order: "" };
    const [usersList, setAllUsersList] = useState([]);

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("NavLinks");

    const { t } = useTranslation();
    const { data, fetchNextPage, isLoading, isFetching }: any = useAllUsersList(
        searchTerm,
        sortOrder,
    );

    useEffect(() => {
        if (data) {
            const list: any = [];
            data?.pages?.forEach((item: any) => {
                list.push(...item?.data?.users);
            });
            setAllUsersList(list);
        }
    }, [data]);

    const onInputChange = (value: string) => {
        setSearchTerm(value);
    };
    
    
    return (
        <Box display="flex" mt={10} ml={8}>
            <Grid container pl={8} pr={8} className="main-area">
                <Grid container display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                id="usersFilter"
                                types="filter"
                                aria-label="dafault"
                                startIcon={<FilterIcon />}
                            > {t("buttons.filter")} </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    id={"userSort"}
                                    options={[]}
                                    onSelect={(value) => value}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput id="userSearch" name="searchTerm" placeholder="Search"
                                value={searchTerm}
                                delay={500}
                                onChange={onInputChange}
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                types="primary"
                                aria-label="primary"
                                startIcon={<Add />}
                            >
                                {t("buttons.add user")}
                            </Button>
                        </Grid>
                        <Grid item>
                            <FormControl><ActionsMenu options={[]} onSelect={()=>null} /></FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container pt={2.5} display="flex" flexGrow={1}>
                    <GridComponent
                        primaryKey='userId'
                        rows={UserObj.dataModel(usersList)}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowSelection
                        enableRowAction
                        rowActionOptions={rowActions}
                        getPages={fetchNextPage}
                        searchTerm={searchTerm}
                        noDataMsg={t('user.nodataMsg')}
                    />
                </Grid>
            </Grid>
        </Box>
    );
});

export default index;