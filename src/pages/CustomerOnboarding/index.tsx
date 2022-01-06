import { Box, CssBaseline, Grid } from '@mui/material';
import { Suspense } from 'react';
import  { Fragment, memo, } from 'react';
import { Outlet,  useLocation } from 'react-router-dom';
import { Loader } from '../../components/UIComponents/Loader';

import { HorizontalBarVersionState, useStore } from '../../store';
import Legend from './Legend';

const customerOnboarding = memo(() => {
  const setVersion = useStore(
    (state: HorizontalBarVersionState) => state.setVersion
  );
  setVersion('Breadcrumbs-Single');
  const { pathname } = useLocation();
  const dis = pathname.includes('addLot') || pathname.includes('viewLot');
  return (
    <Box display='flex' mt={8} ml={8}>
      <CssBaseline />
      <Grid container pl={6.25} className='main-area'>
          <Fragment>
            <Grid
              item
              md={2}
              pt={5}
              xs={2}
              className='legend-area'
              sx={{ display: dis ? 'none' : 'block' }}
            >
              <Legend />
            </Grid>
            <Grid item pl={4} md={10} pt={5} xs={10} className='page-area'>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
            </Grid>
          </Fragment>
      </Grid>
    </Box>
  );
});

export default customerOnboarding;
