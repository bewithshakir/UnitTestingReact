import { waitFor } from '@testing-library/react';
import { renderWithClient } from '../../tests/utils';
import TruckLandingContent from './index';
import { TruckManagement } from './config';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { shallow } from 'enzyme';
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { fireEvent } from '@testing-library/react';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom") as any,
    useNavigate: () => ({
        navigate: () => ({
            to: '/trucks'
        })
    }),
}));


function getAllElements (component: any) {
    const searchElem = component.container.querySelector('#searchTerm') as HTMLInputElement;
    return { searchElem };
}


describe('renders TruckLanding page component', () => {
    it('renders  TruckLanding page component with all ui components', () => {
        const result = renderWithClient(<TruckLandingContent version="Breadcrumbs-Single" />);
        const filterBtn = result.getByTestId('filter');
        const sortBtv = result.getByRole('button', { name: /sortby menu list/i });
        const searchInput = result.getByRole('textbox', { name: /search/i });
        const addBtn = result.getByTestId('addBtn');

        expect(filterBtn).toBeInTheDocument();
        expect(sortBtv).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(addBtn).toBeInTheDocument();
    });
    it('render data on success response', async () => {
        const result = renderWithClient(<TruckLandingContent version="Breadcrumbs-Single" />);
        await waitFor(()=> {
            expect(result.getByText(/MG/i)).toBeInTheDocument();
        });

    });

    it('search truck parking lot with success', async () => {
        const result = renderWithClient(<TruckLandingContent version="Breadcrumbs-Single" />);
        const { searchElem } = getAllElements(result);
        fireEvent.change(searchElem, { target: { value: 'Test Add Truck 4' } });

        await waitFor(() => {
            expect(result.getByText(/Test Add Truck 4/i)).toBeInTheDocument();
        });
    });

    it('search truck parking lot with no data found', async () => {
        const result = renderWithClient(<TruckLandingContent version="Breadcrumbs-Single" />);
        const { searchElem } = getAllElements(result);
        fireEvent.change(searchElem, { target: { value: 'XYZ Parking Lot' } });

        await waitFor(() => {
            expect(result.getByText(/No Results Found/i)).toBeInTheDocument();
        });
    });

});

describe('Given Sortby Menu on Truck List Landing Page-', () => {
    const { SortByOptions } = TruckManagement.LandingPage;
    test('Render Sortby Menu', () => {
        const TruckListSortbyMenu = shallow(
            <SortbyMenu
                options={SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(TruckListSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const TruckListSortbyMenu = shallow(
            <SortbyMenu
                options={SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        TruckListSortbyMenu.find(".btn-sortby").simulate('click');
        expect(TruckListSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(TruckListSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });
});

describe('Given Search Input on Truck Overview Page', () => {
    test('Render Search Input onChange', () => {
        const searchInputItem = shallow(
            <SearchInput
                onChange={() => jest.fn()}
            />
        );
        expect(searchInputItem).toMatchSnapshot();
    });

    test('Search Input onBlur', () => {
        const searchInputItem = shallow(
            <SearchInput
                onChange={() => jest.fn()}
                onBlur={() => jest.fn()}
            />
        );
        searchInputItem.find(".searchinput").simulate('click');
        expect(searchInputItem.find('.adornment')).toBeDefined();
    });

});