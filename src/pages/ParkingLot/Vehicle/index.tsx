import { Fragment, useState, } from 'react';
import { Box, Container, Grid } from '@mui/material';
import VehicleList from './VehicleList';
import AddVehicleAsset from './addVehicleAsset';
import { useParams } from 'react-router-dom';
import { useProductsDetailsByLotId } from '../FeeDetails/queries';
import { Loader } from '../../../components/UIComponents/Loader';
import NoDataFound from '../../../components/UIComponents/DataGird/Nodata';
import { useTranslation } from 'react-i18next';
import './VehicleManagement.scss';

export default function VehiclManagement() {
    const { t } = useTranslation();
    const [vehicleList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [reloadKey, setReloadKey] = useState<string | null>(null);
    const [selectedVehicleId, setSelectedVehicle] = useState("");
    const [topButtonRowDisabled, makeTopButtonRowDisabled] = useState(false);
    const { customerId, parkinglotId } = useParams<{ customerId: string, parkinglotId: string }>();
    const { data: productListData, isLoading } = useProductsDetailsByLotId(parkinglotId || "", 1);
    return (
        <Fragment>
            {isLoading && <Loader />}
            {!isLoading &&
                (productListData?.data?.pagination?.totalCount === 0 ?
                    (
                        <Grid item md={12} xs={12}>
                            <Container maxWidth="lg" className='vehicle-management'>
                                <Grid container mt={1}>
                                    <NoDataFound msgLine2={t("addVehicle.noProdDataMsg")} />
                                </Grid>
                            </Container>
                        </Grid>
                    ) : (<Box display="flex" className='vehicle-management'>
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
                    </Box>)
                )
            }
        </Fragment>
    );
}
