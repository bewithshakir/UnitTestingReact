import React, { useState, useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { Divider, Icon, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { PositiveCricleIcon, ExpireWalletIcon } from '../../assets/icons';
import Select from '../../components/UIComponents/Select/SingleSelect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetEditTruckDetails } from './AddTruck/queries';

interface props {
    info: any,
    drawerOpen: boolean,
}


const TruckDetail = (props: props) => {
    const { info, drawerOpen } = props;
    const [expanded, setExpanded] = useState<string | false>('');
    const { data: truckDetails, isLoading, isError } = useGetEditTruckDetails(info.deliveryVehicleId);

    useEffect(() => {
        if (!drawerOpen || info) {
            setExpanded('');
        }
    }, [info]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    const renderTruckInfo = (fetchedData: any) => {
        let renderResult;
        if (fetchedData.data) {
            const { data } = fetchedData.data;
            const infoObj = {
                'Truck Name': data.deliveryVehicleNm,
                'License': data.licenceNo,
                'VIN': data.vinNo,
                'Truck Parking lots': <Select
                    id='status'
                    name='status'
                    placeholder={`Total ${data.parkingLocations.length} Lots`}
                    items={data.parkingLocations.map((pObj: any) => ({ label: pObj.parkingLocationNm, value: pObj.parkingLocationId }))}
                    onChange={() => {
                        // No onchange method required
                    }}
                />,
                'Year': data.registrationYr,
                'OPEX Fuel Type': data.productNm,
                'Status': data.activeInactiveInd === "Y" ?
                    (
                        <Box display="flex" alignItems="center">
                            <Icon component={PositiveCricleIcon} />
                            <Typography variant="h4" pl={1} color={"green"} className="fw-bold">
                                Enabled
                            </Typography>
                        </Box>
                    ) :
                    (
                        <Box display="flex" alignItems="center">
                            <Icon component={ExpireWalletIcon} />
                            <Typography variant="h4" pl={1} color={"red"} className="fw-bold">
                                Disabled
                            </Typography>
                        </Box>
                    )
            };
            renderResult = Object.entries(infoObj).map(([key, value]) =>
                <React.Fragment key={key}>
                    <Grid container xs={12} spacing={2} key={key}>
                        <Grid item xs={6} className="right_info_panel_content_label">
                            {key}
                        </Grid>
                        <Grid item xs={6} className="right_info_panel_content_value">
                            <>{value ? value : "-"}</>
                        </Grid>
                    </Grid>
                    <Divider className="right_info_panel_content_item_divider" />
                </React.Fragment>);
        } else {
            renderResult = <React.Fragment></React.Fragment>;
        }
        return renderResult;
    };

    const renderTankSection = (fetchedData: any) => {
        let renderResult = '';
        if (fetchedData.data) {
            const { data } = fetchedData.data;
            if (data?.deliveryVehicleTanks) {
                renderResult = data?.deliveryVehicleTanks.map((tObj: any, index: number) => {
                    const tankIndex = index + 1;
                    const tSectionName = `T-Section-${tankIndex}`;
                    const tankObj = {
                        'Tank TCS Register ID': tObj.tcsRegisterId,
                        'Tank Fuel Type': tObj.productNm,
                        'Tank Min Capacity': tObj.minCapacityVol,
                        'Tank Max Capacity': tObj.maxCapacityVol,
                    };
                    return (
                        <Accordion
                            key={tSectionName}
                            sx={{
                                border: "0",
                                boxShadow: "none"
                            }}
                            TransitionProps={{ unmountOnExit: true }}
                            square={true}
                            expanded={expanded === tSectionName}
                            onChange={handleChange(tSectionName)}
                        >
                            <AccordionSummary
                                sx={{
                                    width: "100%",
                                    "&.MuiAccordionSummary-root": {
                                        backgroundColor: "var(--Lightgray_4)",
                                        paddingX: 2,
                                        color: "var(--Darkgray)"
                                    }
                                }}
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${tSectionName}-content"`}
                                id={`${tSectionName}-header"`}
                            >
                                <Typography variant={"h3"} sx={{ color: "var(--Darkgray)" }} fontWeight={"bold"}>Tank {tankIndex}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {
                                    Object.entries(tankObj).map(([key, value], index) =>
                                        <React.Fragment key={key}>
                                            {index !== 0 &&
                                                <Divider className="right_info_panel_content_item_divider" />
                                            }
                                            <Grid container xs={12} spacing={2} key={key}>
                                                <Grid item xs={6} className="right_info_panel_content_label">
                                                    {key}
                                                </Grid>
                                                <Grid item xs={6} className="right_info_panel_content_value">
                                                    <>{(value || value === 0) ? value : "-"}</>
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>)
                                }
                            </AccordionDetails>
                        </Accordion >
                    );
                });
            }
        }
        return renderResult ?
            (
                <Grid container spacing={0} mt={3}>
                    <Grid item xs={12}>
                        {renderResult}
                    </Grid>
                </Grid>
            ) : '';
    };

    return (
        <>
            {isLoading &&
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={6} className="right_info_panel_content_label">
                        <CircularProgress />
                    </Grid>
                </Grid>
            }

            {isError &&
                <Grid container xs={12} spacing={2}>
                    <Grid item xs={6} className="right_info_panel_content_label">
                        Failed to load data.
                    </Grid>
                </Grid>
            }

            {(info && truckDetails) &&
                renderTruckInfo(truckDetails)
            }

            {(info && truckDetails) &&
                renderTankSection(truckDetails)
            }
        </>
    );
};


export default TruckDetail;



