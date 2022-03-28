import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import LandingPage from './index';

jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: "/customer/*/attachments"
        })
    }),
    useParams: () => ({
        customerId: '1002',
    })
}));

jest.mock('../../store', () => ({
    ...jest.requireActual('../../store') as any,
    useAddedCustomerIdStore: () => '1002',
}));

describe('get data on load in Landing Page', () => {
    it('load data', async () => {
        const result = renderWithClient(<LandingPage version="Breadcrumbs-Single" />);
        await waitFor(() => {
            expect(result.getByText(/Abc/i)).toBeInTheDocument();
            expect(result.getByText(/customerContract/i)).toBeInTheDocument();
        });
    });
});


