import { mount } from 'enzyme';
import OPISCityLandingPage from "./index";
import { QueryClient, QueryClientProvider } from 'react-query';
import { OPISCity } from './config';

const queryClient = new QueryClient();
describe('Given OPIS Cities Landing Page', () => {
    const Page = mount(<QueryClientProvider client={queryClient}>
        <OPISCityLandingPage />
    </QueryClientProvider>
    );
    test('Page Rendered Properly', () => {
        expect(Page).toMatchSnapshot();
    });
    test('Filter Menu Rendered With Options', () => {
        const Filter = Page.find('[types="filter"]');
        Filter.simulate('click');
        const DynamicFilterContent = Page.find('DynamicFilterContent');
        const DynamicFilterProps = DynamicFilterContent.props();
        expect(DynamicFilterProps['fields'].length).toBe(OPISCity.LandingPage.FilterByFields.length);
        DynamicFilterProps['fields'].forEach((node, index) => {
            expect(node.name).toBe(OPISCity.LandingPage.FilterByFields[index].name);
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
    test('Kabab Menu Rendered With Options', () => {
        const BurgerMenu = Page.find('ActionsMenu');
        BurgerMenu.simulate('click');
        expect(BurgerMenu.find('.actions-popper').exists()).toBe(true);
    });
});
