import { mount } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import UserLandingContent from './index';
import { renderWithClient } from '../../tests/utils';
import selectEvent from 'react-select-event';


const queryClient = new QueryClient();

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
    useLocation: ()=>({
        state: {
            customerName: "MockCustomer"
        }
    })
}));

describe('Rendering of User Landing Component', () => {
        const component = mount(<QueryClientProvider client={queryClient}><UserLandingContent version='1' /></QueryClientProvider>);
        it('User Landing component Snapshot testing when', () => {
            expect(component).toMatchSnapshot();
        });   
        it('renders filter button', () => {
            expect(component.find({ types: "filter" })).toBeDefined();
        });
        it('Renders sort by button', () => {
            expect(component.find('SortbyMenu')).toBeDefined();
        });
        it('Renders Search Input ', ()=>{
            expect(component.find('SearchInput')).toBeDefined();
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

