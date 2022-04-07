import { waitFor, act } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import LandingPage from './index';
import { rest } from "msw";
import { serverMsw } from '../../setupTests';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
    useNavigate: () => ({
        navigate: () => ({
            to: "/customer/*/attachments"
        })
    }),
    useParams: () => ({
        customerId: '167fd7be-c20e-412a-bac0-502672a055d6',
    })
}));

jest.mock('../../store', () => ({
    ...jest.requireActual('../../store') as any,
    useAddedCustomerIdStore: () => '167fd7be-c20e-412a-bac0-502672a055d6',
}));

describe('get data on load in Landing Page', () => {
    it('load data', async () => {
        const result = renderWithClient(<LandingPage version="Breadcrumbs-Single" />);
        await waitFor(() => {
            expect(result.getByText(/sample.pdf/i)).toBeInTheDocument();
            expect(result.getByText(/Abc/i)).toBeInTheDocument();
        });
    });
});


function getAllElements (component: any) {
    const searchInput = component.container.querySelector('#SearchInput') as HTMLInputElement;
    

    return { 
            searchInput
        };
}

describe('search attachment name in attachment list', () => {
    it('load data in product table', async () => {
        const result = renderWithClient(<LandingPage version="Breadcrumbs-Single" />);
        act(() => {
            const { searchInput } = getAllElements(result);
            userEvent.type(searchInput, 'sample');
        });

        await waitFor(() => {
            expect(result.getByText(/sample.pdf/i)).toBeInTheDocument();
        });
    });

    it('when search result not found', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({"data":{"pagination":{"totalCount":0,"limit":15,"offset":0},"customerDocuments":[]},"error":null})
                );
            })
        );
        const result = renderWithClient(<LandingPage version="Breadcrumbs-Single" />);

        act(() => {
            const { searchInput } = getAllElements(result);
            userEvent.type(searchInput, 'sampleabc');
        });

        await waitFor(() => {
            expect(result.getByText(/Oops.. No Results Found/i)).toBeInTheDocument();
        });
    });
});

