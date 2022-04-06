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
  const pageComponent = mount(
    <QueryClientProvider client={queryClient}>
      <ParkingLotsManagementLadingPage version={'NavLinks'} />
    </QueryClientProvider>
  );
  test('Filter Menu Rendered With Options', () => {
    const filterElm = pageComponent.find('[types="filter"]');
    filterElm.simulate('click');
    const dynamicFilterContent = pageComponent.find('DynamicFilterContent');
    const dynamicFilterProps: any = dynamicFilterContent.props();
    const fields = dynamicFilterProps['fields'];
    expect(fields.length).toBe(AllParkingLots.LandingPage.FilterByFields.length);
    fields.forEach((node: { name: string }, index: number) => {
      expect(node.name).toBe(AllParkingLots.LandingPage.FilterByFields[index].name);
    });
  });
  test('Sortby Menu Rendered With Options', () => {
    const sortbyMenu = pageComponent.find('SortbyMenu');
    sortbyMenu.simulate('click');
    expect(sortbyMenu.find('.sortby-popper').exists()).toBe(true);
  });
  test('Bruger Menu Rendered With Options', () => {
    const burgerMenu = pageComponent.find('ActionsMenu');
    burgerMenu.simulate('click');
    expect(burgerMenu.find('.actions-popper').exists()).toBe(true);
  });
  test('Search Box Rendered', () => {
    const burgerMenu = pageComponent.find('SearchInput');
    expect(burgerMenu.find('#parkingLotSearch').exists()).toBe(true);
  });
});

describe('on Click on add lot button dialog should open', () => {
  const pageComponent = mount(
    <QueryClientProvider client={queryClient}>
      <ParkingLotsManagementLadingPage version={'NavLinks'} />
    </QueryClientProvider>
  );
  test('render search customer modal on btn click', () => {
    const addLotBtn = pageComponent.find("button.add-lot-btn-lot-management");
    addLotBtn.simulate('click');
    expect(pageComponent.find('.dyn-filter-dialog-container').exists()).toBe(true);
    const dialogBox = pageComponent.find('.dyn-filter-dialog-container');
    expect(dialogBox.find('label.MuiInputLabel-root').exists()).toBe(true);
    const dialogBoxLabel = dialogBox.find('label.MuiInputLabel-root');
    expect(dialogBoxLabel.find('b').text().includes('CUSTOMER*')).toBe(true);
    expect(dialogBox.find('input.paginate-custom__input').exists()).toBe(true);
  });
});
