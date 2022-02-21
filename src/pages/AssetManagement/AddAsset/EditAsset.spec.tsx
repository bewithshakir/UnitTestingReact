import { act, cleanup, waitFor, render } from "@testing-library/react";
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
    beforeEach(() => {
        jest.spyOn(routeDataDom, 'useParams').mockImplementation(() => ({
            assetId: '123'
        }));
    });

    describe('load form data on edit mode', () => {
        it('load data in form', async () => {
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            await waitFor(async () => {
                const { assetTypeElem, assetStatusElem } = getAllElements(result);
                result.debug(assetStatusElem);
                expect(assetTypeElem).toHaveValue('Asset One');
                expect(result.getByText(/Enabled/i)).toBeInTheDocument();
            });
        });
    });

    describe('load toaster on edit mode', () => {
        it('show toaster with failure message on submit form', async () => {
            serverMsw.use(
                rest.put('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                message: 'fail edit mode'
                            }
                        })
                    );
                })
            );
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            await act(async () => {
                const { assetTypeElem, assetStatusElem, saveBtn } = getAllElements(result);

                userEvent.type(assetTypeElem, 'Asset Two');
                await selectEvent.select(assetStatusElem, ["Enabled"]);
                saveBtn.removeAttribute('disabled');
                userEvent.click(saveBtn);
            });

            await waitFor(() => {
                expect(result.getByText(/fail edit mode/i)).toBeInTheDocument();
            });
        });
    });

    describe('show dialogue of discard', () => {

        it('show dialogue box on back if form updated', async () => {
            const result = renderWithClient(<AddAsset version="Breadcrumbs-Single" />);
            const { assetTypeElem, cancelBtn } = getAllElements(result);
            userEvent.type(assetTypeElem, 'Asset Two');
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
