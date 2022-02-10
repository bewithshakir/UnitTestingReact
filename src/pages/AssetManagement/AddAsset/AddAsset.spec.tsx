describe('render AddAsset component', ()=> {

});import { waitFor, render, cleanup, act, fireEvent, waitForElementToBeRemoved, RenderResult } from "@testing-library/react";
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";



import { renderWithClient } from '../../../tests/utils';
import { serverMsw } from "../../../setupTests";
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import AddAsset from "./index";


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
    const assetTypeElem = component.container.querySelector('#assetType') as HTMLInputElement;
    const assetStatusElem = component.container.querySelector('#assetStatus') as HTMLInputElement;
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const saveBtn = component.container.querySelector('#saveBtn');
    const formElem = component.container.querySelector('#form');
    return { assetTypeElem, assetStatusElem, cancelBtn, saveBtn, formElem  };
}


afterEach(cleanup);
describe('renders AddAsset component for add mode', () => {
    let result: RenderResult;

    beforeEach(()=> {
        result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
    });

    it('renders all mendatory fields with blank value on add mode', ()=> {
        const { formElem, saveBtn} =  getAllElements(result);
        expect(formElem).toBeInTheDocument();
        expect(saveBtn).toBeDisabled();
    });

    describe('AddDSP screen on add mode', () => {
       

        it('enable save button when all mendatory fields are filled', async()=> {

            const { assetTypeElem, assetStatusElem,  saveBtn} =  getAllElements(result);
            fireEvent.change(assetTypeElem, {target: {value: 'John'}});

            // for reference: { label: 'Enabled', value: 'Y', }
            await selectEvent.select(assetStatusElem, ["Enabled"]);
            await waitFor(()=> {
                userEvent.tab();
                expect(saveBtn).toBeEnabled();
            });
        });

        it('show toaster on save button clicked', async()=> {

            const { assetTypeElem, assetStatusElem, saveBtn} =  getAllElements(result);
            fireEvent.change(assetTypeElem, {target: {value: 'John'}});
            await selectEvent.select(assetStatusElem, ["Enabled"]);

            await waitFor(()=> {
                userEvent.tab();
                expect(saveBtn).toBeEnabled();
                userEvent.click(saveBtn);
            });
            await waitFor(()=> {
                expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
            });
        });

        it('show toaster with error message on save button clicked', async()=> { 
            serverMsw.use(
                rest.post('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                details: ['fail add asset']
                            }
                        })
                    );
                })
            );

            const { assetTypeElem, assetStatusElem, saveBtn} =  getAllElements(result);
            fireEvent.change(assetTypeElem, {target: {value: 'John'}});
            await selectEvent.select(assetStatusElem, ["Enabled"]);

            await waitFor(()=> {
                userEvent.tab();
                expect(saveBtn).toBeEnabled();
                userEvent.click(saveBtn);
            });
            await waitFor(()=> {
                expect(result.getByText(/fail add asset/i)).toBeInTheDocument();
                expect(saveBtn).toBeDisabled();
            });
        });
    });

    describe('show dialogue of discard', () => {
        it('render discard popup when form is changed', async()=> {
            const { assetTypeElem, assetStatusElem, cancelBtn} =  getAllElements(result);

            fireEvent.change(assetTypeElem, {target: {value: 'John'}});
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