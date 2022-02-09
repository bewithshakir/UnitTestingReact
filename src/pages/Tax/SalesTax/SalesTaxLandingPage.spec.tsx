import * as React from 'react';
import { mount, shallow } from 'enzyme';
import SalesTaxLandingContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import SortbyMenu from '../../../components/UIComponents/Menu/SortbyMenu.component';
import { sortByOptions } from "./config";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

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

describe('Given Sortby Menu on SalesTax Landing Page', () => {
    test('Render Sortby Menu', () => {
        const SalesTaxSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(SalesTaxSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const SalesTaxSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        SalesTaxSortbyMenu.find(".btn-sortby").simulate('click');
        expect(SalesTaxSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(SalesTaxSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });

});



