import React, { useEffect } from 'react';
import { Box, FormControl, Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

import { Button } from "../../../components/UIComponents/Button/Button.component";
import GridComponent from "../../../components/UIComponents/DataGird/grid.component";
import { FilterIcon } from "../../../assets/icons";
import SortbyMenu from "../../../components/UIComponents/Menu/SortbyMenu.component";
import { sortByOptions } from "./config";
import SearchInput from "../../../components/UIComponents/SearchInput/SearchInput";
import ActionsMenu from "../../../components/UIComponents/Menu/ActionsMenu.component";
import TruckParkingLotModel from '../../../models/TruckParkingLotModel';
import { useGetTruckParkingLotList } from "./queries";

interface ContentProps {
    version: string
}

const TruckParkingLot: React.FC<ContentProps> = () => {
    const truckParkingLotObj = new TruckParkingLotModel();
    const headCells = truckParkingLotObj.fieldsToDisplay();
    const massActionOptions = truckParkingLotObj.massActions();
    const rowActionOptions = truckParkingLotObj.rowActions();

    const { t } = useTranslation();
    const navigate = useNavigate();


    const [searchInput, setSearchInput] = React.useState("");
    const [sortOrder] = React.useState<{ sortBy: string, order: string }>({ sortBy: "", order: "" });
    const [filterData] = React.useState<{ [key: string]: string[] }>({});
    const [truckParkingLotList, setTruckParkingLotList] = React.useState<any[]>([]);
    const [resetTableCollaps, setResetTableCollaps] = React.useState(false);
    const [searchTerm] = React.useState("");

    const handleCustFilterPanelOpen = () => {
        // TODO
    };

    const onSortBySlected = () => {
        // TODO
    };
    const navigateToAddParkingLot = () => {
        navigate(`/truckParkingLot/add`);
    };
    const onInputChange = (value: string) => {
        setResetTableCollaps(true);
        setSearchInput(value);
    };

    const handleMassAction = () => {
        // TO DO
    };

    const { data: truckParkingLotData, fetchNextPage, isLoading, isFetching }: any = useGetTruckParkingLotList(
        searchTerm,
        sortOrder,
        filterData
    );
    useEffect(() => {
        if (truckParkingLotData) {
            const list: any = [];
            truckParkingLotData?.pages?.forEach((item: any) => {
                list.push(...item.data.parkingLocations);
            });
            setTruckParkingLotList(list);
        }
    }, [truckParkingLotData]);

    return (
        <Box display="flex" mt={8} ml={8}>
            <Grid container pl={6.25} pr={6.25} className="main-area">
                <Grid container pt={2.5} display="flex" flexGrow={1}>
                    <Grid item md={8} lg={9} display="flex" >
                        <Grid item pr={2.5}>
                            <Button
                                data-testid="filter"
                                types="filter"
                                aria-label="dafault"
                                onClick={handleCustFilterPanelOpen}
                                startIcon={<FilterIcon />}
                            >
                                {t("buttons.filterText")}
                            </Button>
                        </Grid>
                        <Grid item pr={2.5}>
                            <FormControl>
                                <SortbyMenu
                                    id="sortByMenu"
                                    options={sortByOptions.map((sortByItem) => t(sortByItem))}
                                    onSelect={() => onSortBySlected()}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <SearchInput
                                name="searchInput"
                                placeholder="Search"
                                value={searchInput}
                                delay={600}
                                onChange={onInputChange}
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid item md={4} lg={3} display="flex" justifyContent="flex-end">
                        <Grid item pr={2.5}>
                            <Button
                                data-testid="addBtn"
                                types="primary"
                                aria-label="primary"
                                onClick={navigateToAddParkingLot}
                                startIcon={<Add />}
                            >
                                Add Truck Parking Lot
                            </Button>
                        </Grid>
                        <Grid item>
                            <FormControl>
                                <ActionsMenu
                                    options={massActionOptions}
                                    onSelect={handleMassAction}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container pt={2.5} display="flex" flexGrow={1} data-testid="data-grid">
                    <GridComponent
                        primaryKey='customerId'
                        rows={truckParkingLotList}
                        header={headCells}
                        isLoading={isFetching || isLoading}
                        enableRowAction
                        getPages={fetchNextPage}
                        rowActionOptions={rowActionOptions}
                        searchTerm={searchInput}
                        resetCollaps={resetTableCollaps}
                        onResetTableCollaps={setResetTableCollaps}
                        noDataMsg='Add Truck parking lot by clicking on the "Add Truck Parking Lot" button.'
                    />

                </Grid>
            </Grid>
        </Box>
    );
};

export default TruckParkingLot;