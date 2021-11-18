import * as React from 'react';
import { mount } from 'enzyme';
import ParkingLotContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
describe('Rendering of Search in Parking Lot Content Component', () => {
    const component = mount(<QueryClientProvider client={queryClient}><ParkingLotContent version='1' /></QueryClientProvider>);
   
    it('Parking Lot Content component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
    });   
});





