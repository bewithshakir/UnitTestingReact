import { shallow, mount } from 'enzyme';
import ProductManagement from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor, act } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import { serverMsw } from '../../setupTests';
import { rest } from "msw";
import userEvent from '@testing-library/user-event';

const queryCl = new QueryClient();

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => ({
        pathname: "/customer/1234/parkingLots/viewLot/9999",
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

function getAllElements (component: any) {
    const productTypeSelect = component.container.querySelector('#productType') as HTMLInputElement;
    const masterProductNameSelect = component.container.querySelector('#masterProductName') as HTMLInputElement;
    const pricingModelSelect = component.container.querySelector('#pricingModel') as HTMLInputElement;
    const searchBox = component.container.querySelector('#SearchInput');
    const saveBtn = component.container.querySelector('#save-btn');
    const cancelBtn = component.container.querySelector('#cancel-btn');
    const formElem = component.container.querySelector('.saveProductFrom');
    // const opisRackTableCell = component.container.querySelector('.saveProductFrom');
    const citySelectOPISRack = component.container.querySelector('#city') as HTMLInputElement;
    const stateInputOPISRack = component.container.querySelector('#state');
    const supplierSelectOPISRack = component.container.querySelector('#supplier') as HTMLInputElement;
    const brandedSelectOPISRack = component.container.querySelector('#branded') as HTMLInputElement;
    const cityIdInputOPISRack = component.container.querySelector('#cityId');
    const actualProductSelectOPISRack = component.container.querySelector('#actualProduct') as HTMLInputElement;
    // const supplierPriceOPISRack = component.container.querySelector('#opisName';
    const opisNameOPISRack = component.container.querySelector('#opisName');
    const productNameOPISRack = component.container.querySelector('#productNm');
    const manualPriceAmtOPISRack = component.container.querySelector('#manualPriceAmt');
    const addedPriceAmtOPISRack = component.container.querySelector('#addedPriceAmt');
    const discountPriceAmtOPISRack = component.container.querySelector('#discountPriceAmt');
    const totalPriceAmtOPISRack = component.container.querySelector('#totalPriceAmt');
    

    return { 
            formElem, 
            productTypeSelect,
            masterProductNameSelect, 
            pricingModelSelect, 
            searchBox, 
            saveBtn, 
            cancelBtn, 
            citySelectOPISRack,
            stateInputOPISRack,
            supplierSelectOPISRack,
            brandedSelectOPISRack,
            cityIdInputOPISRack,
            actualProductSelectOPISRack,
            opisNameOPISRack,
            productNameOPISRack,
            manualPriceAmtOPISRack,
            addedPriceAmtOPISRack,
            discountPriceAmtOPISRack,
            totalPriceAmtOPISRack
        };
}


describe('product landing page', () => {
    it('load product list', async () => {
        const result = renderWithClient(<ProductManagement />);
        await waitFor(() => {
            expect(result.getByText(/1 Purple Product Retail/i)).toBeInTheDocument();
            expect(result.getByText(/Product1/i)).toBeInTheDocument();

        });
    });
});

describe('search product name in product list', () => {
    it('load data in product table', async () => {
        const result = renderWithClient(<ProductManagement />);
        await act(() => {
            const { searchBox } = getAllElements(result);
            userEvent.type(searchBox, 'Product1');
        });

        await waitFor(() => {
            expect(result.getByText(/Product1/i)).toBeInTheDocument();
        });
    });

    it('when search result not found', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({"data":{"pagination":{"totalCount":0,"limit":15,"offset":0},"lotProducts":[]},"error":null})
                );
            })
        );
        const result = renderWithClient(<ProductManagement />);

        await act(() => {
            const { searchBox } = getAllElements(result);
            userEvent.type(searchBox, 'ABC');
        });

        await waitFor(() => {
            expect(result.getByText(/Oops.. No Results Found/i)).toBeInTheDocument();
        });
    });
});


describe('on click of opis rack product opis rack form visible', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<ProductManagement />);

        await waitFor(() => {
            expect(result.getByText(/Product1/i)).toBeInTheDocument();
        });

        await act(() => {
            const cell = result.getByText(/Product1/i);
            userEvent.click(cell);
        });

        await waitFor(() => {

            setTimeout(function(){
                const { 
                    productTypeSelect,
                     masterProductNameSelect, 
                     pricingModelSelect , 
                     citySelectOPISRack,
                     stateInputOPISRack,
                    supplierSelectOPISRack,
                    brandedSelectOPISRack,
                    cityIdInputOPISRack,
                    actualProductSelectOPISRack,
                    opisNameOPISRack,
                    productNameOPISRack,
                    manualPriceAmtOPISRack,
                    addedPriceAmtOPISRack,
                    discountPriceAmtOPISRack,
                    totalPriceAmtOPISRack
                    } = getAllElements(result);
                expect(productTypeSelect).toHaveValue('Fuel');
                expect(masterProductNameSelect).toHaveValue('A Diesel');
                expect(pricingModelSelect).toHaveValue('OPIS Rack');
                expect(citySelectOPISRack).toHaveValue('Portland');
                expect(stateInputOPISRack).toHaveValue('OR');
                expect(supplierSelectOPISRack).toHaveValue('Carson');
                expect(brandedSelectOPISRack).toHaveValue('u');
                expect(cityIdInputOPISRack).toHaveValue('935');
                expect(actualProductSelectOPISRack).toHaveValue('NO2');
                expect(opisNameOPISRack).toHaveValue('iodiesel B10 SME Ultra Low Sul No2');
                expect(productNameOPISRack).toHaveValue('Product1');
                expect(manualPriceAmtOPISRack).toHaveValue('3.241');
                expect(addedPriceAmtOPISRack).toHaveValue('0');
                expect(discountPriceAmtOPISRack).toHaveValue('0');
                expect(totalPriceAmtOPISRack).toHaveValue('11.382');
            }, 1000);

        });
    });
})

