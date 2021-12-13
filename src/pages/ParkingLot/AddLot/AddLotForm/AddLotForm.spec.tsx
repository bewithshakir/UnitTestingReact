/* eslint-disable no-console */
import { mount } from "enzyme";
import AddLotForm from './AddLotForm.component';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as ReactQuery from 'react-query';
const queryClient = new ReactQuery.QueryClient();




beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});



describe('Rendering of Add Lot Component', () => {

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom") as any,
        useLocation: () => ({
            pathname: "localhost:3000/customer/123456/parkingLots/addLot"
        })
    }));

    it('Add Lot component Snapshot testing', () => {
        console.log('Normal: 34  ', new Date().getTime());
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddLotForm />
        </QueryClientProvider>
        );
        expect(component).toMatchSnapshot();
    });

    it('when land on this page, show Save buttons  in disabled state and cancel button enabled state', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddLotForm /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.btn-save').exists()).toBe(true);
        // expect(component.find('.btn-cancel').exists()).toBe(true);
        expect(component.find('.btn-save').at(0).prop('disabled')).toBeTruthy();
    });

});



describe('Rendering of Edit Lot Component', () => {

    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom") as any,
        useLocation: () => ({
            pathname: "localhost:3000/customer/123456/parkingLots/viewLot/89898"
        })
    }));

    it('Edit/View Lot component Snapshot testing', () => {
        console.log('Normal: 34  ', new Date().getTime());
        const component = mount(<QueryClientProvider client={queryClient}>
            <AddLotForm />
        </QueryClientProvider>
        );

        expect(component).toMatchSnapshot();
    });
    it('when land on this page, Edit button is by default shown', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddLotForm /> </ReactQuery.QueryClientProvider >);
        expect(component.find('.edit-button').exists()).toBe(true);
        expect(component.find('.btn-cancel').exists()).toBe(false);
        expect(component.find('.btn-save').exists()).toBe(false);
    });
    it('After clicking Edit button, show Save and Cancel buttons ', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddLotForm /> </ReactQuery.QueryClientProvider >);
        component.find('.edit-button').at(0).simulate('click');
        expect(component.find('.btn-cancel').exists()).toBe(true);
        expect(component.find('.btn-save').exists()).toBe(true);
    });
   
});



afterAll(() => {
    jest.useRealTimers();
});
