import AddLotForm from './AddLotForm.component';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from "../../../../tests/utils";
import { waitFor } from '@testing-library/react';

beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(1638338756741));
});

jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: '/customer/123456/parkingLots/viewLot/89898'
        })
    }),
    useParams: () => ({
        customerId: '123456',
    }),
    useLocation: () => ({
        search: "backTo=parkingLot",
    }),
}));


describe('Rendering of Add Lot Component', () => {
    it('ADD ANOTHER ORDER SCHEDULE should disable', () => {
        const component = renderWithClient(<AddLotForm />);
        expect(component.getByTestId('add-another-order').classList.contains('disabled-text-link')).toBe(true);
    });
});

describe('Rendering of Edit Lot Component', () => {
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => ({
            pathname: "localhost:3000/customer/123456/parkingLots/viewLot/89898"
        })
    }));
    it('when land on this page, Edit button is by default shown', () => {
        const component = renderWithClient(<AddLotForm />);
        expect(component.container.getElementsByClassName('edit-button').length).toBe(1);
        expect(component.container.getElementsByClassName('cancelBtnPL').length).toBe(0);
        expect(component.container.getElementsByClassName('saveBtnPL').length).toBe(0);
    });
    it('After clicking Edit button, show Save and Cancel buttons ', async () => {
        const component = renderWithClient(<AddLotForm />);
        const editBtn = component.container.querySelector('.edit-button') as HTMLButtonElement;
        await waitFor(() => {
            userEvent.click(editBtn);
        });
        expect(component.container.getElementsByClassName('cancelBtnPL').length).toBe(1);
        expect(component.container.getElementsByClassName('saveBtnPL').length).toBe(1);
    });
});

afterAll(() => {
    jest.useRealTimers();
});
