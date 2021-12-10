import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ProductManagement from './index';
import { when } from 'jest-when';
import { useProductsByLotId } from './queries';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryCl = new QueryClient();

jest.mock("react-query", () => {
    return {
        useInfiniteQuery: jest.fn(),
    };
});
jest.mock("./queries", () => {
    return {
        useProductsByLotId: jest.fn(),
    };
});


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useHistory: () => ({
        location: {
            pathname: "/customer/1234/parkingLots/viewLot/6789",
            state: {
                lotName: "MockLot"
            }
        }
    })
}));

describe('Rendering of Search in Parking Lot Content Component', () => {
    const component = mount(<QueryClientProvider client={queryCl}><ProductManagement /></QueryClientProvider>);
   
    it('Parking Lot Content component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
        
    });   
});

describe('FuelTax Landing Page', () => {
    beforeEach(() => {
        when(useProductsByLotId).mockReturnValue({
            data: {
                pages:[]
            },
            isLoading: false, 
            isFetching: false
        });
    });
}) ;   

// describe('Rendering of Search in Parking Lot Content Component', () => {
//     const component = mount(<QueryClientProvider client={queryClient}><ParkingLotContent version='1' /></QueryClientProvider>);
   
//     it('Parking Lot Content component Snapshot testing when', () => {
//         expect(component).toMatchSnapshot();
        
//     });   
// });

// describe('Given Sortby Menu on ParkingLot Landing Page', () => {
//     test('Render Sortby Menu', () => {
//         const ParkingLotSortbyMenu = shallow(
//             <SortbyMenu
//                 options={sortByOptions.map((sortByItem) => (sortByItem))}
//                 onSelect={() => jest.fn()}
//             />
//         );
//         expect(ParkingLotSortbyMenu).toMatchSnapshot();
//     });

//     test('Sortby Menu Menu With Options', () => {
//         const ParkingLotSortbyMenu = shallow(
//             <SortbyMenu
//                 options={sortByOptions.map((sortByItem) => (sortByItem))}
//                 onSelect={() => jest.fn()}
//             />
//         );
//         ParkingLotSortbyMenu.find(".btn-sortby").simulate('click');
//         expect(ParkingLotSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
//         expect(ParkingLotSortbyMenu.find('.sortby-popper').exists()).toBe(true);
//     });

// });





