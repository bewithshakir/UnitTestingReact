import * as React from 'react';
import { mount, shallow } from 'enzyme';
import VehicleRuleManagementLandingContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate
}));
const sortByOptions = [
    'assetManagement.sortBy.payment in progress',
    'assetManagement.sortBy.recently added asset',
];
const queryClient = new QueryClient();
describe('Rendering of Vehicle Rule landing page Component', () => {
    const component = mount(
        <QueryClientProvider client={queryClient}>
            <VehicleRuleManagementLandingContent version='1' />
        </QueryClientProvider>
    );

    it('Vehicle Rule Management landing page component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
    });

    it('Search Textbox Data Enter ', () => {
        const component = shallow(
            <QueryClientProvider client={queryClient}>
                <VehicleRuleManagementLandingContent onChange={() => jest.fn()} />
            </QueryClientProvider>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });
});

describe('Given Sortby Menu on Vehicle Rule landing Page', () => {
    test('Render Sortby Menu', () => {
        const AssetSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => sortByItem)}
                onSelect={() => jest.fn()}
            />
        );
        expect(AssetSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const VehicleRuleSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => sortByItem)}
                onSelect={() => jest.fn()}
            />
        );
        VehicleRuleSortbyMenu.find('.btn-sortby').simulate('click');
        expect(VehicleRuleSortbyMenu.find('.btn-sortby').hasClass('active')).toBe(true);
        expect(VehicleRuleSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });
});
