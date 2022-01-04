import * as React from 'react';
import { shallow } from 'enzyme';
import ProductModel from '../../models/ProductManagementModel';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import SearchInput from "../../components/UIComponents/SearchInput/SearchInput";
import { ProductManagement } from "./config";

jest.mock("react-query", () => {
    return {
        useInfiniteQuery: jest.fn(),
    };
});

jest.mock("./queries", () => {
    return {
        ProductsListSet: jest.fn(),
    };
});


describe('Given Bruger Menu on Product Landing Page', () => {
    const CustomerObj = new ProductModel();
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

describe('Given Sortby Menu on Product Landing Page', () => {
    test('Render Sortby Menu', () => {
        const CSortbyMenu = shallow(
            <SortbyMenu
                options={ProductManagement.LandingPage.SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(CSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const CSortbyMenu = shallow(
            <SortbyMenu
                options={ProductManagement.LandingPage.SortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        CSortbyMenu.find(".btn-sortby").simulate('click');
        expect(CSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(CSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });

});

describe('Given Search Input on Product Landing Page', () => {
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