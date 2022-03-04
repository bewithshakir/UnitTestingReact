import { mount } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import DspLandingContent from './index';
import { renderWithClient } from '../../tests/utils';


const queryClient = new QueryClient();

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
   useNavigate: () => mockedUsedNavigate,
}));


jest.mock('../../store', () => ({
    ...jest.requireActual('../../store') as any,
    useAddedCustomerIdStore: ()=> '11'
}));


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