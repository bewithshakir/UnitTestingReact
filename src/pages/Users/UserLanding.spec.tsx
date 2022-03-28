import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import UserLandingContent from './index';
import userEvent from '@testing-library/user-event';

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


function getAllElements (component: any) {
    const sortBy = component.container.querySelector('#userSort');
    return { sortBy };
}

describe('sortby dsp name on users landing page', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<UserLandingContent version="Breadcrumbs-Many" />);
        const { sortBy } = getAllElements(result);
        userEvent.click(sortBy);

        await waitFor(() => {
            expect(result.getByText(/users_atoz/i)).toBeInTheDocument();
            expect(result.getByText(/users_ztoa/i)).toBeInTheDocument();
            expect(result.getAllByText(/DSP/i));
        });
    });
});
