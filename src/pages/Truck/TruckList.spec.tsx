import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import TruckLandingContent from './index';
import { TruckManagement } from './config';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { shallow } from 'enzyme';

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

describe('Given Sortby Menu on FuelTax Landing Page-', () => {
    const { SortByOptions } = TruckManagement.LandingPage;
    test('Render Sortby Menu', () => {
        const FuelTaxSortbyMenu = shallow(
            <SortbyMenu
                options={SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(FuelTaxSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const FuelTaxSortbyMenu = shallow(
            <SortbyMenu
                options={SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        FuelTaxSortbyMenu.find(".btn-sortby").simulate('click');
        expect(FuelTaxSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(FuelTaxSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });
});