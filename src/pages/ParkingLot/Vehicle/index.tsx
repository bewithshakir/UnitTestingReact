import { Fragment, useState, } from 'react';
import { Box, Grid } from '@mui/material';
import VehicleList from './VehicleList';
import AddVehicleAsset from './addVehicleAsset';
import { useParams } from 'react-router-dom';


export default function VehiclManagement() {
    const [vehicleList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [reloadKey, setReloadKey] = useState<string | null>(null);
    const [selectedVehicleId, setSelectedVehicle] = useState("");
    const [topButtonRowDisabled, makeTopButtonRowDisabled] = useState(false);
    const { customerId, parkinglotId } = useParams<{ customerId: string, parkinglotId: string }>();
    return (
        <Fragment>
            <Box display="flex" className='vehicle-management'>
                <Grid container direction="row">
                    <Grid item md={3} sm={12} xs={12} sx={{ pt: 3, pr: 3 }}>
                        <VehicleList
                            searchTerm={searchTerm}
                            searchTermInputChange={setSearchTerm}
                            vehicleData={vehicleList}
                            isLoadingData={false}
                            loadNextPage={false}
                            reloadKey={reloadKey}
                            handleRowAction={setSelectedVehicle}
                            makeTopButtonRowDisabled={makeTopButtonRowDisabled}

                        />
                    </Grid>
                    <Grid item md={9} sm={12} xs={12} p={3} className="masterRightLayout">
                        <AddVehicleAsset
                            disableAddEditButton={topButtonRowDisabled}
                            isHiddenAddEditRow={false}
                            lotId={parkinglotId || ""}
                            customerId={customerId || ""}
                            reloadSibling={setReloadKey}
                            selectedVehicleId={selectedVehicleId}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}
