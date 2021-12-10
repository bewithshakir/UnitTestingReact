import * as React from 'react';
import { shallow } from 'enzyme';
import ProductManagement from './index';
import { when } from 'jest-when';
import { useProductsByLotId } from './queries';
// import { QueryClient, QueryClientProvider } from 'react-query';


// const queryCl = new QueryClient();

jest.mock("react-query", () => {
    return {
        useInfiniteQuery: jest.fn(),
    };
});
jest.mock("./queries", () => {
    return {
        useProductsByLotId: jest.fn(),
    }
});


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useLocation: () => ({
        pathname: "/customer/1234/parkingLots/viewLot/6789",
    })
}));

describe('Rendering of Search in Parking Lot Content Component', () => {
    const component = shallow(<ProductManagement />);

    it('Parking Lot Content component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();

    });
});

const data: any = {
    data: {
        pages: [{
            data: {
                pagination: {
                    totalCount: 4,
                    limit: 15,
                    offset: 0
                },
                lotProducts: [
                    {
                        applicableProductId: "a4e56740-a3a7-4680-aee7-98b48a7341dd",
                        deliveryLocationId: "f5d6f58b-4470-43a9-91d6-54e185ec22cb",
                        productId: "21fb999c-afa7-4621-b4ee-b9961042bd07",
                        productNm: "diesel custom",
                        productColor: {
                            productColorCd: "4deaad7f-8707-4b5c-bfa2-61290a6bb5e7",
                            productColorNm: "Red",
                            productColorCode: "#DD1D21",
                            activeInactiveInd: "Y"
                        },
                        pricingModel: {
                            pricingModelCd: "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
                            pricingModelNm: "Custom",
                            countryCd: "us",
                            activeInactiveIndicator: "Y"
                        },
                        activeInactiveInd: "Y"
                    }
                ]
            },
        }],
        pageParams: []
    }
}

describe('master layout landing page', () => {
    beforeEach(() => {
        when(useProductsByLotId).mockReturnValue(data);
    });
});


// {
//     pages: [{
//         data: {
//             pagination: {
//                 totalCount: 4,
//                 limit: 15,
//                 offset: 0
//             },
//             lotProducts: [
//                 {
//                     applicableProductId: "a4e56740-a3a7-4680-aee7-98b48a7341dd",
//                     deliveryLocationId: "f5d6f58b-4470-43a9-91d6-54e185ec22cb",
//                     productId: "21fb999c-afa7-4621-b4ee-b9961042bd07",
//                     productNm: "diesel custom",
//                     productColor: {
//                         productColorCd: "4deaad7f-8707-4b5c-bfa2-61290a6bb5e7",
//                         productColorNm: "Red",
//                         productColorCode: "#DD1D21",
//                         activeInactiveInd: "Y"
//                     },
//                     pricingModel: {
//                         pricingModelCd: "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
//                         pricingModelNm: "Custom",
//                         countryCd: "us",
//                         activeInactiveIndicator: "Y"
//                     },
//                     activeInactiveInd: "Y"
//                 }
//             ]
//         },
//         // isLoading: false,
//         // isFetching: false,
//     }],
//     pageParams: [undefined],
// }








// data: {
//     pagination: {
//       totalCount: 4,
//       limit: 15,
//       offset: 0
//     },
//     lotProducts: [
//       {
//         applicableProductId: "a4e56740-a3a7-4680-aee7-98b48a7341dd",
//         deliveryLocationId: "f5d6f58b-4470-43a9-91d6-54e185ec22cb",
//         productId: "21fb999c-afa7-4621-b4ee-b9961042bd07",
//         productNm: "diesel custom",
//         productColor: {
//           productColorCd: "4deaad7f-8707-4b5c-bfa2-61290a6bb5e7",
//           productColorNm: "Red",
//           productColorCode: "#DD1D21",
//           activeInactiveInd: "Y"
//         },
//         pricingModel: {
//           pricingModelCd: "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
//           pricingModelNm: "Custom",
//           countryCd: "us",
//           activeInactiveIndicator: "Y"
//         },
//         activeInactiveInd: "Y"
//       }
//     ]
//   },
//   error: null
// }


// {
//     pages: [], 
//     pageParams: []
// }    

// {
//     data: {
//       pagination: {
//         totalCount: 4,
//         limit: 15,
//         offset: 0
//       },
//       lotProducts: [
//         {
//           applicableProductId: "a4e56740-a3a7-4680-aee7-98b48a7341dd",
//           deliveryLocationId: "f5d6f58b-4470-43a9-91d6-54e185ec22cb",
//           productId: "21fb999c-afa7-4621-b4ee-b9961042bd07",
//           productNm: "diesel custom",
//           productColor: {
//             productColorCd: "4deaad7f-8707-4b5c-bfa2-61290a6bb5e7",
//             productColorNm: "Red",
//             productColorCode: "#DD1D21",
//             activeInactiveInd: "Y"
//           },
//           pricingModel: {
//             pricingModelCd: "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
//             pricingModelNm: "Custom",
//             countryCd: "us",
//             activeInactiveIndicator: "Y"
//           },
//           activeInactiveInd: "Y"
//         }
//       ]
//     },
//     "error": null
//   }

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





