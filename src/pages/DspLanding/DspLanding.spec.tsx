import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { QueryClient, QueryClientProvider } from 'react-query';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { sortByOptions } from './config';
import DspLandingContent from './index';

const queryClient = new QueryClient();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
   useNavigate: () => mockedUsedNavigate,
}));


describe('Rendering of DSP Landing Component', () => {
    const component = mount(<QueryClientProvider client={queryClient}><DspLandingContent version='1' /></QueryClientProvider>);
    it('DSP Landing component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
    });   
    it('renders filter button', () => {
        expect(component.find({ types: "filter" })).toBeDefined();
    });
    it('Renders sort by button', () => {
        expect(component.find('SortbyMenu')).toBeDefined();
    });
    it('Renders Search Input ', ()=>{
        expect(component.find('SearchInput')).toBeDefined();
    });
});