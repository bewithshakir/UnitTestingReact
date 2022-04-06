import { act, waitFor } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import ParkingLotsManagementLadingPage from "./index";
const mockedUsedNavigate = jest.fn();
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('load landing page', () => {
    it('load data in data-grid', async () => {
        const result = renderWithClient(<ParkingLotsManagementLadingPage version="Breadcrumbs-Many" />);
        await waitFor(() => {
            expect(result.getByText(/Himanshu/i)).toBeInTheDocument();
            expect(result.getByText(/Houston/i)).toBeInTheDocument();
            expect(result.getByText(/jasmin dave/i)).toBeInTheDocument();
            expect(result.getByText(/76123456/i)).toBeInTheDocument();
        });

        const cell = result.getByText(/76123456/i);
        await act(async () => {
            userEvent.click(cell);
        });
        await waitFor(async () => {
            expect(result.container.querySelector('.disclaimerTextBox')).toBeInTheDocument();
        });
        await waitFor(async () => {
            expect(result.getByText('parkingLotManagement.infoView.lotDetails')).toBeInTheDocument();
        });
        await waitFor(async () => {
            expect(result.getByText('parkingLotManagement.infoView.pricing')).toBeInTheDocument();
            expect(result.getByText('barunshrm@gmail.com')).toBeInTheDocument();
        });
    });
});