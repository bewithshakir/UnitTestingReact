import { waitFor, render, cleanup, act, fireEvent, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";
import routeDataDom from 'react-router-dom';



import { renderWithClient } from '../../../tests/utils';
import { serverMsw } from "../../../setupTests";
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AddDSP from "./index";


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: ()=> ({
            to: '/customer/123/dsps/addDsp'
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
    const dspNameElem = component.container.querySelector('#dspName');
    const contactNmElem = component.container.querySelector('#contactNm') as HTMLInputElement;
    const emailElem = component.container.querySelector('#email') as HTMLInputElement;
    const phoneElem = component.container.querySelector('#phone') as HTMLInputElement;
    const addressLine1Elem = component.container.querySelector('#addressLine1') as HTMLInputElement;
    const addressLine2Elem = component.container.querySelector('#addressLine2');
    const cityElem = component.container.querySelector('#city') as HTMLInputElement;
    const stateElem = component.container.querySelector('#state') as HTMLInputElement;
    const postalCodeElem = component.container.querySelector('#postalCode') as HTMLInputElement;
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const saveBtn = component.container.querySelector('#saveBtn');
    const formElem = component.container.querySelector('#form');
    return { dspNameElem, contactNmElem, emailElem, phoneElem, addressLine1Elem, addressLine2Elem, cityElem, stateElem, postalCodeElem, cancelBtn, saveBtn, formElem  };
}


afterEach(cleanup);
describe('renders AddDSP component for add/edit mode', () => {
    let result: RenderResult;
    let formElem: HTMLFormElement;
    let dspNameElem: HTMLInputElement;
    let contactNmElem: HTMLInputElement;
    let emailElem: HTMLInputElement;
    let phoneElem: HTMLInputElement;
    let addressLine1Elem: HTMLInputElement;
    let addressLine2Elem: HTMLInputElement;
    let cityElem: HTMLInputElement;
    let stateElem: HTMLInputElement;
    let postalCodeElem: HTMLInputElement;
    let saveBtn: HTMLButtonElement;
    let cancelBtn: HTMLButtonElement;

    beforeEach(()=> {
        result = renderWithClient(<AddDSP version="Breadcrumbs-Many" />);
        formElem = getAllElements(result).formElem;
        dspNameElem = getAllElements(result).dspNameElem;
        contactNmElem = getAllElements(result).contactNmElem;
        emailElem = getAllElements(result).emailElem;
        phoneElem = getAllElements(result).phoneElem;
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
            fireEvent.change(dspNameElem, {target: {value: 'John'}});
            fireEvent.change(contactNmElem, {target: {value: 'John'}});
            fireEvent.change(emailElem, {target: {value: 'John@gmail.com'}});
            fireEvent.change(phoneElem, {target: {value: '1234567890'}});

            fireEvent.change(addressLine1Elem, {target: {value: 'E'}});
            await selectEvent.select(addressLine1Elem, ["Elkton Test"]);
        });

        it('enable save button when all mendatory fields are filled', async()=> { 
            await waitFor(()=> {
                expect(addressLine2Elem).toHaveValue('Elkton Test');
                expect(cityElem).toHaveValue('Elkton');
                expect(stateElem).toHaveValue('VA');
                expect(postalCodeElem).toHaveValue('22827');

                userEvent.tab();
                expect(saveBtn).toBeEnabled();
            });
        }, 8000);

        it('show loader on save button clicked and remove after success', async()=> {
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
        }, 6000);

        it('show toaster with error message on save button clicked', async()=> { 
            serverMsw.use(
                rest.post('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                details: ['fail add dsp']
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
                expect(result.getByText(/fail add dsp/i)).toBeInTheDocument();
                expect(saveBtn).toBeDisabled();
            });
        });
    });

    describe('show dialogue of discard', () => {
        it('render discard popup when form is changed', async()=> {
            fireEvent.change(dspNameElem, {target: {value: 'John'}});
            userEvent.click(cancelBtn);
            let open = false;
            await waitFor(() => {
                open = true;
            });

            const propsPopup = {
                title: 'Test Dialog',
                content: '',
                open: open,
                handleToggle: jest.fn(),
                handleConfirm: jest.fn()
            };
            const dialogue = render(<DiscardChangesDialog {...propsPopup} />);
            expect(await dialogue.findByText(/Test Dialog/i)).toBeInTheDocument();
            
        });
    });

});