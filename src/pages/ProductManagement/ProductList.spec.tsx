import { shallow } from 'enzyme';
import { act, renderHook } from "@testing-library/react-hooks";
import { rest } from "msw";
import { serverMsw } from "../../setupTests";
import { createWrapper } from "../../tests/utils";
import ProductList from './ProductList';
import { useProductsByLotId } from './queries';


const data = [
    { productNm: 'S P 1', pricingModel: { pricingModelNm: 'Custom' }, activeInactiveInd: 'Y', productColor: { productColorCode: '#DD1D21' } },
    { productNm: 'S P 2', pricingModel: { pricingModelNm: 'Custom' }, activeInactiveInd: 'N', productColor: { productColorCode: '#008443' } }
];

describe('Product list should be rendered', () => {

    test('render nodata table', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={false}
            loadNextPage={false}
            makeTopButtonRowDisabled={jest.fn}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render loading', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={true}
            loadNextPage={false}
            makeTopButtonRowDisabled={jest.fn}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render nextPage', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={false}
            loadNextPage={false}
            makeTopButtonRowDisabled={jest.fn}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render no results found', () => {
        const component = shallow(<ProductList
            searchTerm='xxxx'
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={[]}
            isLoadingData={false}
            loadNextPage={false}
            makeTopButtonRowDisabled={jest.fn}
        />);
        expect(component.getElement()).toBeDefined();
    });
    test('render when data', () => {
        const component = shallow(<ProductList
            searchTerm=''
            searchTermInputChange={jest.fn()}
            handleRowAction={jest.fn()}
            productData={data}
            isLoadingData={false}
            loadNextPage={false}
            makeTopButtonRowDisabled={jest.fn}
        />);
        expect(component.getElement()).toBeDefined();
    });
});

describe('useProductsByLotId', () => {
    it('Success returns data', async () => {
        const { result, waitFor } = renderHook(() => useProductsByLotId('9999', '', null), {
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
        const { result, waitFor } = renderHook(() => useProductsByLotId('9999', '', null), {
            wrapper: createWrapper()
        });
        act(() => {
            result.current.fetchNextPage();
        });

        await waitFor(() => result.current.isError);
        expect(result.current.error).toBeDefined();
    });
});    