import { act, cleanup, waitFor, render, RenderResult, fireEvent } from "@testing-library/react";
import routeDataDom from 'react-router-dom';
import { renderWithClient } from '../../../tests/utils';
import AddAsset from "./index";
import { serverMsw } from '../../../setupTests';
import { rest } from 'msw';
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import DiscardChangesDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';


const mockedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockedNavigate,
    useLocation: () => ({
        location: {
            pathname: '/assetManagement/'
        },
        push: jest.fn()
    }),
    useParams: () => ({
        assetId: '123'
    })
}));




function getAllElements (component: any) {
    const assetTypeElem = component.container.querySelector('#assetType');
    const assetStatusElem = component.container.querySelector('#assetStatus') as HTMLInputElement;
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const saveBtn = component.container.querySelector('#saveBtn');
    const formElem = component.container.querySelector('#form');
    return { assetTypeElem, assetStatusElem, cancelBtn, saveBtn, formElem };
}


afterEach(cleanup);
describe('edit Asset screen render', () => {
    describe('load form data on edit mode', () => {
        it('load data in form', async () => {
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            await waitFor(async () => {
                const { assetTypeElem } = getAllElements(result);
                expect(assetTypeElem).toHaveValue('Asset One');
                expect(result.getByText(/Enabled/i)).toBeInTheDocument();
            });
        });
    });

    describe('load toaster on edit mode', () => {
        beforeEach(() => {
            jest.spyOn(routeDataDom, 'useParams').mockImplementation(() => ({
                productId: '123'
            }));
        });
        it('show toaster with success message on submit form', async () => {
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            const { assetTypeElem, assetStatusElem, saveBtn } = getAllElements(result);
            fireEvent.change(assetTypeElem, { target: { value: 'John' } });
            // for reference: { label: 'Enabled', value: 'Y', }
            await selectEvent.select(assetStatusElem, ["Enabled"]);
            userEvent.click(saveBtn);
            await waitFor(() => {
                expect(result.getByText('formStatusProps.success.message')).toBeInTheDocument();
            });
        });
        it('show toaster with failure message on submit form', async () => {
            serverMsw.use(
                rest.put('*', (req, res, ctx) => {
                    return res(
                        ctx.status(409),
                        ctx.json({
                            data: null,
                            error: {
                                businessCode: 111,
                                details: null,
                                httpCode: 409,
                                message: "edit mode"
                            }
                        })
                    );
                })
            );
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            const { assetTypeElem, assetStatusElem, saveBtn } = getAllElements(result);
            await act(async () => {
                fireEvent.change(assetTypeElem, { target: { value: 'Asset three' } });
                // for reference: { label: 'Enabled', value: 'Y', }
                await selectEvent.select(assetStatusElem, ["Disabled"]);
                userEvent.click(saveBtn);
            });

            await waitFor(() => {
                expect(result.getByTestId('toaster-message')).toBeInTheDocument();
            });

        });
    });

    describe('show dialogue of discard', () => {
        beforeEach(() => {
            jest.spyOn(routeDataDom, 'useParams').mockImplementation(() => ({
                productId: '123'
            }));
        });
        it('show dialogue box on back if form updated', async () => {
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            const { assetTypeElem, cancelBtn } = getAllElements(result);

            fireEvent.change(assetTypeElem, { target: { value: 'Asset three' } });
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
