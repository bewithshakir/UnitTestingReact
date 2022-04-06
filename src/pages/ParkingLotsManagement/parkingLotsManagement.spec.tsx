import { mount } from 'enzyme';
import ParkingLotsManagementLadingPage from './index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AllParkingLots } from './config';

const queryClient = new QueryClient();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => ({
    location: {
      pathname: "/parkingLots"
    }
  })
}));

describe('Given All ParkingLots Landing Page', () => {
  const Page = mount(
    <QueryClientProvider client={queryClient}>
      <ParkingLotsManagementLadingPage version={'NavLinks'} />
    </QueryClientProvider>
  );
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
});

describe('on Click on add lot button dialog should open', () => {
  const Page = mount(
    <QueryClientProvider client={queryClient}>
      <ParkingLotsManagementLadingPage version={'NavLinks'} />
    </QueryClientProvider>
  );
  test('render search customer modal on btn click', () => {
    const addLotBtn = Page.find("button.add-lot-btn-lot-management");
    addLotBtn.simulate('click');
    expect(Page.find('.dyn-filter-dialog-container').exists()).toBe(true);
    const dialogBox = Page.find('.dyn-filter-dialog-container');
    expect(dialogBox.find('label.MuiInputLabel-root').exists()).toBe(true);
    const dialogBoxLabel = dialogBox.find('label.MuiInputLabel-root');
    expect(dialogBoxLabel.find('b').text().includes('CUSTOMER*')).toBe(true);
    expect(dialogBox.find('input.paginate-custom__input').exists()).toBe(true);
  });
});
