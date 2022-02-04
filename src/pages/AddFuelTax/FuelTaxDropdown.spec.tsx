import selectEvent from 'react-select-event';
import { renderWithClient } from '../../tests/utils';
import AddFuelTax from './index';
import { cleanup } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
    useLocation: () => ({
        pathname: '/addFuelTax'
    }),
    push: jest.fn()
}));

function getAllElements (component: any) {
    const fuelTypeElem = component.container.querySelector('#fuelType') as HTMLInputElement;
    const formElem = component.container.querySelector('#addFuelTaxForm');
    return { formElem, fuelTypeElem, };
}

afterEach(cleanup);
describe('FuelTaxDropdown component', () => {
    it('renders the addProductType with data', async () => {
        const result = renderWithClient(<AddFuelTax version="Breadcrumbs-Single" />);
        const { formElem, fuelTypeElem } = getAllElements(result);
        await selectEvent.select(fuelTypeElem, ["Regular"]);
        expect(formElem).toHaveFormValues({ fuelType: "456" });
    });
});