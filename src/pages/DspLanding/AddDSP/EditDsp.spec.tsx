import { waitFor, render, cleanup, act, fireEvent, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";
import routeDataDom from 'react-router-dom';



import { renderWithClient } from '../../../tests/utils';
import { serverMsw } from "../../../setupTests";
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AddDSP from "./index";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: ()=> ({
            to: '/customer/111edit/dsps/edit/222'
        })
    }),
    useParams: () => ({
        customerId: '111edit',
        dspId: '222',
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
    beforeEach(()=> {
        result = renderWithClient(<AddDSP version="Breadcrumbs-Many" />);
    });

    it('renders form with data on EDIT mode', async()=> {
        const {formElem, saveBtn} = getAllElements(result);
        await waitFor(()=> {
            expect(formElem).toHaveFormValues({
                dspName: 'dsp updated1 test'
            });
            expect(saveBtn).toBeDisabled();
        });
    });
    

    describe('AddDSP screen on EDIT mode', () => {
        it('enable save button when all mendatory fields are filled', async()=> { 
            const {dspNameElem, saveBtn} = getAllElements(result);
            fireEvent.change(dspNameElem, {target: {value: 'John'}});
            await waitFor(()=> {
                expect(saveBtn).toBeEnabled();
            });
        });

        it('show toaster with success message on save button click', async()=> {
            const {formElem, dspNameElem, saveBtn} = getAllElements(result);
            
            await waitFor(()=> {
                expect(formElem).toHaveFormValues({
                    dspName: 'dsp updated1 test',
                    contactNm: 'steve',
                    email: 'newcustomer@gmail.com',
                    phone: '8939785301',
                    addressLine1: 'Houston Court',
                    addressLine2: 'Houston Ct',
                    city: 'Saratoga',
                    state: 'CA',
                    postalCode: "95070"
                });
            });
            fireEvent.change(dspNameElem, {target: {value: 'John'}});
            userEvent.click(saveBtn);
            await waitFor(()=> {
                expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
            });
        });

        it('show toaster with error message on save button click', async()=> { 
            serverMsw.use(
                rest.put('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                details: ['fail edit dsp']
                            }
                        })
                    );
                })
            );
            
            const {formElem, dspNameElem, saveBtn} = getAllElements(result);
            await waitFor(()=> {
                expect(formElem).toHaveFormValues({
                    dspName: 'dsp updated1 test',
                    contactNm: 'steve',
                    email: 'newcustomer@gmail.com',
                    phone: '8939785301',
                    addressLine1: 'Houston Court',
                    addressLine2: 'Houston Ct',
                    city: 'Saratoga',
                    state: 'CA',
                    postalCode: "95070"
                });
            });
            fireEvent.change(dspNameElem, {target: {value: 'John'}});
            userEvent.click(saveBtn);
            
            await waitFor(()=> {
                expect(result.getByText(/fail edit dsp/i)).toBeInTheDocument();
            });
        });
    });

    describe('show dialogue of discard', () => {
        it('render discard popup when form is changed', async()=> {
            const {dspNameElem, cancelBtn} = getAllElements(result);
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