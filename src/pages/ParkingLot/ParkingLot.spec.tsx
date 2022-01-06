import * as React from 'react';
import { shallow, mount } from 'enzyme';
import GridComponent from "../../components/UIComponents/DataGird/grid.component";
import ParkingLotContent from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { sortByOptions } from './config';

const queryClient = new QueryClient();

jest.mock("react-router-dom", () => ({
   
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
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

describe('Rendering of Parking Lot Content Component', () => {
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

describe('Edit in grid Component Parking Lot view', () => {
    const mockData = {
        data:{
        lots: {
            cityNm: "Culpeper",
            customerId: "83f01d4e-6b26-432f-97e5-92413c1d73df",
            deliveryLocationId: "002a061f-8643-4e97-96b1-9e65f2bff0f6",
            deliveryLocationNm: "L1",
            fuelStatus: ["Regular", "Premium", "Diesel"],
            postalCd: "22701",
            primaryContactName: "abc s1",
            rackUpdate: "27-02-2021 7:09 PM",
            stateNm: "VA",
            streetAddress: "ABC Auto Sales Inc,  Rixeyville Rd,,   Rixeyville Rd, rixvillie",
            vehicles: 20,
            walletStatus: "Y"
        },
        pagination: { totalCount: 1, limit: 15, offset: 0 },
        error: null
    }
    };
    jest.mock("./queries", () => {
        return {
            useGetParkingLotDetails: jest.fn().mockReturnValue({ mockData })
        };
    });
    const component = mount(<QueryClientProvider client={queryClient}><ParkingLotContent version='1' /></QueryClientProvider>);
    it('Parking Lot Content component Snapshot testing when', () => {
        expect(component.find(GridComponent)).toBeDefined();
        expect(component.find(GridComponent)).toHaveLength(1);
        expect(component.find('.div.btn-grid-action')).toBeDefined();
        expect(component.find('.datagrid-actions-menu')).toBeDefined();
  
    });
});

afterAll(() => {
    jest.useRealTimers();
});
