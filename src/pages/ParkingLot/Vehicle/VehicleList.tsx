import { Fragment } from 'react';
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Search from '../../../components/UIComponents/SearchInput/SearchInput';
import { DeleteIcon } from '../../../assets/icons';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import GridComponent from "../../../components/UIComponents/DataGird/grid.component";
import AddVehicleModel from '../../../models/AddVehicleModel';

interface Props {
    searchTerm: string;
    searchTermInputChange: (value: string) => void;
    handleRowAction: (x: any) => void;
    vehicleData: any[];
    isLoadingData: boolean;
    loadNextPage: boolean;
    reloadKey?: any
    makeTopButtonRowDisabled: (value: boolean) => void;
}


const vehicleObj = new AddVehicleModel();
const headCells = vehicleObj.fieldsToDisplay();
export default function VehicleList(props: Props) {
    const { t } = useTranslation();
    const openDrawer = (row: any) => {
        props.handleRowAction(row);
    };

    const onRowActionSelect = (primaryIds: string[]) => {
        props.makeTopButtonRowDisabled(primaryIds.length !== 0);
    };

    return (
        <Fragment>
            <Grid container className="vehicle-list">
                <Grid item xs={8} md={10} pb={3}>
                    <Search
                        name="searchTerm"
                        value={props.searchTerm}
                        delay={600}
                        onChange={props.searchTermInputChange}
                        placeholder={t('productManagement.search')}
                    />
                </Grid>
                <Grid item xs={4} md={2} pb={3} pl={2}>
                    <Button
                        types="delete2"
                        aria-label="delete"
                        startIcon={<DeleteIcon />}
                    >
                    </Button>
                </Grid>
                <Grid item xs={12} md={12} pb={5}>
                    <GridComponent
                        handleSelect={onRowActionSelect}
                        primaryKey='applicableProductId'
                        rows={vehicleObj.dataModel(props.vehicleData)}
                        header={headCells}
                        isLoading={props.isLoadingData}
                        openDrawer={openDrawer}
                        enableRowSelection
                        getPages={props.loadNextPage}
                        searchTerm={props.searchTerm}
                        noDataMsg={t('addVehicle.noDataMsg')}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
}
