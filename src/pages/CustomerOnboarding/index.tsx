import { Box, CssBaseline, Grid } from '@mui/material';
import React, { memo, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Loader } from '../../components/UIComponents/Loader';
import Page from '../../navigation/Page';
import { routes } from '../../routes';
import { HorizontalBarVersionState, useStore } from '../../store';
import Legend from './Legend';

const customerOnboarding = memo(() => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Single");
    return (
        <Box display="flex" mt={8} ml={8}>
            <CssBaseline />
            <Grid container pl={6.25} className="main-area">
                <Grid item md={2} pt={5} xs={2} className="legend-area">
                    <Legend />
                </Grid>
                <Grid item md={10} pt={5} xs={10} className="page-area">
                    {routes.map((route,index) => {
                        const subRoutes = route?.routes;
                        return subRoutes?.map(subRoute => {
                            return (
                                <main key={index}>
                                    <Suspense fallback={<Loader />}>
                                        <Switch>
                                            <Route key={subRoute.path} path={subRoute.path} exact={subRoute.exact} >
                                                 <Page route={subRoute} />
                                            </Route>

                                        </Switch>
                                    </Suspense>
                                </main>
                            );
                        });

                    })}
                </Grid>
            </Grid>

        </Box>
    );
});

export default customerOnboarding;