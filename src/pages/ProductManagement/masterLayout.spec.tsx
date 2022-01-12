import * as React from 'react';
import { shallow, mount } from 'enzyme';
import ProductManagement from './index';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryCl = new QueryClient();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useLocation: () => ({
        pathname: "/customer/1234/parkingLots/viewLot/6789",
    })
}));

describe('Rendering of Search in Parking Lot Content Component', () => {
    const component = shallow(<QueryClientProvider client={queryCl}><ProductManagement /></QueryClientProvider>);
    it('Parking Lot Content component Snapshot testing when', () => {
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

    it('Rendering of left side product list table', () => {
        const component = mount(<QueryClientProvider client={queryCl}> <ProductManagement /> </QueryClientProvider >);
        expect(component.find('.product-list').exists()).toBe(true);
    });

    it('Rendering of right side product form', () => {
        const component = mount(<QueryClientProvider client={queryCl}> <ProductManagement /> </QueryClientProvider >);
        expect(component.find('.productForm').exists()).toBe(true);
    });

});



