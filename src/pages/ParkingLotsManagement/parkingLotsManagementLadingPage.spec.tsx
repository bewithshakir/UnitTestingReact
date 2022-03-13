import { act, waitFor } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import ParkingLotsManagementLadingPage from "./index";
const mockedUsedNavigate = jest.fn();
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
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

        act(async() => {
            const cell = result.getByText(/76123456/i);
            userEvent.click(cell);
            expect(result.getByText(/Pricing/i)).toBeInTheDocument();
            expect(result.getByText(/Lot Details/i)).toBeInTheDocument();
            expect(result.getByText(/Pricing/i)).toBeInTheDocument();
            expect(result).toHaveClass('right_info_panel_content');
            expect(result.getByText(/barunshrm@gmail.com/i)).toBeInTheDocument();
        });
    });
});