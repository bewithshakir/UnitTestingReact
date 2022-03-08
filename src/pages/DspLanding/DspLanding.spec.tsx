import { mount } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { act, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import DspLandingContent from './index';
import { renderWithClient } from '../../tests/utils';
import selectEvent from 'react-select-event';


const queryClient = new QueryClient();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));


jest.mock('../../store', () => ({
    ...jest.requireActual('../../store') as any,
    useAddedCustomerIdStore: ()=> '111edit'
}));

function getAllElements (component: any) {
    const searchBox = component.container.querySelector('#dspSearch');
    const sortBy = component.container.querySelector('#dspSort');
    return { searchBox, sortBy };
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
        it('Renders Search Input ', ()=>{
            expect(component.find('SearchInput')).toBeDefined();
        });


    describe('render drawer on filter click', ()=> {
        it('show filter Drawer on "Filter" button clicked', async()=> {
           
            const result = renderWithClient(<DspLandingContent version='1' />);
            const filterBtn = result.getByTestId('filter');
            userEvent.click(filterBtn);
            await waitFor(()=> {
                expect(result.getByTestId('right-drawer')).toBeInTheDocument();
            });
        });

        it('update data on apply button clicked', async()=> {
           
            const result = renderWithClient(<DspLandingContent version='1' />);
            const filterBtn = result.getByTestId('filter');
            userEvent.click(filterBtn);

            
            await waitFor(()=> {
                expect(result.getByTestId('right-drawer')).toBeInTheDocument();
            });
            const cityElem = document.querySelector('#city') as HTMLInputElement;
            // select two values...,
            await selectEvent.select(cityElem, ['Dulles test']);
            const applyBtn = result.getByTestId('applyAll');
            expect(applyBtn).toBeEnabled();

            userEvent.click(applyBtn);
            await waitFor(()=> {
                expect(result.getByText(/DSP city search/i)).toBeInTheDocument();
            });

            
        });
        

        it('show filter Drawer on "Filter" button clicked', async()=> {
            const result = renderWithClient(<DspLandingContent version="1" />);
            const filterBtn = result.getByTestId('filter');
            userEvent.click(filterBtn);

            const closeBtn = result.getByTestId('closeIcon');
            userEvent.click(closeBtn);
        
            await waitForElementToBeRemoved(()=> {
                return result.getByTestId('right-drawer');
            });
        });
    });
});

describe('search DSP on DSP landing page', () => {
    const result = renderWithClient(<DspLandingContent version="Breadcrumbs-Many" />);
    const { searchBox } = getAllElements(result);
    it('load data in form', () => {
        act(() => {
            userEvent.type(searchBox, 'Test DSP');
        });

        waitFor(() => {
            expect(result.getByText(/Test Contact/i)).toBeInTheDocument();
            expect(result.getByText(/Test DSP/i)).toBeInTheDocument();
            expect(result.getByText(/Test State/i)).toBeInTheDocument();
        });
    });

    it('when search result not found', async () => {
        act(() => {
            userEvent.type(searchBox, 'Test DAP');
        });

        waitFor(() => {
            expect(result.getByText(/Oops.. No Results Found/i)).toBeInTheDocument();
        });
    });
});

describe('sortby dsp name on dsp landing page', () => {
    it('load data in form', async () => {
        const result = renderWithClient(<DspLandingContent version="Breadcrumbs-Many" />);

        await act(() => {
            const { sortBy } = getAllElements(result);
            userEvent.click(sortBy);
        });

        await waitFor(() => {
            expect(result.getByText(/dspname_atoz/i)).toBeInTheDocument();
            expect(result.getByText(/dspname_ztoa/i)).toBeInTheDocument();
            expect(result.getByText(/VA/i)).toBeInTheDocument();
            expect(result.getByText(/DSP Test/i)).toBeInTheDocument();
        });
    });
});
