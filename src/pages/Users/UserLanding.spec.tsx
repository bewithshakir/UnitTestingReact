import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import UserLandingContent from './index';


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        location: {
            pathname: "/customer/123/users",
            state: {
                customerName: "MockCustomer"
            }
        }
    }),
    useLocation: () => ({
        state: {
            customerName: "MockCustomer"
        }
    })
}));

describe('Rendering of User Landing Component', () => {
    it('check user landing page DOM', async () => {
        const result = renderWithClient(<UserLandingContent version="Breadcrumbs-Many" />);
        await waitFor(() => {
            expect(result.container.querySelector('#filter')).toBeInTheDocument();
            expect(result.container.querySelector('#userSort')).toBeInTheDocument();
            expect(result.container.querySelector('#userSearch')).toBeInTheDocument();
        });
    });
});

describe('load User landing page', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<UserLandingContent version="Breadcrumbs-Many" />);
        await waitFor(() => {
            expect(result.getByText(/USER NAME/i)).toBeInTheDocument();
            expect(result.getByText(/ID/i)).toBeInTheDocument();
        });
    });
});

