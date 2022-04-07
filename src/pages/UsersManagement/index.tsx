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

const UserLandingPage: FC<UsersManagementProps> = memo(() => {
    const UserObj = new UserManagementModel();
    const headCells = UserObj.fieldsToDisplay();
    const rowActions = UserObj.rowActions();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder,setSortOrder] = useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [usersList, setAllUsersList] = useState([]);
    const [resetTableCollaps, setResetTableCollaps] = useState(false);

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
    
    const onSortBySlected = (value: string) => {
        let sortOrder;
        switch (value) {
          case t('user.sortBy.users_atoz'):
            sortOrder = { sortBy: "firstNm", order: "asc" };
            break;
          case t('user.sortBy.users_ztoa'):
            sortOrder = { sortBy: "firstNm", order: "desc" };
            break;
          default:
            sortOrder = { sortBy: "", order: "" };
            break;
        }
        setResetTableCollaps(true);
        setSortOrder(sortOrder);
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
                                    id="userSort"
                                    options={UserObj.getSortByOptions().map((sortByItem) => t(sortByItem))}
                                    onSelect={(value) => onSortBySlected(value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput id="usersSearch" name="searchTerm" placeholder={t("user.searchInfo")}
                                value={searchTerm}
                                delay={500}
                                width={270}
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
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                        noDataMsg={t('user.nodataMsg')}
                    />
                </Grid>
            </Grid>
        </Box>
    );
});

export default UserLandingPage;
