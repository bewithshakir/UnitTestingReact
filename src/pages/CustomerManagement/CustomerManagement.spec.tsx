import { shallow } from 'enzyme';
import CustomerModel from '../../models/CustomerModel';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { Customer } from "./config";


jest.mock("react-query", () => {
    return {
        useInfiniteQuery: jest.fn(),
    };
});

jest.mock("./queries", () => {
    return {
        useCustomers: jest.fn(),
    };
});

describe('Given Bruger Menu on Customer Landing Page', () => {
    const CustomerObj = new CustomerModel();
    const massActionOptions = CustomerObj.massActions();
    test('Render Bruger Menu', () => {
        const BurgerMenu = shallow(
            <ActionsMenu
                options={massActionOptions}
                onSelect={() => jest.fn()}
            />
        );
        expect(BurgerMenu).toMatchSnapshot();
    });

    test('Bruger Menu Menu With Options', () => {
        const BurgerMenu = shallow(
            <ActionsMenu
                options={massActionOptions}
                onSelect={() => jest.fn()}
            />
        );
        BurgerMenu.find(".btn-listmemu").simulate('click');
        expect(BurgerMenu.find(".btn-listmemu").hasClass('active')).toBe(true);
        expect(BurgerMenu.find('.actions-popper').exists()).toBe(true);
    });

});

describe('Given Sortby Menu on Customer Landing Page', () => {
    const { SortByOptions } = Customer.LandingPage;
    test('Render Sortby Menu', () => {
        const CSortbyMenu = shallow(
            <SortbyMenu
                options={SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(CSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const CSortbyMenu = shallow(
            <SortbyMenu
                options={SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        CSortbyMenu.find(".btn-sortby").simulate('click');
        expect(CSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(CSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });

});

