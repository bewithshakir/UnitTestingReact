import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../../tests/utils';
import TruckParkingLot from './index';
import { fireEvent } from '@testing-library/react';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: () => ({
            to: '/truckParkingLot'
        })
    }),
    useParams: () => ({
        customerId: '',
        dspId: '',
        params: {
            addedCustomerId: ''
        }
    })
}));

function getAllElements (component: any) {
    const searchElem = component.container.querySelector('#trucklotSearch') as HTMLInputElement;
    return { searchElem };
}

describe('render TruckParkingLot component', () => {
    it('renders component success with mendatory actions', () => {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        const sortBtv = result.getByRole('button', { name: /sortby menu list/i });
        const searchInput = result.getByRole('textbox', { name: /search/i });
        const addBtn = result.getByTestId('addBtn');

        expect(filterBtn).toBeInTheDocument();
        expect(sortBtv).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(addBtn).toBeInTheDocument();
    });
    it('render data on success response', async () => {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        await waitFor(() => {
            expect(result.getByText(/Testing1/i)).toBeInTheDocument();
        });

    });
    it('search truck parking lot with success', async () => {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        const { searchElem } = getAllElements(result);
        fireEvent.change(searchElem, { target: { value: 'UTC Truck Lot' } });

        await waitFor(() => {
            expect(result.getByText(/778899/i)).toBeInTheDocument();
        });
    });
    it('search truck parking lot with no data found', async () => {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        const { searchElem } = getAllElements(result);
        fireEvent.change(searchElem, { target: { value: 'XYZ Parking Lot' } });

        await waitFor(() => {
            expect(result.getByText(/No Results Found/i)).toBeInTheDocument();
        });
    });
});