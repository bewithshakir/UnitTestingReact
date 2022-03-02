import { act, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderWithClient } from '../../tests/utils';
import DspLandingContent from './index';
import userEvent from '@testing-library/user-event';
import { serverMsw } from '../../setupTests';
import { rest } from 'msw';

const queryClient = new QueryClient();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));


function getAllElements (component: any) {
    const searchBox = component.container.querySelector('#dspSearch');
    return { searchBox };
}

describe('Rendering of DSP Landing Component', () => {
    const component = mount(<QueryClientProvider client={queryClient}><DspLandingContent version='1' /></QueryClientProvider>);
    it('DSP Landing component Snapshot testing when', () => {
        expect(component).toMatchSnapshot();
    });
    it('renders filter button', () => {
        expect(component.find({ types: "filter" })).toBeDefined();
    });
    it('Renders sort by button', () => {
        expect(component.find('SortbyMenu')).toBeDefined();
    });
    it('Renders Search Input ', () => {
        expect(component.find('SearchInput')).toBeDefined();
    });
});

describe('search DSP on DSP landing page', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<DspLandingContent version="Breadcrumbs-Many" />);
        await act(() => {
            const { searchBox } = getAllElements(result);
            userEvent.type(searchBox, 'Test DSP');
        });

        await waitFor(() => {
            expect(result.getByText(/Test Contact/i)).toBeInTheDocument();
            expect(result.getByText(/Test DSP/i)).toBeInTheDocument();
            expect(result.getByText(/Test State/i)).toBeInTheDocument();
        });
    });

    it('when search result not found', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => {
                return res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            dsps: [],
                            pagination: {
                                limit: 15,
                                offset: 0,
                                totalCount: 0,
                            }
                        },
                        error: null
                    })
                );
            })
        );
        const result = renderWithClient(<DspLandingContent version="Breadcrumbs-Many" />);

        await act(() => {
            const { searchBox } = getAllElements(result);
            userEvent.type(searchBox, 'Test DAP');
        });

        await waitFor(() => {
            expect(result.getByText(/Oops.. No Results Found/i)).toBeInTheDocument();
        });
    });
});