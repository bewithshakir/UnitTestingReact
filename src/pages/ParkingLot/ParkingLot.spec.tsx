import * as React from 'react';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import ParkingLotContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { sortByOptions } from './config';

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
   
    ...jest.requireActual("react-router-dom") as any,
    useHistory: () => ({
        location: {
            pathname: "/customer/123/parkingLots",
            state: {
                customerName: "MockCustomer"
            }
        }
    })
}));

beforeAll(() => {

    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

describe('Rendering of Search in Parking Lot Content Component', () => {
    const component = mount(<QueryClientProvider client={queryClient}><ParkingLotContent version='1' /></QueryClientProvider>);
    it('Parking Lot Content component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
        
    });   
});

describe('Given Sortby Menu on ParkingLot Landing Page', () => {
    test('Render Sortby Menu', () => {
        const ParkingLotSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(ParkingLotSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const ParkingLotSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        ParkingLotSortbyMenu.find(".btn-sortby").simulate('click');
        expect(ParkingLotSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(ParkingLotSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });

});





