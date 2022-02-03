import { waitFor, render, cleanup, act, fireEvent, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import { mount } from 'enzyme';
import * as ReactQuery from 'react-query';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";

import AddLot from './index';
import { renderWithClient } from '../../../tests/utils';
import { serverMsw } from "../../../setupTests";

const queryClient = new ReactQuery.QueryClient();

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));

function getAllElements (component: any) {
    const addressLine1Elem = component.container.querySelector('#addressLine1') as HTMLInputElement;
    const addressLine2Elem = component.container.querySelector('#addressLine2');
    const cityElem = component.container.querySelector('#cityNm') as HTMLInputElement;
    const stateElem = component.container.querySelector('#stateNm') as HTMLInputElement;
    const postalCodeElem = component.container.querySelector('#postalCode') as HTMLInputElement;
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const saveBtn = component.container.querySelector('#saveBtn');
    const formElem = component.container.querySelector('#form');
    return { addressLine1Elem, addressLine2Elem, cityElem, stateElem, postalCodeElem, cancelBtn, saveBtn, formElem  };
}


describe('Rendering of Add Truck Parking lot', () => {
    it('Add truck parking lot snapshot testing overall', () => {
        const component = mount(<ReactQuery.QueryClientProvider client={queryClient}> <AddLot version=""/> </ReactQuery.QueryClientProvider >);
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
    });

});

describe('renders Add Truck Parkinglot component for add mode', () => {
    let result: RenderResult;
    let formElem: HTMLFormElement;
    let addressLine1Elem: HTMLInputElement;
    let addressLine2Elem: HTMLInputElement;
    let cityElem: HTMLInputElement;
    let stateElem: HTMLInputElement;
    let postalCodeElem: HTMLInputElement;
    let saveBtn: HTMLButtonElement;
    let cancelBtn: HTMLButtonElement;

    // beforeEach(()=> {
    //     result = renderWithClient(<AddLot version="Breadcrumbs-Many" />);
    //     formElem = getAllElements(result).formElem;
    //     addressLine1Elem = getAllElements(result).addressLine1Elem;
    //     addressLine2Elem = getAllElements(result).addressLine2Elem;
    //     cityElem = getAllElements(result).cityElem;
    //     stateElem = getAllElements(result).stateElem;
    //     postalCodeElem = getAllElements(result).postalCodeElem;
    //     saveBtn = getAllElements(result).saveBtn;
    //     cancelBtn = getAllElements(result).cancelBtn;
    // });

    afterEach(cleanup);

    it('renders all mendatory fields with blank value on add mode', ()=> {
        const result = renderWithClient(<AddLot version="Breadcrumbs-Many" />);
        const {formElem, saveBtn} = getAllElements(result);
        expect(formElem).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
    });
    
    describe('Add Truck parking lot screen on add mode', () => {
        
        // beforeEach(async()=> {
        //     fireEvent.change(addressLine1Elem, {target: {value: 'E'}});
        //     await selectEvent.select(addressLine1Elem, ["Elkton Test"]);
        // });

        it('enable save button when all mendatory fields are filled', async()=> {
            const result = renderWithClient(<AddLot version="Breadcrumbs-Many" />);
            const {addressLine1Elem, addressLine2Elem, saveBtn} = getAllElements(result);
            fireEvent.change(addressLine1Elem, {target: {value: 'E'}});
            await act(async()=>{
                 await selectEvent.select(addressLine1Elem, ["Elkton Test"]);
            })
            // result.debug(await result.findByTestId('testaddress'));
            await waitFor(()=> {
                expect(addressLine2Elem).toHaveValue('Elkton Test');
                expect(cityElem).toHaveValue('Elkton');
                expect(stateElem).toHaveValue('VA');
                expect(postalCodeElem).toHaveValue('22827');

                userEvent.tab();
                expect(saveBtn).toBeEnabled();
            });
        });

        // it('show loader on save button clicked and remove after success', async()=> {
        //     await waitFor(()=> {
        //         expect(addressLine2Elem).toHaveValue('Elkton Test');
        //         expect(cityElem).toHaveValue('Elkton');
        //         expect(stateElem).toHaveValue('VA');
        //         expect(postalCodeElem).toHaveValue('22827');

        //         userEvent.tab();
        //         expect(saveBtn).toBeEnabled();
        //         userEvent.click(saveBtn);
        //     });
        //     await waitFor(()=> {
        //         expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
        //     });
        // }, 6000);

        // it('show toaster with error message on save button clicked', async()=> { 
        //     serverMsw.use(
        //         rest.post('*', (req, res, ctx) => {
        //             return res(
        //                 ctx.status(500),
        //                 ctx.json({
        //                     data: null,
        //                     error: {
        //                         details: ['fail add dsp']
        //                     }
        //                 })
        //             );
        //         })
        //     );
        //     await waitFor(()=> {
        //         expect(addressLine2Elem).toHaveValue('Elkton Test');
        //         expect(cityElem).toHaveValue('Elkton');
        //         expect(stateElem).toHaveValue('VA');
        //         expect(postalCodeElem).toHaveValue('22827');

        //         userEvent.tab();
        //         expect(saveBtn).toBeEnabled();
        //         userEvent.click(saveBtn);
        //     });
        //     await waitFor(()=> {
        //         expect(result.getByText(/fail add dsp/i)).toBeInTheDocument();
        //         expect(saveBtn).toBeDisabled();
        //     });
        // });
    });
        
});
