import { Fragment } from 'react';
import { Box, Grid, Container, Typography } from "@mui/material";
import { useTranslation } from 'react-i18next';
import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import { Button } from '../../components/UIComponents/Button/Button.component';
import ToastMessage from '../../components/UIComponents/ToastMessage/ToastMessage.component';
import { HorizontalBarVersionState, useStore } from '../../store';

export default function AddOpis() {

    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    const { t } = useTranslation();
    // eslint-disable-next-line no-console
    const handleChange = (x: any) => { console.log(x);};

    return (
        <Fragment>
            <Box display="flex" mt={10} ml={16}>
                <Grid item md={8} xs={8}>
                    <Container maxWidth="lg" className="page-container">
                        <Typography color="var(--Darkgray)" variant="h3" gutterBottom className="fw-bold" mb={1} pt={3}>
                            {t("taxes.opisCities.form.fill msg")}
                        </Typography>
                        <Grid container mt={1}>
                            <Grid item xs={8} md={10} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='state'
                                        name='state'
                                        label={t("taxes.opisCities.form.state")}
                                       // value={}
                                        placeholder={t("taxes.opisCities.form.select state")}
                                        items={[]}
                                        helperText={''}
                                        error={false}
                                        onChange={handleChange}
                                        //onBlur={ }
                                        required
                                        isDisabled={false}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={8} md={10} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Select
                                        id='city'
                                        name='city'
                                        label={t("taxes.opisCities.form.city")}
                                        //value={ }
                                        placeholder={t("taxes.opisCities.form.select city")}
                                        items={[]}
                                        helperText={''}
                                        error={false}
                                        onChange={handleChange}
                                        // onBlur={ }
                                        required
                                        isDisabled={false}
                                    />

                                </Grid>
                            </Grid>

                            <Grid item xs={8} md={10} pr={2.5} pb={2.5}>
                                <Grid item xs={12} md={6}>
                                    <Input
                                        id='CITYID'
                                        name='cityid'
                                        label={t("taxes.opisCities.form.city id")}
                                        type='text'
                                        placeholder={t("taxes.opisCities.form.city id")}
                                        helperText={''}
                                        error={false}
                                        required
                                        disabled={true}
                                        data-test="localRate"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container mt={1} justifyContent="flex-start">
                            <Grid item xs={6} md={8} pr={2.5} pt={2.5}>
                                <Box className="form-action-section">
                                    <Button
                                        types="cancel"
                                        aria-label={t("buttons.cancel")}
                                        className="mr-4"
                                        data-test="cancel"
                                    >
                                        {t("buttons.cancel")}
                                    </Button>
                                    <Button
                                        type="submit"
                                        types="save"
                                        aria-label={t("buttons.save")}
                                        className="ml-4"
                                        data-test="save"
                                        disabled={false}
                                    >
                                        {t("buttons.save")}
                                    </Button>

                                </Box>
                                <ToastMessage isOpen={false} messageType={''} onClose={() => { return ''; }} message={''} />
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Box>

        </Fragment>
    );
}