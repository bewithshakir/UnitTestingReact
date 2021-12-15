import { Fragment } from 'react';
import { Button } from "../../components/UIComponents/Button/Button.component";
import { Add } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HorizontalBarVersionState, useStore } from '../../store';
import { Box, Grid } from "@mui/material";

export default function Opis() {

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("NavLinks");
    const history = useHistory();
    const { t } = useTranslation();

    const navigateAddPage = () => {
        history.push("/opisCities/add");
    };

    return (
        <Fragment>
            <Box display="flex" mt={10} ml={8}>
                <Grid container pl={6.25} pr={6.25} className="main-area">
                    <Grid container display="flex" flexGrow={1}>
                        <Grid item md={8} lg={9} display="flex" >
                            <Grid item pr={2.5}>
                                <Button
                                    types="primary"
                                    aria-label="primary"
                                    onClick={navigateAddPage}
                                    startIcon={<Add />}
                                >
                                    {t("buttons.add city")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );
}