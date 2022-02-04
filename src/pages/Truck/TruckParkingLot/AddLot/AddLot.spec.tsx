import { waitFor, render, cleanup, act, fireEvent, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";
import { renderWithClient } from '../../../../tests/utils';
import { serverMsw } from "../../../../setupTests";
import AddLot from './index';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: ()=> ({
            to: '/truckParkingLot/add'
        })
    }),
    useParams: () => ({
        customerId: '111add',
        dspId: '',
        params: {
            addedCustomerId: '123'
        }
    })
}));




function getAllElements (component: any) {
    const parkingLocationNmElem = component.container.querySelector('#parkingLocationNm');
    const addressLine1Elem = component.container.querySelector('#addressLine1') as HTMLInputElement;
    const addressLine2Elem = component.container.querySelector('#addressLine2');
    const cityElem = component.container.querySelector('#cityNm') as HTMLInputElement;
    const stateElem = component.container.querySelector('#stateNm') as HTMLInputElement;
    const postalCodeElem = component.container.querySelector('#postalCode') as HTMLInputElement;
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const saveBtn = component.container.querySelector('#saveBtn');
    const formElem = component.container.querySelector('#form');
    return { parkingLocationNmElem, addressLine1Elem, addressLine2Elem, cityElem, stateElem, postalCodeElem, cancelBtn, saveBtn, formElem  };
}


afterEach(cleanup);
describe('renders AddDSP component for add/edit mode', () => {
    let result: RenderResult;
    let formElem: HTMLFormElement;
    let parkingLocationNmElem: HTMLInputElement;
    let addressLine1Elem: HTMLInputElement;
    let addressLine2Elem: HTMLInputElement;
    let cityElem: HTMLInputElement;
    let stateElem: HTMLInputElement;
    let postalCodeElem: HTMLInputElement;
    let saveBtn: HTMLButtonElement;
    let cancelBtn: HTMLButtonElement;

    beforeEach(()=> {
        result = renderWithClient(<AddLot version="Breadcrumbs-Many" />);
        formElem = getAllElements(result).formElem;
        parkingLocationNmElem = getAllElements(result).parkingLocationNmElem;
        addressLine1Elem = getAllElements(result).addressLine1Elem;
        addressLine2Elem = getAllElements(result).addressLine2Elem;
        cityElem = getAllElements(result).cityElem;
        stateElem = getAllElements(result).stateElem;
        postalCodeElem = getAllElements(result).postalCodeElem;
        saveBtn = getAllElements(result).saveBtn;
        cancelBtn = getAllElements(result).cancelBtn;
    });

    it('renders all mendatory fields with blank value on add mode', ()=> {
        expect(formElem).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
    });

    describe('AddDSP screen on add mode', () => {
        
        beforeEach(async()=> {
            fireEvent.change(parkingLocationNmElem, {target: {value: 'John'}});

            fireEvent.change(addressLine1Elem, {target: {value: 'E'}});
            await selectEvent.select(addressLine1Elem, ["Elkton Test"]);
        });

        it('Test save button is enabled when all mandatory fields are filled', async()=> { 
            await waitFor(()=> {
                expect(addressLine2Elem).toHaveValue('Elkton Test');
                expect(cityElem).toHaveValue('Elkton');
                expect(stateElem).toHaveValue('VA');
                result.debug(postalCodeElem);
                expect(postalCodeElem).toHaveValue('22827');

                userEvent.tab();
                expect(saveBtn).toBeEnabled();
            });
        });
        it('Test show loader on save button clicked and remove after success', async()=> {
            await waitFor(()=> {
                expect(addressLine2Elem).toHaveValue('Elkton Test');
                expect(cityElem).toHaveValue('Elkton');
                expect(stateElem).toHaveValue('VA');
                expect(postalCodeElem).toHaveValue('22827');

                userEvent.tab();
                expect(saveBtn).toBeEnabled();
                userEvent.click(saveBtn);
            });
            await waitFor(()=> {
                expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
            });
        });
        it('Test show toaster with error message on save button clicked', async()=> {
            serverMsw.use(
                rest.post('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                details: ['fail to add truck parking lot']
                            }
                        })
                    );
                })
            );
            await waitFor(()=> {
                expect(addressLine2Elem).toHaveValue('Elkton Test');
                expect(cityElem).toHaveValue('Elkton');
                expect(stateElem).toHaveValue('VA');
                expect(postalCodeElem).toHaveValue('22827');

                userEvent.tab();
                expect(saveBtn).toBeEnabled();
                userEvent.click(saveBtn);
            });
            await waitFor(()=> {
                expect(result.getByText(/fail to add truck parking lot/i)).toBeInTheDocument();
                expect(saveBtn).toBeDisabled();
            });
        });

    });

});
