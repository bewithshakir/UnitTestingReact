import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../../../tests/utils';
import TruckParkingLot from './index';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: ()=> ({
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

describe('render TruckParkingLot component', ()=> {
    it('renders component success with mendatory actions', ()=> {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        const sortBtv = result.getByRole('button', {name: /sortby menu list/i});
        const searchInput = result.getByRole('textbox', { name: /search/i });
        const addBtn = result.getByTestId('addBtn');

        expect(filterBtn).toBeInTheDocument();
        expect(sortBtv).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(addBtn).toBeInTheDocument();
    });
    it('render data on success response', async()=> {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        await waitFor(()=> {
            expect(result.getByText(/Testing1/i)).toBeInTheDocument();
        });
        
    });
    it('show filter Drawer on "Filter" button clicked', async()=> {
        const result = renderWithClient(<TruckParkingLot version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        userEvent.click(filterBtn);

        await waitFor(()=> {
            expect(result.getByTestId('right-drawer')).toBeInTheDocument();
        })
        // result.debug(result.getByTestId('right-drawer'));
    });
});