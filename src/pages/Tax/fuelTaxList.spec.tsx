/* eslint-disable no-console */
import { shallow } from 'enzyme';
import TaxModel from '../../models/TaxModel';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { sortByOptions } from './config';

jest.mock("react-query", () => {
    return {
        useFuelTaxList: jest.fn().mockReturnValue({
            data: {
                pages: [
                    {
                        data: {
                            fuelTax: [
                                {
                                    cityName: "Houstan",
                                    countryName: "us",
                                    stateName: "TX",
                                    taxJurisdictionId: "f5d769c4-108f-40f0-bb57-6423d6263466",
                                    products: [{
                                        cityFuelTax: 10000,
                                        countyFuelTax: 1,
                                        currencyCd: "USD",
                                        endDate: "12/31/2021",
                                        fedFuelTax: 33.499,
                                        miscInspFuelTax: 3,
                                        miscLoadFuelTax: 0,
                                        miscLocalFuelTax: 4,
                                        productCd: "Diesel",
                                        productClassCd: "Premium",
                                        productGroupCd: "Premium",
                                        productId: "23a8db3d-d064-4314-87fb-4800d5a94c0c",
                                        revenueFuelRate: 33.4,
                                        saleableProductNm: "Diesel",
                                        salesFuelRate: 1,
                                        startDate: "12/11/2021",
                                        stateFuelTax: 20,
                                    }]
                                }
                            ]
                        }
                    }
                ]
            },
            fetchNextPage: jest.fn(),
            isLoading: false,
            isFetching: false,
        }),
    };
});


describe('Given Bruger Menu on FuelTax Landing Page', () => {
    const TaxObj = new TaxModel();
    const massActionOptions = TaxObj.massActions();

    test('Render Bruger Menu', () => {
        const FuelTaxBurgerMenu = shallow(
            <ActionsMenu
                options={massActionOptions}
                onSelect={() => jest.fn()}
            />
        );
        expect(FuelTaxBurgerMenu).toMatchSnapshot();
    });

    test('Bruger Menu Menu With Options', () => {
        const FuelTaxBurgerMenu = shallow(
            <ActionsMenu
                options={massActionOptions}
                onSelect={() => jest.fn()}
            />
        );
        FuelTaxBurgerMenu.find(".btn-listmemu").simulate('click');
        expect(FuelTaxBurgerMenu.find(".btn-listmemu").hasClass('active')).toBe(true);
        expect(FuelTaxBurgerMenu.find('.actions-popper').exists()).toBe(true);
    });

});

describe('Given Sortby Menu on FuelTax Landing Page', () => {
    test('Render Sortby Menu', () => {
        const FuelTaxSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        expect(FuelTaxSortbyMenu).toMatchSnapshot();
    });

    test('Sortby Menu Menu With Options', () => {
        const FuelTaxSortbyMenu = shallow(
            <SortbyMenu
                options={sortByOptions.map((sortByItem) => (sortByItem))}
                onSelect={() => jest.fn()}
            />
        );
        FuelTaxSortbyMenu.find(".btn-sortby").simulate('click');
        expect(FuelTaxSortbyMenu.find(".btn-sortby").hasClass('active')).toBe(true);
        expect(FuelTaxSortbyMenu.find('.sortby-popper').exists()).toBe(true);
    });

});
