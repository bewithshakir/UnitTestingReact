import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import TruckLandingContent from './index';


jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: ()=> ({
        to: '/trucks'
        })
    }),
}));


describe('renders TruckLanding page component', ()=> {
    it('renders  TruckLanding page component with all ui components', ()=> {
        const result = renderWithClient(<TruckLandingContent version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        const sortBtv = result.getByRole('button', {name: /sortby menu list/i});
        const searchInput = result.getByRole('textbox', { name: /search/i });
        const addBtn = result.getByTestId('addBtn');

        expect(filterBtn).toBeInTheDocument();
        expect(sortBtv).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(addBtn).toBeInTheDocument();
    });
    it('render data on success response', async ()=> {
        const result = renderWithClient(<TruckLandingContent version="Breadcrumbs-Single" />);
        await waitFor(()=> {
            expect(result.getByText(/John/i)).toBeInTheDocument();
        });
        
    });
});