import { waitFor, render, cleanup, act } from "@testing-library/react";
import selectEvent from 'react-select-event';
import userEvent from '@testing-library/user-event';
import { rest } from "msw";
import routeDataDom from 'react-router-dom';


import { renderWithClient } from '../../tests/utils';
import AddProduct from './AddProduct';
import { serverMsw } from "../../setupTests";
import DiscardChangesDialog from '../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';


const mockedNavigate = jest.fn();


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockedNavigate,
    useLocation: () => ({
        location: {
            pathname: '/productManagement/'
        },
        push: jest.fn()
    }),
    useParams: () => ({
        params: {
            productId: ''
        }
    })
}));



function getAllElements (component: any) {
    const productNameElem = component.container.querySelector('#productName');
    const productTypeElem = component.container.querySelector('#productType') as HTMLInputElement;
    const productColorElem = component.container.querySelector('#productColor') as HTMLInputElement;
    const productStatusElem = component.container.querySelector('#productStatus') as HTMLInputElement;
    const productPricingElem = component.container.querySelector('#productPricing') as HTMLInputElement;
    const saveBtn = component.container.querySelector('#saveBtn');
    const cancelBtn = component.container.querySelector('#cancelBtn');
    const formElem = component.container.querySelector('#form');
    return { formElem, productNameElem, productTypeElem, productColorElem, productStatusElem, productPricingElem, saveBtn, cancelBtn };
}


afterEach(cleanup);
describe('AddProduct component', () => {

    describe('add/edit product screen render with common functionality', () => {
        it('renders the addProductType with data', async () => {
            const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
            const { formElem, productTypeElem } = getAllElements(result);

            await selectEvent.select(productTypeElem, ["Test11 Non-Fuel"]);
            expect(formElem).toHaveFormValues({ productType: "111" });
        });

        it('renders the addProductColors with data', async () => {
            const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
            const { formElem, productColorElem } = getAllElements(result);
            await selectEvent.select(productColorElem, ["red"]);
            expect(formElem).toHaveFormValues({ productColor: "12" });
        });

        it('renders the disabled save button', async () => {
            const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
            const { saveBtn } = getAllElements(result);
            expect(saveBtn).toBeDisabled();
        });

        it('renders the enabled save button', async () => {
            const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
            const { saveBtn } = getAllElements(result);
            saveBtn.removeAttribute('disabled');
            expect(saveBtn).toBeEnabled();
        });

    });

    describe('add product screen render', () => {
        it('show toaster with success message on submit form', async () => {
            const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
            await act(async () => {
                const { productNameElem, productTypeElem, productColorElem, productStatusElem, productPricingElem, saveBtn } = getAllElements(result);

                userEvent.type(productNameElem, 'John');
                // Below passed mocked data ["Test11 Non-Fuel"] coming from handler.
                // Format should be like this only. please go through doc https://www.npmjs.com/package/react-select-event to test react-select options.
                await selectEvent.select(productTypeElem, ["Test11 Non-Fuel"]);
                await selectEvent.select(productColorElem, ["red"]);
                await selectEvent.select(productStatusElem, ["Enabled"]);
                userEvent.type(productPricingElem, '2');
                saveBtn.removeAttribute('disabled');
                /* fire events that update state */
                userEvent.click(saveBtn);
            });

            await waitFor(() => {
                result.debug(result.getByTestId('toaster-message'));
            });
        });

        it('show toaster with failure message on submit form', async () => {
            serverMsw.use(
                rest.post('*', (req, res, ctx) => {
                    return res(
                        ctx.status(500),
                        ctx.json({
                            data: null,
                            error: {
                                details: ['fail add product']
                            }
                        })
                    );
                })
            );
            const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
            await act(async () => {
                const { productNameElem, productTypeElem, productColorElem, productStatusElem, productPricingElem, saveBtn } = getAllElements(result);

                userEvent.type(productNameElem, 'John');
                await selectEvent.select(productTypeElem, ["Test11 Non-Fuel"]);
                await selectEvent.select(productColorElem, ["red"]);
                await selectEvent.select(productStatusElem, ["Enabled"]);
                userEvent.type(productPricingElem, '2');
                // saveBtn.removeAttribute('disabled');
                userEvent.click(saveBtn);
            });

            await waitFor(() => {
                // result.debug(result.getByTestId('toaster-message'))
                // expect(result.getByTestId('toaster-message')).toBeInTheDocument()
                expect(result.getByText(/fail add product/i)).toBeInTheDocument();
            });

        });
    });

    describe('edit product screen render', () => {
        beforeEach(() => {
            jest.spyOn(routeDataDom, 'useParams').mockImplementation(() => ({
                productId: '00aad1db-d5a4-45c7-9428-ab08c8d9f6b4'
            }));
        });

        describe('load form data on edit mode', () => {
            it('load data in form', async () => {
                const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
                await waitFor(async () => {
                    const { productNameElem, productPricingElem } = getAllElements(result);
                    expect(productNameElem).toHaveValue('test edit Diesel');
                    expect(result.getByText(/test edit Non-Fuel/i)).toBeInTheDocument();
                    expect(result.getByText(/test edit color Purple/i)).toBeInTheDocument();
                    expect(result.getByText(/Enabled/i)).toBeInTheDocument();
                    expect(productPricingElem).toHaveValue('3');
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
                const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
                await act(async () => {
                    const { productNameElem, productTypeElem, productColorElem, productStatusElem, productPricingElem, saveBtn } = getAllElements(result);

                    userEvent.type(productNameElem, 'test edit Diesel');
                    await selectEvent.select(productTypeElem, ["test edit Non-Fuel"]);
                    await selectEvent.select(productColorElem, ["test edit color Purple"]);
                    await selectEvent.select(productStatusElem, ["Enabled"]);
                    userEvent.type(productPricingElem, '3');
                    saveBtn.removeAttribute('disabled');
                    userEvent.click(saveBtn);
                });

                await waitFor(() => {
                    // result.debug(result.getByTestId('toaster-message'));
                    expect(result.getByText(/fail edit mode/i)).toBeInTheDocument();
                });
            });
        });

        describe('show dialogue of discard', () => {

            it('show dialogue box on back if form updated', async () => {
                const result = renderWithClient(<AddProduct version="Breadcrumbs-Single" />);
                const { productNameElem, cancelBtn } = getAllElements(result);
                userEvent.type(productNameElem, 'John');
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

});