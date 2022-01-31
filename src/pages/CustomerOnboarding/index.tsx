import { Box, CssBaseline, Grid } from '@mui/material';
import { Suspense } from 'react';
import { Fragment, memo, } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Loader } from '../../components/UIComponents/Loader';

import { HorizontalBarVersionState, useStore } from '../../store';
import Legend from './Legend';

export interface CustomerOnboardingProps {
  version: string
}
const customerOnboarding: React.FC<CustomerOnboardingProps> = memo(() => {
  const setVersion = useStore(
    (state: HorizontalBarVersionState) => state.setVersion
  );
  setVersion('Breadcrumbs-Single');
  const { pathname } = useLocation();
  const dis = pathname.includes('addLot') || pathname.includes('viewLot') || pathname.includes('AddAttachment') || pathname.includes('addDsp') || pathname.includes('dsps/edit');
  return (
    <Box display='flex' mt={8} ml={8}>
      <CssBaseline />
      <Grid container pl={8} className='main-area'>
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
          <Grid item pt={5} pl={dis ? 0 : 4} md={dis ? 12 : 10} xs={dis ? 12 : 10} className='page-area'>
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
