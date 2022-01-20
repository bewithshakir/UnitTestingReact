import { mount } from 'enzyme';
import ParkingLotsManagementLadingPage from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AllParkingLots } from './config';

const queryClient = new QueryClient();
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Given All ParkingLots Landing Page', () => {
  const Page = mount(
    <QueryClientProvider client={queryClient}>
      <ParkingLotsManagementLadingPage version={'NavLinks'} />
    </QueryClientProvider>
  );
  test('Page Rendered Properly', () => {
    expect(Page).toMatchSnapshot();
  });
  test('Filter Menu Rendered With Options', () => {
    const Filter = Page.find('[types="filter"]');
    Filter.simulate('click');
    const DynamicFilterContent = Page.find('DynamicFilterContent');
    const DynamicFilterProps: any = DynamicFilterContent.props();
    const fields = DynamicFilterProps['fields'];
    expect(fields.length).toBe(AllParkingLots.LandingPage.FilterByFields.length);
    fields.forEach((node: { name: string }, index: number) => {
      expect(node.name).toBe(AllParkingLots.LandingPage.FilterByFields[index].name);
    });
  });
  test('Sortby Menu Rendered With Options', () => {
    const SortbyMenu = Page.find('SortbyMenu');
    SortbyMenu.simulate('click');
    expect(SortbyMenu.find('.sortby-popper').exists()).toBe(true);
  });
  test('Bruger Menu Rendered With Options', () => {
    const BurgerMenu = Page.find('ActionsMenu');
    BurgerMenu.simulate('click');
    expect(BurgerMenu.find('.actions-popper').exists()).toBe(true);
  });
  test('Search Box Rendered', () => {
    const BurgerMenu = Page.find('SearchInput');
    expect(BurgerMenu.find('#parkingLotSearch').exists()).toBe(true);
  });
  test('Kabab Menu Rendered With Options', () => {
    const BurgerMenu = Page.find('ActionsMenu');
    BurgerMenu.simulate('click');
    expect(BurgerMenu.find('.actions-popper').exists()).toBe(true);
  });
});
