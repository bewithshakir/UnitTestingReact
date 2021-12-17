/* eslint-disable no-console */
import { shallow } from 'enzyme';
import TaxModel from '../../models/TaxModel';
import FuelTaxLandingPage from './index';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { FuelTax } from './config';
import { when } from 'jest-when';
import { useFuelTaxList } from './queries';
import InnerTable from './SubTableFuelProduct';

jest.mock("react-query", () => {
    return {
        useInfiniteQuery: jest.fn(),
    };
});
jest.mock("./queries", () => {
    return {
        useFuelTaxList: jest.fn(),
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

describe('Given Sortby Menu on FuelTax Landing Page-', () => {
    const { SortByOptions } = FuelTax.LandingPage;
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

describe('FuelTax Landing Page', () => {
    beforeEach(() => {
        when(useFuelTaxList).mockReturnValue({
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
                            ],
                            pagination: { totalCount: 29, limit: 15, offset: 0 }
                        }
                    }
                ],
            },
            isLoading: false,
            isFetching: false,
        });
    });
    test('Fuel List is rendering', () => {
        const FuelTaxListPage = shallow(
            <FuelTaxLandingPage />
        );
        expect(useFuelTaxList).toBeCalled();
        expect(FuelTaxListPage).toMatchSnapshot();
    });

    const TaxObj = new TaxModel();
    const headCellsLots = TaxObj.fieldsToDisplayLotTable();
    const rowActionOptions = TaxObj.rowActions();
    const taxJurisdictionId = '7496ff42-b425-4bb0-a2b4-b7a20a427645';
    test('Fuel Product List is rendering', () => {
        const FuelTaxProductListPage = shallow(
            <InnerTable primaryKey={taxJurisdictionId} id={taxJurisdictionId} headCells={headCellsLots} enableRowAction={true} rowActionOptions={rowActionOptions}/>
        );
        expect(useFuelTaxList).toBeCalled();
        expect(FuelTaxProductListPage).toMatchSnapshot();
    });
});


describe('Given Search FuelTax Landing Page', () => {
    beforeEach(() => {
        when(useFuelTaxList).calledWith("Houstan", { sortBy: "cityName", order: "desc" }).mockReturnValue({
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
                            ],
                            pagination: { totalCount: 29, limit: 15, offset: 0 }
                        }
                    }
                ],
            },
            isLoading: false,
            isFetching: false,
        });
    });
    test('Show Fuel List as per searched value', () => {
        const FuelTaxListPage = shallow(
            <FuelTaxLandingPage />
        );
        expect(useFuelTaxList).toBeCalled();
        expect(FuelTaxListPage).toMatchSnapshot();
    });
});
