import * as React from 'react';
import { mount, shallow } from 'enzyme';
import SalesTaxLandingContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
describe('Rendering of Salestax landing page Component', () => {
    const component = mount(<QueryClientProvider client={queryClient}><SalesTaxLandingContent version='1' /></QueryClientProvider>);
   
    it('Salestax landing page component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
    }); 
    
    it('Search Textbox Data Enter ', () => {
        const component = shallow(<QueryClientProvider client={queryClient}><SalesTaxLandingContent onChange={() => jest.fn()} /></QueryClientProvider>);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

});


