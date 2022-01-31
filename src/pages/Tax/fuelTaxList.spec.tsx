/* eslint-disable no-console */
import { shallow } from 'enzyme';
import TaxModel from '../../models/TaxModel';
import ActionsMenu from '../../components/UIComponents/Menu/ActionsMenu.component';
import SortbyMenu from '../../components/UIComponents/Menu/SortbyMenu.component';
import { FuelTax } from './config';
import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../setupTests";
import { createWrapper } from "../../tests/utils";
// import FuelTaxList from './index';
import { useFuelTaxList } from './queries';


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

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') as any,
  useNavigate: () => mockedUsedNavigate,
}));


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

describe('GetFuelTaxList', () => {
    it('Success returns data', async () => {
        const { result, waitFor } = renderHook(() => useFuelTaxList('', { sortBy: "", order: "" }, {}), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });
        await waitFor(() => {
            return result.current.isSuccess;
        });
        expect(result.current.status).toBe('success');
    });

    it('fail to get data', async () => {
        serverMsw.use(
            rest.get('*', (req, res, ctx) => res(ctx.status(500)))
        );
        const { result, waitFor } = renderHook(() => useFuelTaxList('9999', { sortBy: "", order: "" }, {}), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});

