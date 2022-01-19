import { waitFor } from "@testing-library/react";
import { renderWithClient } from '../../tests/utils';
import ParkingLotsManagementLadingPage from "./index";
const mockedUsedNavigate = jest.fn();

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
            expect(result.getByText(/Barun Sharma/i)).toBeInTheDocument();
        });
    });
});